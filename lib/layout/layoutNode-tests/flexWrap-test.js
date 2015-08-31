/* globals describe, it */
'use strict';

var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('flexWrap', function() {

  describe('it should render justifyContent = flex-start on multiple lines (row)', function() {
      testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
        View({}, {width: 300, height: 20}, []),
        View({}, {width: 300, height: 30}, []),
        View({}, {width: 300, height: 10}, []),
        View({}, {width: 300, height: 77}, [])
      ]));
  });

  describe('it should render justifyContent = center on multiple lines (row)', function() {
    testStructure(View({}, {justifyContent: 'center', flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });
  describe('it should render justifyContent = flex-end on multiple lines (row)', function() {
    testStructure(View({}, {justifyContent: 'flex-end', flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });
  describe('it should render justifyContent = space-between on multiple lines (row)', function() {
    testStructure(View({}, {justifyContent: 'space-between', flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });
  describe('it should render justifyContent = space-around on multiple lines (row)', function() {
    testStructure(View({}, {justifyContent: 'space-around', flexDirection: 'row', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });

  // column
  describe('it should render justifyContent = flex-start on multiple lines (column)', function() {
    testStructure(View({}, {flexDirection: 'column', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });

  describe('it should render justifyContent = center on multiple lines (column)', function() {
    testStructure(View({}, {justifyContent: 'center', flexDirection: 'column', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });
  describe('it should render justifyContent = flex-end on multiple lines (column)', function() {
    testStructure(View({}, {justifyContent: 'flex-end', flexDirection: 'column', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });
  describe('it should render justifyContent = space-between on multiple lines (column)', function() {
    testStructure(View({}, {justifyContent: 'space-between', flexDirection: 'column', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });
  describe('it should render justifyContent = space-around on multiple lines (column)', function() {
    testStructure(View({}, {justifyContent: 'space-around', flexDirection: 'column', height: 1000, width: 1000, alignItems: 'flex-start', flexWrap: 'wrap'}, [
      View({}, {width: 300, height: 20}, []),
      View({}, {width: 300, height: 30}, []),
      View({}, {width: 300, height: 10}, []),
      View({}, {width: 300, height: 77}, [])
    ]));
  });


});