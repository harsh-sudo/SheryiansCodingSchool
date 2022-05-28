const user = require('../models/user');
const courses = require('../Models/Courses');
const ProfileDp = require('../models/profile_dp');

module.exports.getClassroom = (req, res)=>{
        user.find({_id:req.user.id}).populate('enrolledCourses').exec((err, course)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(req.user.id)
        ProfileDp.findOne({userId:req.user.id},((err, dp)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(dp.dp);
        return res.render('classroom', {
            title: 'Classroom',
            course: course,
            profile_dp: dp,
            fees: req.user.feeStatus
        });
    }));
    });
}

module.exports.updateProfile = (req, res)=>{
    user.findOne({_id:req.user.id},(err, user)=>{
        if(err){
            console.log(err);
            return;
        }
        let name = req.body.firstName+' '+req.body.lastName;
        user.name = name;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;
        user.save((err)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.redirect('back');
        });
    });
}
