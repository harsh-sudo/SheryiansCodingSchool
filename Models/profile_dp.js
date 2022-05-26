const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const profile_dp = path.join('/Assets/images/profile_dp');

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
        cb(null, req.user.name + '-' + file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});
 
//statics
Profile_dpSchema.statics.uploaded_dp = multer({storage: storage}).single('image');
Profile_dpSchema.statics.uploaded_dp_path = profile_dp;

const profileDp= mongoose.model('profileDp',Profile_dpSchema);

module.exports = profileDp;