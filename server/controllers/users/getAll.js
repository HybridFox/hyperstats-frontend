const Manager = require("./helpers/userManager");
const ResponseHandler = require("./helpers/responseManager");

module.exports = (req, res, next) => {
	Manager.getAll()
		.then((data) => {
			try {
				const users = data.map((user) => {
					return ResponseHandler.formatUser(user);
				});
				res.status(200).json(users);
			} catch (err) {
				next(err);
			}
		}, next);
};
