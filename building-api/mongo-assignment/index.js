require('express-async-errors');
const error = require('./middlewares/error');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const app = express();
const vidly = require('./routes/customer');
var genre = require('./routes/genres');
var movies = require('./routes/movies');
var rentals = require('./routes/rentals');
var users = require('./routes/users');
var auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
	console.error('FATAL ERROR: jwtPrivateKey is not defined');
	process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true })
	.then(() => console.log('Connected to DB....'))
	.catch((err) => console.log('COuld not connect to DB...'))

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());

app.use('/api/vidly', vidly);
app.use('/api/genres', genre);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = (process.env.port || 3000);

app.listen(port, () => {
    console.log(`Listening port ${port} for vidly....`);
})