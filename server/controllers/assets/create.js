var multer  = require('multer')
const mongoose = require('mongoose');
const gridfs = require('multer-gridfs-storage')

const storage = gridfs({
	db: mongoose.connection,
	file: (req, file) => {
		return {
			metadata: {
				originalname: file.originalname,
			}
		};
	}
});
var upload = multer({ storage: storage });

module.exports = [upload.single('file'), (req, res, next) => {
	res.status(201).json({
		id: req.file.id,
		mimetype: req.file.mimetype,
		uploadDate: req.file.uploadDate,
		originalname: req.file.originalname,
	});
}];
