function Controller() {
  var self = this;

  // Map of char code to {fn: callback, tap: bool}
  var callbacks = {};

  // 3-state set of all keys that are currently pressed
  // undefined/not in the set: key is not down
  // true: key is down and callback should be fired
  // false: key is down but callback should not be fired
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
    // Iterate through all keys that are down and execute their callbacks
    for (var i in down) {
      if (typeof callbacks[i] !== 'undefined' &&
          down[i] === true) {
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
