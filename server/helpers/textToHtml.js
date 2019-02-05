module.exports = (text) => {
	const conversionMap = {
		"&": "&amp",
		"<": "&lt",
		">": "&gt",
		"\"": "&quot",
		"'": "&#39",
	};

	return text
		.replace(new RegExp(`(${Object.keys(conversionMap).join("|")})`, "g"), (match) => conversionMap[match])
		.replace(/(?:\r\n|\r|\n)/g, "<br>");
};
