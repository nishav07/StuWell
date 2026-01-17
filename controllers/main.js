
const User = require("../models/user");
function index(req,res){
    res.render("index.ejs");
}

async function dashboard(req,res){
    const userID = req.session.user.id;
    const user = await User.findById(userID)
    res.render("dashboard.ejs",{showProfileModal: !user.isProfileComplete})
    
}

async function components(req,res){
    const page = req.params.page;
    const userID = req.session.user.id;
    const user = await User.findById(userID)
  
  
    res.render(`components/${page}`,{
      user:user
    })
}


module.exports = {
    index,
    dashboard,
    components
}