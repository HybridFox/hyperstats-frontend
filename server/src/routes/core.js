const CoreController = require("../controllers/core");

module.exports = (app) => {
	/**
	 * @swagger
	 * /server/status:
	 *   get:
	 *     description: Status call of the server
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: OK
	 *         schema:
	 *          type: object
	 *          properties:
	 *            success:
	 *              type: boolean
	 *            version:
	 *              type: string
	 */
	app.route("/server/status").get(CoreController.status);
};
