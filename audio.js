function AudioPlayer() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  var self = this;
  var sfx = { };
  var music = { };
  var loaded = 0;
  var alreadyDone = false;
  var nowPlaying = null;

  var initSound = function(src) {
    loaded += 1;
    var el = new Howl({
      urls: [src],
      autoplay: false,
    });
    el.onload = function () {
      loaded -= 1;
    }
    return el;
  };

  var initMusic = function(src) {
    loaded += 1;
    var el = new Howl({
      urls: [src],
      autoplay: false,
      loop: true,
      buffer: true
    });
    el.onload = function () {
      loaded -= 1;
    }

    return el;
  };

  self.init = function() {
    // stop all other sounds
    self.stopMusic();

    // HACK: stop loading shit again
    if (alreadyDone)
      return;


    sfx.punchMiss = initSound('audio/Weak Whiff.wav');
    sfx.punchHit = initSound('audio/Small Hit.wav');
    sfx.smashHit = initSound('audio/Smack.wav');
    sfx.death = initSound('audio/SuperScope Huge Shot.wav');
    sfx.jump = initSound('audio/Mario Super Jump.wav');
    sfx.jump.volume(0.45);

    music.snoop = initMusic('audio/kirbysnoop.mp3');
    music.slam = initMusic('audio/slam.mp3');
    music.pokemon = initMusic('audio/pokemon.mp3');
    music.derezzed = initMusic('audio/derezzed.mp3');

    alreadyDone = true;
  };

  self.playSfx = function(sound) {
    sfx[sound].play();
  };

  self.stopMusic = function() {
    for (var i in music) {
      music[i].stop();
    }
    nowPlaying = null;
  };

  self.playMusic = function(m) {
    if (nowPlaying) {
      return;
    }
      music[m].pos(0);
      music[m].play();

      nowPlaying = music[m];
  };
};
