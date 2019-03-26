const createHelper = require("./helpers/create");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const userCompany = profileHelper.getCompanyOfUser(req)._id;

	return createHelper({
		proxy: req.data.body.proxy,
		recyclingProcess: req.data.body.recyclingProcess,
		year: req.data.body.year,
		userCompany,
	})
		.then(() => res.status(204).send())
		.catch(next);
};
