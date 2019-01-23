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
	 *   ResetBody:
	 *     type: object
	 *     properties:
	 *       password:
	 *         type: string
	 *       token:
	 *         type: string
	 *   ResetRequestBody:
	 *     type: object
	 *     properties:
	 *       email:
	 *         type: string
	 */

	/**
	 * @swagger
	 * /api/auth/login:
	 *   post:
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
	 * /api/auth/logout:
	 *   get:
	 *     description: Logout user
	 *     tags:
	 *       - auth
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       201:
	 *         description: Success
	 */
	router.route("/auth/logout").get(authController.logout);

	/**
	 * @swagger
	 * /api/auth/register:
	 *   post:
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
	 * /api/auth/verify?{token}:
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
	 *         description: Redirect to verify landing page (/verification-succeeded or /verification-failed)
	 */
	router.route("/auth/verify").get(
		validationHelper.middleware(authValidations.verify),
		authController.verify
	);

	/**
	 * @swagger
	 * /api/auth/request-password-reset:
	 *   post:
	 *     description: Request user password reset
	 *     tags:
	 *       - auth
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ResetRequestBody'
	 *     responses:
	 *       200:
	 *         description: Success
	 */
	router.route("/auth/request-password-reset").post(
		validationHelper.middleware(authValidations.requestPasswordReset),
		authController.requestPasswordReset
	);

	/**
	 * @swagger
	 * /api/auth/reset-password:
	 *   put:
	 *     description: Reset user password
	 *     tags:
	 *       - auth
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ResetBody'
	 *     responses:
	 *       200:
	 *         description: Success
	 */
	router.route("/auth/reset-password").put(
		validationHelper.middleware(authValidations.resetPassword),
		authController.resetPassword
	);
};
