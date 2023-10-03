const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	listName:{
		type:String,
		unique:true	
	},
	list:[String],
})

module.exports = mongoose.model("list",schema);