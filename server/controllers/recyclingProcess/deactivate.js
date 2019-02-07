const { setActiveProp } = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	setActiveProp(req.params.id, false)
		.then(() => res.status(200).json({ success: true }))
		.then((error) => next(error));
};
