const profileHelper = require("../../../helpers/profile");
const { pathOr, compose } = require("ramda");

module.exports = (req) => compose(
	pathOr(null, ["company", "_id"]),
	profileHelper.get
)(req);
