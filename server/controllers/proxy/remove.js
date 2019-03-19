const removeHelper = require("./helpers/remove");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const userCompany = profileHelper.getCompanyOfUser(req);

	return removeHelper({
		proxy: req.data.body.proxy,
		recyclingProcess: req.data.body.recyclingProcess,
		year: req.data.body.year,
		userCompany,
	})
		.then(() => res.status(204).send())
		.catch(next);
};
