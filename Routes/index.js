const express = require('express'); // import express
const router = express.Router(); // create express router 
const passport = require('passport'); // import passport
const homeController = require('../controllers/home_controller'); // import home controller
const cookieParser = require('cookie-parser');
router.use(express.urlencoded({extended:true}));
router.use(cookieParser());


// get and post of all routes
// router.get('/',passport.checkAuthentication,homeController.getHome); // get home with authentication
router.get('/',homeController.getHome); // get home with authentication
router.use('/signin', require('./user')); // use user routes
router.use('/signOut', require('./user')); // use user routes
router.use('/signup', require('./user')); // use user routes
router.use('/campusAmbassador',require('./campusAmbassador')); // use campus ambassador
router.use('/girlsWhoCode',require('./girlsWhoCode')); // use girls who code 
router.use('/adminPanel',require('./adminPanel')); // use admin panel 
router.use('/courses',require('./courses')); // use courses
router.use('/PaymentPortal',require('./PaymentPortal')); // use payment portal
module.exports = router; // export router
