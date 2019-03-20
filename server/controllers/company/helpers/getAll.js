const CompanyModel = require("../../../models/company");
const {
	__,
	set,
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

const getCompanyListQuery = curry((type, company) => {
	if (company.meta.type === "R" && type === "RP") {
		return { "meta.managedBy": company._id };
	}
	if (company.meta.type === "R" && type !== "RP") {
		return { "meta.type": { $in: ["AO", "CO"] } };
	}
	if (company.meta.type === "CO") {
		return { "meta.type": "AO" };
	}
	if (company.meta.type === "AO") {
		return { "_id": company._id };
	}
});

const getNonDeletedQuery = () => ({ "meta.deleted": false });

const getAdminQuery = (type) => ({
	...getTypeQuery(type),
	...getNonDeletedQuery(),
});

const getCompanyQuery = (type, companyOfUser) => ({
	...getCompanyListQuery(type, companyOfUser),
	...getNonDeletedQuery(),
});

module.exports = async({ type, companyOfUser, isAdmin = false } = {}) => {
	if (isAdmin) {
		return CompanyModel.find(getAdminQuery(type)).lean().exec();
	}

	return CompanyModel.find(getCompanyQuery(type, companyOfUser)).lean().exec();
};
