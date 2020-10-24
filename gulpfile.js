const { src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();

// Static server
function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  watch("./*.html").on("change", browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on("change", browserSync.reload);
}

//css min
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");

function toCssMin() {
  return src("./**/*.css")
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist"));
}

//sass
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
    .pipe(sass())
     .pipe(
       autoprefixer({
         cascade: false,
       })
    )
    .pipe(dest("./css"))
    .pipe(browserSync.stream());
}

exports.serve = bs;
exports.toCssMin = toCssMin;
