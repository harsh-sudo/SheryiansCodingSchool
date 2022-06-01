const User = require('../models/user');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; ;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});


module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    if(req.user){
        return res.redirect('/')
    }
    return res.render('signIn',{
        title:"Sign In",
        request: req
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

// module.exports.authenticate = (req,res)=>{
//     User.findOne({email: req.body.email},(err,user)=>{
//         if(err){
//             console.log(err);
//             return
//         }
//         if(!user){
//             return res.redirect('back');
//         }
//         if(user.password !== req.body.password){
//             return res.redirect('back');
//         }
//         res.cookie('user_id',user._id);
//         return res.redirect('/adminPanel');
//     })
// }

module.exports.signout = (req,res)=>{
    res.clearCookie('user_id');
    req.logout();
    return res.redirect('/');
}

module.exports.createSession = (req,res)=>{
    delete req.session.message;
    if(req.user.admin === true){
    return res.redirect('/adminPanel');
    }    
    res.redirect(req.session.returnTo);
    delete req.session.returnTo;
} 

module.exports.forgot = (req,res)=>{
    res.render('forgot_password',{
        title:"Forgot Password"
    });
}

module.exports.reset_password = (req,res)=>{
    let token = Math.floor(Math.random() * 1000000)
    console.log(token)
    User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            console.log(err);
            return
        }
        if(!user){
            return res.redirect('back');
        }
        user.reset_token = token;
        user.save((err)=>{
            if(err){
                console.log(err);
                return
            }
            async function sendMail(){
                try{
                    const accesstoken = await oauth2Client.getAccessToken(); 
                    const transport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: 'yoharsh113@gmail.com',
                            clientId: CLIENT_ID,
                            clientSecret: CLIENT_SECRET,
                            refreshToken: REFRESH_TOKEN,
                            accessToken: accesstoken
                        }
                    });
            
                    const mailOptions = {
                        from: 'sheryianscodingschool@gmail.com',
                        to: user.email,
                        subject: 'RESET YOUR PASSWORD',
                        text: 'Hello,\n\n' + 'Please click on the link to reset your password: \n\n' + 'http://' + req.headers.host + 'signIn/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n' + '\n' + 'Thanks,\n' + 'Sheryians Coding School'
                    };
            
                    const result = await transport.sendMail(mailOptions);
                    return result
                }
                catch(err){
                    return err
                }
            }
            sendMail().then(()=>{
                console.log('mail sent to :'+user.email);
            }).catch((err)=>{
                console.log(err);
            });
            res.redirect('/signIn');
        })
    })
}

module.exports.reset = (req,res)=>{
    User.findOne({reset_token: req.params.token},(err,user)=>{
        if(err){
            console.log(err);
            return
        }
        if(!user){
            return res.redirect('back');
        }
        res.render('reset_password',{
            title:"Reset Password",
            user: user
        });
    })
}

module.exports.change_password = (req,res)=>{
    User.findOne({reset_token: req.params.token},(err,user)=>{
        if(err){
            console.log(err);
            return
        }
        if(!user){
            return res.redirect('back');
        }
        console.log(req.body.password)
        user.password = req.body.password;
        user.reset_token = undefined;
        user.save((err)=>{
            if(err){
                console.log(err);
                return
            }
            res.redirect('/signIn');
        })
    })
}
