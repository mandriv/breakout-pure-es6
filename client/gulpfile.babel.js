import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import del from 'del';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';
import uglify from 'gulp-uglify';
import critical from 'critical';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';

// Serve tasks - dev

const bundlerCfg = {
  entries: 'src/index.js',
  debug: true,
};
const buildBundlerCfg = {
  entries: 'src/index.js',
  debug: false,
};
const bundler = watchify(browserify(bundlerCfg).transform(babelify));
const buildBundler = watchify(browserify(buildBundlerCfg).transform(babelify));
const dirs = {
  tmp: 'tmp',
  dist: 'dist',
};

gulp.task('clean', () => (
  del([`${dirs.tmp}/**`, `!${dirs.tmp}`])
));

gulp.task('clean:html', () => (
  del([`${dirs.tmp}/**/*.html`, `!${dirs.tmp}`])
));

gulp.task('clean:scripts', () => (
  del([`${dirs.tmp}/scripts.js`])
));

gulp.task('clean:worker', () => (
  del([`${dirs.tmp}/cache-polyfill.js`, `${dirs.tmp}/worker.js`])
));

gulp.task('clean:css', () => (
  del([`${dirs.tmp}/**/*.css`, `!${dirs.tmp}`])
));

gulp.task('html', ['clean:html'], () => (
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest(dirs.tmp))
    .pipe(connect.reload())
));

gulp.task('scripts', ['clean:scripts'], () => (
  bundler
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dirs.tmp))
    .pipe(connect.reload())
));

gulp.task('assets', ['clean'], () => {
  gulp.src('./assets/*', { base: './assets' })
    .pipe(gulp.dest(dirs.tmp));
});

gulp.task('sass', ['clean:css'], () => (
  gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: '> 5%',
      grid: true,
    }))
    .pipe(gulp.dest(dirs.tmp))
    .pipe(connect.reload())
));

gulp.task('connect', () => {
  connect.server({
    root: dirs.tmp,
    livereload: true,
    port: 3000,
  });
});

// Build task - gulp build

// 1. rm -rf ./dist
gulp.task('clean:build', () => (
  del([`${dirs.dist}/**`, `!${dirs.dist}`])
));

// 2. minify html
gulp.task('html:build', ['clean:build'], () => (
  gulp.src('./src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true,
      removeRedundantAttributes: true,
    }))
    .on('error', err => console.error(err))
    .pipe(gulp.dest(dirs.dist))
));

// 3. bundle and uglify js
gulp.task('scripts:build', ['clean:build'], () => (
  buildBundler
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', err => console.error(err))
    .pipe(gulp.dest(dirs.dist))
));

// 5. copy assets
gulp.task('assets:build', ['clean'], () => {
  gulp.src('./assets/*', { base: './assets' })
    .pipe(gulp.dest(dirs.dist));
});

// 5. Compile sass to css
gulp.task('sass:build', ['clean:build'], () => (
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: '> 5%',
      grid: true,
    }))
    .pipe(csso({ sourceMap: false }))
    .on('error', err => console.error(err))
    .pipe(gulp.dest(dirs.dist))
    .pipe(connect.reload())
));

// 6. Inline critial styles
gulp.task('critical', ['html:build', 'sass:build'], () => {
  critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index.html',
    dest: 'dist/index.html',
    css: ['dist/styles.css'],
    width: 1300,
    height: 900,
    minify: true,
    extract: true,
  });
});


gulp.task('watch', [], () => {
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/**/*.js'], ['scripts']);
  gulp.watch(['src/**/*.scss'], ['sass']);
});

// The good stuff
gulp.task('serve', ['clean', 'html', 'scripts', 'assets', 'sass', 'connect', 'watch']);
gulp.task('build', ['clean:build', 'html:build', 'scripts:build', 'assets:build', 'sass:build', 'critical', 'test-build']);
gulp.task('default', ['serve']);
