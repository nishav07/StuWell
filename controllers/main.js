
const User = require("../models/user");
function index(req,res){
    res.render("index.ejs");
}

async function dashboard(req,res){
    const userID = req.session.user.id;
    const user = await User.findById(userID)
    res.render("dashboard.ejs",{showProfileModal: !user.isProfileComplete})
    
}


module.exports = {
    index,
    dashboard
}