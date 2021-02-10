const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
  return src('sass/main.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('public/assets/styles', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: './public',
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browsersyncReload);
  watch(['sass/**/*.scss'], series(scssTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(scssTask, browsersyncServe, watchTask);
