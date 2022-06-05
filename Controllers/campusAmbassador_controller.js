const db = require('../config/mongoose');
const CampusAmbassador = require('../models/CampusAmbassador');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { takeCoverage } = require('v8');

module.exports.addCampusAmbassador = async function(req, res) {
    let campusAmbassador = new CampusAmbassador();

    try{CampusAmbassador.uploaded_dp(req,res,async (err) => {
        const { filename: image } = req.file;
        await sharp(req.file.path)
         .resize(200, 200)
         .withMetadata()
         .jpeg({ quality: 90 })
         .toFile(
            path.resolve(req.file.destination,'resized',image)
         )
         fs.unlinkSync(req.file.path)
            if(err){
                console.log(err);
                return;
            }
            campusAmbassador.name = req.body.name.toLowerCase();
            campusAmbassador.email = req.body.email.toLowerCase();
            campusAmbassador.phone = req.body.phone.toLowerCase();
            campusAmbassador.image = CampusAmbassador.uploaded_dp_path + '/' + req.file.filename;
            campusAmbassador.college = req.body.college.toLowerCase();
            campusAmbassador.course = req.body.course.toLowerCase();
            campusAmbassador.branch = req.body.branch.toLowerCase();
            campusAmbassador.year = req.body.year.toLowerCase();
            campusAmbassador.city = req.body.city.toLowerCase();
            campusAmbassador.save((err)=>{
                if(err){
                    console.log(err)
                    return;
                }
                return res.redirect("/campusAmbassador");
            });
        });
    }catch(err){
        console.log(err);
    }
}

module.exports.findCampusAmbassador = function(req, res) {
    if(req.body.college){
        CampusAmbassador.find({
            name: req.body.name.toLowerCase(),
            college: req.body.college.toLowerCase()
        },(err,campusAmbassador) => {
            if(err){
                console.log(err);
                return;
            }
            console.log(campusAmbassador);
            return res.render('adminPanel', {
                title: 'Admin Panel',
                course: [],
                campusAmbassador: campusAmbassador});
        });
    }else{
    CampusAmbassador.find({
        name: req.body.name.toLowerCase()
    },(err,campusAmbassador) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(campusAmbassador);
        res.render('adminPanel', {
            title: 'Admin Panel',
            course: [],
            campusAmbassador: campusAmbassador});
    });
}
}

module.exports.updateCampusAmbassador = async (req, res)=>{
    let campusAmbassador = await CampusAmbassador.findOne({
        _id:req.params.id
    });
    // console.log(campusAmbassador)
    try{CampusAmbassador.uploaded_dp(req,res, async (err) => {
        if(req.file){
        fs.unlinkSync(path.join(__dirname, '..', campusAmbassador.image));
        const { filename: image } = req.file;
        await sharp(req.file.path)
         .resize(200,200)
         .withMetadata()
         .jpeg({ quality: 90 })
         .toFile(
            path.resolve(req.file.destination,'resized',image)
         )
         fs.unlinkSync(req.file.path)
        }
            if(err){
                console.log(err);
                return;
            }
            campusAmbassador.name = req.body.name.toLowerCase();
            campusAmbassador.email = req.body.email.toLowerCase();
            campusAmbassador.phone = req.body.phone.toLowerCase();
            if(req.file){
                campusAmbassador.image = CampusAmbassador.uploaded_dp_path + "/" + req.file.filename;
            }
            campusAmbassador.college = req.body.college.toLowerCase();
            campusAmbassador.course = req.body.course.toLowerCase();
            campusAmbassador.year = req.body.year.toLowerCase();
            campusAmbassador.city = req.body.city.toLowerCase();
            campusAmbassador.save((err)=>{
                if(err){
                    console.log(err)
                    return;
                }
                return res.redirect('/campusAmbassador');
            });
        });
    }catch(err){
        console.log(err);
    }
}        

module.exports.deleteCampusAmbassador = function(req, res) {
    CampusAmbassador.findOneAndDelete({
        name: req.body.name.toLowerCase(),
        phone: req.body.phone.toLowerCase()
    }, (err, campusAmbassador) => {
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/campusAmbassador');
    });
};



module.exports.getCampusAmbassador = function(req, res) {
    CampusAmbassador.find({}, (err, campusAmbassador) => {
    if(err){
        console.log(err);
        return;
    }
    let campuslund = "[";
    let count = 0;
    for(let i of campusAmbassador){ 
        if(count != 0){
            campuslund += ','
        }
        count++;
        campuslund += `{"name":"${i.name}","img":${JSON.stringify(i.image)},"college":"${i.college}"}`
    }
    campuslund += "]";
    // console.log(campuslund);
    res.render('campusAmbassador', {
        title: 'Campus Ambassador | Sheryians',
        CampusAmbassadors: campusAmbassador,
        campuslund: campuslund
    });
})
};


