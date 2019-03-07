const supertest = require("supertest");

module.exports = async(server, {
	username = "validuser@example.com",
	password = "validPassword",
} = {}) => supertest(server)
	.post("/api/auth/login")
	.send({
		username,
		password,
	})
	.then(({ headers, body }) => ({
		cookie: headers["set-cookie"][0],
		body,
	}));

