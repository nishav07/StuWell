const express = require('express');
const router = express.Router();
const authCall = require("../controllers/auth");
const userCall = require("../controllers/main")


module.exports = router;

router.get("/",userCall.index);
router.get("/auth",authCall.auth);