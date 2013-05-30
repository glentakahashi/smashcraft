function Audio() {
  var self = this;
  var sfx = { };
  var loaded = 0;

  var initSound = function(src) {
    loaded += 1;
    var el = document.createElement('audio');
    el.setAttribute('src', src);
    el.load();
    el.onload = function () {
      loaded -= 1;
      el.currentTime = 0;
    }
    return el;
  }

  self.init = function() {
    sfx.punchMiss = initSound('audio/Weak Whiff.wav');
    sfx.punchHit = initSound('audio/Small Hit.wav');
    sfx.smashHit = initSound('audio/Smack.wav');
    sfx.death = initSound('audio/SuperScope Huge Shot.wav');
  };

  self.playSfx = function(sound) {
    sfx[sound].currentTime = 0;
    sfx[sound].src = sfx[sound].src;
    sfx[sound].play();
  };
};
