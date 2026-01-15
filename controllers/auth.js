const { json } = require('express');

function auth(req,res){
    res.render("auth.ejs");
}


module.exports = {
    auth
}