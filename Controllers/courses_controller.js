const db = require('../config/mongoose');
const Course = require('../Models/Courses');

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
        // console.log(course);
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
        // console.log(course);
        res.render('lvcourses', {
            title: 'Courses', 
            courses: course
        });
    });
};

module.exports.enrollCourse = function(req, res) {
    Course.findOne({
        course_id: req.body.course_id
    }, (err, course) => {
        if(err){
            console.log(err);
            return;
        }
        res.render('enrollCourse', {
            title: 'Enroll Course',
            course: course
        });
    }
    );
}