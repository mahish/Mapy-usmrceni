// Gruntfile.js needs Grunt to be installed to make this file usefull in any way
//
// PostCSS
// https://github.com/nDmitry/grunt-postcss
// + plugins defined in package.json

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

		// POSTCSS
		postcss: {
			options: {
      map: true, // inline sourcemaps

      processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 7']}), // add vendor prefixes https://github.com/ai/browserslist#queries
        require('cssnano')() // minify the result
        ]
      },
      dist: {
      	expand: true,
      	flatten: true,
      	src: 'css/*.css',
      	dest: 'css'
      }
    },

    // WATCH
    watch: {
    	postcss: {
    		files: 'css/*.css',
    		tasks: ['postcss']
    	}
    }
  });

	grunt.registerTask('default', ['watch', 'postcss']);
};