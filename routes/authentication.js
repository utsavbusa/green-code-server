const express = require("express");
const router  = express.Router();

const { SignIn, LogIn } = require("../controllers/authenticationController");


router.route("/SignIn").post(SignIn);
router.route("/LogIn").post(LogIn);


module.exports = router;