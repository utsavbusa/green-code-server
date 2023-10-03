const express = require("express");
const router  = express.Router();

const isAdminLoggedIn = require("./../middlewares/isAdminLoggedIn");
const {getAllQuestions, getOneQuestion} = require("./../controllers/homeController");
const {addQuestion, deleteQuestion,editQuestion}  = require("./../controllers/admin/questionController");
const { addSolution, deleteSolution, editSolution } = require("./../controllers/admin/solutionController");
const { getOneUser, changeRole, deleteUser } = require("../controllers/admin/userController");
const { createList, addInList, removeFromeList, deleteList } = require("../controllers/admin/listController");
const { deleteComment } = require("../controllers/admin/commentController");




router.route("/user/:id").get(isAdminLoggedIn,getOneUser);
router.route("/user/:id/changeRole").put(isAdminLoggedIn,changeRole);
router.route("/user/:id/delete").delete(isAdminLoggedIn,deleteUser);

// Question related Routes

router.route("/question/add").post(isAdminLoggedIn,addQuestion);
router.route("/question/delete").delete(isAdminLoggedIn,deleteQuestion);
router.route("/question/edit").put(isAdminLoggedIn,editQuestion);

router.route("/question").get(isAdminLoggedIn,getAllQuestions)
router.route("/question/:id").get(isAdminLoggedIn,getOneQuestion)

router.route("/solution/add").post(isAdminLoggedIn,addSolution);
router.route("/solution/delete").delete(isAdminLoggedIn,deleteSolution);
router.route("/solution/edit").put(isAdminLoggedIn,editSolution);


router.route("/comment/delete").delete(isAdminLoggedIn,deleteComment);


router.route("/list/create/:name").post(createList);
router.route("/list/alter/:name/add/:item").put(addInList);
router.route("/list/alter/:name/remove/:item").put(isAdminLoggedIn,removeFromeList);
router.route("/list/delete/:name").delete(isAdminLoggedIn,deleteList);








module.exports = router;
