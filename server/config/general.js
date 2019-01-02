module.exports = {
	state: {
		test: false,
		production: false,
	},
	server: {
		environments: require("./envs"),
		cookies: {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			name: "rare-app",
			secret: "xYs8rGsfW7Xwwpr6Ac73DMqCjLnVztVPBA3yPebaoi3ZimFc78mpi4zLVfQzTWyo",
		},
	},
};
