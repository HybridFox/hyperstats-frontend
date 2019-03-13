const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	"company-type": Joi.alternatives([
		Joi.array().items(Joi.string().valid(["R", "AO", "CO"])),
		Joi.string().valid(["R", "AO", "CO"]),
	]).optional(),
	"admin": Joi.string().optional(),
	"status": Joi.string().optional(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
