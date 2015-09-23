var easings = {

  linear: function(t, b, _c, d) {
    var c = _c - b;
    var result = t * c / d + b;
    if (t > d) {
      result = _c;
    }
    return result;
  },

  'ease-in': function(t, b, _c, d) {
    var c = _c - b;
    var _t = t / d;
    var result = c * (_t) * _t + b;

    if (t > d) {
      result = _c;
    }
    return result;
  },

  'ease-in-elastic': function(t, b, _c, d) {
    if (t > d) {
      return _c;
    }

    var c = _c - b;
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) {
      return b;
    }
    if ((t /= d) == 1) {
      return b + c;
    }
    if (!p) {
      p = d * .3;
    }
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    }
    else {
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  }

};

module.exports = easings;