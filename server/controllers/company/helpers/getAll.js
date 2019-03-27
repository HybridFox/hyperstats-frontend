const CompanyModel = require("../../../models/company");
const { COMPANY_TYPES } = require("../../company/helpers/const");
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
	if (company.meta.type === COMPANY_TYPES.R && type === COMPANY_TYPES.RP) {
		return { "meta.managedBy": company._id };
	}
	if (company.meta.type === COMPANY_TYPES.R && type !== COMPANY_TYPES.RP) {
		return { "meta.type": { $in: [COMPANY_TYPES.CO, COMPANY_TYPES.AO] } };
	}
	if (company.meta.type === COMPANY_TYPES.CO) {
		return { "meta.type": COMPANY_TYPES.AO };
	}
	if (company.meta.type === COMPANY_TYPES.AO) {
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
