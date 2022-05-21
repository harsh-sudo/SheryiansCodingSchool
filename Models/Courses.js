const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const course_gif = path.join('/Assets/images/courses');

const CourseSchema = new mongoose.Schema({
    course_name:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    fees:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    course_id:{
        type:String,
        required:true
    },
    startOn:{
        type:String,
        required:true
    },
    bullet_points:[
        {
            first:String,
            second:String,
            third:String,
            fourth:String
        }
    ],
    subHeading:{
        type:String,
        required:true
    },
    projectOverview:[
        {
            Heading:String,
            description:String,
            image:String
        }
    ] 
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', '/Assets/images/courses'));
    },
    filename: function(req, file, cb) {
        cb(null, req.body.course_name + '-' + file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

//statics
CourseSchema.statics.course_gif = multer({storage: storage}).fields([ {name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1} ]);
CourseSchema.statics.course_gif_path = course_gif;


const Course = mongoose.model('Course',CourseSchema);

module.exports = Course;
