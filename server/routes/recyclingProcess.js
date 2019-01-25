const DataMiddleware = require("../middleware/data");
const validationHelper = require("../helpers/validation");
const recyclingProcess = require("../controllers/recyclingProcess");
const recyclingProcessValidations = require("../controllers/recyclingProcess/validations");
const authMiddleware = require("../middleware/auth");

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
		// .get(authMiddleware.isLoggedIn, recyclingProcess.getAll);
		.get(recyclingProcess.getAll)
		.post(
			validationHelper.middleware(recyclingProcessValidations.create, false),
			recyclingProcess.create
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
			DataMiddleware.copy,
			recyclingProcess.getById
		)
		.post(
			validationHelper.middleware(recyclingProcessValidations.update, false),
			recyclingProcess.update
		);
};
