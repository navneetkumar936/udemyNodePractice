const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected...');
    })
    .catch((err) => {
        console.error('Eror while connecting...', err);
    })

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Rowling',
        tags: ['angular', 'frontend'],
        isPublished: true
    })

    // const result = await course.save();
    // console.log(result);
}

createCourse();

async function getCourses(){

    //eq
    // neq
    // lt 
    // gt 
    // lte 
    // gte 
    // in 
    // nin

    pageNumber = 2;
    pageSize = 5;

    const courses = await Course
        .find({ name:'Ryan' , isPublished:true})
        // .find({price:{$lte:20, $gte:10}})
        // .find({price:{$in:[10,15,20]}})
        // .find()
        // .or([ { name:'Ryan' }, { isPublished:true } ])
        // .and([])
        .skip((pageNumber - 1)*pageSize)
        .limit(pageSize)
        .sort({name:1}) //can also be .sort('name'), similarly for other functions too
        .select({ name:1, tags:1 });
    console.log(`Courses:${courses}`);
    
}

getCourses()