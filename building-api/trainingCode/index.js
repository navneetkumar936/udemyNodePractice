const config = require('config');
const Joi = require('joi');
var pug = require('pug');
const helmet = require('helmet');
const morgan = require('morgan')
const logger = require('./middleware/logger.js');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/course', courses);

app.use(logger);

app.set('view engine', 'pug');
app.set('views', './views');

// // console.log('Name:'+config.get('name'));
// // console.log(`Mail : ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);/* first enter "export app_password = '12357798'" in commmand line*/

if( app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`listening to ${PORT}...`);
})