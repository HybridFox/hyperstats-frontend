const AuthMiddleware = require("../middleware/auth");
const DataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const Validations = require("../controllers/users/validations");
const validationPresets = require("../helpers/validation/presets");
const Controller = require("../controllers/users");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   User:
	 *     type: object
	 *     properties:
	 *       _id:
	 *         type: string
	 *       data:
	 *         type: object
	 *         properties:
	 *           email:
	 *             type: string
	 *           firstname:
	 *             type: string
	 *           lastname:
	 *             type: string
	 *       meta:
	 *         type: object
	 *         properties:
	 *           status:
	 *             type: string
	 *           isAdmin:
	 *             type: boolean
	 *           created:
	 *             type: string
	 *           lastUpdated:
	 *             type: string
	 */


	/**
	 * @swagger
	 * /api/users:
	 *   get:
	 *     description: Get users
	 *     tags:
	 *       - users
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: query
	 *         name: companyType
	 *         required: false
	 *         type: string
	 *         description: >
	 *           Type of company the user belongs to
	 *             * `R` - Recycler
	 *             * `RP` - Recycling Partner
	 *             * `CO` - Compliance organisation
	 *     responses:
	 *       200:
	 *         description: Users
	 *         schema:
	 *           type: array
	 *           items:
	 *             $ref: '#/definitions/User'
	 */
	router.route("/users")
		.get(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("query", Validations.filters, Errors.ObjectValidationFailed),
			Controller.getAll,
		);

	/**
	 * @swagger
	 * /api/users/{id}:
	 *   parameters:
	 *     - in: path
	 *       name: id
	 *       required: true
	 *       description: uuid
	 *       type: string
	 *   get:
	 *     description: Get user by id
	 *     tags:
	 *       - users
	 *     produces:
	 *       - any
	 *     responses:
	 *       200:
	 *         description: User
	 *         schema:
	 *           $ref: '#/definitions/User'
	 *   put:
	 *     description: Update a user by id
	 *     tags:
	 *       - users
	 *     parameters:
	 *       - in: body
	 *         name: data
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/User'
	 *     produces:
	 *       - any
	 *     responses:
	 *       200:
	 *         description: User
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	router.route("/users/:id")
		.get(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", validationPresets.byId, Errors.ObjectValidationFailed),
			Controller.getById,
		)
		.put(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", validationPresets.byId, Errors.ObjectValidationFailed),
			DataMiddleware.validate("body", Validations.update, Errors.ObjectValidationFailed),
			Controller.update,
		);


	/**
	 * @swagger
	 * /api/users/{id}/status:
	 *   parameters:
	 *     - in: path
	 *       name: id
	 *       required: true
	 *       description: uuid
	 *       type: string
	 *   patch:
	 *     description: Activate or deactive user
	 *     tags:
	 *       - users
	 *     parameters:
	 *       - in: body
	 *         name: status
	 *         required: true
	 *         schema:
	 *           type: string
	 *     produces:
	 *       - any
	 *     responses:
	 *       200:
	 *         description: User
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	router.route("/users/:id/status")
		.patch(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", validationPresets.byId, Errors.ObjectValidationFailed),
			DataMiddleware.validate("body", Validations.updateStatus, Errors.ObjectValidationFailed),
			Controller.status,
		);

	/**
	 * @swagger
	 * /api/users/{id}/company:
	 *   parameters:
	 *     - in: path
	 *       name: id
	 *       required: true
	 *       description: uuid
	 *       type: string
	 *   patch:
	 *     description: Change user company
	 *     tags:
	 *       - users
	 *     parameters:
	 *       - in: body
	 *         name: company
	 *         required: true
	 *         schema:
	 *           type: string
	 *     produces:
	 *       - any
	 *     responses:
	 *       200:
	 *         description: User
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	router.route("/users/:id/company")
		.patch(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", Validations.byId, Errors.ObjectValidationFailed),
			DataMiddleware.validate("body", Validations.updateCompany, Errors.ObjectValidationFailed),
			Controller.updateCompany,
		);
};
