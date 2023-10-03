
const Question = require("./../../models/question");
const Solution = require("./../../models/solution");
const Validator = require("./../../utility/validation/validator");

const Storage = require("./../../utility/memory/storage");




// ==========================================================================

exports.addQuestion = async (req, res) => {
	var { number, title, question, categories, level, solutions } = req.body;

	if (!(title && question && categories && level && solutions) || solutions.length === 0)
		return res.json({ status: "MISSING_FIELD", message: "all fileds are required." });

	categories = [...new Set(categories)];

	if (!Validator.validate("question", question))
		return res.json({ status: "INVALID", message: "Question is not valid" });
	if (!Validator.validate("questionTitle", title))
		return res.json({ status: "INVALID", message: "Question's Title is not valid" });
	if (!Validator.validateLevel(level))
		return res.json({ status: "INVALID", message: "Question's level is not valid" });
	if (!Validator.validateCategory(...categories))
		return res.json({ status: "INVALID", message: "Question's categories are not valid" });

	for (let sol of solutions) {
		const { language, title, code } = sol;
		if (!(language && title && code))
			return res.json({ status: "MISSING_FIELD", message: "all fileds are required in solutions." });
		if (!Validator.validate("solutionTitle", title))
			return res.json({ status: "INVALID", message: "Solution's Title is not valid" });
	}

	if (number) {
		if (await Question.exists({ number }))
			return res.json({ status: "EXIST", message: "this number is already assigned." });
		if (number > Storage.lastQuestionNumber) Storage.lastQuestionNumber = number;
	} else {
		Storage.lastQuestionNumber++;
		number = Storage.lastQuestionNumber;
	}

	try {
		var data = await Question.create({ number, title, question, categories, level });
		for (let sol of solutions) {
			let { language, title, code } = sol;
			await Solution.create({ question_id: data._id, language, title, code });
		}
	} catch (error) {
		await Storage.reloade();
		return res.json({ status: "X", message: error.message, error });
	}

	res.json({ status: "OK", data });
}

// ==========================================================================

exports.deleteQuestion = async (req, res) => {

	var { question_id } = req.body;
	if (!question_id)
		return res.json({ status: "MISSING_FIELD", message: "Question ID is required." });

	try {
		await Solution.deleteMany({ question_id });
		await Question.deleteOne({ _id: question_id });
		res.json({ status: "OK" });

	} catch (error) {
		return res.json({ status: "X", message: "something went wrong while deleting question.", error });
	}
}

//==========================================================================


exports.editQuestion = async (req, res) => {

	var { question_id, number, title, question, categories, level } = req.body;

	if (!question_id) return res.json({ status: "MISSING", message: "question id is required." });

	try {

		var data = await Question.findOne({ _id: question_id });
		if (!data) return res.json({ status: "NOT_EXIST", message: "Question does not exist." });

		if (number && number != data.number) {
			if (await Question.exists({ number })) {
				return res.json({ status: "EXIST", message: "this number already assigned." })
			}
			data.number = number;
		}

	} catch (error) {
		res.json({ status: "X", message: "somethin went wrong while updating question (1).", error });
	}

	try {

		if (question && question !== data.question) {
			if (!Validator.validate("question", question))
				return res.json({ status: "INVALID", message: "Question is not valid" });
			data.question = question;
		}
		if (title && title !== data.title) {
			if (!Validator.validate("questionTitle", title))
				return res.json({ status: "INVALID", message: "Question's Title is not valid" });
			data.title = title;
		}
		if (categories) {
			categories = [...new Set(categories)];
			if (!Validator.validateCategory(...categories))
				return res.json({ status: "INVALID", message: "Question's categories are not valid" });
			data.categories = categories;
		}
		if (level && level !== data.level) {
			level = level.toLowerCase();
			if (!Validator.validateLevel(level))
				return res.json({ status: "INVALID", message: "Question's level is not valid" });
			data.level = level;
		}

		await data.save();

		res.json({ status: "OK", data });
	} catch (error) {
		res.json({ status: "X", message: "somethin went wrong while updating question (2).", error });
	}
}

// ===========================================================================