const express = require('express');
const router  = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

const cookieParser = require('cookie-parser');
router.use(express.urlencoded({extended:true}));
router.use(cookieParser()); 

 
router.get('/',userController.signIn);
router.get('/bye',userController.signout);
router.get ('/newuser',userController.signup);
router.post('/auth-user',passport.authenticate(
    'local',
    {failureRedirect:'/signIn'}
),userController.createSession);
router.post('/createuser',userController.createuser); 
module.exports = router;