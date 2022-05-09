const User = require('../models/user');


module.exports.getadminPanel = function(req, res) {
    if(req.user.admin === true){
    return res.render('adminPanel', {
        title: 'Admin Panel',
        campusAmbassador: [],
        course: []
    })
}
    return res.redirect('/');
}


module.exports.signout = (req,res)=>{
    res.clearCookie('user_id');
    return res.redirect('/signIn');
}