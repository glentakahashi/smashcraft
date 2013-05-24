function Player() {
  var vertices = [
    // Front face
     0.0,  1.0,  0.0,
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,

    // Right face
     0.0,  1.0,  0.0,
     1.0, -1.0,  1.0,
     1.0, -1.0, -1.0,

    // Back face
     0.0,  1.0,  0.0,
     1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,

    // Left face
     0.0,  1.0,  0.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0
  ];

  var colors = [
    // Front face
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,

    // Right face
    1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 0.0, 1.0,

    // Back face
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,

    // Left face
    1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 0.0, 1.0
  ];
  
  var self = this;
  var model = new Model();

  // Game variables
  self.loc = vec3.create();
  vec3.set(self.loc, -2.0, 0.0, 0.0, 1.0);
  self.health = 100;
  self.animation = null;
  
  self.init = function() {
    model.init(vertices, colors);
  };

  self.tick = function(dt) {
    model.tick(dt);
  };

  self.render = function (dt) {
    var newMV = mat4.create();
    var oldMV = mat4.create();
    mat4.copy(oldMV, modelView);
    mvstack.push(oldMV);
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      mat4.translate(newMV, newMV, self.loc);
      mat4.multiply(modelView, modelView, newMV);
      //mat4.translate(modelView, modelView, loc);
      model.render(dt);
    modelView = mvstack.pop();
  };
}
