function Controller() {
  var self = this;
  var callbacks = {};

  var keyPress = function(e) {
    if (typeof callbacks[e.which] != 'undefined') {
      callbacks[e.which]();
    }
  };

  self.init = function() {
    // Bind function to keydown event
    // TODO: use Alex's controller
    window.onkeydown = keyPress;
  };

  self.bind = function(code, fn) {
    callbacks[code] = fn;
  };
}
