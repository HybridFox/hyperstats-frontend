const mongoose = require('mongoose');
const { MongoGridFS } = require("mongo-gridfs");


module.exports = (req, res, next) => {
	const gridFS = new MongoGridFS(mongoose.connection.db, "fs");

	const id = req.params.id;
	const query = req.query;

	gridFS.findById(id)
		.then((item) => {
			res.set({
				'Content-Type': item.contentType,
			});

			if (Object.keys(query).indexOf("download") !== -1) {
				res.set({
					'Content-Disposition': `attachment; filename="${item.metadata.originalname}"`,
				});
			}

			return gridFS.readFileStream(req.params.id)
		})
		.then((item) => {

			item
				.once("error", () => {
					return res.status(400).end();
				})
				.pipe(res);
		})
		.catch(next);
};
