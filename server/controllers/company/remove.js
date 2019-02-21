const { getCompanyIdOfUser, remove } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	return remove({
		_id: req.data.params.id,
		companyOfUser: getCompanyIdOfUser(req),
		isAdmin: profileHelper.isAdmin(req),
	})
		.then(() => res.status(204).send())
		.catch((error) => next(error));
};
