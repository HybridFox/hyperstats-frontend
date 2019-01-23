const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

const UserSchema = mongoose.Schema({
	data: {
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
	},
	meta: {
		created: {
			type: Date,
			required: true,
			default: Date.now,
		},
		lastUpdated: {
			type: Date,
			required: true,
			default: Date.now,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		validation: {
			isValidated: {
				type: Boolean,
				required: true,
				default: false,
			},
			token: {
				type: String,
				required: false,
			},
		},
		passwordReset: {
			token: {
				type: String,
				required: false,
			},
			expireDate: {
				type: Date,
				required: false,
			},
			required: false,
		},
	},
});

UserSchema.methods.generateHash = async(password) => {
	const salt = await promisify(bcrypt.genSalt)(8);

	return promisify(bcrypt.hash)(password, salt);
};

UserSchema.methods.validatePassword = function(password) {
	return promisify(bcrypt.compare)(password, this.data.password);
};

module.exports = mongoose.model("User", UserSchema);
