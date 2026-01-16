function index(req,res){
    res.render("index.ejs");
}

function dashboard(req,res){
    res.render("dashboard.ejs");
}


module.exports = {
    index,
    dashboard
}