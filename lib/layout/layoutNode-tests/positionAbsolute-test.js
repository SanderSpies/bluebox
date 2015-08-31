var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('position', function() {

  it('should position absolute 1', function() {

    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, justifyContent: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, []),
      View({}, {position: 'absolute', left: 10, top: 10, bottom: 10, right: 10}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, [])
    ]));
  });

  it('should position absolute 2', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, justifyContent: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, []),
      View({}, {width: 300, height: 100, position: 'absolute'}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, [])
    ]));
  });

  it('should position absolute 3', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, justifyContent: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, []),
      View({}, {top: 10, left: 20, width: 300, height: 100, position: 'absolute'}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, [])
    ]));
  });

  it('should position absolute 4', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, justifyContent: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, []),
      View({}, {bottom: 10, right: 20, width: 300, height: 100, position: 'absolute'}, []),
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, [])
    ]));
  });

  it('should position children of position absolute node correctly', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, justifyContent: 'flex-start'}, [
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, []),
      View({}, {bottom: 10, right: 20, width: 300, height: 100, position: 'absolute'}, [
        View({}, {width: Math.floor(100 * Math.random()),
          height: Math.floor(100 * Math.random())}, [])
      ])
      ,
      View({}, {width: Math.floor(100 * Math.random()),
        height: Math.floor(100 * Math.random())}, [])
    ]));
  });


});