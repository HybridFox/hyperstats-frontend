const AuthMiddleware = require("../middleware/auth");
const DataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const Validations = require("../controllers/users/validations");
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
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: User
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	router.route("/users")
		.get(
			AuthMiddleware.isLoggedIn,
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
	 *   patch:
	 *     description: Activate or deactive user
	 *     tags:
	 *       - users
	 *     produces:
	 *       - any
	 *     parameters:
	 *       - in: query
	 *         name: doanlow
	 *         type: boolean
	 *     responses:
	 *       200:
	 *         description: User
	 */
	router.route("/users/:id/status")
		.patch(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", Validations.byId, Errors.ObjectValidationFailed),
			DataMiddleware.validate("body", Validations.updateStatus, Errors.ObjectValidationFailed),
			Controller.status,
		);
};
