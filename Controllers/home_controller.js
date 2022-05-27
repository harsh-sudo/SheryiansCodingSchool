const ProfileDp = require('../models/profile_dp');


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


module.exports.UploadProfile_dp = async (req, res)=>{
    let profile_dp = await ProfileDp.findOne({userId:req.user.id});
    if(!profile_dp){
        profile_dp = new ProfileDp();
    }
    
    try{ProfileDp.uploaded_dp(req,res,(err)=>{
        console.log("upload")
         console.log(req.file.filename)
         if(err){
             console.log(err);
             return;
         }
         profile_dp.dp = ProfileDp.uploaded_dp_path + '/' + req.file.filename;
         profile_dp.user_id = req.user.id;
         profile_dp.save((err)=>{
             if(err){
                 console.log(err);
                 return;
             }
             return res.redirect('back');
         });
     });
     }catch(err){
             console.log(err);
             return;
         }
 }

