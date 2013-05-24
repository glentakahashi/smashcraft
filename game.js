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
    var vertexShader = getShader(gl, 'vert.glsl', gl.VERTEX_SHADER);
    var fragmentShader = getShader(gl, 'frag.glsl', gl.FRAGMENT_SHADER);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    // Locations of GLSL vars in properties of program. FUCK YEAH JAVASCRIPT
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
    program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');

    gl.enableVertexAttribArray(program.aVertexPosition);
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

  self.tick = function(dt) {
    for (var i in self.platforms) {
      self.platforms[i].tick(dt);
    }
    for (var i in self.players) {
      self.players[i].tick(dt);
    }
    // Collision detection here?????
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
