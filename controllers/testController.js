const storage = require("./../utility/memory/storage");


exports.test  = (req,res)=>{
	res.json(storage)
}