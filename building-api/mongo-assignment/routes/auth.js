const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
var _ = require('lodash');
const { User } = require('../models/users');

router.post('/', async (req, res) => {
    if(req.body){
        const { error } = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email : req.body.email });
        if(!user) return res.status(400).send('Incorrect Email or password');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Incorrect Email or password');

        const token = user.genarateAuthToken();
        res.send(token);

    }
});

function validateUser(user){
    const schema = Joi.object().keys({
        email : Joi.string().required(),
        password : Joi.string().required()
    })

    return Joi.validate(user, schema);
}

module.exports = router;