const Question = require("./../../models/question");

const searchQuestions = async (str) => {

	str = "" + str;

	var partition = str.split(" ").filter(val => val.length > 0);

	if (!isNaN(partition[0])) {
		var searchedByNumber = await Question.findOne({ number: parseInt(partition[0]) });
		partition.splice(0, 1);
	}
	var cleanString = partition.join(" ");

	var data = await Question.find(
		{ $text: { $search: cleanString, } },
		{ matchingScore: { $meta: "textScore" } }
	).sort({ matchingScore: { $meta: "textScore" } });

	if (searchedByNumber) {
		data = [searchedByNumber, ...data.filter(que => !que._id.equals(searchedByNumber._id))]
	}

	return data;

}


module.exports = searchQuestions;