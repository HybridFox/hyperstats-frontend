const ValidationHelper = require("./validation");

module.exports = (env) => {
	// Set NODE_ENV to local if missing
	env.NODE_ENV = env.NODE_ENV || "local";

	process.env = ValidationHelper.validator(ValidationHelper.schemas.presets.nodeEnvironment, "NODE_ENV_NOT_VALID", env);
};
