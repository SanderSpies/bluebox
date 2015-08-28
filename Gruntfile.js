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
            'lib/layout/layoutNode-tests/flexDirection-test.js',
            'lib/layout/layoutNode-tests/justifyContent-test.js',
            'lib/layout/layoutNode-tests/alignItems-test.js',
            'lib/layout/layoutNode-tests/alignSelf-test.js',
            'lib/layout/layoutNode-tests/flexGrow-test.js'
          ],
          preprocessors: {
            'lib/layout/layoutNode-tests/*-test.js': ['browserify']
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