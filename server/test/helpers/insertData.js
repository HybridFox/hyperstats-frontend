const models = require("../../models");

module.exports = (model, mock) => {
	return models[model].insertMany(mock);
};
