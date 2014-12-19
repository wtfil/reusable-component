var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var server = require('http-server');
var browserify = require('browserify');

function asset(file) {
    return __dirname + '/' + file;
}

var files = {
    main: 'index.js',
    example: {
        root: 'examples',
        src: asset('examples/index.js'),
        dst: asset('examples/_index.js')
    }
};

gulp.task('js', function () {
    var b = browserify();
    var dst = fs.createWriteStream(files.example.dst);
    b.add(files.example.src);
    return b.bundle().pipe(dst);
});

gulp.task('js-watch', function () {
    gulp.watch(files.main, ['js']);
    gulp.watch(files.example.src, ['js']);
});

gulp.task('server', function () {
	var port = process.env.NODE_PORT || 3000;
	server.createServer({
        root: files.example.root
    }).listen(port);
	gutil.log('Server started at ' + gutil.colors.green('http://127.0.0.1:' + port));
});

gulp.task('example', ['server', 'js-watch']);
