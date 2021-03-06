const { response } = require('express');
const flash = require('express-flash');
const passport = require('passport')
const passportLocal = require('passport-local')
const User = require('../Models/user.js')

const ProfileDp = require('../Models/profile_dp.js');

const LocalStategy = passportLocal.Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: '7daf8bcbf245ab14d55f',
    clientSecret: '9c24d0a9577816a6820d47172ca59623caf73b4c',
    callbackURL: "https://sheryianscodingschool.herokuapp.com/auth/github/callback"
    },function(accessToken, refreshToken, profile, done) {
        User.findOne({githubId: profile.id}, function (err, user) {
            if(user){
                return done(null,user);
            }else{
                new User({
                    name:profile.displayName,
                    Phone:profile.phoneNumber,
                    githubId:profile.id,
                    password:'',
                    admin:false
                }).save().then((user)=>{
                   return done(null,user);
                })
            }
        });
      }
));
passport.use(new GoogleStrategy({
    clientID: '508920448317-q9o3cu7f5hkn8711sbqvt8broa8hbpl5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://sheryianscodingschool.herokuapp.com/google/callback",
    passReqToCallback:true
},(req,accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    User.findOne({email:profile.emails[0].value}).then((user)=>{
        if(user){
            return done(null,user);
        }else{
            new User({
                name:profile.displayName,
                email:profile.emails[0].value,
                Phone:profile.phoneNumber,
                password:'',
                admin:false
            }).save().then((user)=>{
                new ProfileDp({
                    user_id:user.id,
                    dp:profile.photos[0].value
                }).save().then((dp)=>{
                    return done(null,user);
                })
            })
        }
    })
}))


passport.use(new LocalStategy({ 
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
},(req,email,password,done)=>{
    User.findOne({email:email},(err,user)=>{
        if(err){
            console.log(err);
        }

        if(!user){
            req.session.message = 'User Not Found';
            return done(err,false,{message:'Incorrect username or password.'});
        }

        if(user.password != password){  
            req.session.message = 'Incorrect Password';
            return done(err,false);
        }
        return done(null,user);
    })
}));




passport.use('local.signup', new LocalStategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err){
            return done(err);
        }
        
        if(user){
            return done(null, false, req.flash('error', 'Este Email ya esta en uso'));
        }
        const newUser = new User();
        console.log(req.body.name);
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.phoneNumber = req.body.phoneNumber;        
        newUser.save((err) => {
            console.log(err)
            done(null, newUser);
        });
    });
}));

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signIn');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){  // req.isAuthenticated() will return true if user is logged in
        res.locals.user = req.user; // req.user contains the user object
        // console.log(req);
    }
    next();
}
 
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});
