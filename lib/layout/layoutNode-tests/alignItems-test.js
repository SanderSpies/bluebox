/* globals describe, it */
'use strict';

var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('layout-alignItems', function() {
  it ('should align items from the cross axis to flex-start', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, [])
    ]));
  });
  it ('should align items from the cross axis to flex-end', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-end'}, [
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, [])
    ]));
  });
  it ('should align items from the cross axis to center', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'center'}, [
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, [])
    ]));
  });
  it ('should align items from the cross axis to stretch', function() {
    // height: 0 is needed to trigger proper stretch inside the DOM
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'stretch'}, [
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: 0}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())}, []),
      View({}, {width: Math.floor(100 * Math.random()), height: 0}, [])
    ]));
  });
});