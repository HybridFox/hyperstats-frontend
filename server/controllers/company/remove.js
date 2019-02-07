const { getCompanyIdOfUser, remove } = require("./helpers");

module.exports = (req, res, next) => {
	return remove({ _id: req.data.params.id, companyOfUser: getCompanyIdOfUser(req) })
		.then(() => res.status(204).send())
		.catch((error) => next(error));
};
