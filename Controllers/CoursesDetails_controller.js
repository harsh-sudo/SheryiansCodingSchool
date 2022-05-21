const courses = require('../Models/Courses');

module.exports.getCoursesDetails = function(req, res) {
    courses.findOne({
        course_id: req.params.id
    }, (err, course) => {
        if(err){ 
            console.log(err);
            return;
        }
        req.session.returnTo = req.originalUrl; 
        return res.render('coursesDetails', {
            title: 'Courses',
            course: course
        });
    }
    );
};