const mongoose = require("mongoose");

const AssetSchema = mongoose.Schema({
	filename: {
		type: String,
		required: true,
	},
	uploadDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("Asset", AssetSchema);
