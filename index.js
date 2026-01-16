const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const ejs = require("ejs");
const mongooese = require('mongoose');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

const db = require("./config/db.js");
const Route = require("./routes/router.js");



const sessionConfig = require("./config/session");
app.use(sessionConfig);
app.use(flash());

const middleware = require("./middlewares/middleware.js")

app.use(middleware.user);
app.use(middleware.flash);
app.use(middleware.renew);


app.use("/",Route);

app.listen(port,() => {
    console.log(`app listening at port ${port}`)
})