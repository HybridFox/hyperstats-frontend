const { omit } = require("ramda");
const updateCompany = require("./helpers/updateCompany");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	return updateCompany(profileHelper.getFull(req)._id, req.body)
		.then((company) => {
			profileHelper.reload(req);

			res.status(200).json(omit(["__v"])(company));
		})
		.catch((error) => console.log(error) || next(error));
};
