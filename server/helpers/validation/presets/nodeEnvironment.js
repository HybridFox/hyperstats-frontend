const Joi = require("joi");
const environments = require(`${process.cwd()}/config/envs`);

const options = require("./options");
const schema = Joi.object().keys({
	NODE_ENV: Joi.string().required().valid(environments),
	FORCE_COLOR: Joi.number().default(1),
});

module.exports = {
	schema,
	options: options.allowUnknown,
};
