const express = require('express');
const router = express.Router();
const authCall = require("../controllers/auth");
const userCall = require("../controllers/main")
const middleware = require("../middlewares/middleware")
const isLoggedIn = middleware.isLoggedIn;

module.exports = router;

router.get("/",userCall.index);
router.get("/auth",authCall.auth);
router.post("/signup",authCall.signup);
router.post("/login",authCall.login);
router.get("/dashboard",isLoggedIn,userCall.dashboard)
