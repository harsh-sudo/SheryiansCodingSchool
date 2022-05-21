const user = require('../models/user');
const courses = require('../Models/Courses');

module.exports.getClassroom = (req, res)=>{
        user.find({_id:req.user.id}).populate('enrolledCourses').exec((err, course)=>{
        if(err){
            console.log(err);
            return;
        }
        return res.render('classroom', {
            title: 'Classroom',
            course: course,
            fees: req.user.feeStatus
        });
    });
}