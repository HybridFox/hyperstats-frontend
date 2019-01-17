const UserModel = require("../../models/user");

module.exports = async({
	email = "validuser@example.com",
	password = "validPassword",
	firstname = "validUser",
	lastname = "Smith",
	isValidated = true,
	passwordResetExpire = new Date(new Date().getTime() + 60000), // valid for 1 min
	passwordResetToken = "somePasswordToken",
} = {}) => {
	const testUser = new UserModel({
		data: {
			email,
			firstname,
			lastname,
			password,
		},
		meta: {
			validation: {
				isValidated,
				token: "someToken",
			},
			passwordReset: {
				token: passwordResetToken,
				expireDate: passwordResetExpire,
			},
		},
	});

	testUser.data.password = await testUser.generateHash(password);

	await testUser.save();
};
