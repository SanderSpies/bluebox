jest.dontMock('../diff');

var diff = require('../diff');
var EventHandling = require('../../events/EventHandling');

describe('diff', function() {

  it('should return the old object strictly equal to the new one', function() {
    var foo = {a:1};
    var result = diff(foo, foo);
    expect(foo).toBe(result);
  });

  it('should reuse the old object when two objects are identical', function() {
    var z1 = [1,2,3,4];
    var z2 = [1,2,3,4];
    var oldObj = {a: 1, b: z1, c: true, d: {a: 0, b : [0, 1,2,3,4], c: false}};
    var newObj = {a: 1, b: z2, c: true, d: {a: 0, b : [0, 1,2,3,4], c: false}};
    var result = diff(newObj, oldObj);
    expect(result).toBe(oldObj);
    expect(result.b).toBe(z1);
    expect(result.b).not.toBe(z2);
    expect(result.a).toBe(1);
    expect(result.b).toEqual([1,2,3,4]);
    expect(result.b).toBe(oldObj.b);
    expect(oldObj.b).toBe(newObj.b);
    expect(oldObj.d).toBe(newObj.d);
    expect(oldObj.d.b).toBe(newObj.d.b);
  });


  it('should reuse old objects when merging two mostly identical structures', function() {
    var z = {a:1};
    var b = [1,2,3,4];
    var oldObj = {a: 1, b: b, c: true, d: {a: 0, z: z, b : [0, 1,2,3,4], c: false}};
    var newObj = {a: 1, b: b, c: true, d: {a: 0, z: {a:1}, b : [0, 'a', 1,4,3,4], c: false}};
    var result = diff(newObj, oldObj);
    expect(result).not.toBe(oldObj);
    expect(result.b).toBe(b);
    expect(oldObj.b).toBe(b);
    expect(result.d).toBe(newObj.d);
    expect(newObj.d).not.toBe(oldObj.d);
    expect(oldObj.d.z).toBe(newObj.d.z);
    expect(oldObj.d.b).not.toBe(newObj.d.b);
  });

  it ('should set eventlisteners on components', function() {
    var o = {props: {onClick: {}}};
    diff(o, null);
    expect(EventHandling.setEventListeners).toBeCalledWith(o, null);
  });

  xit ('should not diff layout or parent property', function() {

  });

  xit('should diff items with the same key in an array with keyed components', function() {

  });

});