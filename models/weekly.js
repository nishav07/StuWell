const mongoose = require("mongoose");

const weeklyAnalysisSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },

  weekStart: String,   
  weekEnd: String,     

 weeklySummary: {
    waterAvg: String,
    sleepAvg: String,
    screenTimeAvg: String,
    studyAvg: String,
    junkFoodFrequency: String,
    moodTrend: String,
    routineStability: String
  },
  
  routineImpact: {
    shortTerm: String,
    longTerm: String,
    focusAndEnergy: String,
    physicalAndMentalLoad: String
  },
  
  improvements: {
    water: String,
    sleep: String,
    screenTime: String,
    food: String,
    study: String,
    mood: String,
    symptoms: String
  },
  
  progress: {
    good: [String],
    bad: [String]
  },
  
  riskAssessment: {
    level: String,
    reason: String,
    ifContinued: String
  },
  
  medicalGuidance: {
    bloodTest: String,
    doctorVisit: String,
    reason: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("WeeklyAnalysis", weeklyAnalysisSchema);
