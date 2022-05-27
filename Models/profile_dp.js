const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const profile_dp_path = path.join('/Assets/images/profile_dp');

const Profile_dpSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    dp:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
);

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', '/Assets/images/profile_dp'));
    },
    filename: function(req, file, cb) {
        cb(null, req.user.id + '-' + file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
}); 
 
//statics
Profile_dpSchema.statics.uploaded_dp = multer({storage: storage, limits: { fieldSize: 10 * 1024 * 1024 }}).single('dp');
Profile_dpSchema.statics.uploaded_dp_path = profile_dp_path;

const profileDp= mongoose.model('profileDp',Profile_dpSchema);

module.exports = profileDp;