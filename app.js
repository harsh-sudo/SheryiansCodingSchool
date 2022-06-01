const express = require('express'); // import express
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose'); // import db
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./Config/passport-local-strategy');
const MongoStore = require('connect-mongo'); 
const app = express(); // create express app
const path = require('path'); // import path
const bodyParser = require('body-parser'); // import body parser
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const flash = require('connect-flash');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; ;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});


//razorPay
const Razorpay = require('razorpay'); 
  
// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id:process.env.RAZORPAY_KEY_ID,
  
    // Replace with your key_secret
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const port = process.env.PORT || 7000; // set port

const user = require('./models/user'); // import user model


app.set('view engine', 'ejs'); // set view engine to ejs

app.use('views', express.static(__dirname + '/views')); // set views folder
app.use(express.static('Assets')); // set assets folder
app.use('/Assets', express.static(__dirname + '/Assets')); // set assets folder
app.use(express.json());

app.use(cookieParser());
app.use(session({
    name: "SheryiansAdminPanel",
    secret: "Chadiyan",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: (60 * 60 * 500) // 500 minutes
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/campusAmbassador_db', // set mongo url,
        autoRemove: 'disabled' // keep data in db after closing the browser
    }, function (err) { // callback function
        console.log(err || 'connect-mongodb setup ok'); // log error or success
    })
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.post("/api/payment/verify/:id",(req,res)=>{
    console.log(req.params.id);
    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
     var crypto = require("crypto");
     var expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received " ,req.body.response.razorpay_signature);
                                    console.log("sig generated " ,expectedSignature);
    var response = {"signatureIsValid":"false"}
    if(expectedSignature === req.body.response.razorpay_signature){
        response={signatureIsValid:"true"};
        user.findOne({_id:req.user._id},(err,user)=>{ 
            if(err){
                console.log(err);
            }
            else{
                for(let i of user.feeStatus){
                    if(i.course_id === req.params.id){
                        i.status = "paid";
                        async function sendMail(){
                            try{
                                const accesstoken = await oauth2Client.getAccessToken(); 
                                console.log(accesstoken);
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
                                    from: 'yoharsh113@gmail.com',
                                    to: user.email,
                                    subject: 'HEHEHE',
                                    text: 'aab mat chuda aab toh chud gyi'
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
                    }
                }
            }
            user.save((err)=>{
                if(err){
                    console.log(err)
                    return;
                }
            });
        })
    } 
    res.send(response);
});

app.use('/',require('./Routes')); // use index.js

app.listen(port,(err)=>{ // listen to port 
    if(err){ // if error
        console.log('Error:',err); // log error
    } 
    console.log(`Server is running on port ${port}`); // log port
}); // end listen

