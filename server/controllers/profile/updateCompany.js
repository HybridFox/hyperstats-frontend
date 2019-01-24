const { omit, path } = require("ramda");
const updateCompany = require("./helpers/updateCompany");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const companyId = path(["data", "company", "_id"])(profileHelper.getFull(req));

	return updateCompany(companyId, req.body)
		.then((company) => {
			profileHelper.reload(req);

			return res.status(200).json(omit(["__v"])(company));
		})
		.catch((error) => next(error));
};
