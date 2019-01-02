const passport = require("passport");
const validationHelper = require("../helpers/validation");

module.exports = (router) => {
	/**
	 * @swagger
	 * /api/auth/login:
	 *   get:
	 *     description: Login user
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       302:
	 *         description: Redirect to dashboard
	 */
	router.route("/auth/login").post(
		validationHelper.bodyMiddleware(validationHelper.schemas.auth.login),
		(req, res, next) => passport.authenticate("local-login", (error) => {
			if (error) {
				return res.redirect("/login?failed=true");
			}

			return res.redirect("/dashboard");
		})(req, res, next)
	);

	/**
	 * @swagger
	 * /api/auth/register:
	 *   get:
	 *     description: Login register
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: Registration success
	 *         schema:
	 *           type: object
	 *           properties:
	 *             success:
	 *               type: boolean
	 */
	router.route("/auth/register").post(
		validationHelper.bodyMiddleware(validationHelper.schemas.auth.register),
		(req, res, next) => passport.authenticate("local-register", (error) => res.json({ success: !error }))(req, res, next)
	);
};
