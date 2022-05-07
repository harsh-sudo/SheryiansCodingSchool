const User = require('../models/user');

module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/adminPanel');
    }
    res.render('signIn',{
        title:"Sign In"
    });
}

module.exports.signup = (req,res)=>{
    res.render('otsignup',{
        title:"Sign Up"
    });
}

module.exports.createuser = (req,res)=>{ 
    User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            console.log(err);
            return
        }
        User.create(req.body,(err,user)=>{  
            if(err){
                console.log(err);
                return
            }
            res.redirect('/signIn');
        })
    })  
   
}

module.exports.authenticate = (req,res)=>{
    User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            console.log(err);
            return
        }
        if(!user){
            return res.redirect('back');
        }
        if(user.password !== req.body.password){
            return res.redirect('back');
        }
        res.cookie('user_id',user._id);
        return res.redirect('/adminPanel');
    })
}

module.exports.signout = (req,res)=>{
    res.clearCookie('user_id');
    req.logout();
    return res.redirect('/');
}

module.exports.createSession = (req,res)=>{
    return res.redirect('/adminPanel');
} 