var gulp = require('gulp');
var mocha = require('gulp-mocha');


var paths = {
	source: 'src/*.js',
	tests: 'test/test_*.js',
	workspace: 'workspace',
	dest: 'js',
};

gulp.task('build', function() {
	// Build
});

gulp.task('test', function() {
	return gulp.src([paths.tests], { read: false })
		.pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});

gulp.task('default', function() {
  // place code for your default task here
});
