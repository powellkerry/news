module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            my_target: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['AppController.js', 'controllers/*.js', 'factories/*.js', 'social.js']
                }
            }
        },
        jshint: {
            all: ['AppController.js', 'controllers/*.js', 'factories/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['uglify', 'jshint']);

};