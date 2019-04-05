const recyclingProcessManager = require("./helpers/recyclingProcessManager");
const profileHelper = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	const profile = await profileHelper.getFull(req);
	const id = req.data.params.id;

	recyclingProcessManager.remove(id, profile)
		.then(() => {
			res.status(204).send();
		})
		.catch(next);
};
