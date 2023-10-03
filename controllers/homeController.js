// const mongoose = require("mongoose");
const Question = require("./../models/question");
const Solution = require("./../models/solution");
const Comment = require("./../models/comment");
const User = require("./../models/user");
const List = require("./../models/list");
const Like = require("./../models/like");
const { username } = require("../utility/validation/validationInfo");
const searchQuestions = require("./../utility/searching/searchQuestions");




//================================================================


exports.getAllQuestions = async (req, res) => {
	var { search } = req.query;

	try {
		if (search && search.length>0)
			var data = await searchQuestions(decodeURIComponent(search));
		else
			var data = await Question.find({}).sort({ number: 1 });

	} catch (error) {
		return res.json({ status: "X", message: "something went wrong." })
	}

	return res.json({ status: "OK", data });

}

//================================================================

exports.getOneQuestion = async (req, res) => {
	try {
		var data = await Question.findOne({ _id: req.params.id }, {});
		if (!data) return res.json({ status: "NOT_EXIST", message: "question does not exist." });

		var solutions = await Solution.find({ question_id: req.params.id }, { question_id: 0 });
		var comments = (await Comment.find({ question_id: req.params.id }).populate({ path: "user_id", select: "_id username" }));
		comments = comments.map(element => {
			element = element._doc;
			element.user = element.user_id;
			delete element.user_id;
			return element;
		})
		var isLiked = false;
		if (await Like.findOne({ user_id: req.user_id, question_id: req.params.id })) isLiked = true;

	} catch (error) {
		return res.json({ status: "X", message: "something went wrong.", error })
	}

	res.json({ status: "OK", data: { ...data._doc, isLiked, solutions, comments } });
}

//=======================================================

exports.likeQuestion = async (req, res) => {
	var question_id = req.params.id;
	var user_id = req.user_id;
	if (!(question_id && user_id)) {
		return res.json({ status: "MISSING_FIELD", message: "either question Id or user Id is missing." });
	}
	var like = false;
	try {
		if (!(await Like.findOneAndRemove({ user_id, question_id }))) {

			if (!(await Question.updateOne({ _id: question_id }, { $inc: { likes: 1 } }))) {
				return res.json({ status: "NOT_EXIST", message: "No such question Exist." });
			}
			await Like.create({ user_id, question_id });

			like = true;
		} else {
			if (!(await Question.updateOne({ _id: question_id }, { $inc: { likes: -1 } }))) {
				return res.json({ status: "NOT_EXIST", message: "No such question Exist." });
			}
		}
	} catch (error) {
		return res.json({ status: "X", message: "something went wrong while adding like to question.", error })
	}
	res.json({ status: "OK", like });

}

//===================================
exports.commentOnQuestion = async (req, res) => {
	var data = req.body.data;
	var question_id = req.params.id;
	var user_id = req.user_id;
	if (!(question_id && user_id && data)) {
		return res.json({ status: "MISSING_FIELD", message: "either question Id or user Id is missing." });
	}
	try {
		var user = await User.findOne({ _id: user_id }, { username: 1, _id: 0 });
		if (!username)
			return res.json({ status: "NOT_EXIST", message: "User does not exist." });
		var result = await Comment.create({ user_id, question_id, data });

		res.json({ status: "OK", data: { ...result._doc, username: user.username } });
	} catch (error) {
		return res.json({ status: "X", message: "something went wrong while commenting on question.", error })
	}
}







//==================== All Users =================================

exports.getAllUsers = async (req, res) => {

	try {
		var data = await User.find({}, { email: 1, username: 1, role: 1 });
		res.json({ status: "OK", data });
	} catch (error) {
		res.json({ status: "X", message: "something went wrong while fetching the users.", error });
	}

}

//================================================================


exports.getOneList = async (req, res) => {
	try {
		var data = await List.findOne({ listName: req.params.name });
		if (!data) {
			return res.json({ status: "NOT_EXIST", message: "list does not exist." });
		}
		res.json({ status: "OK", data });
	} catch (error) {
		res.json({ status: "X", message: "something went wrong while fetching list.", error })
	}
}

//=================================================================

exports.getAllLists = async (req, res) => {
	try {
		var data = await List.find({}, { listName: 1 });
		res.json({ status: "OK", data });
	} catch (error) {
		res.json({ status: "X", message: "something went wrong while fetching lists.", error })
	}
}