const { json } = require('express');
const middleware = require("../middlewares/middleware.js");
const User = require("../models/user.js");



function auth(req,res){
    res.render("auth.ejs");
}


async function signup (req,res){
   try {
    const {userName,password,email} = req.body;

    console.log("signup wala data:",{
        userName,
        password,
        email
    })

    const existingUser = await User.findOne({ email });
    if (existingUser) {
     req.flash("error","User with same details found");
     res.redirect("/");
     return
    }
    

    const hashPass = await middleware.hashing(password);
    
    const user = new User({ userName:userName,password:hashPass,email:email});
    await user.save();



    req.session.user = {
        id:user._id
    }

    req.flash("success","signuped & auto loggged in")
    res.redirect('/dashboard');
   } catch (error) {
    console.log(error);
   }
}

async function login (req,res){
    const {email,password} = req.body;

     const users = await User.findOne({email:email});

     if(!users){
        req.flash("error","404 user not found")
        res.redirect("/");
        return
     }

   
    const hashPass = users.password;
    const isTrue = await middleware.verify(password,hashPass);


    if(users && isTrue){
        req.session.user = {
        id:users._id
        }
       req.flash("success","loggged in")
       res.redirect("/dashboard");
       return
    } else {
         req.flash("error","password galat hai sir")
       res.redirect("/");
       return
    }

    
}

async function logout(req,res){
    try {
    const userid = req.session.user.id;
    // console.log("logout wala userID",userid);
    req.flash("success","logged out succefully");
    req.session.destroy(() => {
    res.clearCookie("sid"); 
    res.redirect("/");
    });
    } catch (error) {
        console.log(error)
    }

}



module.exports = {
    auth,
    signup,
    login,
    logout
}

