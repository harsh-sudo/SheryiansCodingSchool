const express = require('express');
const router  = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // import body parser

router.use(express.urlencoded({extended:true}));
router.use(cookieParser()); 

 
router.get('/',userController.signIn);
// router.get('/undefined',userController.signIn);
router.get('/bye',userController.signout);
router.get ('/newuser',userController.signup);
router.post('/auth-user',passport.authenticate(
    'local',
    {failureRedirect:'/signIn'}
),userController.createSession);
router.post('/createuser',passport.authenticate('local.signup' , {
    failuerRedirect : '/signup',
    failuerFlash: true
    }),userController.createSession);
module.exports = router;