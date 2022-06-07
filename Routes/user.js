const express = require('express');
const router  = express.Router();
const passport = require('passport');
const flash = require('connect-flash');

const userController = require('../Controllers/user_controller.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // import body parser

router.use(flash());
router.use(express.urlencoded({extended:true}));
router.use(cookieParser()); 

 
router.get('/',userController.signIn);
// router.get('/undefined',userController.signIn);
router.get('/bye',userController.signout);
router.get ('/newuser',userController.signup);
router.get ('/undefined',userController.signIn);
router.get ('/forgot',userController.forgot);
router.post('/resetPassword',userController.reset_password);
router.get('/reset/:token',userController.reset);
router.post('/change-password/:token',userController.change_password);
router.post('/auth-user',passport.authenticate(
    'local',
    {failureRedirect:'/signIn',
    failuerFlash: true
    }
),userController.createSession);
router.post('/createuser',passport.authenticate('local.signup' , {
    failuerRedirect : '/signup',
    failuerFlash: true
}),userController.createSession);
module.exports = router;