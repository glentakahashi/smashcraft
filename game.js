function Game() {
  var self = this;

  // Game variables
  self.platforms = [];
  self.players = [new Player(), new Player()];
  self.camera = null;
  self.controller = new Controller();

  // Physics constants
  self.physics = {
    G: vec3.fromValues(0.0, -3.0, 0.0),
    TERMINAL_MAX: vec3.fromValues(-1000.0, -0.70, -1000.0),
    TERMINAL_MIN: vec3.fromValues(1000.0, 1000.0, 1000.0),
    FRICTION_Z: 1.5
  };


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
    textures.ram = getTexture('img/ram.png');

    // Locations of GLSL vars in properties of program. FUCK YEAH JAVASCRIPT
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
    program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
    program.uCMatrix = gl.getUniformLocation(program, 'uCMatrix');
    program.uSampler = gl.getUniformLocation(program, 'uSampler');

    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.enableVertexAttribArray(program.aTextureCoord);

    // Initialize matrices
    camera = mat4.create();
    modelView = mat4.create();
    perspective = mat4.create();

    // Set perspective matrix
    // TODO: This belongs in a reshape function that gets called when canvas
    //       changes shape. Since this canvas doesn't change, we can keep this
    //       here for now.
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    mat4.perspective(perspective, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100);
    gl.uniformMatrix4fv(program.uPMatrix, false, perspective); 
    // Init GL options
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Black
    gl.enable(gl.DEPTH_TEST);

  }

  var initCamera = function() {
    mat4.lookAt(camera,
                vec3.fromValues(35, 6, 0),
                vec3.fromValues(0, 5, 0),
                vec3.fromValues(0, 1, 0)
               );
    gl.uniformMatrix4fv(program.uCMatrix, false, camera);
  };

  var initController = function() {
    self.controller.init();

    // W
    self.controller.tap(87, function() {
        self.players[0].jump();
    });
    // S
    self.controller.hold(83, function() {
        //self.players[0].loc[1] -= 0.5;
    });
    // A
    self.controller.hold(65, function() {
        self.players[0].move(1);
    });
    // D
    self.controller.hold(68, function() {
        self.players[0].move(-1);
    });


    // UP
    self.controller.tap(38, function() {
        self.players[1].jump();
    });
    // DOWN
    self.controller.hold(40, function() {
        //self.players[1].loc[1] -= 0.5;
    });
    // LEFT
    self.controller.hold(37, function() {
        self.players[1].move(1);
    });
    // RIGHT
    self.controller.hold(39, function() {
        self.players[1].move(-1);
    });
  };

  self.init = function() {
    initGL();
    initCamera();
    initController();

    for (var i in self.platforms) {
      self.platforms[i].init();
    }
    for (var i in self.players) {
      self.players[i].init();
    }
  };

  var lastTime = 0;
  self.tick = function() {
    // Controllers
    self.controller.tick();

    // New frame
    requestAnimFrame(self.tick);

    // Calculate dt
    var timeNow = new Date().getTime();
    var dt = 0;
    if (lastTime != 0) {
      dt = timeNow - lastTime;
    }
    lastTime = timeNow;

    for (var i in self.platforms) {
      self.platforms[i].tick(dt);
    }
    for (var i in self.players) {
      self.players[i].tick(dt);
    }
    // Collision detection here?????

    self.render(dt);
  };

  self.render = function (dt) {
    //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    for (var i in self.platforms) {
      self.platforms[i].render();
    }
    for (var i in self.players) {
      self.players[i].render();
    }
  };
}
