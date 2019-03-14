const ReportModel = require("../../../models/report");
const Errors = require("../../../helpers/errorHandler");
const { REPORT_STATUS } = require("../../../controllers/report/helpers/const");

module.exports = (companyOfUser) => {
	return ReportModel.aggregate([
		{
			$match: {
				$or: [
					{ "meta.reportingCompany": companyOfUser },
					{ "meta.approvedCompanies.approvedBy": companyOfUser },
				],
				"meta.deleted": false,
				"meta.status": REPORT_STATUS.FILED,
			},
		},
		{
			$unwind: "$meta.approvedCompanies",
		},
		{
			$group: {
				_id: {
					recyclingProcess: "$data.information.recyclingProcess",
					company: "$meta.approvedCompanies.company",
				},
				reports: { $push: "$$ROOT" },
			},
		},
		{
			$lookup: {
				from: "recyclingprocesses",
				localField: "_id.recyclingProcess",
				foreignField: "_id",
				as: "recyclingProcess",
			},
		},
		{
			$project: {
				_id: 1,
				recyclingProcess: { $arrayElemAt: ["$recyclingProcess", 0] },
				reports: 1,
			},
		},
		{
			$group: {
				_id: "$_id.company",
				processes: { $push: {
					process: "$recyclingProcess",
					reports: "$reports",
				} },
			},
		},
		{
			$lookup: {
				from: "companies",
				localField: "_id",
				foreignField: "_id",
				as: "companies",
			},
		},
		{
			$project: {
				_id: 0,
				proxyCompanyId: "$_id",
				company: { $arrayElemAt: [ "$companies", 0] },
				processes: 1,
			},
		},
		{
			$project: {
				"proxyCompanyId": 1,
				"proxyCompanyName": "$company.data.name",
				"processes.process._id": 1,
				"processes.process.data.name": 1,
				"processes.reports._id": 1,
				"processes.reports.data.information.name" : 1,
				"processes.reports.data.information.reportingYear": 1,
				"processes.reports.data.information.recyclingProcess": 1,
				"processes.reports.meta.created": 1,
				"processes.reports.meta.status": 1,
			},
		},
	]).exec();
};
