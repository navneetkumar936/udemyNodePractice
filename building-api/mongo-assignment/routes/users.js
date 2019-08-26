const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
var _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/users');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/', async (req, res) => {
    if(req.body){
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email : req.body.email });
        if(user) return res.status(400).send('User already exists');

        user = new User(_.pick(req.body, ['name', 'email', 'password'])); //lodash library used for getting specific field out of objects
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.genarateAuthToken();
        return res.header('x-auth-token',token).send(_.pick(user, ['name', 'email']));

    }
})

module.exports = router;