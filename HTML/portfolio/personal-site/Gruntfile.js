/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'css/look.css': 'css/look.scss'
            }
        }
    },

		connect: {
			server: {
				options: {
					port: port,
					base: '.',
          livereload: true,
          open: true
				}
			}
		},

		watch: {
			src: {
				files: ['js/**/*', 'index.html'],
			},
			styles: {
				files: ['css/**/*.scss'],
				tasks: ['sass'],
			},
			options: {
					livereload: true
			},
	  },

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );
};
