const Joi = require('joi');
const mongoose = require('mongoose');

const Vidly = mongoose.model('Vidly', new mongoose.Schema({
    isGold:{
        type: Boolean,
        default: false,
        required: true
    },
    name:{
        type: String,
        minLength: 3,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
}))

function checkValidation(requestBody){

    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone:Joi.string().required()
    })

    return Joi.validate(requestBody, schema);

}

exports.Customer = Vidly;
exports.validate = checkValidation; 