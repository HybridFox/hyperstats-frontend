const Errors = require("../helpers/errorHandler");

module.exports = (req, res, next) => {
	return next(Errors.PageNotFound);
};
