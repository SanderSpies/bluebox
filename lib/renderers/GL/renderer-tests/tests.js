'use strict';

var phantom = require('phantom');
var resemble = require('resemblejs');

var tester = {
  run: function() {
    return new Promise(function(resolve, reject) {
      phantom.create(function(ph) {
        ph.createPage(function(page) {
          page.viewportSize = {width: 1024, height: 768};
          //the clipRect is the portion of the page you are taking a screenshot of
          page.clipRect = {top: 0, left: 0, width: 1024, height: 768};

          page.open('lib/renderers/GL/renderer-tests/flexbox.html', function(result) {
            page.render('google.png');
            ph.exit();
            resolve();
          });
        });
      });
    });
  }
};

//tester.run();

module.exports = tester;
