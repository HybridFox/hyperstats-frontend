const CompanyModel = require("../../../models/company");
const {
	__,
	set,
	merge,
	useWith,
	ifElse,
	identity,
	curry,
	compose,
	lensProp,
	always,
} = require("ramda");

const getTypeQuery = (type) => ifElse(
	identity,
	compose(
		set(lensProp("meta.type"), __, {}),
		(t) => Array.isArray(t) ? { $in: t } : t
	),
	always({})
)(type);

const getCompanyQuery = curry((isAdmin, company) => isAdmin ? {} : {
	$or: [{
		"meta.managedBy": company,
	}, {
		_id: company,
	}],
});

const getQuery = (type, companyOfUser, isAdmin) => useWith(merge, [getTypeQuery, getCompanyQuery(isAdmin)])(type, companyOfUser);

module.exports = async({ type, companyOfUser, isAdmin = false } = {}) => {
	return CompanyModel.find(getQuery(type, companyOfUser, isAdmin)).lean().exec();
};
