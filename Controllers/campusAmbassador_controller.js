const db = require('../config/mongoose');
const CampusAmbassador = require('../models/CampusAmbassador');


module.exports.getCampusAmbassador = function(req, res) {
    res.render('campusAmbassador', {
        title: 'Campus Ambassador | Sheryians',
    });
}

