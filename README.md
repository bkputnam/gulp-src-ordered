# gulp-src-ordered
Gulp plugin that provides gulp.src-like functionality with well-defined ordering.
Much of the inspiration for this code was taken from this StackOverflow question:

http://stackoverflow.com/questions/28486866/gulp-src-using-sync-globbing#answer-28548018

## Status of this Project

I think my `srcOrdered` function is correct, but there are some issues that are still nagging me.
Specifically, I have two unit tests, `testPositive` and `testNegative`. The positive
test checks that files come out of our `srcOrdered` function in the order that we
expect. The negative test checks that this _wouldn't_ happen in the correct order
without `srcOrdered` (using `gulp.src` instead). I can't get `testNegative` to pass:
in every environment that I've tested `gulp.src` returns the files in the 'correct'
order without any help. I'm pretty sure this issue is real because I've seen it
myself and other people have reported it on the internet (see the SO link above),
but now that I want to reproduce it I can't figure out how.

## Usage

```bash
npm install https://github.com/bkputnam/gulp-src-ordered.git
```

```javascript
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

