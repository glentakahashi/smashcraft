function Game() {
  var self = this;

  // Game variables
  self.platforms = [];
  self.players = [new Player()];
  self.camera = null;

  // Initialize WebGL context, shaders
  var initGL = function() {
    var canvas = document.getElementById('canvas');

    // Initialize global GL variables
    gl = canvas.getContext('experimental-webgl');
    program = gl.createProgram();

    // Get and compile shaders
    var vertexShader = getShader(gl, 'vertex-shader');
    var fragmentShader = getShader(gl, 'fragment-shader');

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    // Locations of GLSL vars in properties of program. FUCK YEAH JAVASCRIPT
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aVertexColor = gl.getAttribLocation(program, 'aVertexColor');
    program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
    program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
    program.uCMatrix = gl.getUniformLocation(program, 'uCMatrix');

    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.enableVertexAttribArray(program.aVertexColor);

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

  self.init = function() {
    initGL();

    for (var i in self.platforms) {
      self.platforms[i].init();
    }
    for (var i in self.players) {
      self.players[i].init();
    }
  };

  var lastTime = 0;
  self.tick = function() {
    requestAnimFrame(self.tick);
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
