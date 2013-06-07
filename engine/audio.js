function AudioFile(src) {
  var self = this;
  var audio = null;

  var loadStarted = false;
  var waitingToPlay = false;
  var willLoop = false;
  var volume = 1.0;

  var playThrough = function() {
    audio.removeEventListener('canplaythrough', playThrough);
    self.play = doPlay;
    // Play if we're waiting on load to play the track
    if (waitingToPlay) {
      doPlay(willLoop);
    }
  };

  self.load = function() {
    if (loadStarted)
      return;
    loadStarted = true;
    audio = new Audio(src);
    audio.addEventListener('canplaythrough', playThrough, false);
    audio.addEventListener('ended', function() {
      if (willLoop)
        self.play();
    }, false);
  };

  // Play function when sound file is not ready to be played
  var doWaitingPlay = function(loop, vol) {
    waitingToPlay = true;
    willLoop = loop || false;
    if (vol)
      volume = vol;
    if (!loadStarted)
      self.load();
  };

  // Play function when sound is ready to be played
  var doPlay = function(loop, vol) {
    audio.src = audio.src;
    audio.volume = vol || volume;
    willLoop = loop || false;
    audio.play();
  };

  self.play = doWaitingPlay; // Will be changed once track is loaded

  // Alias for play(true)
  self.loop = function() {
    self.play(true);
  };

  self.stop = function() {
    if (audio == null)
      return;
    audio.pause();
    audio.loop = false;
    audio.currentTime = 0.0;
  };

  self.setVolume = function(vol) {
    volume = vol;
  };
};

function AudioPlayer() {
  // TODO: load from JSON file
  var soundfiles = {
    punchMiss: { src: 'assets/audio/Weak Whiff.wav' },
    punchHit: { src: 'assets/audio/Small Hit.wav' },
    smashHit: { src: 'assets/audio/Smack.wav' },
    death: { src: 'assets/audio/SuperScope Huge Shot.wav' },
    jump: { src: 'assets/audio/Mario Super Jump.wav', volume: 0.5 },
    ok: { src: 'assets/audio/menu-ok.wav' },
    dodge: { src: 'assets/audio/swoosh3.wav' },
    crowd1: { src: 'assets/audio/crowd1.wav' },
    crowd2: { src: 'assets/audio/crowd2.wav' },
    crowd3: { src: 'assets/audio/crowd3.wav' },

    snoop: { src: 'assets/audio/kirbysnoop.mp3', volume: 0.7, preload: false },
    slam: { src: 'assets/audio/slam.mp3', volume: 0.8, preload: false },
    pokemon: { src: 'assets/audio/pokemon.mp3', volume: 0.6, preload: false },
    derezzed: { src: 'assets/audio/derezzed.mp3', preload: false },
    menu: { src: 'assets/audio/menu.mp3', volume: 0.7, preload: false },
  };

  var self = this;
  self.sounds = {};

  self.init = function() {
    // Synchronously get audio json
    for (var i in soundfiles) {
      var current = soundfiles[i];

      // Set defaults
      var preload = (current.hasOwnProperty('preload')) ? current.preload : true;

      // Make new sound
      self.sounds[i] = new AudioFile(current.src);

      if (preload)
        self.sounds[i].load();
    };
  };

  self.stop = function() {
    for (var i in self.sounds) {
      var current = self.sounds[i];
      current.stop();
    };
  };

};
