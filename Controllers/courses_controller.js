const db = require('../config/mongoose');
const user = require('../models/user');
const Course = require('../Models/Courses');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; ;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});






module.exports.addCourse = async function(req, res){
    let course = new Course();
    
    try{Course.course_gif(req,res,(err) => {
        // console.log(req.files.image1[0].filename);
            if(err){
                console.log(err);
                return;
            }
            course.course_name = req.body.course_name; 
            course.image = Course.course_gif_path + '/' + req.files.image1[0].filename;
            course.description = req.body.description;
            course.course_id = req.body.course_id;
            course.level = req.body.level;
            course.duration = req.body.duration;
            course.fees = req.body.fees;
            course.subHeading = req.body.course_subHeading;
            course.startOn = req.body.startOn;
            course.projectOverview = [
                {
                    Heading:req.body.projectOverviewHeading1,
                    description:req.body.projectOverviewDescription1,
                    image:Course.course_gif_path + '/' + req.files.image2[0].filename
                },
                {
                    Heading:req.body.projectOverviewHeading2,
                    description:req.body.projectOverviewDescription2,
                    image:Course.course_gif_path + '/' + req.files.image3[0].filename
                },
                {
                    Heading:req.body.projectOverviewHeading3,
                    description:req.body.projectOverviewDescription3,
                    image:Course.course_gif_path + '/' + req.files.image4[0].filename
                }
            ]
            course.bullet_points[0] = {
                first:req.body.bulletPoint1,
                second:req.body.bulletPoint2,
                third:req.body.bulletPoint3,
                fourth:req.body.bulletPoint4
            }
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
            course.course_name = req.body.course_name;
            if(req.files.image1){ 
            course.image = Course.course_gif_path + '/' + req.files.image1[0].filename;
            }
            course.description = req.body.description;
            course.course_id = req.body.course_id;
            course.level = req.body.level;
            course.duration = req.body.duration;
            course.fees = req.body.fees;
            course.subHeading = req.body.course_subHeading;
            course.startOn = req.body.startOn;
            if(req.files.image2){
                course.projectOverview[0] = 
                    {
                        Heading:req.body.projectOverviewHeading1,
                        description:req.body.projectOverviewDescription1,
                        image:Course.course_gif_path + '/' + req.files.image2[0].filename
                    }
            }else{
                course.projectOverview[0] =
                    {
                        Heading:req.body.projectOverviewHeading1,
                        description:req.body.projectOverviewDescription1,
                        image:course.projectOverview[0].image
                    }
                }
            if(req.files.image3){
                course.projectOverview[1] =
                    {
                        Heading:req.body.projectOverviewHeading2,
                        description:req.body.projectOverviewDescription2,
                        image:Course.course_gif_path + '/' + req.files.image3[0].filename
                    }
            }else{
                course.projectOverview[1] =
                    {
                        Heading:req.body.projectOverviewHeading2,
                        description:req.body.projectOverviewDescription2,
                        image:course.projectOverview[1].image
                    }
                }
            if(req.files.image4){
                course.projectOverview[2] =
                    {
                        Heading:req.body.projectOverviewHeading3,
                        description:req.body.projectOverviewDescription3,
                        image:Course.course_gif_path + '/' + req.files.image4[0].filename
                    }
            }else{
                course.projectOverview[2] =
                    {
                        Heading:req.body.projectOverviewHeading3,
                        description:req.body.projectOverviewDescription3,
                        image:course.projectOverview[2].image
                    }
                }
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
        console.log(req.url)
        // res.session.current_url = req.url;
        req.session.returnTo = req.originalUrl; 
        return res.render('courses', {
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
        req.session.returnTo = req.originalUrl;
        res.render('lvcourses', {
            title: 'Courses', 
            courses: course
        });
    });
};

module.exports.enrollCourse = function(req, res) {
    console.log(req.params.id);
    let check = 0;
    Course.findOne({
        _id: req.params.id
    }, (err, course) => {
        if(err){
            console.log(err);
            return;
        }
    user.find({_id:req.user.id,enrolledCourses:{$in:[req.params.id]}}).populate('enrolledCourses').exec((err, course)=>{
        if(err){
            console.log(err);
            return;
        }
            if(course.length > 0){
                console.log(course);
                console.log('hello');
                return res.redirect('back');
            }else{
            user.findOneAndUpdate({
                _id: req.user._id
            }, {
                $push: {
                   enrolledCourses: req.params.id,
                   "feeStatus": {course_id:req.params.id,status:"pending"}
                }
            },
            (err, user) => {
                if(err){
                    console.log(err);
                    return;
                }
                async function sendMail(){
                    try{
                        const accesstoken = await oauth2Client.getAccessToken(); 
                        const transport = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: 'OAuth2',
                                user: 'yoharsh113@gmail.com',
                                clientId: CLIENT_ID,
                                clientSecret: CLIENT_SECRET,
                                refreshToken: REFRESH_TOKEN,
                                accessToken: accesstoken
                            }
                        });
                
                        const mailOptions = {
                            from: 'sheryianscodingschool@gmail.com',
                            to: user.email,
                            subject: 'HEHEHE',
                            text: 'Enroll Ho Gye Hai'
                        };
                
                        const result = await transport.sendMail(mailOptions);
                        return result
                    }
                    catch(err){
                        return err
                    }
                }
                sendMail().then(()=>{
                    console.log('mail sent to :'+user.email);
                }).catch((err)=>{
                    console.log(err);
                });
                return res.redirect('/classroom/'+req.user._id);
            });
        }
    });
});
};

module.exports.cancelEnrollment = function(req, res) {
    user.findOneAndUpdate({
        _id: req.user._id
    }, {
        $pull: {
            enrolledCourses: req.params.id,
            "feeStatus": {course_id:req.params.id,status:"pending"}
        }
    }, (err, user) => {
        if(err){
            console.log(err);
            return;
        }
        async function sendMail(){
            try{
                const accesstoken = await oauth2Client.getAccessToken(); 
                // console.log(accesstoken);
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'yoharsh113@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accesstoken
                    }
                });
        
                const mailOptions = {
                    from: 'sheryianscodingschool@gmail.com',
                    to: user.email,
                    subject: 'HEHEHE',
                    text: 'Enroll Se Hat Gye Hai'
                };
        
                const result = await transport.sendMail(mailOptions);
                return result
            }
            catch(err){
                return err
            }
        }
        sendMail().then(()=>{
            console.log('mail sent to :'+user.email);
        }).catch((err)=>{
            console.log(err);
        });
        return res.redirect('back');
    });
}
