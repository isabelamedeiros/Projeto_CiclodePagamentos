 //start do servidor

 const gulp = require('gulp')
 const watch = require('gulp-watch') 
 const webserver = require('gulp-webserver')

 //monitoramento de arquivos da app

 gulp.task('watch', () => {
     watch('app/**/*.html', () => gulp.start('app.html')) //* qualquer arquivo html se modificado vai disparar a task gulp task
     watch('app/**/*.css', () => gulp.start('app.css'))
     watch('app/**/*.js', () => gulp.start('app.js'))
     watch('app/**/*.*', () => gulp.start('app.assets'))

 })
//inicializa o servidor
 gulp.task('server', ['watch'], () => {
     return gulp.src('public').pipe(webserver({
         livereload: true,
         port: 3000,
         open: true
     }))

 })