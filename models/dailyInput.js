const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    userId: {
        type:String,
    },
    water: {
        type:Number,
 
    },
    junkFood: {
        type:String,
        enum:["yes","no"],
     
    },
    foodType: {
        type:String,
        enum:["carbs","protein","fats","balanced"],
       
    },
    studyHr: {
        type:Number,
       
    },
    mood: {
        type:String,
        enum:['veryBad','Bad',"neutral","Good","veryGood"],
    
    },
    symptoms: {
        type:String,
        enum:['none','headache','fatigue','stress','anxiety','stomach_discomfort','body_pain',`low_focus`],

    },
    sleepHr: {
        type:Number,
        
    },
    screentime: {
        type:Number,
        
    },
    date: {
    type: String,
    
    },
    status: {
    type: String,
    enum: ["submitted", "missed"],
    default: "missed"
}


});

inputSchema.index({ userId: 1, date: 1 }, { unique: true });


const daily = mongoose.model("daily", inputSchema);

module.exports = daily;