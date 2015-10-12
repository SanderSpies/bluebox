'use strict';

jest.dontMock('../isViewVisible');

var isViewVisible = require('../isViewVisible');

describe('isViewVisible', function() {

  it ('should return true if the left position and top position are inside the viewport', function() {
    var isViewVisible2 = isViewVisible(
                          /* element */  {style:{backgroundColor: 'green'}, layout:{left: 10, top: 10, right:200, bottom:200}},
                          /* viewPort */ {left:0, top:0, width: 100, height: 100}
                        );
    expect(isViewVisible2).toBe(true);
  });

  it ('should return true if the right position and bottom position are inside the viewport', function() {
    var isViewVisible2 = isViewVisible(
      /* element */  {style:{backgroundColor: 'green'},layout:{left: 10, top: 40, right:100, bottom:200}},
      /* viewPort */ {left:20, top: 20, width: 100, height: 100}
    );
    expect(isViewVisible2).toBe(true);
  });

  it ('should return true if contents stretches over the viewport horizontally', function() {
    var isViewVisible2 = isViewVisible(
      /* element */  {style:{backgroundColor: 'green'},layout:{left: 0, top: 30, right:200, bottom:50}},
      /* viewPort */ {left:20, top: 20, width: 100, height: 100}
    );
    expect(isViewVisible2).toBe(true);
  });

  it ('should return true if contents stretches over the viewport vertically', function() {
    var isViewVisible2 = isViewVisible(
      /* element */  {style:{backgroundColor: 'green'},layout:{left: 30, top: 0, right:100, bottom: 300}},
      /* viewPort */ {left:20, top: 20, width: 100, height: 100}
    );
    expect(isViewVisible2).toBe(true);
  });


  it ('should return false if the left and top position are outside the viewport 1', function() {
    var isViewVisible2 = isViewVisible(
      /* element */  {style:{backgroundColor: 'green'}, layout:{left: 150, top: 200, right:180, bottom: 300}},
      /* viewPort */ {left:20, top: 20, width: 100, height: 100}
    );
    expect(isViewVisible2).toBe(false);
  });

  it ('should return false if the left and top position are outside the viewport 2', function() {
    var isViewVisible2 = isViewVisible(
      /* element */  {style:{backgroundColor: 'green'},layout:{left: 150, top: 0, right:180, bottom: 10}},
      /* viewPort */ {left:200, top: 20, width: 100, height: 100}
    );
    expect(isViewVisible2).toBe(false);
  });

});