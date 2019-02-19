const dataMiddleware = require("../middleware/data");
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
	 *     required:
	 *      - element
	 *      - mass
	 *   ReportExcessMaterial:
	 *     type: object
	 *     properties:
	 *       impurities:
	 *         type: number
	 *       PackagingMaterial:
	 *         type: number
	 *     required:
	 *      - impurities
	 *      - PackagingMaterial
	 *   ReportChemicalComposition:
	 *     type: object
	 *     properties:
	 *       element:
	 *         type: string
	 *       weight:
	 *         type: number
	 *     required:
	 *      - element
	 *      - weight
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
	 *     required:
	 *      - type
	 *      - weight
	 *   ReportInputFraction:
	 *     type: object
	 *     properties:
	 *       processChemistry:
	 *         type: string
	 *       weightInput:
	 *         type: number
	 *       shareOfBatteryType:
	 *         type: number
	 *       weightBatteryType:
	 *         type: number
	 *       excessMaterialReceived:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportExcessMaterial'
	 *       elements:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportElement'
	 *       descriptionOfMethodologyShare:
	 *         type: string
	 *       descriptionOfMethodologyChemicalComposition:
	 *         type: string
	 *       massOfExternalJacket:
	 *         type: number
	 *       massOfOuterCasings:
	 *         type: number
	 *     required:
	 *       - processChemistry
	 *       - weightInput
	 *       - shareOfBatteryType
	 *       - weightBatteryType
	 *       - excessMaterialReceived
	 *       - elements
	 *       - descriptionOfMethodologyShare
	 *       - descriptionOfMethodologyChemicalComposition
	 *       - massOfExternalJacket
	 *       - massOfOuterCasings
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
	 *           required:
	 *             - element
	 *             - mass
	 *             - classification
	 *             - replacedMaterial
	 *             - elementCompound
	 *             - shareOutputFraction
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
	 *         required:
	 *           - reportingYear
	 *           - recyclingProcess
	 *           - name
	 *           - receiver
	 *       inputFraction:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportAdditive'
	 *       additives:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportInputFraction'
	 *       outputFraction:
	 *         type: array
	 *         items:
	 *           $ref: '#/definitions/ReportOutputFraction'
	 *       recyclingEfficiency:
	 *         type: object
	 *         properties:
	 *           calculatedEfficiency:
	 *             type: object
	 *         required:
	 *           - calculatedEfficiency
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
	 *     required:
	 *       - information
	 *       - recyclingEfficiency
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
	 *   ReportBody:
	 *       $ref: '#/definitions/ReportData'
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
			// TODO: enable this validation again when it's possible to save the report partially based on FILED or SAVED status
			// dataMiddleware.validate("body", reportValidations.report, Errors.ObjectValidationFailed),
			reportController.create
		);
};
