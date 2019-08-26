const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', async function(req, res){
    const result = await Customer.find();
    return res.status(200).send(result);
})

router.get('/:id', async function(req,res){
    const result = await Customer.findById(req.params.id);

    if(!result){
        return res.status(404).send('No such data');
    }

    return res.status(200).send(result);
})

router.post('/', async function(req, res){
    
    if(req.body){

        const { error } = validate(req.body);

        if(error){
            return res.status(422).send(error.details[0].message);
        }

        const vidly = new Customer({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        })

        await vidly.save();
        return res.status(200).send(vidly);

    }else{
        return res.status(422).send('Enter all data');
    }

})

router.put('/:id', async function(req, res){

    if(req.body){

        const { error } = validate(req.body);

        if(error){
            return res.status(422).send(error.details[0].message);
        }

        const result = await Customer.findByIdAndUpdate(req.params.id, {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }, { new: true })

        if(!result){
            return res.status(404).send('No data found');
        }

        return res.status(200).send(result);
    }

})

router.delete('/:id', async function(req, res){
  
    const result = await Customer.findByIdAndRemove(req.params.id);

    if(!result){
        return res.status(404).send('No data found');
    }

    return res.status(200).send(result);

})

module.exports = router;