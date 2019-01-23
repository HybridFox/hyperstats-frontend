const UserModel = require("../../models/user");

module.exports = async({
	email = "validuser@example.com",
	password = "validPassword",
	firstname = "validUser",
	lastname = "Smith",
	isValidated = true,
	passwordResetExpire = new Date(new Date().getTime() + 60000), // valid for 1 min
	passwordResetToken = "somePasswordToken",
	companyName = "Test company",
	company = "5c485d0029abc50032947f91",
	isAdmin = false,
} = {}) => {
	const testUser = new UserModel({
		data: {
			email,
			firstname,
			lastname,
			password,
			company,
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
