const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    }],
},{
    timestamps:true
})

const user = mongoose.model('user',userSchema);

module.exports = user;