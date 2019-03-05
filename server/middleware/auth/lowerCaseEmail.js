module.exports = (req, res, next) => {
	req.data.body.email = req.data.body.email.toLowerCase();

	next();
};
