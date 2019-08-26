const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    isAdmin:Boolean
})

userSchema.methods.genarateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object().keys({
        name : Joi.string().min(3).required(),
        email : Joi.string().required(),
        password : Joi.string().required()
    })

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;