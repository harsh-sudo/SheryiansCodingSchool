const db = require('../config/mongoose');
const Course = require('../Models/Courses');

module.exports.addCourse = async function(req, res){
    let course = new Course();

    try{Course.course_gif(req,res,(err) => {
            if(err){
                console.log(err);
                return;
            }
            course.course_name = req.body.course_name; 
            course.image = Course.course_gif_path + '/' + req.file.filename;
            course.description = req.body.description;
            course.course_id = req.body.course_id;
            course.level = req.body.level;
            course.duration = req.body.duration;
            course.fees = req.body.fees;
            course.save((err)=>{
                if(err){
                    console.log(err)
                    return;
                }
                return res.redirect("/courses");
            });
        });
    }catch(err){
        console.log(err);
    }  
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
        campusAmbassador: [],
        course: course}); 
});
}

module.exports.updateCourse = async (req, res)=>{
    let course = await Course.findOne({
        _id:req.params.id
    });
    try{Course.course_gif(req,res,(err) => {
            if(err){
                console.log(err);
                return;
            }
            course.name = req.body.name;
            if(req.file){
            course.image = Course.course_gif_path + '/' + req.file.filename;
            }
            course.description = req.body.description;
            course.course_id = req.body.course_id;
            course.level = req.body.level;
            course.duration = req.body.duration;
            course.fees = req.body.fees;
            course.save((err)=>{
                if(err){
                    console.log(err)
                    return;
                   }
                return res.redirect("/courses");
            });
        });
}catch(err){
    console.log(err);
}
}

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

module.exports.getlvCourses = function(req, res) {
    Course.find({}, (err, course) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(course);
        res.render('lvcourses', {
            title: 'Courses', 
            courses: course
        });
    });
};