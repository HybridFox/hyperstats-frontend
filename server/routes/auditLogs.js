const dataMiddleware = require("../middleware/data");
const authMiddleware = require("../middleware/auth");
const auditLogsController = require("../controllers/auditLogs");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   AuditLog:
	 *     type: object
	 *     properties:
	 *       activity:
	 *         type: string
	 *       timestamp:
	 *         type: string
	 *         format: date-time
	 *       user:
	 *         type: string
	 *         description: The objectId of the report
	 *   AuditLogData:
	 *     type: object
	 *     properties:
	 *       report:
	 *         type: string
	 *         description: The objectId of the report
	 *       reportingCompany:
	 *         type: string
	 *         description: The objectId of the user's company
	 *       logs:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/AuditLog'
	 *   AuditLogMeta:
	 *     type: object
	 *     properties:
	 *       created:
	 *         type: string
	 *         format: date-time
	 *       lastUpdated:
	 *         type: string
	 *         format: date-time
	 *   AuditLogResponse:
	 *     type: object
	 *     properties:
	 *       _id:
	 *         type: string
	 *       data:
	 *         $ref: '#/definitions/AuditLogData'
	 *       meta:
	 *         $ref: '#/definitions/AuditLogMeta'
	 */

	router.use("/auditlogs*", authMiddleware.isLoggedIn);

	/**
	 * @swagger
	 * /api/auditlogs:
	 *   get:
	 *     description: get all audit logs
	 *     tags:
	 *       - auditLog
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       201:
	 *         description: Audit logs
	 *         schema:
	 *           $ref: '#/definitions/AuditLogResponse'
	 */

	router.route("/auditlogs")
		.get(
			dataMiddleware.copy,
			auditLogsController.getAll
		);
};
