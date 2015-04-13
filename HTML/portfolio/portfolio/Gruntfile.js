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
                'app/assets/styles.css': 'app/assets/styles.scss'
            }
        }
    },

		connect: {
			server: {
				options: {
					port: port,
					base: 'app',
          livereload: true,
          open: true
				}
			}
		},

		watch: {
			src: {
				files: ['app/src/**/*', 'app/index.html'],
			},
			styles: {
				files: ['app/assets/**/*.scss'],
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
