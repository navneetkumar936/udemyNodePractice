const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            isGold:{
                type: Boolean,
                default: false,
                required: true
            },
            name:{
                type: String,
                minLength: 3,
                required: true
            },
            phone:{
                type: String,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type:new mongoose.Schema({
            title:{
                type:String,
                trim:true,
                required:true,
                minlength:5,
                maxLength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            }
        }),
        required: true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
}));

function validateRental(rental){
    const schema = Joi.object().keys({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;