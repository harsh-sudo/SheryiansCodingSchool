const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connetion error while connecting to DataBase"));

db.once('open', () => {
    console.log("Successfully connected to the DataBase");
})

module.exports = db;

// MONGODB_URI=mongodb+srv://bawabhannat:lundsepass@sheryianscodingschool.g286z.mongodb.net/?retryWrites=true&w=majority
