const CompanyModel = require("../../models/company");
const companyMock = require("../mocks/company");

module.exports.create = async(company = companyMock) => new CompanyModel(company).save();
module.exports.remove = (_id = companyMock._id) => CompanyModel.remove({ _id });
