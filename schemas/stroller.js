const Joi = require('@hapi/joi');
const strollerSchema = Joi.object().keys({
    images: Joi.array().items(Joi.string().required()),
    price: Joi.number().required(),
    name: Joi.string(),
    rating: Joi.number(),
    rent: Joi.string(),
    ageGroup: Joi.string().required(),
    type: Joi.string().required(),
    categories: Joi.string().required(),
    brand: Joi.string().required(),
    color: Joi.string().required(),
    weight: Joi.string().required(),
    features: Joi.array().items(Joi.string().required()),
    owner: Joi.string()
});
module.exports = {
    strollerSchema
};