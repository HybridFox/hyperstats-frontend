const { COMPANY_TYPES } = require("../../company/helpers/const");

module.exports = (_id, reportedById, companyType) => {
	if (companyType === COMPANY_TYPES.AO || companyType === COMPANY_TYPES.CO) {
		return {
			_id,
			$or: [
				{
					"meta.approvedCompanies": {
						$elemMatch: {
							company: reportedById,
						},
					},
				}, {
					"meta.approvedCompanies": {
						$elemMatch: {
							linkedApprovals: {
								$elemMatch: { $in: [reportedById] },
							},
						},
					},
				},
			],
		};
	} else {
		return {
			_id,
			"meta.reportingCompany": reportedById,
		};
	}
};
