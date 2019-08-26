const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 50
	}
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenres(requestedBody) {

	const schema = Joi.object().keys({
		genre: Joi.string().min(2).required()
	})

	return Joi.validate(requestedBody, schema);
}

exports.genreSchema = genreSchema; 
exports.Genre = Genre;
exports.validate = validateGenres;