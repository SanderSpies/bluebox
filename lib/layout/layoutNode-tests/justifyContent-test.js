/* globals describe, it */
'use strict';

var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('justifyContent', function() {

  it ('should align justifyContent: flex-start (column)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'column', height: 1000, justifyContent: 'flex-start'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });

  it ('should align justifyContent: flex-start (row)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', justifyContent: 'flex-start'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));

  });

  it ('should align justifyContent: flex-end (column)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};
    testStructure(View({}, {flexDirection: 'column', height: 1000, justifyContent: 'flex-end'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });

  it ('should align justifyContent: flex-end (row)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', justifyContent: 'flex-end'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });

  it ('should align justifyContent: center (column)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'column', height: 1000, justifyContent: 'center'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });
  it ('should align justifyContent: center (row)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', justifyContent: 'center'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });

  it ('should align justifyContent: space-between (column)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'column', height: 1000, width: 1000, justifyContent: 'space-between'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });

  it ('should align justifyContent: space-between (row)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: 100};

    testStructure(View({}, {height: 100, width: 1000, flexDirection: 'row', justifyContent: 'space-between'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });

  it ('should align justifyContent: space-around (column)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'column', height: 1000, width: 1000, justifyContent: 'space-around'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])
    ]));
  });

  it ('should align justifyContent: space-around (row)', function() {
    var sharedStyle = {width: Math.floor(100 * Math.random()), height: Math.floor(100 * Math.random())};

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, justifyContent: 'space-around'}, [
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, []),
      View({}, sharedStyle, [])

    ]));
  });

});
