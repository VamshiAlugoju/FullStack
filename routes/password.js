const express = require("express");
const router = express.Router();

const passwordControllers = require("../controllers/passwordControllers");

router.post("/forgotpassword",passwordControllers.forgotPassword);


module.exports = router;