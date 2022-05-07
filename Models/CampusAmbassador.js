const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const ambassador_dp = path.join('/Assets/images/campusAmbassador');

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
    branch:{
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
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
);

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', '/Assets/images/campusAmbassador'));
    },
    filename: function(req, file, cb) {
        cb(null, req.body.name + '-' + file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

//statics
CampusAmbassadorSchema.statics.uploaded_dp = multer({storage: storage}).single('image');
CampusAmbassadorSchema.statics.uploaded_dp_path = ambassador_dp;


const CampusAmbassador = mongoose.model('CampusAmbassador',CampusAmbassadorSchema);

module.exports = CampusAmbassador;
