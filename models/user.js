const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username required"]
    },
    email:{
        type:String,
        required:[true,"email id is reuqired"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        default: null
    },
    gender:{
        type:String,
        enum:['male', 'female', 'prefer-not-to-say'],
        default: null
    },
    weight:{
        type:Number,
        default: null,
        max:300
    },
    academic:{
        type:String,
        enum:['School', 'High School', 'College'],
        default: null
    },
    isProfileOk: {
        type: Boolean,
        default: false
} 
})

const User = mongoose.model("User",userSchema);

module.exports = User;