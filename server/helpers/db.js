const mongoose = require("mongoose");
const config = require("../../config");

const options = {
	useNewUrlParser: true,
};

mongoose.connect(config.server.mongo.url, options);

mongoose.connection.on("error", (error) => console.log("Mongoose connection errror", error))


module.exports = mongoose;
