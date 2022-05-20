module.exports.getHome = (req, res)=>{
    console.log(req.user);
    if(req.user){
        return res.render('home', {
            title: 'Sheryians Coding School',
            request: req
        });
    }
    req.session.returnTo = req.originalUrl; 
    return res.render('home', {
        title: 'Sheryians Coding School',
        request: null
    });
} 
