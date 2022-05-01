const mongoose = require('mongoose');

const CampusAmbassadorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
);

const CampusAmbassador = mongoose.model('CampusAmbassador',CampusAmbassadorSchema);

module.exports = CampusAmbassador;
