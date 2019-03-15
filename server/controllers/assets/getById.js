const mongoose = require("mongoose");
const { MongoGridFS } = require("mongo-gridfs");
const errors = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	const gridFS = new MongoGridFS(mongoose.connection.db, "fs");

	const id = req.data.params.id;
	const query = req.data.query;

	gridFS.findById(id)
		.then((item) => {
			res.set({
				"Content-Type": item.contentType,
			});

			if (Object.keys(query).indexOf("download") !== -1) {
				const name = item.metadata ? item.metadata.originalname || "download" : "download";
				res.set({
					"Content-Disposition": `attachment; filename="${name}"`,
				});
			}

			return gridFS.readFileStream(id);
		})
		.then((item) => {
			item
				.once("error", () => {
					return res.status(400).end();
				})
				.pipe(res);
		})
		.catch((err) => next(err.message === "No Object found" ? errors.ItemNotFound : err));
};
