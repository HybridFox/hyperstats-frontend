const validationHelper = require("../helpers/validation");
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
	 */

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
		.get(authMiddleware.isLoggedIn, profileController.get)
		.put(authMiddleware.isLoggedIn, validationHelper.middleware(profileValidations.update), profileController.update);

	router.route("/profile/company")
		.put(authMiddleware.isLoggedIn, validationHelper.middleware(profileValidations.updateCompany), profileController.updateCompany);
};
