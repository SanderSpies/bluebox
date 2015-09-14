var Bluebox = require('./../../lib/index');

var doms = [require('./CategoriesView')]; //, require('./testdom2'), require('./testdom3')];
var i = 0;

function continuousRendering() {
  Bluebox.renderFromTop(doms[0], document.getElementById('canvas'));
  //requestAnimationFrame(continuousRendering);
}

requestAnimationFrame(continuousRendering);

