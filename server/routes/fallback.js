module.exports = (req, res, next) => {
	return next({
		name: "NOT_FOUND",
		message: "ITEM_NOT_FOUND",
		stack: `No resource found for ${req.originalUrl} found.`,
	});
};
