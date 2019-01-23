const CoreController = require("../controllers/core");

module.exports = (router) => {
	/**
	 * @swagger
	 * /api/status:
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
	router.route("/status").get(CoreController.status);
};
