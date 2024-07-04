const Joi = require('joi');

exports.validateSignup = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(20).max(60).required(),
        email: Joi.string().email().required(),
        address: Joi.string().max(400).required(),
        password: Joi.string().min(8).max(16).regex(/[a-zA-Z]/).regex(/[!@#$%^&*(),.?":{}|<>]/).required()
    });

    return schema.validate(data);
};

exports.validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required()
    });

    return schema.validate(data);
};
