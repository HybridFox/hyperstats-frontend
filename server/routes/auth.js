const validationHelper = require("../helpers/validation");
const authController = require("../controllers/auth");
const authValidations = require("../controllers/auth/validations");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   UserBody:
	 *     type: object
	 *     required:
	 *       - email
	 *       - password
	 *       - firstname
	 *       - lastname
	 *     properties:
	 *       email:
	 *         type: string
	 *       password:
	 *         type: string
	 *       firstname:
	 *         type: string
	 *       lastname:
	 *         type: string
	 *   UserLoginBody:
	 *     type: object
	 *     required:
	 *       - email
	 *       - password
	 *     properties:
	 *       email:
	 *         type: string
	 *       password:
	 *         type: string
	 *   UserLoginResponse:
	 *     type: object
	 *     properties:
	 *       email:
	 *         type: string
	 *       firstname:
	 *         type: string
	 *       lastname:
	 *         type: string
	 */

	/**
	 * @swagger
	 * /api/auth/profile:
	 *   get:
	 *     description: Get user profile
	 *     tags:
	 *       - auth
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description:
	 *         schema:
	 *           $ref: '#/definitions/UserLoginResponse'
	 */
	router.route("/auth/profile").get(authController.profile);

	/**
	 * @swagger
	 * /api/auth/login:
	 *   get:
	 *     description: Login user
	 *     tags:
	 *       - auth
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/UserLoginBody'
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: Login response
	 *         schema:
	 *           $ref: '#/definitions/UserLoginResponse'
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
	 *     tags:
	 *       - auth
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/UserBody'
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
	 * /api/auth/verify/{token}:
	 *   get:
	 *     description: Verify user (email callback)
	 *     tags:
	 *       - auth
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: token
	 *         required: true
	 *         type: string
	 *     responses:
	 *       302:
	 *         description: Redirect to verify landing page
	 */
	router.route("/auth/verify/:token").get(
		validationHelper.middleware(authValidations.verify),
		authController.verify
	);
};
