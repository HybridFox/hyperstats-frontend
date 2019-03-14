const dataMiddleware = require("../middleware/data");
const validationPresets = require("../helpers/validation/presets");
const Errors = require("../helpers/errorHandler");
const reportController = require("../controllers/report");
const reportValidations = require("../controllers/report/validations");
const authMiddleware = require("../middleware/auth");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   ReportStatuses:
	 *     type: string
	 *     enum: [SAVED, FILED]
	 *     description: >
	 *       Company type
	 *         * `SAVED` - temporarily saved, open for further edits
	 *         * `FILED` - permanently saved, cannot be edited anymore
	 *   ReportElement:
	 *     type: object
	 *     properties:
	 *       element:
	 *         type: string
	 *       mass:
	 *         type: number
	 *   ReportExcessMaterial:
	 *     type: object
	 *     properties:
	 *       impurities:
	 *         type: number
	 *       packagingMaterial:
	 *         type: number
	 *   ReportChemicalComposition:
	 *     type: object
	 *     properties:
	 *       element:
	 *         type: string
	 *       weight:
	 *         type: number
	 *   ReportAdditive:
	 *     type: object
	 *     properties:
	 *       type:
	 *         type: string
	 *       weight:
	 *         type: number
	 *       chemicalComposition:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportChemicalComposition'
	 *   ReportInputFraction:
	 *     type: object
	 *     properties:
	 *       siteRef:
	 *         type: string
	 *       data:
	 *         type: object
	 *         properties:
	 *           processChemistry:
	 *             type: string
	 *           weightInput:
	 *             type: number
	 *           shareOfBatteryType:
	 *             type: number
	 *           weightBatteryType:
	 *             type: number
	 *           excessMaterialReceived:
	 *             type: array
	 *             items:
	 *               $ref: '#/definitions/ReportExcessMaterial'
	 *           elements:
	 *             type: array
	 *             items:
	 *               $ref: '#/definitions/ReportElement'
	 *           descriptionOfMethodologyShare:
	 *             type: string
	 *           descriptionOfMethodologyChemicalComposition:
	 *             type: string
	 *           massOfExternalJacket:
	 *             type: number
	 *           massOfOuterCasings:
	 *             type: number
	 *   ReportOutputFraction:
	 *     type: object
	 *     properties:
	 *       siteRef:
	 *         type: string
	 *       data:
	 *         type: array
	 *         items:
	 *           type: object
	 *           properties:
	 *             element:
	 *               type: string
	 *             mass:
	 *               type: number
	 *             classification:
	 *               type: string
	 *             replacedMaterial:
	 *               type: string
	 *             elementCompound:
	 *               type: string
	 *             shareOutputFraction:
	 *               type: string
	 *   ReportData:
	 *     type: object
	 *     properties:
	 *       information:
	 *         type: object
	 *         properties:
	 *           reportingYear:
	 *             type: number
	 *           recyclingProcess:
	 *             type: string
	 *             description: object-id of the recycling-process
	 *           name:
	 *             type: string
	 *           receiver:
	 *             type: string
	 *             description: object-id of the receiver (company)
	 *       inputFraction:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportInputFraction'
	 *       additives:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportAdditive'
	 *       outputFraction:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportOutputFraction'
	 *       recyclingEfficiency:
	 *         type: object
	 *         properties:
	 *           calculatedEfficiency:
	 *             type: number
	 *       additionalInformation:
	 *         type: object
	 *         properties:
	 *           files:
	 *             type: array
	 *             items:
	 *               type: string
	 *               description: object-id of the asset
	 *           additionalInformation:
	 *             type: string
	 *   ReportMeta:
	 *     type: object
	 *     properties:
	 *       approvedCompanies:
	 *         type: array
	 *         items:
	 *           type: string
	 *           description: object-id of the company
	 *       reportingCompany:
	 *         type: string
	 *         description: object-id of the company
	 *       created:
	 *         type: string
	 *         format: date-time
	 *       lastUpdated:
	 *         type: string
	 *         format: date-time
	 *       deleted:
	 *         type: boolean
	 *       status:
	 *         $ref: '#/definitions/ReportStatuses'
	 *       state:
	 *         type: object
	 *         properties:
	 *           isPristine:
	 *             type: object
	 *             properties:
	 *               information:
	 *                 type: boolean
	 *               inputFraction:
	 *                 type: boolean
	 *               additives:
	 *                 type: boolean
	 *               outputFraction:
	 *                 type: boolean
	 *               recyclingEfficiency:
	 *                 type: boolean
	 *               additionalInformation:
	 *                 type: boolean
	 *   ReportBody:
	 *       type: object
	 *       properties:
	 *         data:
	 *           $ref: '#/definitions/ReportData'
	 *         meta:
	 *           type: object
	 *           properties:
	 *             status:
	 *               $ref: '#/definitions/ReportStatuses'
	 *             state:
	 *               type: object
	 *               properties:
	 *                 isPristine:
	 *                   type: object
	 *                   properties:
	 *                     information:
	 *                       type: boolean
	 *                     inputFraction:
	 *                       type: boolean
	 *                     additives:
	 *                       type: boolean
	 *                     outputFraction:
	 *                       type: boolean
	 *                     recyclingEfficiency:
	 *                       type: boolean
	 *                     additionalInformation:
	 *                       type: boolean
	 *   ReportResponse:
	 *     type: object
	 *     properties:
	 *       _id:
	 *         type: string
	 *       data:
	 *         $ref: '#/definitions/ReportData'
	 *       meta:
	 *         $ref: '#/definitions/ReportMeta'
	 */
	router.use("/reports*", authMiddleware.isLoggedIn);

	/**
	 * @swagger
	 * /api/reports:
	 *   get:
	 *     description: Get all reports
	 *     tags:
	 *       - report
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: query
	 *         name: recycling-process
	 *         type: string
	 *         description: The id of the recycling process
	 *       - in: query
	 *         name: sort
	 *         type: string
	 *         description: Sort the list on "name" or "reportingYear". Prefix with "-" to sort descending. Falls back to "name".
	 *     responses:
	 *       201:
	 *         description: Report array
	 *         schema:
	 *           type: array
	 *           items:
	 *             $ref: '#/definitions/ReportResponse'
	 */
	router.route("/reports")
		.get(
			dataMiddleware.copy,
			dataMiddleware.validate("query", reportValidations.getAllQuery, Errors.ItemNotFound),
			reportController.getAll
		);

	/**
	 * @swagger
	 * /api/reports:
	 *   post:
	 *     description: Create report
	 *     tags:
	 *       - report
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ReportBody'
	 *     responses:
	 *       201:
	 *         description: Report
	 *         schema:
	 *           $ref: '#/definitions/ReportResponse'
	 */
	router.route("/reports")
		.post(
			dataMiddleware.copy,
			dataMiddleware.validate("body", reportValidations.report, Errors.ObjectValidationFailed),
			reportController.create
		);

	/**
	 * @swagger
	 * /api/reports/{id}:
	 *   get:
	 *     description: get a single report
	 *     tags:
	 *       - report
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         type: string
	 *         required: true
	 *     responses:
	 *       201:
	 *         description: Report
	 *         schema:
	 *           $ref: '#/definitions/ReportResponse'
	 */
	router.route("/reports/:id")
		.get(
			dataMiddleware.copy,
			dataMiddleware.validate("params", validationPresets.byId, Errors.ItemNotFound),
			reportController.getOne
		);

	/**
	 * @swagger
	 * /api/reports/{id}:
	 *   put:
	 *     description: update a single report
	 *     tags:
	 *       - report
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         type: string
	 *         required: true
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ReportBody'
	 *     responses:
	 *       201:
	 *         description: Report
	 *         schema:
	 *           $ref: '#/definitions/ReportResponse'
	 */
	router.route("/reports/:id")
		.put(
			dataMiddleware.copy,
			dataMiddleware.validate("params", validationPresets.byId, Errors.ItemNotFound),
			dataMiddleware.validate("body", reportValidations.report, Errors.ObjectValidationFailed),
			reportController.update
		);
};
