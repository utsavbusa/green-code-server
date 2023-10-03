const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	number:{
		type:String,
		required:[true,"hello this is required too...."]
	},
	name:{
		type:String,
		required:[true,"hello this is requried..."]
	},
	
})


module.exports = mongoose.model("test",schema);