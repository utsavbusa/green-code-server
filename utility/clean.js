exports.removeDuplicate =(arr)=>{
	var set = new Set(arr);
	return set.values();
}