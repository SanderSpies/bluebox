var tester = require('../lib/renderers/GL/renderer-tests/tests.js');

module.exports = function(grunt) {
  grunt.registerTask('rendering', '', function() {
    var done = this.async();
    tester.run().then(function() {
      done();
    })
  });
};