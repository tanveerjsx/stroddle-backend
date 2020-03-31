const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const User = require('../models/user');
const Token = require('../models/token');
const { helpers } = require('../helpers');
const { signupSchema, signinSchema, verificationTokenSchema } = require('../schemas/auth');

router.post('/signup', async (req, res) => {
    const validation = signupSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    }
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            return res.status(500).json({ 
                message: 'Email Already Exists',
            });
        }
        const newUser = new User({
            ...req.body
        });
        await userService.registerUser(newUser);
        await helpers.sendEmail(newUser, req, res);
        res.status(201).json({
            success: true,
            message: "Account is successfully created ans email has sent.",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


router.post('/signin', async (req, res) => {
    const validation = signinSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    }
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (user) {

            if (!user.comparePassword(password)) { res.status(401).json({ message: 'Invalid email or password' }) };
            if (!user.isVerified) { res.status(401).json({ message: 'Your account has not been verified' }); }
            const token = user.generateJWT();
            if (!token) {
                res.status(500).json({
                    message: 'error in generating token',
                });
            }
            res.status(200).json({
                message: {
                    user: {
                        userId: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    },
                    token,
                },
            });
        } else {
            res.status(500).json({
                message: "Email doesn't not exists",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/verify', async (req, res) => {
    console.log("token code",req.body)
    const tokenCode = verificationTokenSchema.validate(req.body);
    if (!tokenCode)  res.status(400).json({ message: "token is not provided" });
    try {
        const token = await Token.findOne({ token: req.body.token });
        if (!token) { res.status(400).json({ message: 'invalid Token' })}
        const user = await userService.getUserById(token.userId);
        if (!user) { res.status(400).json({ message: 'no user for this token' })}
        if (user.isVerified) { res.status(400).json({ message: ' user has already been verified' })}
        user.isVerified = true;
        await userService.registerUser(user);
        res.status(201).json({
            success: true,
            message: "Account is successfully verified",
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.post('/resend', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account' });
        if (user.isVerified) res.status(400).json({ message: 'This account has already been verified' });
        helpers.sendEmail(user, req, res);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;