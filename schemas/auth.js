const Joi = require('@hapi/joi');
const signupSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

const signinSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
   
});
const verificationTokenSchema = Joi.object().keys({
    token: Joi.string().required(),
});

const profileSchema = Joi.object().keys({
    address1: Joi.string().required(),
    address2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.string().required(),
    profileImage: Joi.string(),
    userId:Joi.string()
});

module.exports = {
    signupSchema,
    signinSchema,
    verificationTokenSchema,
    profileSchema
};
