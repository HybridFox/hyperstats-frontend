const dataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const profileController = require("../controllers/profile");
const profileValidations = require("../controllers/profile/validations");
const authMiddleware = require("../middleware/auth");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   UserProfileResponse:
	 *     type: object
	 *     properties:
	 *       email:
	 *         type: string
	 *       firstname:
	 *         type: string
	 *       lastname:
	 *         type: string
	 *   ProfileUpdateBody:
	 *     type: object
	 *     properties:
	 *       firstname:
	 *         type: string
	 *       lastname:
	 *         type: string
	 *     required:
	 *       - firstname
	 *       - lastname
	 */

	router.use("/profile*", authMiddleware.isLoggedIn);

	/**
	 * @swagger
	 * /api/auth/profile:
	 *   get:
	 *     description: Get user profile
	 *     tags:
	 *       - profile
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ProfileUpdateBody'
	 *     responses:
	 *       200:
	 *         description: User profile
	 *         schema:
	 *           $ref: '#/definitions/UserProfileResponse'
	 *   put:
	 *     description: Update profile
	 *     tags:
	 *       - profile
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: User profile
	 *         schema:
	 *           $ref: '#/definitions/UserProfileResponse'
	 */
	router.route("/profile")
		.get(profileController.get)
		.put(
			dataMiddleware.copy,
			dataMiddleware.validate("body", profileValidations.update, Errors.ObjectValidationFailed),
			profileController.update
		);

	/**
	 * @swagger
	 * /api/auth/profile/company:
	 *   put:
	 *     description: Update company of the user
	 *     tags:
	 *       - profile
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/CompanyBody'
	 *     responses:
	 *       200:
	 *         description: Company
	 *         schema:
	 *           $ref: '#/definitions/CompanyResponse'
	 */
	router.route("/profile/company")
		.put(
			dataMiddleware.copy,
			dataMiddleware.validate("body", profileValidations.updateCompany, Errors.ObjectValidationFailed),
			profileController.updateCompany
		);
};
