const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const StudentUser = mongoose.model('StudentUser', studentUserSchema);
module.exports = StudentUser;