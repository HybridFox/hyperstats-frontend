const UserModel = require("../../models/user");
const testCompany = require("./testCompany");

module.exports = async({
	email = "validuser@example.com",
	password = "validPassword",
	firstname = "__firstname_test-user__remove_identifier__",
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
			vat: "BE12 3456 7890",
			address: {
				street: "user street",
				number: "2a",
				zipCode: "3333",
				city: "WAZAAA",
				country: "BE",
			},
		},
		meta: {
			type: "R",
		},
	}))._id;

	const testUser = new UserModel({
		data: {
			email,
			username: email,
			firstname,
			lastname,
			password,
			company: newCompany,
		},
		meta: {
			status: {
				type: "PENDING",
			},
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

	return testUser.toObject();
};
