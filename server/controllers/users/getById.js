const Manager = require("./helpers/userManager");
const ResponseHandler = require("./helpers/responseManager");

module.exports = (req, res, next) => {
	const id = req.data.params.id;
	Manager.getById(id)
		.then((data) => {
			try {
				res.status(200).json(ResponseHandler.formatUser(data));
			} catch (err) {
				next(err);
			}
		}, next);
};
