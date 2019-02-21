module.exports = (_id, companyOfUser, isAdmin = false) => ({
	_id,
	"meta.deleted": false,
	...(!isAdmin ? {
		$or: [
			{ "meta.managedBy": companyOfUser },
			{ "_id": companyOfUser },
		],
	} : {}),
});
