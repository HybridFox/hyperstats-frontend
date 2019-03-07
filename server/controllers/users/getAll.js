const Manager = require("./helpers/userManager");
const ResponseHandler = require("./helpers/responseManager");

module.exports = async(req, res, next) => {
	let data = null;

	try {
		if (req.data.query.status) {
			data = await Manager.getPending();
		} else {
			data = req.data.query["company-type"] ? await Manager.getAllOfType(req.data.query["company-type"], req.data.query.admin) : await Manager.getAll(req.data.query.admin);
		}

		const users = data.map((user) => {
			return ResponseHandler.formatUser(user);
		});

		return res.status(200).json(users);
	} catch (error) {
		return next(error);
	}
};
