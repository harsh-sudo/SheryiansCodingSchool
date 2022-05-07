module.exports.getHome = (req, res)=>{
    res.render('home', {
        title: 'Sheryians Coding School',
    });
}
