
var nrOfLoadingImages = 0;
var loadedImages = {

};

function loadImage() {
  nrOfLoadingImages++;
}

function isImageLoaded(src) {
  return !!loadedImages[src];
}
