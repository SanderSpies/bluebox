var BlueBox = require('./index');

var doms = [require('./CategoriesView')]; //, require('./testdom2'), require('./testdom3')];
var i = 0;

//console.profile('rendering');
function renderMe() {
  if (i === 2) {
    i = 0;
  }

  BlueBox.renderFromTop(doms[0], document.getElementById('canvas'));

  setTimeout(function(){
    console.log('again!');
    BlueBox.renderFromTop(doms[0], document.getElementById('canvas'));
  },2000);

  i++;
}



renderMe();
