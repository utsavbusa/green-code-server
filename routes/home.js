const express = require("express");
const router  = express.Router();

const isLoggedIn = require("./../middlewares/isLoggedIn");
const {getAllQuestions,getOneQuestion,getAllUsers, getOneList, getAllLists, likeQuestion, commentOnQuestion} = require("./../controllers/homeController");
const { getSolutionById } = require("../controllers/admin/solutionController");

router.route("/question").get(getAllQuestions);
router.route("/question/:id").get(isLoggedIn,getOneQuestion);
router.route("/question/:id/like").put(isLoggedIn,likeQuestion);
router.route("/question/:id/comment").post(isLoggedIn,commentOnQuestion);

router.route("/solution/:id").get(isLoggedIn,getSolutionById);

router.route("/user").get(isLoggedIn,getAllUsers);

router.route("/list/get/").get(getAllLists);
router.route("/list/get/:name").get(getOneList);



module.exports = router;