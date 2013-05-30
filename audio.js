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
    sfx.punchHit = initSound('audio/punch-hit.mp3');
    sfx.punchMiss = initSound('audio/punch-miss.mp3');
    sfx.death = initSound('audio/death.mp3');
  };

  self.playSfx = function(sound) {
    sfx[sound].currentTime = 0;
    sfx[sound].src = sfx[sound].src;
    sfx[sound].play();
  };
};
