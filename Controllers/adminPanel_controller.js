module.exports.getadminPanel = function(req, res) {
    res.render('adminPanel', {
        title: 'Admin Panel',
        campusAmbassador: [],
        course: []
    })
}