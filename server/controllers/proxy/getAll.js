const profileHelper = require("../../helpers/profile");
const getAllHelper = require("./helpers/getAll");

module.exports = (req, res, next) => {
	const companyOfUser = profileHelper.getCompanyOfUser(req);

	return getAllHelper(companyOfUser._id)
		.then((reports) => res.status(200).json(reports))
		.catch(next);
};
