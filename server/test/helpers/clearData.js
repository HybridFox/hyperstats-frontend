const models = require("../../models");

module.exports = (model) => {
	return models[model].deleteMany({}).exec();
};
