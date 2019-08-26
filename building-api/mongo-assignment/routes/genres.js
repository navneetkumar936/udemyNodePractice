const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async');
const { Genre, validate } = require('../models/genres');

router.get('/', asyncMiddleware(async function (req, res, next) {
	const result = await Genre.find().sort('name');
	return res.status(200).send(result);
}));

router.get('/:id', asyncMiddleware(async function (req, res) {

	const movieGenre = await Genre.findById(req.params.id);

	if (!movieGenre) {
		return res.status(404).send('No Such genre');
	}

	return res.status(200).send(movieGenre);
}))

router.post('/', auth,asyncMiddleware(async (req, res) => {

	if (req.body) {
		const { error } = validate(req.body);

		if (error) {
			return res.status(422).send(error.details[0].message)
		}

		// genres.push({ id: (genres.length) + 1, genre: req.body.genre })
		const genre = new Genre({ name: req.body.genre });
		await genre.save();
		return res.status(200).send(genre);
	} else {
		return res.status(422).send("Enter Genre");
	}

}))

router.put('/:id', asyncMiddleware(async (req, res) => {

	if (req.body) {
		const { error } = validate(req.body);

		if (error) {
			return res.status(422).send(error.details[0].message)
		}

		const movieGenre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.genre }, {
			new: true
		});

		if (!movieGenre) {
			return res.status(404).send('No Such genre');
		}

		res.status(200).send(movieGenre);

	}
	else {
		return res.status(422).send("Enter Genre");
	}

}));

router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {

	let movieGenre = await Genre.findByIdAndRemove(req.params.id);

	if (!movieGenre) {
		return res.status(404).send('No Such genre exist');
	}

	return res.send(movieGenre);

}))

module.exports = router;