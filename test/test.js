
var srcOrdered = require("../index.js");
var path = require('path');
var gulp = require('gulp');
var Promise = require('promise');

var NUM_ITERATIONS = 1;

function testOrdering(srcFn) {
	var _resolve, _reject;
	var promise = new Promise(function(resolve, reject) {
		_resolve = resolve;
		_reject = reject;
	});

	setTimeout(
		function() {
			_testOrdering(srcFn, _resolve, _reject, NUM_ITERATIONS);
		},
		0
	);

	return promise;
}

function _testOrdering(srcFn, resolve, reject, remainingIterations) {

	var stream = srcFn('test/test_files/**/*.txt');

	var last = null;
	stream.on('data', function(file) {
		var basename = path.basename(file.path);

		if( last !== null && last >= basename ) {
			reject(basename + ' should come before ' + last);
		}
		else {
			// console.log('Passed! (' + basename + ')');
		}
		last = basename;
	});

	stream.on('end', function() {
		remainingIterations -= 1;
		if(remainingIterations <= 0) {
			resolve();
		}
		else {
			_testOrdering(srcFn, resolve, reject, remainingIterations);
		}
	});
}

// Test that files are returned in the correct order
// (alphabetical) by our srcOrdered function
exports.testPositive = function(test) {
	var promise = testOrdering(srcOrdered);
	test.promise(5, promise);
};

// Test that files would not be returned in the correct
// order (alphabetical) without our srcOrdered function.
exports.testNegative = function(test) {
	test.asyncBegin(5);

	var srcFn = function() {
		return gulp.src.apply(gulp, arguments);
	};
	var promise = testOrdering(srcFn);
	
	promise.then(
		function() {
			test.fail(new Error('Failure: the negative test failed to fail.'));
		},
		function(err) {
			test.asyncEnd();
		}
	);
};

