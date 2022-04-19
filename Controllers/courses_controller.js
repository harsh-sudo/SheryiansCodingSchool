module.exports.getCourses = function(req, res) {
    res.render('courses', {
        title: 'Courses',
    });
};