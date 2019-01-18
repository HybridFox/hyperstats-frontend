module.exports = {
	state: {
		test: true,
	},
	server: {
		port: 4352,
		cookies: {
			domain: "",
		},
		mongo: {
			url: process.env.CIRCLECI ? "mongodb://localhost:27017/rare" : "mongodb://mongodb-rare/rare",
		},
	},
	gmail: {

	},
};
