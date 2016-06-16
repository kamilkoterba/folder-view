module.exports = function (grunt) {
  grunt.initConfig({
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          'public/styles/app.min.css': ['public/styles/app.css'],
        },
      },
    },
    sass: {
      dist: {
        files: {
          'public/styles/app.css': 'styles/app.scss',
        },
      },
    },
    watch: {
      source: {
        files: ['styles/**/*.scss'],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true, // needed to run LiveReload
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass', 'cssmin']);
};
