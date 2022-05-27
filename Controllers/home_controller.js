const profileDp = require('../models/profile_dp');

module.exports.getHome = (req, res)=>{
    console.log(req.user);
    if(req.user){
        return res.render('home', {
            title: 'Sheryians Coding School',
            request: req
        });
    }
    req.session.returnTo = req.originalUrl; 
    return res.render('home', {
        title: 'Sheryians Coding School',
        request: null
    });
} 

module.exports.UploadProfile_dp = (req, res)=>{
    profileDp.findOne({userId:req.user.id},(err, profileDp)=>{
        if(err){
            console.log(err);
            return;
        }
        if(!profileDp){
            profileDp = new profileDp();
            profileDp.userId = req.user.id;
        }
        profileDp.dp = req.file.path;
        profileDp.save((err)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.redirect('back');
        });
    }
)};

