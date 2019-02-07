const Manager = require("./helpers/userManager");
const ResponseHandler = require("./helpers/responseManager");

module.exports = async(req, res, next) => {
	try {
		const data = req.data.query.type ? await Manager.getAllOfType(req.data.query.type) : await Manager.getAll();

		const users = data.map((user) => {
			return ResponseHandler.formatUser(user);
		});

		return res.status(200).json(users);
	} catch (error) {
		return next(error);
	}
};
