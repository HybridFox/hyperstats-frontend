/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
const searchCache = module.exports.searchCache = (moduleName, callback) => {
	// Resolve the module identified by the specified name
	let mod;
	const visited = {};

	try {
		mod = require.resolve(moduleName);
	} catch (error) {/**/}

	// Check if the module has been resolved and found within
	// the cache
	if (mod && ((mod = require.cache[mod]) !== undefined)) {
		console.log("found");
		// Recursively go over the results
		(function traverse(m) {
			visited[m.id] = true;
			// Go over each of the module's children and
			// traverse them
			m.children.forEach((child) => {
				if (!visited[child.id]) {
					traverse(child);
				}
			});

			// Call the specified callback providing the
			// found cached module
			callback(m);
		}(mod));
	}
};

/**
 * Removes a module from the cache
 */
module.exports = function purgeCache(moduleName) {
	// Traverse the cache looking for the files
	// loaded by the specified module name
	searchCache(moduleName, (mod) => {
		if (mod.id.indexOf(moduleName) >= 0) {
			delete require.cache[mod.id];
		}
	});

	// Remove cached paths to the module.
	// Thanks to @bentael for pointing this out.
	Object.keys(module.constructor._pathCache).forEach((cacheKey) => {
		if (cacheKey.indexOf(moduleName) >= 0) {
			delete module.constructor._pathCache[cacheKey];
		}
	});
};
