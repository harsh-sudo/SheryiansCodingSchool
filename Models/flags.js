const mongoose = require('mongoose');

const FlagSchema = new mongoose.Schema({
    flag_name:{
        type:String
    },
    flag_value:{
        type:String
    }
},{
    timestamps:true
});

const Flag = mongoose.model('Flag',FlagSchema);

module.exports = Flag;