const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/Signup",userControllers.postUser);

module.exports = router