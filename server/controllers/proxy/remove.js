const removeHelper = require("./helpers/remove");
const profileHelper = require("../../helpers/profile");
const { createLog } = require("../auditLogs/helpers");

module.exports = (req, res, next) => {
	const user = profileHelper.getFull(req);

	return removeHelper({
		proxy: req.data.body.proxy,
		recyclingProcess: req.data.body.recyclingProcess.processId,
		year: req.data.body.year,
		userCompany: user.data.company._id,
	})
		.then(() => {
			createLog({ item: req.data.body, type: "proxy", user, action: "revoked" }).then(() => res.status(204).send());
		})
		.catch(next);
};
