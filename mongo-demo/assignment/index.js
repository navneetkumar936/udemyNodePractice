const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => { console.log('Connected...') }
    )
    .catch((err) => { console.error('Some error occurred', err) }
    )

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 255},
    category:{
        required: true,
        enum : ['web', 'mobile', 'network'],
        type: String,
        lowercase : true, //convert data before storing to lowercase, also has uppercase
        trim: true //remove white spaces
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
            return new Promise(function(resolve, reject) {
              setTimeout(function() {
                result = v && v.length > 0;
                resolve(result);
              }, 3000);
            });
        },
        message:'Course should have at least one tag'
        }
        // validate:{
        // //     isAsync: true,
        // //     validator: function(v, callback){
        // //         setTimeout(() => {
        // //             result = v && v.length > 0;
        // //             return (result);
        // //         }, 3000);
        // //     },
        // //     message:'Course should have at least one tag'
        // // }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished },
        min: 15,
        max: 100,
        set: v => Math.round(v), //roundoff before saving
        get: v => Math.round(v) // roundoff before fetching from db
    }
})

const Exercise = mongoose.model('Course', ExerciseSchema);

async function getCoursesExercise1() {
    const result = await Exercise
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
    console.log('Result:', result);
}

async function getCoursesExercise2() {
    const result = await Exercise
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .sort('-price')// OR .sort({ price : -1 })
        .select('name author price') // OR .select({ name : 1, author : 1, price : 1 })
    console.log('Result:', result);
}

async function getCoursesExercise3() {
    const result = await Exercise
        .find()
        .or([{ price: { $gte: 15 } }, { name: { $regex: /.*by.*/i } }])
    console.log(result);
}

async function insertRecords() {
    let allCourses = [
        { "tags": ["express", "backend"], "date": "2018-01-24T21:42:27.388Z", "name": "Express.js Course", "author": "Mosh", "isPublished": true, "price": 10},
        { "tags": ["node", "backend"], "date": "2018-01-24T21:42:47.912Z", "name": "Node.js Course", "author": "Mosh", "isPublished": true, "price": 20 },
        { "tags": ["aspnet", "backend"], "date": "2018-01-24T21:42:59.605Z", "name": "ASP.NET MVC Course", "author": "Mosh", "isPublished": true, "price": 15 },
        { "tags": ["react", "frontend"], "date": "2018-01-24T21:43:21.589Z", "name": "React Course", "author": "Mosh", "isPublished": false },
        { "tags": ["node", "backend"], "date": "2018-01-24T21:44:01.075Z", "name": "Node.js Course by Jack", "author": "Jack", "isPublished": true, "price": 12 },
        { "tags": ["node", "backend"], "date": "2018-01-24T21:47:53.128Z", "name": "Node.js Course by Mary", "author": "Mary", "isPublished": false, "price": 12 },
        { "tags": ["angular", "frontend"], "date": "2018-01-24T21:56:15.353Z", "name": "Angular Course", "author": "Mosh", "isPublished": true, "price": 15 }
    ]
    const result = await Exercise.insertMany(allCourses);
    if(!result){
        console.log();
    }
    console.log('RESULT:',result);
}

async function createCourse(){
    const course = new Exercise({
        "tags": [], 
        "date": "2018-01-24T21:56:15.353Z", 
        "name": "Angular Course", 
        "author": "Mosh", 
        "isPublished": true, 
        "price": 15,
        category:'web'
    })
    try{
        const result = await course.save();
        console.log(result);
    }
    catch(exception){
        for (field in exception.errors){
            console.log(exception.errors[field].message);
        }
    }
    
}

async function updateAfterRetrieve(id) {
    const course = await Exercise.findById(id);
    if (!course) {
        console.log('COURSENOTFOUND');
        return
    };
    course.isPublished = true;
    course.author = 'Another AUthor'
    const result = await course.save();
    console.log('Saved Course:', result);
}

async function updateCourse(id) {
    const course = await Exercise.findByIdAndUpdate(id, {
        $set: {
            author: 'MIKE',
            isPublished: false
        }
    }, { new: true });
    console.log(course)
}

async function removeCourse(id) {
    const course = await Exercise.findByIdAndRemove(id, { useFindAndModify: false });
    console.log(course)
}

// insertRecords();
createCourse();
// removeCourse('5d00c0fec7a2a04663595464');

// updateCourse('5cfc1cd72c557f49d4d04c0d');
// getCoursesExercise3();