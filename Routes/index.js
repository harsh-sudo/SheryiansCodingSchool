const express = require('express'); // import express
const router = express.Router(); // create express router 
const passport = require('passport'); // import passport
const homeController = require('../controllers/home_controller'); // import home controller
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // import body parser
router.use(express.urlencoded({extended:true}));
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));




// get and post of all routes
// router.get('/',passport.checkAuthentication,homeController.getHome); // get home with authentication
router.get('/',homeController.getHome); // get home with authentication
router.get('/google',passport.authenticate('google',{ scope: ['profile','email']}),(req,res)=>{
    res.redirect('/classroom');
});
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    res.redirect(req.session.returnTo || '/classroom');
    delete req.session.returnTo;
});

router.get('/auth/github',passport.authenticate('github'));
router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/'}),(req,res)=>{
    res.redirect(req.session.returnTo || '/classroom');
    delete req.session.returnTo;
});

router.post('/UploadProfile_dp',homeController.UploadProfile_dp); // get home with authentication

router.use(passport.setAuthenticatedUser);
router.use('/signin', require('./user')); // use user routes
router.use('/signOut', require('./user')); // use user routes
router.use('/signup', require('./user')); // use user routes
router.use('/campusAmbassador',require('./campusAmbassador')); // use campus ambassador
router.use('/girlsWhoCode',require('./girlsWhoCode')); // use girls who code 
router.use('/adminPanel',require('./adminPanel')); // use admin panel 
router.use('/courses',require('./courses')); // use courses
router.use('/PaymentPortal',require('./PaymentPortal')); // use payment portal
router.use('/classroom',require('./classroom')); // use classroom
module.exports = router; // export router
