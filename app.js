const express = require('express'); // import express
const app = express(); // create express app
const path = require('path'); // import path
// const bodyParser = require('body-parser'); // import body parser

const port = process.env.PORT || 7000; // set port


app.set('view engine', 'ejs'); // set view engine to ejs
app.use('views', express.static(__dirname + '/views')); // set views folder
app.use(express.static('assets')); // set assets folder

app.use('/',require('./Routes')); // use index.js

app.listen(port,(err)=>{ // listen to port
    if(err){ // if error
        console.log('Error:',err); // log error
    } 
    console.log(`Server is running on port ${port}`); // log port
}); // end listen

