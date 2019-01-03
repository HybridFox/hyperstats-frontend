const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

mongoose.Promise = Promise;

module.exports = async() => {
	const mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getConnectionString();
	const mongooseOpts = { // options for mongoose 4.11.3 and above
		autoReconnect: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 1000,
	};

	mongoose.connect(mongoUri, mongooseOpts);

	return new Promise((resolve, reject) => {
		mongoose.connection.on("error", (error) => reject(error));
		mongoose.connection.once("open", () => resolve(mongoServer));
	});
};
