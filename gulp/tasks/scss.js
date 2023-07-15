import dartSass from "sass";
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-clean-css";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemap: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'Scss',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss({
					webpClass: ".webp",
					noWebpClass: ".no-webp"
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserlist: ["last 3 version"],
					cascade: true
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.css)) //Если нужен не сжатый файл стилей
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}