const { setActiveProp } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	setActiveProp({
		_id: req.params.id,
		value: false,
		isAdmin: profileHelper.isAdmin(req),
		companyOfUser: profileHelper.getCompanyOfUser(req)._id,
	})
		.then((company) => res.status(200).json(company))
		.catch((error) => next(error));
};
