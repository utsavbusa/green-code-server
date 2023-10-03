const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:mongoose.Schema.Types.ObjectId,
	question_id : mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model("like",schema);