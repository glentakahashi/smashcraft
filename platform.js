function Platform(size) {
  var self = this;
  self.size = size;
  var model = new Model();
  var vertices = [
    // Front face
    -2.0, -1.0,  1.0*size,  // 0
     2.0, -1.0,  1.0*size,  // 1
     2.0,  1.0,  1.0*size,  // 2

    -2.0, -1.0,  1.0*size,  // 0
     2.0,  1.0,  1.0*size,  // 2
    -2.0,  1.0,  1.0*size,  // 3

    // Back face
    -2.0, -1.0, -1.0*size,  // 4
    -2.0,  1.0, -1.0*size,  // 5
     2.0,  1.0, -1.0*size,  // 6

    -2.0, -1.0, -1.0*size,  // 4
     2.0,  1.0, -1.0*size,  // 6
     2.0, -1.0, -1.0*size,  // 7

    // Top face
    -2.0,  1.0, -1.0*size,  // 8
    -2.0,  1.0,  1.0*size,  // 9
     2.0,  1.0,  1.0*size,  // 10

    -2.0,  1.0, -1.0*size,  // 8
     2.0,  1.0,  1.0*size,  // 10
     2.0,  1.0, -1.0*size,  // 11

    // Bottom face
    -2.0, -1.0, -1.0*size,  // 12
     2.0, -1.0, -1.0*size,  // 13
     2.0, -1.0,  1.0*size,  // 14

    -2.0, -1.0, -1.0*size,  // 12
     2.0, -1.0,  1.0*size,  // 14
    -2.0, -1.0,  1.0*size,  // 15

    // Right face
     2.0, -1.0, -1.0*size,  // 16
     2.0,  1.0, -1.0*size,  // 17
     2.0,  1.0,  1.0*size,  // 18

     2.0, -1.0, -1.0*size,  // 16
     2.0,  1.0,  1.0*size,  // 18
     2.0, -1.0,  1.0*size,  // 19

    // Left face
    -2.0, -1.0, -1.0*size,  // 20
    -2.0, -1.0,  1.0*size,  // 21
    -2.0,  1.0,  1.0*size,  // 22 

    -2.0, -1.0, -1.0*size,  // 20
    -2.0,  1.0,  1.0*size,  // 22 
    -2.0,  1.0, -1.0*size,  // 23
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
 
  self.loc = vec3.fromValues(0.0, -2.0, 0.0);
  var x = 0;
  
  self.init = function() {
    model.init(vertices, textureCoords, null, textures.steve);
  };

  self.tick = function(dt) {
    x += dt;
    self.loc[1] = -2 + 2*Math.sin(x / 1000);
  };

  self.render = function (dt) {
    mvstack.push(modelView);
      var newMV = mat4.create();
      mat4.translate(newMV, newMV, self.loc);
      mat4.multiply(modelView, modelView, newMV);
      model.render(dt);
    modelView = mvstack.pop();

  };
}
