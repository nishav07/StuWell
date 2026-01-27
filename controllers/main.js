
const gemeni = require("@google/genai");
const  { buildHealthPrompt } = require("../config/prompt");
const { generateText } = require("../config/ai");
require("dotenv").config();

const User = require("../models/user");
const daily = require("../models/dailyInput");
const weekly = require("../models/weekly");


// global functions

function GAP(date1,date2){
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffinMs = d2 - d1;
    return Math.floor(diffinMs/(1000 * 60 * 60 * 24));
}

function normalizeAIData(aiResult) {
  // already object
  if (typeof aiResult === "object") return aiResult;

  // string case
  if (typeof aiResult === "string") {
    try {
      return JSON.parse(aiResult); // valid JSON string
    } catch (e) {
      // NOT JSON → return safe fallback
      return {
        data: [],
        error: "AI data is not in JSON format"
      };
    }
  }

  // fallback
  return { data: [] };
}

//callBacks

function index(req,res){
    res.render("index.ejs");
}


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
        data:dailyData[0],
        
    });
}


async function components(req, res) {
    const page = req.params.page;
    const userID = req.session.user.id;
    const user = await User.findById(userID);
    const date = new Date().toISOString().split("T")[0];
    const weeklyy = await weekly.find({userId:userID}); //weekllyyyyy wala data
    let weeklyData = null;
   


    
    const inputStatus = await daily.find({ userId: userID, date: date });
    const dailyInput = await daily.find({ userId: userID });
    console.log("daily input",dailyInput)
    const status = inputStatus.length > 0 ? "submitted" : "pending";
    const enoughData = dailyInput.length < 5 ? false : true;

     const dailyData = await daily.find({userId:userID,date:date});
    console.log("daily data",dailyData);

    //---------------------- important----------------------------------------
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); 
    

    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    
 
    const weekData = await daily.find({
        userId: userID,
        date: { 
            $gte: start, 
            $lte: end 
        }
    }).sort({ date: 1 });

    console.log("weeklyyy data",weekData);
    
    const submittedData = weekData.filter(d => d.status === 'submitted');
    const submittedDays = submittedData.length;
    
  
    const avgWater = submittedData.length > 0 
        ? submittedData.reduce((sum, d) => sum + (d.water || 0), 0) / submittedData.length 
        : 0;
    
    const avgSleep = submittedData.length > 0
        ? submittedData.reduce((sum, d) => sum + (d.sleepHr || 0), 0) / submittedData.length
        : 0;
    
    const avgStudy = submittedData.length > 0
        ? submittedData.reduce((sum, d) => sum + (d.studyHr || 0), 0) / submittedData.length
        : 0;
    
    const avgScreen = submittedData.length > 0
        ? submittedData.reduce((sum, d) => sum + (d.screentime || 0), 0) / submittedData.length
        : 0;
    
   
    const junkFoodDays = submittedData.filter(d => d.junkFood === 'yes').length;
    
   
    const moodCount = {};
    submittedData.forEach(d => {
        if (d.mood) {
            moodCount[d.mood] = (moodCount[d.mood] || 0) + 1;
        }
    });
    
    const mostCommonMood = Object.keys(moodCount).length > 0
        ? Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b)
        : 'neutral';
        
   
        const dailyWalaData = await daily.find({userId:userID});
        const weeklyL = weeklyy.length;
        const dailyL = dailyWalaData.length;

         if(weeklyL == 0 && dailyL <= 7 ){

            const startDate = dailyWalaData[0].date;
            const endDate = dailyWalaData[dailyWalaData.length - 1].date;

            console.log("ai ko call krne time(weekly,daily kak length)",weeklyL,dailyL,startDate,endDate);
            console.log("daily wala data",dailyWalaData);

             const p = buildHealthPrompt(dailyWalaData);
             console.log(p)

                const resultOFai = await generateText(p);
                console.log("ai se aaya hua data:",resultOFai);

                const text = resultOFai.candidates[0].content.parts[0].text;
                console.log("text wala data", text);

                try {
                    const weeklydata = new weekly({ userId:userID,weekStart:startDate,weekEnd:endDate,aiResult:text});
                    await weeklydata.save();

                    console.log("data save ho gyaaaaaaaaaaaaaaaaa")

                } catch (error) {
                    console.log("error aaa gya yaawr while uplaoding",error)
                }

         


            
        weeklyData = "Is baar ai ko call kiya gyaa haiiii"
    } else {
        console.log("data already storedddd haiiiiiiiiiiiii bhai samjhaaa")
    }

           const latestAnalysis = await weekly.findOne({ 
        userId: userID 
    }).sort({ createdAt: -1 });

    console.log("lateststt",latestAnalysis.aiResult)

    const finall = JSON.parse(latestAnalysis.aiResult);
    const cleanAIData = normalizeAIData(latestAnalysis.aiResult);
    // const parsedData = JSON.parse(latestAnalysis.aiResult)
    
    res.render(`components/${page}`, {
        user: user,
        status: status,
        data:dailyData[0],
        weeklyData:weeklyData,
        IsTsEnough:enoughData,
        weekData: weekData,
        avgWater: avgWater,
        avgSleep: avgSleep,
        avgStudy: avgStudy,
        avgScreen: avgScreen,
        submittedDays: submittedDays,
        junkFoodDays: junkFoodDays,
        mostCommonMood: mostCommonMood,
        startDate: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        endDate: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aiData:cleanAIData
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



// replaced item in case want to seee

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

module.exports = {
    index,
    dashboard,
    components,
    update,
    input
}