/**
 * Gulpfile for PC-Cleaner-V2
 * By XPTGR
 **/

// gulp packages
const gulp    = require("gulp");
const fs      = require("fs");
const clean   = require("gulp-clean");
const rename  = require("gulp-rename");
const header  = require("gulp-header");

// gulp paths
const path = {
  build: "./dist",
  source: "./source"
};

// white label & copyright label
const whtlbl = JSON.parse(fs.readFileSync(path.source+'/config.json'));
const pkg = JSON.parse(fs.readFileSync('package.json'));
const whtlbldata = {
  whtlblbanner: [
    'cls',
    '@echo off',
    'REM =============================',
    'REM Setup Variables',
    'REM =============================',
    'set appname=<%= title %>',
    'set appvers=<%= version %>',
    'set appstat=<%= status %>',
    'set dev=<%= dev %>',
    'set desc=<%= description %>',
    'set uicolor=<%= uicolor %>',
    'set infouicolor=<%= infouicolor %>',
    'set erruicolor=<%= erruicolor %>',
    'set cliN=$%appname%Cleaner\n',
  ].join('\n'),
}
const copydata = {
  copybanner: [
    'REM =============================',
    'REM PC-Cleaner-V2 - <%= homepage %>',
    'REM <%= description %>',
    'REM Version: <%= version %>',
    'REM Github: <%= github %>',
    'REM Licensed Under The MIT License: http://opensource.org/licenses/MIT',
    'REM Copyright (c) <%= new Date().getFullYear() %> <%= author %>',
    'REM ',
    'REM Discord: XPTGR#0636',
    'REM Github: XPTGR',
    'REM Server: discord.gg/qmvWAJ3Nne',
    'REM ',
    'REM =============================\n\n',
  ].join('\n'),
};

/**
 * Gulp Tasks
 * Writen by XPTGR
 */

// add white label
function whitelabel() {
  return gulp
    .src([path.source+'/core.bat'], {allowEmpty: true})
    .pipe(header(whtlbldata.whtlblbanner, whtlbl))
    .pipe(gulp.dest([path.build]));
}

// add copyright label
function copyright() {
  return gulp
    .src([path.build+'/core.bat'], {allowEmpty: true})
    .pipe(header(copydata.copybanner, pkg))
    .pipe(rename(whtlbl.filename+'-'+whtlbl.version+'.bat'))
    .pipe(gulp.dest([path.build]));
}

// delete temporary build
function delcore() {
  return gulp
    .src(path.build+'/core.bat', {read: false})
    .pipe(clean());
}

// copy build to root
function copytoroot() {
  return gulp
    .src(path.build+'/*.bat')
    .pipe(gulp.dest('./'));
}

// clean production folder
function cleanprod() {
  return gulp
    .src(path.build)
    .pipe(clean());
}

// clean existing builds
function cleanroot() {
  return gulp
    .src('./*.bat')
    .pipe(clean());
}

// gulp series
const build = gulp.series([whitelabel, copyright, delcore, copytoroot]);
const cleandev = gulp.series([cleanprod, cleanroot]);

// gulp commands
exports.whitelabel = whitelabel;
exports.copyright = copyright;
exports.delcore = delcore;
exports.copytoroot = copytoroot;
exports.cleanprod = cleanprod;
exports.cleanroot = cleanroot;
exports.cleandev = cleandev;
exports.build = build;
exports.default = build;