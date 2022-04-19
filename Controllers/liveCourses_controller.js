module.exports.getLiveCourses = function(req, res) {
    res.render('liveCourses', {
        title: 'Live Courses',
    });
};