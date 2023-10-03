const User = require("./../../models/user");


// ===================================================

exports.getOneUser = async (req,res)=>{

	try{
		var data = await User.findOne({_id:req.params.id});
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while fetching one user",error});
	}
}

// ==================================================

exports.changeRole = async (req,res)=>{
	try{
		var data = await User.findOne({_id:req.params.id});
		if(data.role === "user"){
			data.role = "admin";
		}else{
			data.role = "user";
		}
		await data.save();
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while changing User's role",error});
	}
}

// ====================================

exports.deleteUser = async (req,res)=>{
	try{
		var data = await User.findOneAndRemove({_id:req.params.id});
		
		if(!data){
			return res.json({status:"NOT_EXIST",message:"User does not exist."})
		}
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while deleting User",error});
	}
}