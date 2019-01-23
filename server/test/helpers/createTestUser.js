const UserModel = require("../../models/user");
const testCompany = require("./testCompany");

module.exports = async({
	email = "validuser@example.com",
	password = "validPassword",
	firstname = "validUser",
	lastname = "Smith",
	isValidated = true,
	passwordResetExpire = new Date(new Date().getTime() + 60000), // valid for 1 min
	passwordResetToken = "somePasswordToken",
	companyName = "Test company",
	company,
	isAdmin = false,
} = {}) => {
	const newCompany = company || (await testCompany.create({
		data: {
			name: "Company for user",
			address: {
				street: "user street",
				number: "2a",
				zipCode: "3333",
				city: "WAZAAA",
				country: "BE",
			},
		},
	}))._id;

	const testUser = new UserModel({
		data: {
			email,
			firstname,
			lastname,
			password,
			company: newCompany,
		},
		meta: {
			validation: {
				isValidated,
				companyName,
				token: "someToken",
			},
			passwordReset: {
				token: passwordResetToken,
				expireDate: passwordResetExpire,
			},
			isAdmin,
		},
	});

	testUser.data.password = await testUser.generateHash(password);

	await testUser.save();
};
