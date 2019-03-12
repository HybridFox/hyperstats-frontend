const dataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const authController = require("../controllers/auth");
const authValidations = require("../controllers/auth/validations");
const authMiddleware = require("../middleware/auth");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   UserBody:
	 *     type: object
	 *     required:
	 *       - email
	 *       - username
	 *       - password
	 *       - firstname
	 *       - lastname
	 *     properties:
	 *       email:
	 *         type: string
	 *       username:
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
	 *       - username
	 *       - password
	 *     properties:
	 *       username:
	 *         type: string
	 *       password:
	 *         type: string
	 *   UserLoginResponse:
	 *     type: object
	 *     properties:
	 *       username:
	 *         type: string
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
	 *       username:
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
		dataMiddleware.copy,
		dataMiddleware.validate("body", authValidations.login, Errors.ObjectValidationFailed),
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
	router.route("/auth/logout").get(
		authMiddleware.isLoggedIn,
		authController.logout
	);

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
		dataMiddleware.copy,
		authMiddleware.setUserName,
		dataMiddleware.validate("body", authValidations.register, Errors.ObjectValidationFailed),
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
		dataMiddleware.copy,
		dataMiddleware.validate("query", authValidations.verify, Errors.ObjectValidationFailed),
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
		dataMiddleware.copy,
		dataMiddleware.validate("body", authValidations.requestPasswordReset, Errors.ObjectValidationFailed),
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
		dataMiddleware.copy,
		dataMiddleware.validate("body", authValidations.resetPassword, Errors.ObjectValidationFailed),
		authController.resetPassword
	);

	/**
	 * @swagger
	 * /api/auth/resend-validate-mail?{token}:
	 *   get:
	 *     description: Send a new validation mail to the user
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
	 *       200:
	 *         description: Success
	 */
	router.route("/auth/resend-validate-mail").post(
		dataMiddleware.copy,
		dataMiddleware.validate("body", authValidations.resendValidateMail, Errors.ObjectValidationFailed),
		authController.resendValidateMail
	);
};
