const Info = require("./validationInfo");
const Storage = require("./../memory/storage");

const validator = {
	validate: function (property, value) {
		if (!Info[property]) return false;
		if (Info[property].pattern.test(value)) return true;
		return false;
	},
	info: function (property) {
		if (!Info[property]) return;
		return Info[property];
	},
	validateLevel: function (level) {
		if (level === "hard" || level === "medium" || level === "easy") return true;
		return false;
	},

	validateLanguage: function (...languages) {
		let isValid = true;
		for (let lan of languages) {
			let isPresent = false;
			for (let val of Storage.language) {
				if (lan === val) {
					isPresent = true;
					break;
				}
			}
			if (!isPresent) {
				isValid = false;
				break;
			}
		}

		return isValid;
	},

	validateCategory: function (...categories) {
		let isValid = true;
		for (let cat of categories) {
			let isPresent = false;
			for (let val of Storage.category) {
				if (cat === val) {
					isPresent = true;
					break;
				}
			}
			if (!isPresent) {
				isValid = false;
				break;
			}
		}

		return isValid;
	}
}



module.exports = validator;