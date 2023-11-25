const Joi = require('joi');
const mongoose = require('../util/mongoose');
const createUserVailidator = Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required()
})
module.exports = createUserVailidator;