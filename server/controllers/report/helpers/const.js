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

module.exports = {
	REPORT_STATUS,
	REPORT_SORT_OPTIONS,
};
