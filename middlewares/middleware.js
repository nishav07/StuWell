const bcrypt = require("bcrypt");
const User = require("../models/user.js");

function flash(req,res,next){
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
}


async function hashing(pass){
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(pass,saltRounds);
    return hashPass
}


async function verify(pass,passDB){
    const check = await bcrypt.compare(pass,passDB);
    return check;
}

function isLoggedIn(req,res,next){
    if(req.session && req.session.user){
        next()
    } else {
        // req.flash("error","Login first")
        res.redirect("/")
    }
}

async function user(req,res,next){
    if (req.session.user) {
    req.user = await User.findById(req.session.user.id);
  }
  next();
}



async function renew(req,res,next){
    if (req.session) {
    req.session.touch();
  }
  next();
}


module.exports = {
    flash,
    hashing,
    verify,
    isLoggedIn,
    user,
    renew
}