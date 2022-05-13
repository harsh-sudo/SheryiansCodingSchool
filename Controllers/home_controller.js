module.exports.getHome = (req, res)=>{
    if(req.user){
        return res.render('home', {
            title: 'Sheryians Coding School',
            request: req
        });
    }
    return res.render('home', {
        title: 'Sheryians Coding School',
        request: null
    });
} 
