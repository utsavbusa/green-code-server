const validationInfo = {
	username:{
		pattern : /^[a-zA-Z0-9_]{3,20}$/,
		description : 'username can only contain a-z, A-Z, 0-9, and "_". username should be 3 to 20 characters long'
	},
	email:{
		pattern : /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
		description : "Email should look like xyz@abc.coin"
	},
	question:{
		pattern:/^.{8,}$/,
		description:"Question atlist contains 7 charachters."
	},
	questionTitle:{
		pattern : /^.{5,70}$/,
		description : "Title can contain 5 to 70 characters only."
	},
	solutionTitle:{
		pattern : /^.{5,50}$/,
		description : "Title can contain 5 to 50 characters only."
	}
}

module.exports = validationInfo;