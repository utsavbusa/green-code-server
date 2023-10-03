const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	
	question_id:mongoose.Types.ObjectId,
	language:{
		type:String,
		required:[true,"Language is required."]
	},
	title:{
		type:String,
		required:[true,"Title of solution is required."]
	},
	code:{
		type:String,
		required:[true,"code is required."]
	}
})

module.exports = mongoose.model("solution",schema);