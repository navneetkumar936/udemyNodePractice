const express = require('express');
const router = express.Router();

const courses = [
    { id:1, course:'English' },
    { id:2, course:'Maths' },
    { id:3, course:'History' }
]



router.post('/', (req,res) => {

    const {error} = validatCourse(req.body); //object destructuring
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const subject = {
        id: courses.length + 1,
        course: req.body.course
    }
    courses.push(subject);
    res.send(courses);
})

router.delete('/:id', (req,res) => {

    const course = courses.find(sub => {return (sub.id === parseInt(req.params.id))});
    if(!course){
        res.status(404).send('Course does not exist');
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

router.put('/:id', (req,res) => {
    const course = courses.find(sub => {return (sub.id === parseInt(req.params.id))});
    
    if(!course){
        return res.status(404).send('Course does not exist');
    }

    const {error} = validatCourse(req.body); //object destructuring
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.course = req.body.course;
    res.status(200).send({msg:'Successfully updated',
result:courses});
})

function validatCourse(course){

    const schema = {
        course : Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)

}

module.exports = router;