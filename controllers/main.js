
const User = require("../models/user");
const daily = require("../models/dailyInput");

function index(req,res){
    res.render("index.ejs");
}

async function dashboard(req,res){
    const userID = req.session.user.id;
    const user = await User.findById(userID);
    res.render("dashboard.ejs",{showProfileModal: !user.isProfileOk});
}



async function components(req,res){
    const page = req.params.page;
    const userID = req.session.user.id;
    const user = await User.findById(userID)
    
    const dailyData = await daily.find({userId:String(userID)});
    console.log(dailyData)
  
  
    res.render(`components/${page}`,{
      user:user,
      status:dailyData.status
    })
}

async function update(req,res){
   try {
     const { DOB,gender,weight,academic } = req.body;

    const userID = req.session.user.id;
console.log("data from update", {
         DOB,gender,weight,academic 
    })
    

    await User.findByIdAndUpdate(userID,{DOB:DOB,gender:gender,weight:weight,academic:academic});
    
    await User.findByIdAndUpdate(userID,{isProfileOk:true});

      res.send(200);

   } catch (error) {
    console.log(err);
    res.send(404);
   }
  
}

module.exports = {
    index,
    dashboard,
    components,
    update
}