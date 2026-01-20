const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    water: {
        type:Number,
        required:[true,"water input required"]
    },
    junkFood: {
        type:String,
        enum:["yes","no"],
        required:true
    },
    foodType: {
        type:String,
        enum:["carbs","protein","fats","balanced"],
        required:true
    },
    studyHr: {
        type:Number,
        required:true
    },
    mood: {
        type:String,
        enum:['veryBad','Bad',"neutral","Good","veryGood"],
        required:true
    },
    symptoms: {
        type:String,
        enum:['none','headache','fatigue','stress','anxiety','stomach_discomfort','body_pain',`low_focus`],
        required:true
    },
    sleepHr: {
        type:Number,
        required:true
    },
    screentime: {
        type:Number,
        required:true
    },
    date: {
    type: String, // "2026-01-20"
    required: true
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