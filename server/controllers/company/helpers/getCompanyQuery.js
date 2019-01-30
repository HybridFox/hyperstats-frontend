module.exports = (_id, companyOfUser) => ({
	_id,
	$or: [
		{ "meta.managedBy": companyOfUser },
		{ "_id": companyOfUser },
	],
});
