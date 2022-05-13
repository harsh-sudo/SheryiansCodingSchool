// const user = require('../Models/user');
const courses = require('../Models/Courses');

module.exports.getClassroom = (req, res)=>{
    courses.find({}, (err, courses)=>{
        if(err){
            console.log('Error in finding courses in classroom');
            return;
        }
        return res.render('classroom', {
            title: 'Sheryians Coding School',
            courses: courses,
            request: req
        });
    });
}