const multer  = require("multer");
const mongoose = require("mongoose");
const gridfs = require("multer-gridfs-storage");
const Errors = require("../../helpers/errorHandler");
const ValidationError = require("../../helpers/validationError");

const storage = gridfs({
	db: mongoose.connection,
	file: (req, file) => {
		return {
			metadata: {
				originalname: file.originalname,
			},
		};
	},
});
const upload = multer({ storage: storage });

module.exports = [upload.single("file"), (req, res) => {
	if (!req.file) { // no file was created...
		throw new  ValidationError(Errors.ObjectValidationFailed, {
			details: [{ message: "Field \"file\" is required" }],
		});
	}

	return res.status(201).json({
		id: req.file.id,
		mimetype: req.file.mimetype,
		uploadDate: req.file.uploadDate,
		originalname: req.file.originalname,
	});
}];
