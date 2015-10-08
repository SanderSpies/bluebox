'use strict';

var View = require('../../components/View');
var LayoutEngine = require('../LayoutEngine');
var AXIS = require('../AXIS');

describe('layout-updating', function() {

  it('should not do layout for children that are similar', function() {
    var children = [View({}, {
        width: 100,
        height: 100
      },
      []
    )];

    var tree = View({},
      {flowDirection: 'row', justifyContent:'flex-end', height: 100, width: 1000},
      children
    );

    var layoutNode = LayoutEngine.layoutRelativeNode(tree, null, null, AXIS.column, AXIS.row, false);
    var storedLeft = layoutNode.children[0].layout.left;

    // use mutation to check behaviour
    layoutNode.children[0].style.width = 50;
    var tree2 = View({},
      {flowDirection: 'row', justifyContent:'flex-end', height: 100, width: 1000},
      children
    );
    layoutNode = LayoutEngine.layoutRelativeNode(tree2, tree, null, AXIS.column, AXIS.row, false);
    expect(storedLeft).toBe(layoutNode.children[0].layout.left);
  });

  it('should correct the children layout if the parent position has changed, but children are the same (absolute)', function() {

    var sharedChildren = [
      View({},
        {
          flexGrow: 2,
          height: 100
        },
        []
      ),
      View({},
        {
          flexGrow: 1,
          height: 100
        },
        []
      ),
      View({},
        {
          flexGrow: 3,
          height: 100
        },
        []
      )
    ];

    var testView1 = View({},
       {
        width: 500,
        height: 500},
      [
        View({},
          {
            position: 'absolute',
            left: 10,
            top: 10,
            width: 100,
            height: 100,
            flowDirection: 'row'
          },
          sharedChildren
        )
      ]
    );

    var layoutNode = LayoutEngine.layoutRelativeNode(testView1, null, null, AXIS.column, AXIS.row, false);

    var testView2 = View({}, {
        width: 500,
        height: 500},
       [
        View({},
          {
            position: 'absolute',
            left: 300,
            top: 100,
            width: 120,
            height: 100,
            flowDirection: 'row'
          },
          sharedChildren
        )
      ]
    );

    var layoutNode2 = LayoutEngine.layoutRelativeNode(testView2, layoutNode, null, AXIS.column, AXIS.row, false);
    expect(layoutNode2.children[0].children[0].layout.left).toBe(300);
    expect(layoutNode2.children[0].children[1].layout.left).toBe(300 + 2 * 20);
    expect(layoutNode2.children[0].children[2].layout.left).toBe(300 + 3 * 20);
    expect(layoutNode2.children[0].children[0].layout.top).toBe(100);
    expect(layoutNode2.children[0].children[1].layout.top).toBe(100);
    expect(layoutNode2.children[0].children[2].layout.top).toBe(100);
  });

  it('should correct the children layout if the parent position has changed, but children are the same (relative)', function() {

    var sharedChildren = [
      View({},
        {
          flexGrow: 2,
          height: 100
        },
        []
      ),
      View({},
        {
          flexGrow: 1,
          height: 100
        },
        []
      ),
      View({},
        {
          flexGrow: 3,
          height: 100
        },
        []
      )
    ];

    var testView1 = View({},
      {
        width: 500,
        height: 500},
      [
        View({},
          {
            position: 'relative',
            left: 10,
            top: 10,
            width: 100,
            height: 100,
            flowDirection: 'row'
          },
          sharedChildren
        )
      ]
    );

    var layoutNode = LayoutEngine.layoutRelativeNode(testView1, null, null, AXIS.column, AXIS.row, false);

    var testView2 = View({}, {
        width: 500,
        height: 500},
      [
        View({},
          {
            position: 'relative',
            left: 300,
            top: 100,
            width: 120,
            height: 100,
            flowDirection: 'row'
          },
          sharedChildren
        )
      ]
    );

    var layoutNode2 = LayoutEngine.layoutRelativeNode(testView2, layoutNode, null, AXIS.column, AXIS.row, false);
    expect(layoutNode2.children[0].children[0].layout.left).toBe(300);
    expect(layoutNode2.children[0].children[1].layout.left).toBe(300 + 2 * 20);
    expect(layoutNode2.children[0].children[2].layout.left).toBe(300 + 3 * 20);
    expect(layoutNode2.children[0].children[0].layout.top).toBe(100);
    expect(layoutNode2.children[0].children[1].layout.top).toBe(100);
    expect(layoutNode2.children[0].children[2].layout.top).toBe(100);
  });

  it('should properly correct previous sibling positioning', function() {

  });

  it('should properly correct next sibling positioning', function() {
    var sameA = View({}, {width: 50, height: 100}, []);
    var sameB = View({}, {width: 60, height: 30}, []);
    var testView1 = View({}, {width: 500, height: 500, flexDirection: 'row'}, [
      View({}, {width: 100, height: 50}, []),
      sameA,
      sameB
    ]);
    var layoutNode = LayoutEngine.layoutRelativeNode(testView1, null, null, AXIS.column, AXIS.row, false);
    var testView1 = View({}, {width: 500, height: 500, flexDirection: 'row'}, [
      View({}, {width: 150, height: 50}, []),
      sameA,
      sameB
    ]);
    var layoutNode2 = LayoutEngine.layoutRelativeNode(testView1, null, null, AXIS.coluxmn, AXIS.row, false);
    expect(layoutNode2.children[1].layout.left).toBe(150);
    expect(layoutNode2.children[2].layout.left).toBe(200);
  });

  it('should properly update siblings of a changing flexWrapped view', function() {
    var similarChildA = View({}, {width: 100, height: 20}, []);
    var similarChildB = View({}, {width: 200, height: 20}, []);

    var wrappedView1 = View({}, {flexWrap: 'wrap', width: 200, flexDirection: 'row'}, [
      View({}, {height: 20, width: 50}, []),
      similarChildA,
      View({}, {height: 20, width: 50}, []),
      similarChildB
    ]);

    var layoutNode = LayoutEngine.layoutRelativeNode(wrappedView1, null, null, AXIS.column, AXIS.row, false);

    var wrappedView2 = View({}, {flexWrap: 'wrap', flexDirection: 'row'}, [
      View({}, {height: 20, width: 60}, []),
      similarChildA,
      View({}, {height: 20, width: 100}, []),
      similarChildB
    ]);

    var layoutNode2 = LayoutEngine.layoutRelativeNode(wrappedView2, wrappedView1, null, AXIS.column, AXIS.row, false);

    expect(similarChildA.layout.left).toBe(60);
    expect(wrappedView2.children[1].layout.left).toBe(0);
    expect(similarChildB.layout.left).toBe(100);
  });

});