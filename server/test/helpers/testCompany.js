const CompanyModel = require("../../models/company");
const companyMock = require("../mocks/company");

module.exports.create = () => new CompanyModel(companyMock).save();
module.exports.remove = (_id = companyMock._id) => CompanyModel.remove({ _id });
