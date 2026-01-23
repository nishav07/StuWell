
const User = require("../models/user");
const daily = require("../models/dailyInput");

function index(req,res){
    res.render("index.ejs");
}

// async function dashboard(req,res){
//     const userID = req.session.user.id;
//     const user = await User.findById(userID);
//     console.log("data",!user.isProfileOk);
//     res.render("dashboard.ejs",{showProfileModal: !user.isProfileOk});
// }



// async function components(req,res){
//     const page = req.params.page;
//     const userID = req.session.user.id;
//     const user = await User.findById(userID)
//     const date = new Date().toISOString().split("T")[0];

//     // const dailyData = await daily.find({userId:String(userID)});
//     // console.log(dailyData[0].status)
//     const inputStatus = await daily.find({userId:userID,date:date});
  
  
//     res.render(`components/${page}`,{
//       user:user,
      
//     })
// }


async function dashboard(req, res) {
    const userID = req.session.user.id;
    const user = await User.findById(userID);
    const date = new Date().toISOString().split("T")[0];
    
   
    const showProfileModal = !user.isProfileOk;
    
   
    let status = "pending";
    if (user.isProfileOk) {
        const inputStatus = await daily.find({ userId: userID, date: date });
        status = inputStatus.length > 0 ? "submitted" : "pending";
    }
    
    console.log("Profile Modal:", showProfileModal);
    console.log("Daily Status:", status);
    
    console.log(userID,date);
    const dailyData = await daily.find({userId:userID,date:date});
    console.log("daily data",dailyData[0]);

    res.render("dashboard.ejs", {
        showProfileModal: showProfileModal,
        status: status,
        data:dailyData[0]
    });
}


async function components(req, res) {
    const page = req.params.page;
    const userID = req.session.user.id;
    const user = await User.findById(userID);
    const date = new Date().toISOString().split("T")[0];
    
    
    const inputStatus = await daily.find({ userId: userID, date: date });
    const status = inputStatus.length > 0 ? "submitted" : "pending";

     const dailyData = await daily.find({userId:userID,date:date});
    console.log("daily data",dailyData[0]);
    
    res.render(`components/${page}`, {
        user: user,
        status: status,
        data:dailyData[0]
    });
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

async function input(req,res){
  try {
      
    const { water,
        junkFood,
        foodType,
        studyHr,
        mood,
        symptoms,
        sleepHr,
        screenTime} = req.body;

const userID = req.session.user.id;
const date = new Date().toISOString().split("T")[0];


        console.log("backennd se input wala data",{ water,
        junkFood,
        foodType,
        studyHr,
        mood,
        symptoms,
        sleepHr,
        screenTime} );

       await daily.findOneAndUpdate(
  { userId: userID, date: date },
  {
    $set: {
      userId: userID,        
      date: date, 
      water,
      junkFood,
      foodType,
      studyHr,
      mood,
      symptoms,
      sleepHr,
      screentime: screenTime,
      status: "submitted"
    }
  },
  { upsert: true }
);

   

       res.sendStatus(200);


  } catch (error) {
   res.sendStatus(400);

  }

}

module.exports = {
    index,
    dashboard,
    components,
    update,
    input
}