const express = require('express'); // import express
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose'); // import db
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo'); 
const app = express(); // create express app
const path = require('path'); // import path
const bodyParser = require('body-parser'); // import body parser

const port = process.env.PORT || 7000; // set port


app.set('view engine', 'ejs'); // set view engine to ejs
app.use('views', express.static(__dirname + '/views')); // set views folder
app.use(express.static('Assets')); // set assets folder
app.use('/Assets', express.static(__dirname + '/Assets')); // set assets folder



app.use(cookieParser());
app.use(session({
    name: "SheryiansAdminPanel",
    secret: "Chadiyan",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/campusAmbassador_db', // set mongo url,
        autoRemove: 'disabled' // keep data in db after closing the browser
    }, function (err) { // callback function
        console.log(err || 'connect-mongodb setup ok'); // log error or success
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./Routes')); // use index.js

app.listen(port,(err)=>{ // listen to port 
    if(err){ // if error
        console.log('Error:',err); // log error
    } 
    console.log(`Server is running on port ${port}`); // log port
}); // end listen

