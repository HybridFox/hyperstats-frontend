module.exports = (req, res, next) => {
	req.data = {
		body: req.body,
		headers: req.headers,
		params: req.params,
		query: req.query,
	};
	next();
};
