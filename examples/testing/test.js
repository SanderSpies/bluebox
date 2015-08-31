var Bluebox = require('./../../lib/index');

var doms = [require('./CategoriesView')]; //, require('./testdom2'), require('./testdom3')];
var i = 0;

//console.profile('rendering');
function renderMe() {
  if (i === 2) {
    i = 0;
  }

  Bluebox.renderFromTop(doms[0], document.getElementById('canvas'));

  //setTimeout(function(){
  //  console.log('again!');
  //  Bluebox.renderFromTop(doms[0], document.getElementById('canvas'));
  //},2000);

  i++;
}



renderMe();
