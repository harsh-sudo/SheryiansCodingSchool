module.exports.getadminPanel = function(req, res) {
    res.render('adminPanel', {
        title: 'Admin Panel',
        campusAmbassador: [],
        course: []
    })
}

module.exports.signout = (req,res)=>{
    res.clearCookie('user_id');
    return res.redirect('/signIn');
}