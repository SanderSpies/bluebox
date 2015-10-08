var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('layout-padding', function() {

  it('should position properly in a row', function() {

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, justifyContent: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random()),
        paddingTop: Math.random() * 10,
        paddingLeft: Math.random() * 10,
        paddingBottom: Math.random() * 10,
        paddingHeight: Math.random() * 10}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random()),
        paddingTop: Math.random() * 10,
        paddingLeft: Math.random() * 10,
        paddingBottom: Math.random() * 10,
        paddingHeight: Math.random() * 10}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random()),
        paddingTop: Math.random() * 10,
        paddingLeft: Math.random() * 10,
        paddingBottom: Math.random() * 10,
        paddingHeight: Math.random() * 10}, [])
    ]));
  });

  it('should position properly in a column', function() {

    testStructure(View({}, {flexDirection: 'column', height: 1000, width: 1000, justifyContent: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random()),
        paddingTop: Math.random() * 10,
        paddingLeft: Math.random() * 10,
        paddingBottom: Math.random() * 10,
        paddingHeight: Math.random() * 10}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random()),
        paddingTop: Math.random() * 10,
        paddingLeft: Math.random() * 10,
        paddingBottom: Math.random() * 10,
        paddingHeight: Math.random() * 10}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random()),
        paddingTop: Math.random() * 10,
        paddingLeft: Math.random() * 10,
        paddingBottom: Math.random() * 10,
        paddingHeight: Math.random() * 10}, [])
    ]));
  });


});