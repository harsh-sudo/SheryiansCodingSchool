const User = require('../Models/user.js');
const Course = require('../Models/Courses');


module.exports.getadminPanel = function(req, res) {
    if(req.user.admin === true){
    return res.render('adminPanel', {
        title: 'Admin Panel',
        campusAmbassador: [],
        course: []
    })
}
    return res.redirect('/');
}

module.exports.getCourseData = function(req, res) {
    if(req.user.admin === true){
        return res.render('courseStudentData', {
            title: 'Course Student Data',
            userdata: []
        })
        return res.redirect('/');
    }
}

module.exports.getCourseStudentData = function(req, res) {
Course.findOne({course_id:req.body.course_id}, function(err, course) {
    User.find({enrolledCourses:{$in:[course._id]}}).sort({name: 1}).collation({ locale: "en", caseLevel: true }).populate('enrolledCourses').exec((err, user)=>{
        console.log(user);
        // console.log("hello");
        if(err){
            console.log(err);
            return;
        }
        if(req.user.admin === true){
            return res.render('courseStudentData', {
                title: 'Course Student Data',
                userdata: user,
                course_name: course.course_name,
                course_id: course._id
            })
        }
        return res.redirect('/');
    })
})
}


module.exports.signout = (req,res)=>{
    res.clearCookie('user_id');
    return res.redirect('/signIn');
}