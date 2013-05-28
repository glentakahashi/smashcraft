function Controller() {
  var self = this;
  var callbacks = {};
  var down = {};

  var keyDown = function(e) {
    if (typeof callbacks[e.which] != 'undefined') {
      //callbacks[e.which]();
      down[e.which] = true;
    }
  };

  var keyUp = function(e) {
    if (typeof down[e.which] != 'undefined') {
      //callbacks[e.which]();
      down[e.which] = undefined;
      delete down[e.which];
    }
  };

  self.init = function() {
    // Bind function to keydown event
    // TODO: use Alex's controller
    window.onkeydown = keyDown;
    window.onkeyup = keyUp;
  };

  self.tick = function() {
    for (var i in down) {
      callbacks[i]();
    }
  };

  self.bind = function(code, fn) {
    callbacks[code] = fn;
  };
}
