module.exports = {
	state: {
		test: false,
		production: false,
	},
	server: {
		environments: require("./envs"),
		cookies: {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			name: "MySession",
			secret: "My$€cr€T",
		},
	},
};
