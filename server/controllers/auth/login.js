const { loginHandler } = require("./helpers");
const profile = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	try {
		const user = await loginHandler(req.data.body.username, req.data.body.password);

		await profile.set(req, user);

		res.status(200).json(await profile.get(req));
	} catch (error) {
		next(error);
	}
};
