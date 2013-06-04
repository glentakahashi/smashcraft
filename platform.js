function Platform(scale, loc, type, textureName) {
  var self = this;
  var model = new Model();
  if (typeof textureName === 'undefined')
    textureName = 'grass';

  self.scale = scale;
  self.loc = loc;

  if(type=="Block") {
	self.terminalLocation = 2;
  } else {
	self.terminalLocation = 1.005;
  }

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

  var textureCoords = genScaledUV(self.scale[0], self.scale[1], self.scale[2]);
  
  var vertexNormals = [
    // Front face
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
 
    // Back face
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    
    // Top face
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
   
    // Bottom face
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
  
    // Right face
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
 
    // Left face
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
 
  ];
  var vertexTangents = [
    // Front face
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
 
    // Back face
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    
    // Top face
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
 
    // Bottom face
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,

    // Right face
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
 
    // Left face
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
 
  ];

  self.init = function() {
    model.init(vertices, textureCoords, vertexNormals, vertexTangents, textures[textureName+'Terrain'], textures[textureName+'Normal']);
  };

  self.tick = function(dt) {
  };

  self.render = function (dt) {
    mvstack.push(modelView);
      var newMV = mat4.create();
      mat4.translate(newMV, newMV, self.loc);
      mat4.scale(newMV, newMV, self.scale);
      mat4.multiply(modelView, modelView, newMV);
      gl.uniform1i(program.stun, false);
      model.render(dt);
    modelView = mvstack.pop();

  };
}
