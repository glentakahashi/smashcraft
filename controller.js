function Controller() {
  var HOLD = 0;
  var TAP = 1;

  var self = this;
  var callbacks = {};
  var down = {};

  var keyDown = function(e) {
    var oldstate = down[e.which];
    if (typeof oldstate == 'undefined')
      down[e.which] = true;
  };

  var keyUp = function(e) {
    delete down[e.which];
  };

  self.init = function() {
    // Bind function to keydown event
    // TODO: use Alex's controller
    window.onkeydown = keyDown;
    window.onkeyup = keyUp;
  };

  self.tick = function() {
    for (var i in down) {
      if (typeof callbacks[i].fn === 'function' && down[i] === true) {
        callbacks[i].fn();
        if (callbacks[i].tap == true)
          down[i] = false;
      }
    }
  };

  self.hold = function(code, fn) {
    callbacks[code] = {
      fn: fn,
      tap: false
    };
  };

  self.tap = function(code, fn) {
    callbacks[code] = {
      fn: fn,
      tap: true
    };
  };
}
