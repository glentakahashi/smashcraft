function Player() {
  var vertices = [
    // Front face
    -1.0, -1.0,  1.0,  // 0
     1.0, -1.0,  1.0,  // 1
     1.0,  1.0,  1.0,  // 2

    -1.0, -1.0,  1.0,  // 0
     1.0,  1.0,  1.0,  // 2
    -1.0,  1.0,  1.0,  // 3

    // Back face
    -1.0, -1.0, -1.0,  // 4
    -1.0,  1.0, -1.0,  // 5
     1.0,  1.0, -1.0,  // 6

    -1.0, -1.0, -1.0,  // 4
     1.0,  1.0, -1.0,  // 6
     1.0, -1.0, -1.0,  // 7

    // Top face
    -1.0,  1.0, -1.0,  // 8
    -1.0,  1.0,  1.0,  // 9
     1.0,  1.0,  1.0,  // 10

    -1.0,  1.0, -1.0,  // 8
     1.0,  1.0,  1.0,  // 10
     1.0,  1.0, -1.0,  // 11

    // Bottom face
    -1.0, -1.0, -1.0,  // 12
     1.0, -1.0, -1.0,  // 13
     1.0, -1.0,  1.0,  // 14

    -1.0, -1.0, -1.0,  // 12
     1.0, -1.0,  1.0,  // 14
    -1.0, -1.0,  1.0,  // 15

    // Right face
     1.0, -1.0, -1.0,  // 16
     1.0,  1.0, -1.0,  // 17
     1.0,  1.0,  1.0,  // 18

     1.0, -1.0, -1.0,  // 16
     1.0,  1.0,  1.0,  // 18
     1.0, -1.0,  1.0,  // 19

    // Left face
    -1.0, -1.0, -1.0,  // 20
    -1.0, -1.0,  1.0,  // 21
    -1.0,  1.0,  1.0,  // 22

    -1.0, -1.0, -1.0,  // 20
    -1.0,  1.0,  1.0,  // 22
    -1.0,  1.0, -1.0,  // 23
  ];

  var textureCoords = [
    // Front face
    1/8, 1/2,
    1/4, 1/2,
    1/4, 3/4,

    1/8, 1/2,
    1/4, 3/4,
    1/8, 3/4,

    // Back face
    1/2, 1/2,
    1/2, 3/4,
    3/8, 3/4,

    1/2, 1/2,
    3/8, 3/4,
    3/8, 1/2,

    // Top face
    1/8, 1.0,
    1/8, 3/4,
    1/4, 3/4,

    1/8, 1.0,
    1/4, 3/4,
    1/4, 1.0,

    // Bottom face
    1/4, 1.0,
    3/8, 1.0,
    3/8, 3/4,

    1/4, 1.0,
    3/8, 3/4,
    1/4, 3/4,

    // Right face
    3/8, 1/2,
    3/8, 3/4,
    1/4, 3/4,

    3/8, 1/2,
    1/4, 3/4,
    1/4, 1/2,

    // Left face
    0.0, 1/2,
    1/8, 1/2,
    1/8, 3/4,

    0.0, 1/2,
    1/8, 3/4,
    0.0, 3/4,
  ];
  
  var self = this;
  var model = new Model();

  // Game variables
  self.loc = vec3.fromValues(2.0, 0.0, 0.0);
  self.health = 100;
  self.animation = null;
  
  self.init = function() {
    model.init(vertices, textureCoords, null, textures.ram);
  };

  var rotation = 0;
  self.tick = function(dt) {
    rotation += dt/1000 * Math.PI;
    model.tick(dt);
  };

  self.render = function (dt) {
    mvstack.push(modelView);
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      var newMV = mat4.create();
      mat4.translate(newMV, newMV, vec3.fromValues(-1.0, 0.0, 0.0)); // Move it back
      mat4.rotateY(newMV, newMV, rotation);
      mat4.translate(newMV, newMV, self.loc);
      mat4.multiply(modelView, modelView, newMV);

      //mat4.translate(modelView, modelView, loc);
      model.render(dt);
    modelView = mvstack.pop();
  };
}
