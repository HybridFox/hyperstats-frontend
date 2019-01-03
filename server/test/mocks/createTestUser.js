const UserModel = require("../../models/user");

module.exports = async(
	email = "validuser@example.com",
	password = "validPassword",
	firstname = "validUser",
	lastname = "Smith"
) => {
	const testUser = new UserModel({
		data: {
			email,
			firstname,
			lastname,
		},
		meta: {
			validated: true,
		},
	});

	testUser.data.password = await testUser.generateHash(password);

	await testUser.save();
};
