const supertest = require("supertest");


module.exports = async(server, {
	email = "validuser@example.com",
	password = "validPassword",
} = {}) => supertest(server)
	.post("/api/auth/login")
	.send({
		email,
		password,
	})
	.then(({ headers, body }) => ({
		cookie: headers["set-cookie"][0],
		body,
	}));

