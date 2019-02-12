const CompanyModel = require("../../../models/company");
const {
	__,
	set,
	mergeAll,
	useWith,
	ifElse,
	identity,
	curry,
	compose,
	lensProp,
	always,
	curryN,
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

const getNonDeletedQuery = () => ({ "meta.deleted": false });

const getQuery = (type, companyOfUser, isAdmin) => ({
	...getTypeQuery(type),
	...getCompanyQuery(isAdmin, companyOfUser),
	...getNonDeletedQuery(),
});

module.exports = async({ type, companyOfUser, isAdmin = false } = {}) => {
	return CompanyModel.find(getQuery(type, companyOfUser, isAdmin)).lean().exec();
};
