'use strict';

require('./grunt/renderingCompareTask');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('./grunt');

  grunt.initConfig({
    jest: {
      options: {
        coverage: true,
        testPathPattern: /.*-test.js/
      }
    },
    karma: {
      main: {

        options: {
          frameworks: ['jasmine', 'browserify'],
          files: [
            'lib/layout/layoutNode-tests/layout-consts-test.js',
            'lib/layout/layoutNode-tests/layout-random-test.js'
          ],
          preprocessors: {
            'lib/layout/*.js': ['browserify'],
            'lib/layout/layoutNode-tests/*.js': ['browserify']
          },
          browsers: ['Chrome'],
          singleRun: true
        }
      }
    },
    rendering: {

    }
  });

  grunt.registerTask('test', ['jest', 'karma', 'rendering']);

};