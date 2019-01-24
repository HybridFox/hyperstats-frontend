module.exports = {
	server: {
		hostname: "http://rare-a.studiohyperdrive.be",
		frontendHostname: "http://rare-a.studiohyperdrive.be",
		port: 4351,
		cookies: {
			domain: "",
		},
		mongo: {
			url: "mongodb://host.docker.internal:27011/rare",
		},
	},
	gmail: {
		user: "rare.eucobat@gmail.com", // Your gmail address.
		clientId: "835538331238-n0vig3h0hhgqr2cn7hogetabilnh4h3d.apps.googleusercontent.com",
		clientSecret: "6n4Kp6_uan6lmvsx3nqPkwHn",
		refreshToken: "1/iBcrhUR2BTXCsLdEiXKXwmiU8EIrAd4MPHjKU0S7pn4",
	},
};
