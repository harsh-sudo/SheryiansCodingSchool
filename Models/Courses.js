const mongoose = require('mongoose');

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
    }
},{
    timestamps:true
});

const Course = mongoose.model('Course',CourseSchema);

module.exports = Course;
