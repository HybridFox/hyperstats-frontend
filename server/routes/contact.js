const dataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const contactController = require("../controllers/contact");
const contactValidations = require("../controllers/contact/validations");

module.exports = (router) => {
	/**
	 * @swagger
	 * definitions:
	 *   ContactAdminBody:
	 *     type: object
	 *     properties:
	 *       email:
	 *         type: string
	 *       subject:
	 *         type: string
	 *       body:
	 *         type: string
	 */

	/**
	 * @swagger
	 * /api/contact/send-mail:
	 *   post:
	 *     description: Update profile
	 *     tags:
	 *       - profile
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: body
	 *         name: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/ContactAdminBody'
	 *     responses:
	 *       200:
	 *         description: User profile
	 *         schema:
	 *           type: object
	 *           properties:
	 *             success:
	 *                type: boolean
	 */
	router.route("/contact/send-mail")
		.post(
			dataMiddleware.copy,
			dataMiddleware.validate("body", contactValidations.sendMail, Errors.ObjectValidationFailed),
			contactController.sendMail
		);
};
