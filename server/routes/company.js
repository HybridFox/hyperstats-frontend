const dataMiddleware = require("../middleware/data");
const validationPresets = require("../helpers/validation/presets");
const Errors = require("../helpers/errorHandler");
const companyController = require("../controllers/company");
const companyValidations = require("../controllers/company/validations");
const authMiddleware = require("../middleware/auth");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   CompanyTypes:
	 *     type: string
	 *     enum: [R, RP, CO]
	 *     description: >
	 *       Company type
	 *         * `R` - Recycler
	 *         * `RP` - Recycling Partner
	 *         * `CO` - Compliance organisation
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
	 *         $ref: '#/definitions/CompanyTypes'
	 *   CompanyBody:
	 *       $ref: '#/definitions/CompanyData'
	 *   CompanyResponse:
	 *     type: object
	 *     properties:
	 *       _id:
	 *         type: string
	 *       data:
	 *         $ref: '#/definitions/CompanyData'
	 *       meta:
	 *         $ref: '#/definitions/CompanyMeta'
	 */

	router.use("/company*", authMiddleware.isLoggedIn);

	/**
	 * @swagger
	 * /api/company/type/{type}:
	 *   get:
	 *     description: Get all user companies of type
	 *     tags:
	 *       - company
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: type
	 *         required: true
	 *         $ref: '#/definitions/CompanyTypes'
	 *     responses:
	 *       200:
	 *         description: Company
	 *         schema:
	 *           $ref: '#/definitions/CompanyResponse'
	 *   post:
	 *     description: Create company
	 *     tags:
	 *       - company
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: type
	 *         required: true
	 *         $ref: '#/definitions/CompanyTypes'
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/CompanyBody'
	 *     responses:
	 *       201:
	 *         description: Company
	 *         schema:
	 *           $ref: '#/definitions/CompanyResponse'
	 */
	router.route("/company/type/:type")
		.get(
			dataMiddleware.copy,
			companyController.getAll
		)
		.post(
			dataMiddleware.copy,
			dataMiddleware.validate("body", companyValidations.company, Errors.ObjectValidationFailed),
			companyController.create
		);

	/**
	 * @swagger
	 * /api/company/{id}:
	 *   get:
	 *     description: Get company by Id
	 *     tags:
	 *       - company
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         type: string
	 *         required: true
	 *     responses:
	 *       200:
	 *         description: Company
	 *         schema:
	 *           $ref: '#/definitions/CompanyResponse'
	 *   put:
	 *     description: Update company by Id
	 *     tags:
	 *       - company
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         type: string
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
	 *   delete:
	 *     description: Remove a company
	 *     tags:
	 *       - company
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         type: string
	 *     responses:
	 *       201:
	 *         description: Company
	 */
	router.route("/company/:id")
		.get(
			dataMiddleware.copy,
			dataMiddleware.validate("params", validationPresets.byId, Errors.ItemNotFound),
			companyController.getOne
		)
		.put(
			dataMiddleware.copy,
			dataMiddleware.validate("params", validationPresets.byId, Errors.ItemNotFound),
			dataMiddleware.validate("body", companyValidations.company, Errors.ObjectValidationFailed),
			companyController.update
		)
		.delete(
			dataMiddleware.copy,
			dataMiddleware.validate("params", validationPresets.byId, Errors.ItemNotFound),
			companyController.remove
		);
};
