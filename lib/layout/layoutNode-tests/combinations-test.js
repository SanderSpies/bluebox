/* globals describe, it */
'use strict';

var View = require('../../components/View');
var testStructure = require('./utils/testStructure');

describe('combinations', function() {

  it ('test 1', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000, alignItems: 'center', justifyContent: 'center'}, [
      View({}, {height: 200, width: 200, flexDirection: 'column', justifyContent: 'flex-end'}, [
        View({}, {height: 20, width: 20}, []),
        View({}, {height: 20, width: 20, position:'absolute', top: 20}, [])
      ])
    ]));
  });

  it ('test 2', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000}, [
      View({}, {position: 'absolute', height: 200, left: 20, right: 20, flexDirection: 'column', justifyContent: 'flex-end'}, [
        View({}, {height: 20, width: 20, flexGrow: 1}, []),
        View({}, {height: 20, width: 20, flexGrow: 2}, []),
        View({}, {height: 20, width: 20, position: 'absolute', top: 20}, [])
      ])
    ]));
  });

  it ('test 3', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000}, [
      View({}, {height: 20, width: 20, flexGrow: 1}, []),
      View({}, {height: 20, width: 20, flexGrow: 2}, [
        View({}, {height: 20, width: 20, position: 'absolute', right: 10}, [])
      ])
    ]));
  });

  it ('test 4', function() {
    testStructure(View({}, {flexDirection: 'row', height: 1000, width: 1000}, [
      View({}, {height: 20, width: 20, flexGrow: 1}, []),
      View({}, {height: 20, width: 20, flexGrow: 2}, [
        View({}, {height: 20, width: 20, position: 'absolute', right: 10}, [])
      ])
    ]));

    it('test 5', function() {

      testStructure(View({}, {height: 1000, width: 1000}, [
        View({}, {
          position: 'absolute',
          top: 10,
          left: 100,
          right: 100,
          bottom: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }, [
          View({}, {
            left: 10,
            right: 10,
            height: 300,
            position: 'absolute',
            flexDirection: 'row'
          }, [
            View({}, {flexGrow: 1, height: 20}, []),
            View({}, {flexGrow: 2, height: 20}, []),
            View({}, {flexGrow: 1, height: 100, flexDirection: 'column'}, [
              View({}, {flexGrow: 1, width: 10}, []),
              View({}, {flexGrow: 2, width: 10}, []),
              View({}, {flexGrow: 1, width: 10}, [])
            ])
          ])
        ])
      ]));
    });
  });


});