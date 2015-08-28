/* globals describe, it */
'use strict';

var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('flexGrow', function() {
  it ('should grow automatically (row)', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start'}, [
      View({}, {flexGrow: 1, height: 100, width: 0}, []),
      View({}, {flexGrow: 3, height: 100, width: 0}, []),
      View({}, {flexGrow: 1, height: 100, width: 0}, []),
      View({}, {flexGrow: 2, height: 100, width: 50}, [])
    ]));
  });

  it ('should grow automatically (column)', function() {
    testStructure(View({}, {flexDirection: 'column', height: 1000, width: 1000, alignItems: 'flex-start'}, [
      View({}, {flexGrow: 1, height: 0, width: 100}, []),
      View({}, {flexGrow: 3, height: 0, width: 100}, []),
      View({}, {flexGrow: 1, height: 50, width: 100}, []),
      View({}, {flexGrow: 2, height: 0, width: 100}, [])
    ]));
  });

});