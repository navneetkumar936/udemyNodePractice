const express = require('express');
const router = express.Router();
const { Movie, validate } =  require('../models/movies');
const { Genre } = require('../models/genres');

router.get('/', async function (req, res) {
	const result = await Movie.find().sort('name');
	return res.status(200).send(result);
})

router.get('/:id', async function (req, res) {

	const movie = await Movie.findById(req.params.id);

	if (!movie) {
		return res.status(404).send('No Such genre');
	}

	return res.status(200).send(movie);
})

router.post('/', async (req, res) => {

	if (req.body) {
		const { error } = validate(req.body);

		if (error) {
			return res.status(422).send(error.details[0].message)
		}

        const genre =  await Genre.findById(req.body.genreId);
        if(!genre){
            return res.status(422).send('Invalid Genre');
        }

		// genres.push({ id: (genres.length) + 1, genre: req.body.genre })
		const movie = new Movie({
            title : req.body.title,
            genre : {
                _id : genre._id,
                name : genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate 
        });
		await movie.save();
		return res.status(200).send(movie);
	} else {
		return res.status(422).send("Enter all data");
	}

})

router.put('/:id', async (req, res) => {

	if (req.body) {
		const { error } = validate(req.body);

		if (error) {
			return res.status(422).send(error.details[0].message)
        }
        
        const genre = await Genre.findById(req.body.genreId);
        if(!genre){
            return res.status(422).send('Invalid Genre');
        }

		const movie = await Movie.findByIdAndUpdate(req.params.id, { 
            title : req.body.title,
            genre : {
                _id : genre._id,
                name : genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        }, {
			new: true
		});

		if (!movie) {
			return res.status(404).send('No Such genre');
		}

		res.status(200).send(movie);

	}
	else {
		return res.status(422).send("Enter All data");
	}

})

router.delete('/:id', async (req, res) =>  {

	let movie = await Movie.findByIdAndRemove(req.params.id);

	if(!movie){
		return res.status(404).send('No Such genre exist');
	}

	return res.send(movie);

})

module.exports = router;