/* globals describe, it */
'use strict';

var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('alignItems', function() {
  it ('should align items from the cross axis to flex-start', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });
  it ('should align items from the cross axis to flex-end', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-end'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });
  it ('should align items from the cross axis to center', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'center'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });
  it ('should align items from the cross axis to baseline ', function() {

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'baseline'}, [
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, [])
    ]));
  });
  it ('should align items from the cross axis to stretch', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'stretch'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });
});