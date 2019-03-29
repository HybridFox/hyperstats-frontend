const { getCompanyIdOfUser, remove } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	return remove({
		_id: req.data.params.id,
		companyOfUser: await getCompanyIdOfUser(req),
		isAdmin: profileHelper.isAdmin(req),
	})
		.then(() => res.status(204).send())
		.catch((error) => next(error));
};
