const dataMiddleware = require("../middleware/data");
const validationPresets = require("../helpers/validation/presets");
const Errors = require("../helpers/errorHandler");
const proxyController = require("../controllers/proxy");
const proxyValidations = require("../controllers/proxy/validations");
const authMiddleware = require("../middleware/auth");

module.exports = (router) => {
	/**
	* @swagger
	* definitions:
	*   ProxiesResponse:
	*     type: array
	*     items:
	*       type: object
	*       properties:
	*         companyId:
	*           type: string
	*           description: Company reference
	*         name:
	*           type: string
	*           description: Organization name
	*         processes:
	*           type: array
	*           items:
	*             type: object
	*             description: Reports by process
	*             properties:
	*               process:
	*                 type: object
	*                 description: Process (populated)
	*               reports:
	*                 type: array
	*                 items:
	*                   type: object
	*                   description: report (poputlated)
	*   ProxyModifyBody:
	*     type: object
	*     properties:
	*       proxy:
	*         type: string
	*         description: Proxy ID
	*       recyclingProcess:
	*         type: string
	*         description: Recycling process ID
	*       year:
	*         type: number
	*         description: Reporting year
	*/
	router.use("/proxies*", authMiddleware.isLoggedIn);

	/**
	 * @swagger
	 * /api/proxies:
	 *   get:
	 *     description: Aggregate view of reports for proxies
	 *     tags:
	 *       - proxy
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: Proxies
	 *         schema:
	 *           $ref: '#/definitions/ProxiesResponse'
	 */
	router.route("/proxies").get(
		dataMiddleware.copy,
		proxyController.getAll
	);

	/**
	 * @swagger
	 * /api/proxies:
	 *   put:
	 *     description: add proxy to report
	 *     tags:
	 *       - proxy
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ProxyModifyBody'
	 *     responses:
	 *       204:
	 *         description: Proxy added to report
	 *   delete:
	 *     description: Remove proxy from report
	 *     tags:
	 *       - proxy
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ProxyModifyBody'
	 *     responses:
	 *       204:
	 *         description: Proxy removed from report
	 */
	router.route("/proxies")
		.put(
			dataMiddleware.copy,
			dataMiddleware.validate("body", proxyValidations.create, Errors.ObjectValidationFailed),
			proxyController.create
		)
		.delete(
			dataMiddleware.copy,
			dataMiddleware.validate("body", proxyValidations.remove, Errors.ObjectValidationFailed),
			proxyController.remove
		);
};
