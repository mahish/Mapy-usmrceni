// Gruntfile.js needs Grunt to be installed to make this file usefull in any way
//
// Autoprefixer
// npm install grunt-cli grunt-contrib-watch grunt-autoprefixer

module.exports = function (grunt) {
	grunt.initConfig({
		autoprefixer: {
			dist: {
				files: {
					'css/style.css': 'css/style.css'
				}
			}
		},
		watch: {
			styles: {
				files: ['style.css'],
				tasks: ['autoprefixer']
			}
		}
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
};