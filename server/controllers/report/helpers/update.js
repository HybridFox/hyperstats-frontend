const { mergeDeepLeft, pathOr } = require("ramda");
const ReportModel = require("../../../models/report");
const errors = require("../../../helpers/errorHandler");
const getReportQuery = require("./getQuery");
const { REPORT_STATUS } = require("./const");
const mailer = require("../../../helpers/mail");
const ResponseError = require("../../../helpers/errors/responseError");
const UserModel = require("../../../models/user");
const path = require("path");


const mailReportToUsers = (companyEmailList, id) => mailer({
	to: companyEmailList,
	subject: "Rare - Report filed",
	templatePath: path.resolve(process.cwd(), "controllers/report/templates/filedReport.html"),
	data: {
		confirmPath: `/recycler/reports/${id}`,
	},
}).catch(async(error) => {
	await companyEmailList.remove();

	throw new ResponseError({ type: 500, msg: "Sending mail failed", error });
});

const getCurrentReport = async(id, query) => {
	const report = await ReportModel.findOne(query).lean().exec();

	if (!report) {
		throw errors.ItemNotFound;
	}

	if (pathOr(REPORT_STATUS.FILED, ["meta", "status"], report) === REPORT_STATUS.FILED) {
		throw errors.ItemCannotBeUpdated;
	}

	return report;
};

const updateReport = async(id, query, updatedData, updatedStatus, updatedState, currentReport, reportedById) => {
	const report = await ReportModel.findOneAndUpdate(
		query,
		{ $set: mergeDeepLeft({
			data: updatedData,
			meta: {
				status: updatedStatus,
				state: updatedState,
				lastUpdated: new Date(),
			},
		}, currentReport) },
		{ new: true }
	);

	if (!report) {
		throw errors.ItemNotFound;
	}

	if (updatedStatus === REPORT_STATUS.FILED) {
		const users = await UserModel.find({ "meta.deleted": false, "data.company": reportedById }).select("data.email").exec();
		const companyEmailList = users.reduce((acc, user) => [...acc, user.data.email], []);

		await Promise.all([
			mailReportToUsers(companyEmailList, id),
		]);
	}

	return report;
};

module.exports = async({ _id, reportedById, updatedData, updatedStatus, updatedState } = {}) => {
	const query = getReportQuery(_id, reportedById);
	const currentReport = await getCurrentReport(_id, query, reportedById);

	return await updateReport(_id, query, updatedData, updatedStatus, updatedState, currentReport, reportedById);
};
