const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/campusAmbassador_db')

const db = mongoose.connection;

db.on('error',console.error.bind(console,"connetion error while connecting to DataBase"));

db.once('open',()=>{
    console.log("Successfully connected to the DataBase");
})