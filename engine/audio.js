function AudioFile(src) {
  var self = this;
  var audio = null;

  var loadStarted = false;
  var waitingToPlay = false;
  var willLoop = false;
  var volume = 1.0;

  var playThrough = function() {
    audio.removeEventListener('canplaythrough', playThrough);

    // Set play to actually play isntead of waiting
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

    // Looping logic
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
  var self = this;
  self.sounds = {};

  self.init = function() {
    // Synchronously get audio json
    var soundfiles;
    $.ajax({
      async: false,
      dataType: 'json',
      data: {},
      url: 'data/audiofiles.json',
    }).done(function(data) {
      soundfiles = data;
    });

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
