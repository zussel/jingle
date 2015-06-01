module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            "api/vendor",
            "app/vendor",
            "build"
        ],
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            jingle: [{
                expand: true,
                cwd: 'app',
                src: ['**/*.js'],
                dest: 'tmp/js',   // Destination path prefix
                ext: '.js',       // Dest filepaths will have this extension.
                extDot: 'last'    // Extensions in filenames begin after the last dot
            }]
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: ['gruntfile.js', 'app/**/*.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ng-annotate');

    // Default task(s).
    grunt.registerTask('default', ['ngAnnotate']);

};