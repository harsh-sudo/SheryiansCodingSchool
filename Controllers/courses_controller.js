const db = require('../config/mongoose');
const Course = require('../Models/Courses');

module.exports.addCourse = function(req, res){
    console.log(req.body);
    Course.create({
        course_name: req.body.course_name,
        level: req.body.level,
        duration: req.body.duration,
        fees: req.body.fees,
        description: req.body.description,
        image: req.body.image,
        course_id: req.body.course_id
    }, (err, newCourse) => {
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/courses');
    });
}

module.exports.findCourse = function(req, res) {
Course.findOne({
    course_id: req.body.course_id
    },(err,course) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(course);
    res.render('adminPanel', {
        title: 'Admin Panel',
        course: course}); 
});
}

module.exports.updateCourse = (req, res)=>{
    console.log(req.body.course_id);
    Course.findOneAndUpdate({
        course_id: req.body.course_id
    }, {
        course_name: req.body.course_name,
        level: req.body.level,
        duration: req.body.duration,
        fees: req.body.fees,
        description: req.body.description,
        image: req.body.image,
        course_id: req.body.course_id
    }, (err,course) => {
        if(err){
            console.log(err);
            return;
        } 
    Course.find({}, (err, course) => {
    if(err){
        console.log(err);
        return;
    }
    res.render('courses', {
        title: 'Courses',
        courses: course});
    });  
}); 
   
};

module.exports.deleteCourse = function(req, res) {
    Course.findOneAndDelete({
        course_id: req.body.course_id
    }, (err, course) => {
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/courses');
    });
};


module.exports.getCourses = function(req, res) {
    Course.find({}, (err, course) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(course);
        res.render('courses', {
            title: 'Courses',
            courses: course
        });
    });
};