var _ = require('underscore');

function deglob() {
	var syncGlob = require('glob').sync,
		patterns = _.flatten(arguments, true);

	return _.flatten(patterns.map(function(pattern) {
		return syncGlob(pattern).map(function(file) {
			return pattern.charAt(0) === '!' ? ('!' + file) : file;
		});
	}), true);
}

module.exports = function () {
	return gulp.src(deglob(arguments));
};

