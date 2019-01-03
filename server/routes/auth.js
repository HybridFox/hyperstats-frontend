const validationHelper = require("../helpers/validation");
const authController = require("../controllers/auth");
const authValidations = require("../controllers/auth/validations");

module.exports = (router) => {
	/**
	 * @swagger
	 * /api/auth/login:
	 *   get:
	 *     description: Login user
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: Redirect to dashboard
	 *         schema:
	 *           type: object
	 *           properties:
	 *             success:
	 *               type: boolean
	 */
	router.route("/auth/login").post(
		validationHelper.middleware(authValidations.login),
		authController.login
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
		validationHelper.middleware(authValidations.register, false),
		authController.register
	);

	/**
	 * @swagger
	 * /api/auth/verify:
	 *   get:
	 *     description: Verify user (email callback)
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       302:
	 *         description: Redirect to verify landing page
	 */
	router.route("/auth/verify/:token").get(
		validationHelper.middleware(authValidations.verify),
		authController.verify
	);
};
