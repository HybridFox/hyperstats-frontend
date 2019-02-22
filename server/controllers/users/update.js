const Manager = require("./helpers/userManager");
const ResponseHandler = require("./helpers/responseManager");

module.exports = (req, res, next) => {
	const id = req.data.params.id;
	Manager.update(id, req.data.body)
		.then((data) => res.status(200).json(ResponseHandler.formatUser(data)))
		.catch((error) => next(error));
};
