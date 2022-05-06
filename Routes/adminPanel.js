const express = require('express'); // import express
const router = express.Router(); // create express router
const adminPanelController = require('../controllers/adminPanel_controller'); // import adminPanel controller
const courses = require('../controllers/courses_controller'); // import courses controller
const campusAmbassador = require('../controllers/campusAmbassador_controller'); // import campusAmbassador controller
const bodyParser = require('body-parser'); // import body parser

router.use(bodyParser.urlencoded({extended:false}));

router.get('/', adminPanelController.getadminPanel); // get adminPanel
router.post('/addCourse', courses.addCourse); // add courses
router.post('/findCourse', courses.findCourse); // find courses for editing
router.post('/updateCourse/:id', courses.updateCourse); // update courses
router.post('/deleteCourse', courses.deleteCourse); // delete courses
router.post('/addCampusAmbassador', campusAmbassador.addCampusAmbassador); // add campus ambassador
router.post('/findCampusAmbassador', campusAmbassador.findCampusAmbassador); // find campus ambassador for editing
router.post('/updateCampusAmbassador/:id', campusAmbassador.updateCampusAmbassador); // update campus ambassador
router.post('/deleteCampusAmbassador', campusAmbassador.deleteCampusAmbassador); // delete campus ambassador


module.exports = router; // export router