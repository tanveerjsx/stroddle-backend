const express = require('express');
const router = express.Router();
const multer = require('multer')
const passport = require("passport");
const path = require('path');
const userService = require('../services/user');
const User = require('../models/user');
const { profileSchema } = require('../schemas/auth');
const authMiddleware = require('../middlewares/auth')


router.patch('/edit', async (req, res) => {
    const validation = profileSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    }
    const update = { ...req.body };
    try {
        const id = req.body.userId;
        const user = await userService.getUserById(id);
        if (!user) { res.status(400).json({ message: 'no user found' }) }
        await User.updateOne(
            { _id: req.params.id },
            {
                $set: update
            }
        );
        res.status(200).json({
            message: {
                user: {
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    ...update,
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;