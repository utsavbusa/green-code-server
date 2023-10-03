const List = require("./../../models/list");
const Storage = require("./../../utility/memory/storage");

exports.createList = async (req,res)=>{
	try{
		var data = await List.create({listName:req.params.name});
		res.json({status:"ok",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while creating list.",error})
	}
}

exports.addInList = async (req,res) => {
	try{
		var data = await List.findOne({listName:req.params.name});

		if(!data) return res.json({status:"NOT_EXIST",message:"list does not exist."});

		var set = new Set(data.list);

		set.add(req.params.item);
		
		data.list = [...set];
		await data.save();

		if(req.params.name==="language"||req.params.name==="category") await Storage.reloade();

		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while adding item into list.",error})
	}
}

exports.removeFromeList = async (req,res) => {
	try{
		var data = await List.findOne({listName:req.params.name});
		if(!data){
			return res.json({status:"NOT_EXIST",message:"list does not exist."});
		}
		data.list = data.list.filter(e=>e!==req.params.item);
		await data.save();
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while removing item into list.",error})
	}
}

exports.deleteList = async (req,res) => {
	try{
		var data = await List.findOneAndRemove({listName:req.params.name});
		if(!data){
			return res.json({status:"NOT_EXIST",message:"list does not exist."});
		}
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while deleting list.",error})
	}
}


