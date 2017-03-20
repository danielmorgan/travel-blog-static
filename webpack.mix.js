const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/js/app.js', 'dist/js');
mix.sass('src/sass/app.scss', 'dist/css')

if (! mix.config.inProduction) {
    mix.sourceMaps();
}

if (mix.config.inProduction) {
    mix.version();
}

mix.browserSync({ proxy: 'localhost:8000' });

mix.disableNotifications();
