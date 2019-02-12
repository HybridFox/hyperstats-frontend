module.exports = (_id, companyOfUser) => ({
	_id,
	"meta.deleted": false,
	$or: [
		{ "meta.managedBy": companyOfUser },
		{ "_id": companyOfUser },
	],
});
