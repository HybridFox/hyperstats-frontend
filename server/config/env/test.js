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
			url: "mongodb://host.docker.internal:27011/rare",
		},
	},
};
