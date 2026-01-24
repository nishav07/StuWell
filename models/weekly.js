const mongoose = require("mongoose");

const weeklyAnalysisSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },

  weekStart: String,   
  weekEnd: String,     

  aiResult: {
    type: Object,      
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("WeeklyAnalysis", weeklyAnalysisSchema);
