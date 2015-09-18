var C = require('./components/C');

var ObjectPool = require('./utils/ObjectPool');

var PropertiesPool = new ObjectPool({});
var ChildrenPool = new ObjectPool([]);

console.time('reusing objects');
for (var i = 0, l = 1000000; i < l; i++) {
  var children = ChildrenPool.allocate();
  var foo = C('view', PropertiesPool.allocate());
  foo.props._pool.free(foo.props);
  foo._pool.free(foo);
}
console.timeEnd('reusing objects');
