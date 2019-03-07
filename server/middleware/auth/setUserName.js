module.exports = (req, res, next) => {
	req.data.body.username = req.data.body.email;

	next();
};
