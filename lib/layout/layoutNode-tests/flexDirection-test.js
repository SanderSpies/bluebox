/* globals describe, it */
'use strict';

var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('layout-flexDirection', function() {

  it ('should order items by column', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'column'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));

  });

  it ('should order items by row', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));

  });

  it ('should render items with no flexDirection as flexDirection:column', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));

  });

  it ('should properly next items with different flexDirections', function() {
    testStructure(View({}, {flexDirection: 'row'}, [
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {flexDirection: 'column', width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, [
          View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
          View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
          View({}, {flexDirection:'row', width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, [
            View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
            View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
            View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, [])
          ])
      ])
    ]));
  });

});