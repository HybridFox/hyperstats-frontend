const multer  = require("multer");
const mongoose = require("mongoose");
const gridfs = require("multer-gridfs-storage");
const errors = require("../../helpers/errorHandler");

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

module.exports = [upload.single("file"), (req, res, next) => {
	if (!req.file) {
		next(errors.FileIsRequired);
	}

	return res.status(201).json({
		assetId: req.file.id,
		mimetype: req.file.mimetype,
		uploadDate: req.file.uploadDate,
		originalname: req.file.originalname,
	});
}];
