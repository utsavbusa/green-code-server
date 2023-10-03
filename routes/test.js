const express = require("express");
const router  = express.Router();

const {test} = require("./../controllers/testController");

router.route("/").get(test);
// router.route("/add/:el").get(addToList);
// router.route("/get").get(getList);

module.exports = router;