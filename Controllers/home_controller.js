const ProfileDp = require('../models/profile_dp');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


module.exports.getHome = (req, res)=>{
    console.log(req.user);
    if(req.user){
        // req.session.message = "hello";
        console.log(req.session.message)
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
    let profile_dp = await ProfileDp.findOne({user_id:req.user.id});
    if(!profile_dp){
        profile_dp = new ProfileDp();
    }
    
    try{ProfileDp.uploaded_dp(req,res,async (err)=>{
        console.log(req.file);
        const { filename: image } = req.file;
        await sharp(req.file.path)
         .resize(200, 200)
         .withMetadata()
         .jpeg({ quality: 90 })
         .toFile(
            path.resolve(req.file.destination,'resized',image)
         )
            fs.unlinkSync(req.file.path)
         if(profile_dp.dp){
            if(profile_dp.dp.search('google') == -1){
            //  console.log("hellllooo",path.join(__dirname, '..',profile_dp.dp))
            fs.unlinkSync(path.join(__dirname, '..',profile_dp.dp))
            }
         }
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

