const AuthMiddleware = require("../middleware/auth");
const DataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const Controller = require("../controllers/recyclingProcess");
const Validations = require("../controllers/recyclingProcess/validations");
const ValidationPresets = require("../helpers/validation/presets");


module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   RecyclingStep:
	 *     type: object
	 *     properties:
	 *       precedingStep:
	 *         type: string
	 *       description:
	 *         type: string
	 *       site:
	 *         type: string
	 *       methodOfProcessing:
	 *         type: string
	 *       qualitativeDescription:
	 *         type: object
	 *         properties:
	 *           text:
	 *             type: string
	 *           asset:
	 *             type: string
	 *       schematicOverview:
	 *         type: string
	 *
	 *   RecyclingProcess:
	 *     type: object
	 *     properties:
	 *       name:
	 *         type: string
	 *       steps:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/RecyclingStep'
	 */

	/**
	 * @swagger
	 * /api/recycling-processes:
	 *   get:
	 *     description: Get all recycling processes
	 *     tags:
	 *       - recycling-processes
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: Recycling Processes
	 *         schema:
	 *           $ref: '#/definitions/RecyclingProcess'
	 *   post:
	 *     description: Create new recycling process
	 *     tags:
	 *       - recycling-processes
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       201:
	 *         description: New Recycling Process
	 *         schema:
	 *           $ref: '#/definitions/RecyclingProcess'
	 */
	router.route("/recycling-processes")
		.get(
			AuthMiddleware.isLoggedIn,
			Controller.getAll
		)
		.post(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("body", Validations.create, Errors.ObjectValidationFailed),
			Controller.create
		);

	/**
	 * @swagger
	 * /api/recycling-processes/{id}:
	 *   parameters:
	 *     - in: path
	 *       name: id
	 *       required: true
	 *       description: uuid
	 *       type: string
	 *   get:
	 *     description: Get recycling process by id
	 *     tags:
	 *       - recycling-processes
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: Recycling Process
	 *         schema:
	 *           $ref: '#/definitions/RecyclingProcess'
	 *   put:
	 *     description: update recycling process by id
	 *     tags:
	 *       - recycling-processes
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: Updated Recycling Process
	 *         schema:
	 *           $ref: '#/definitions/RecyclingProcess'
	 */
	router.route("/recycling-processes/:id")
		.get(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", ValidationPresets.byId, Errors.ItemNotFound),
			Controller.getById
		)
		.put(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", ValidationPresets.byId, Errors.ItemNotFound),
			DataMiddleware.validate("body", Validations.update, Errors.ObjectValidationFailed),
			Controller.update
		)
		.delete(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", ValidationPresets.byId, Errors.ItemNotFound),
			Controller.remove
		);
};
