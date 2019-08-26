const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genres');

const Movie = mongoose.model('Movie', new mongoose.Schema({
	title:{
        type:String,
        trim:true,
        required:true,
        minlength:5,
        maxLength:255
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
})
);

function validateGenres(requestedBody) {

	const schema = Joi.object().keys({
        title:Joi.string().min(5).max(255).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi.number().min(0).max(255).required()
	})

	return Joi.validate(requestedBody, schema);
}

exports.Movie = Movie;
exports.validate = validateGenres;