const joi = require("joi");
const { schemas } = require("../../../helpers/validation");
const { REPORT_SORT_OPTIONS } = require("../helpers/const");

const schema = joi.object().keys({
	"recycling-process": joi.string().optional(),
	"recycler": joi.string().optional(),
	sort: joi.string().valid([
		REPORT_SORT_OPTIONS.name.param,
		`-${REPORT_SORT_OPTIONS.name.param}`,
		REPORT_SORT_OPTIONS.reportingYear.param,
		`-${REPORT_SORT_OPTIONS.reportingYear.param}`,
	]).optional(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
