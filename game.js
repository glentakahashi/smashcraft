function Game() {
  var self = this;

  // Game variables
  self.platforms = [
    new Platform(vec3.fromValues(8.0, 2.0, 24.0), vec3.fromValues(0.0, -4.0, 0.0)),
    new Platform(vec3.fromValues(6.0, 0.75, 6.0), vec3.fromValues(0.0, 7.0, -14.0)),
    new Platform(vec3.fromValues(6.0, 0.75, 6.0), vec3.fromValues(0.0, 7.0, 14.0)),
    new Platform(vec3.fromValues(6.0, 0.75, 6.0), vec3.fromValues(0.0, 16.0, 0.0))
  ];
  self.players = [new Player(), new Player()];
  self.controller = new Controller();
  self.camera = new Camera();

  // Initialize WebGL context, shaders
  var initGL = function() {
    var canvas = document.getElementById('canvas');

    // Initialize global GL variables
    gl = canvas.getContext('experimental-webgl');
    program = gl.createProgram();

    // Get and compile shaders
    var vertexShader = getShader('vertex-shader');
    var fragmentShader = getShader('fragment-shader');

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    // Get textures
    textures.guyman = getTexture('img/guyman.png');
    textures.thomas = getTexture('img/thomas.png');
    textures.ram = getTexture('img/ram.png');
    textures.steve = getTexture('img/steve2.png');
    // Locations of GLSL vars in properties of program. FUCK YEAH JAVASCRIPT
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    program.aVertexNormal = gl.getAttribLocation(program, 'aVertexNormal');
    program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
    program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
    program.uCMatrix = gl.getUniformLocation(program, 'uCMatrix');
    program.uNMatrix = gl.getUniformLocation(program, 'uNMatrix');
    program.uAmbientColor = gl.getUniformLocation(program, 'uAmbientColor');
    program.uPointLightingLocation = gl.getUniformLocation(program, 'uPointLightingLocation');
    program.uPointLightingColor = gl.getUniformLocation(program, 'uPointLightingColor');
    program.uSampler = gl.getUniformLocation(program, 'uSampler');

    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.enableVertexAttribArray(program.aTextureCoord);
    gl.enableVertexAttribArray(program.aVertexNormal);
    // Initialize matrices
    modelView = mat4.create();

    // Set perspective matrix
    //doPerspective();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Black
    gl.enable(gl.DEPTH_TEST);
  }

  var doPerspective = function() {
  };

  var initController = function() {
    self.controller.init();

    // W
    self.controller.tap(87, function() {
      self.players[0].jump();
    });
    // S
    self.controller.hold(83, function() {
      self.players[0].drop();
    });
    // A
    self.controller.hold(65, function() {
      self.players[0].move(1);
    });
    // D
    self.controller.hold(68, function() {
      self.players[0].move(-1);
    });
    // F
    self.controller.tap(70, function() {
      self.players[0].attack('neutral');
    });
    // G
    self.controller.tap(71, function() {
      self.players[0].attack('sideSmash');
    });


    // UP
    self.controller.tap(38, function() {
      self.players[1].jump();
    });
    // DOWN
    self.controller.hold(40, function() {
      self.players[1].drop();
    });
    // LEFT
    self.controller.hold(37, function() {
      self.players[1].move(1);
    });
    // RIGHT
    self.controller.hold(39, function() {
      self.players[1].move(-1);
    });
    // ENTER
    self.controller.tap(13, function() {
      self.players[1].attack('neutral');
    });
    // '
    self.controller.tap(222, function() {
      self.players[1].attack('sideSmash');
    });
  };

  self.init = function() {
    initGL();
    self.camera.init(vec3.fromValues(80.0, 15, 0),
                     vec3.fromValues(0.0, 8.0, 0.0));
    initController();

    for (var i in self.platforms) {
      self.platforms[i].init();
    }
    self.players[0].init(constants.heros.guyman);
    self.players[1].init(constants.heros.thomas);
  };

  var lastTime = 0;
  self.tick = function() {
    // New frame
    requestAnimFrame(self.tick);

    // Calculate dt
    var timeNow = new Date().getTime();
    var dt = 0;
    if (lastTime != 0) {
      dt = timeNow - lastTime;
    }
    lastTime = timeNow;

    // Controllers
    self.controller.tick();

    // Platforms
    for (var i in self.platforms) {
      self.platforms[i].tick(dt);
    }

    // Players
    var locSum = vec3.create();
    var minLoc = vec3.create();
    var maxLoc = vec3.create();
    for (var i in self.players) {
      var currentPlayer = self.players[i];

      // Camera location math
      vec3.add(locSum, locSum, currentPlayer.loc);
      vec3.max(maxLoc, maxLoc, currentPlayer.loc);
      vec3.min(minLoc, minLoc, currentPlayer.loc);

      var airborne = true;

      // Player-platform collision
      for (var j in self.platforms) {
        var currentPlatform = self.platforms[j];
        if (currentPlayer.loc[2] <= currentPlatform.loc[2] + currentPlatform.scale[2] &&
            currentPlayer.loc[2] >= currentPlatform.loc[2] - currentPlatform.scale[2] &&
            // Above (terminal velocity below platform top)
            currentPlayer.loc[1] >= currentPlatform.loc[1] +
                                    currentPlatform.scale[1] +
                                    constants.physics.TERMINAL_MAX[1] &&
            // Below (platform top + a little extra give)
            currentPlayer.loc[1] <= currentPlatform.loc[1] + currentPlatform.scale[1] + 0.1
            ) {

          if (currentPlayer.delta[1] <= 0) {
            currentPlayer.loc[1] = currentPlatform.loc[1] + currentPlatform.scale[1];
            currentPlayer.delta[1] = 0;
            currentPlayer.jumps = currentPlayer.stats.maxJumps;
            airborne = false;
          }

        }
      }

      currentPlayer.airborne = airborne;
      currentPlayer.tick(dt);


      // Die off the bottom
      if (currentPlayer.loc[1] < -30.0)
        currentPlayer.die();

      // Right wall
      if (currentPlayer.loc[2] < -120.0)
        currentPlayer.die();

      // Left wall
      if (currentPlayer.loc[2] > 120.0)
        currentPlayer.die();

    }

    // Camera movement
    var dist = vec3.distance(minLoc, maxLoc);
    self.camera.setZoomTarget(35 / (Math.pow(dist, .65)));
    vec3.scale(self.camera.atTarget, locSum, 1/self.players.length);

    self.camera.tick(dt);
    
    self.render(dt);
  };

  var t = 0;
  self.render = function (dt) {
    t += dt / 500;


    //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    //Lighting stuff
    gl.uniform3f(program.uAmbientColor, 0.5, 0.5, 0.5);
    gl.uniform3f(program.uPointLightingLocation, 0.0, 2.0 * Math.cos(t), 2 * Math.sin(t));
    gl.uniform3f(program.uPointLightingColor, 0.0, 1.0, 1.0);

    for (var i in self.platforms) {
      self.platforms[i].render();
    }
    for (var i in self.players) {
      self.players[i].render();
    }
  };
}
