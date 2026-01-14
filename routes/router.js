const express = require('express');
const router = express.Router();
const authCall = require("../controllers/auth")


module.exports = router;

router.get("/",authCall.index)