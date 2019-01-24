const glob = require("glob");

module.exports = () => {
	glob.sync("./fixtures/**/!(index).js", {
		absolute: true,
	}).forEach((path) => {
		require(path)();
	});
};
