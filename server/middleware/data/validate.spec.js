const Joi = require("joi");
const expect = require("chai").expect;
const validate = require("./validate");
const Errors = require("../../helpers/errorHandler");

describe("Validate data middleware", () => {
	it("Should continue without errors", (done) => {
		const preset = {
			options: {},
			schema: Joi.object().keys({
				string: Joi.string().required().valid("value"),
				number: Joi.number().required(),
			}),
		};
		const req = {
			data: {
				body: {
					string: "value",
					number: 1,
				},
			},
		};
		const res = {};

		validate("data", preset, Errors.ObjectValidationFailed, req, res, (err) => {
			expect(err).to.be.undefined;
			expect(req.data.body).to.have.all.keys([
				"string",
				"number",
			]);
			expect(req.data.body.string).to.be.a("string");
			expect(req.data.body.number).to.be.a("number");
			done();
		});
	});

	it("Should stop when the validation failed", (done) => {
		const preset = {
			options: {},
			schema: Joi.object().keys({
				string: Joi.string().required().valid("value"),
			}),
		};
		const req = {
			data: {
				body: {
					value: "string",
				},
			},
		};
		const res = {};
		const next = () => { };

		expect(() => {
			validate("body", preset, Errors.ObjectValidationFailed, req, res, next);
		}).to.throw(Error, "OBJECT_VALIDATION_FAILED");

		done();
	});

	it("Should set the default validation failed", (done) => {
		const preset = {
			options: {},
			schema: Joi.object().keys({
				string: Joi.string().required().valid("value"),
			}),
		};
		const req = {
			data: {
				body: {
					value: "string",
				},
			},
		};
		const res = {};
		const next = () => { };

		expect(() => {
			validate("body", preset, undefined)(req, res, next);
		}).to.throw(Error, "OBJECT_VALIDATION_FAILED");

		done();
	});
});
