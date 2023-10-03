const List = require("./../../models/list");
const Question = require("./../../models/question");


const storage = {
	language: [],
	category: [],
	lastQuestionNumber: 0,

	reloade: async function () {
		try {
			let languageList = await List.findOne({ listName: "language" })
			let categoryList = await List.findOne({ listName: "category" });
			let lastQuestion = await Question.find({}, { number: 1, _id: 0 }).sort({ number: -1 }).limit(1);

			if (!(languageList && categoryList && lastQuestion)) {
				console.log("\x1b[31m%s\x1b[0m", "Data not found for storage.");
				process.exit();
			}
			this.language = languageList.list;
			this.category = categoryList.list;
			if (lastQuestion[0]) this.lastQuestionNumber = lastQuestion[0].number;
			console.log("storage loading...\x1b[32m\x1b[1m done \x1b[0m\n");
		} catch (error) {
			console.log("something went wront while loading the storage.", error)
		}

	}
}

module.exports = storage;