const profileHelper = require("../../../helpers/profile");
const { pathOr } = require("ramda");

module.exports = async(req) => pathOr(null, ["company", "_id"], await profileHelper.get(req));
