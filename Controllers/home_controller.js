module.exports.home = (req, res)=>{
    res.send("Hello World!");
    res.render('home', {
        title: 'Campus Ambassador',
    });
}