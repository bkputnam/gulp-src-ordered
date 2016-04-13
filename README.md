# gulp-src-ordered
Gulp plugin that provides gulp.src-like functionality with well-defined ordering.
Much of the inspiration for this code was taken from this StackOverflow question:

http://stackoverflow.com/questions/28486866/gulp-src-using-sync-globbing#answer-28548018

## Usage

```
npm install https://github.com/bkputnam/gulp-src-ordered.git
```

```
var srcOrdered = require('gulp-src-ordered');
var gulp = require('gulp');

gulp.task('fooTask', function() {
	return srcOrdered('*.js') // use srcOrdered as a drop-in replacement for gulp.src
		.dest('./dist');
});
```

## Development

To test: `npm test`

This project uses [just-test-it](https://www.npmjs.com/package/just-test-it) for testing.

