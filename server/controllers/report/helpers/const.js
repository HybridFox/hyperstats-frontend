const REPORT_STATUS = {
	SAVED: "SAVED",
	FILED: "FILED",
};

const REPORT_SORT_OPTIONS = {
	name: {
		param: "name",
		path: "data.information",
	},
	reportingYear: {
		param: "reportingYear",
		path: "data.information",
	},
};

const DEFAULT_REPORT_STATE = {
	isPristine: {
		information: true,
		inputFraction: true,
		additives: true,
		outputFraction: true,
		recyclingEfficiency: true,
		additionalInformation: true,
	},
};

module.exports = {
	REPORT_STATUS,
	REPORT_SORT_OPTIONS,
	DEFAULT_REPORT_STATE,
};
