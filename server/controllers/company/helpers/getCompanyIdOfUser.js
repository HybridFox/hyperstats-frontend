const profileHelper = require("../../../helpers/profile");
const { pathOr, compose } = require("ramda");

module.exports = async(req) => compose(
	pathOr(null, ["company", "_id"]),
	await profileHelper.get
)(req);
