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
	 *     required:
	 *       - firstname
	 *       - lastname
	 *   CompanyData:
	 *     type: object
	 *     properties:
	 *       name:
	 *         type: string
	 *       address:
	 *         type: object
	 *         properties:
	 *           street:
	 *             type: string
	 *           number:
	 *             type: string
	 *           box:
	 *             type: string
	 *           zipCode:
	 *             type: string
	 *           city:
	 *             type: string
	 *           country:
	 *             type: string
	 *         required:
	 *           - street
	 *           - number
	 *           - zipCode
	 *           - city
	 *           - country
	 *     required:
	 *       - name
	 *       - address
	 *   CompanyMeta:
	 *     type: object
	 *     properties:
	 *       created:
	 *         type: string
	 *       lastUpdated:
	 *         type: string
	 *       type:
	 *         type: string
	 *         enum: [R, RP, CO]
	 *         description: >
	 *           Company type
	 *             * `R` - Recycler
	 *             * `RP` - Recycling Partner
	 *             * `CO` - Compliance organisation
	 *   CompanyUpdateBody:
	 *       $ref: '#/definitions/CompanyData'
	 *   CompanyUpdateResponse:
	 *     type: object
	 *     properties:
	 *       data:
	 *         $ref: '#/definitions/CompanyData'
	 *       meta:
	 *         $ref: '#/definitions/CompanyMeta'
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
	 *           $ref: '#/definitions/CompanyUpdateBody'
	 *     responses:
	 *       200:
	 *         description: Company
	 *         schema:
	 *           $ref: '#/definitions/CompanyUpdateResponse'
	 */
	router.route("/profile/company")
		.put(authMiddleware.isLoggedIn, validationHelper.middleware(profileValidations.updateCompany), profileController.updateCompany);
};
