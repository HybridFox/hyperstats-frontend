const AuthMiddleware = require("../middleware/auth");
const DataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const Validations = require("../controllers/assets/validations");
const Controller = require("../controllers/assets");

module.exports = (router) => {
	/**
	 * @swagger
	 * /api/assets:
	 *   post:
	 *     description: Create asset
	 *     tags:
	 *       - assets
	 *     consumes:
	 *       - multipart/form-data
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: formData
	 *         name: file
	 *         required: true
	 *         type: file
	 *     responses:
	 *       201:
	 *         description: Asset created
	 *         schema:
	 *           type: object
	 *           properties:
	 *             id:
	 *               type: string
	 *             mimetype:
	 *               type: string
	 *             uploadDate:
	 *               type: string
	 *             originalname:
	 *               type: string
	 */
	router.route("/assets")
		.post(
			AuthMiddleware.isLoggedIn,
			// can't validate multipart with joi
			...Controller.create,
		);

	/**
	 * @swagger
	 * /api/assets/{id}:
	 *   parameters:
	 *     - in: path
	 *       name: id
	 *       required: true
	 *       description: uuid
	 *       type: string
	 *   get:
	 *     description: View or download asset
	 *     tags:
	 *       - assets
	 *     produces:
	 *       - any
	 *     parameters:
	 *       - in: query
	 *         name: doanlow
	 *         type: boolean
	 *     responses:
	 *       200:
	 *         description: View or download asset
	 */
	router.route("/assets/:id")
		.get(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", Validations.byId, Errors.ObjectValidationFailed),
			DataMiddleware.validate("query", Validations.query, Errors.ObjectValidationFailed),
			Controller.getById,
		);
};
