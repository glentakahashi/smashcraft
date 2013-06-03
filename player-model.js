function PlayerModel() {
  var self = this;
  var tex;

  var head = {
      vertices: [
        // Front face
        -1.0, -1.0,  1.0, 1,  // 0
         1.0, -1.0,  1.0, 1,  // 1
         1.0,  1.0,  1.0, 1,  // 2

        -1.0, -1.0,  1.0, 1,  // 0
         1.0,  1.0,  1.0, 1,  // 2
        -1.0,  1.0,  1.0, 1,  // 3

        // Back face
        -1.0, -1.0, -1.0, 1,  // 4
        -1.0,  1.0, -1.0, 1,  // 5
         1.0,  1.0, -1.0, 1,  // 6

        -1.0, -1.0, -1.0, 1,  // 4
         1.0,  1.0, -1.0, 1,  // 6
         1.0, -1.0, -1.0, 1,  // 7

        // Top face
        -1.0,  1.0, -1.0, 1,  // 8
        -1.0,  1.0,  1.0, 1,  // 9
         1.0,  1.0,  1.0, 1,  // 10

        -1.0,  1.0, -1.0, 1,  // 8
         1.0,  1.0,  1.0, 1,  // 10
         1.0,  1.0, -1.0, 1,  // 11

        // Bottom face
        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0, -1.0, 1,  // 13
         1.0, -1.0,  1.0, 1,  // 14

        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0,  1.0, 1,  // 14
        -1.0, -1.0,  1.0, 1,  // 15

        // Right face
         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0, -1.0, 1,  // 17
         1.0,  1.0,  1.0, 1,  // 18

         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0,  1.0, 1,  // 18
         1.0, -1.0,  1.0, 1,  // 19

        // Left face
        -1.0, -1.0, -1.0, 1,  // 20
        -1.0, -1.0,  1.0, 1,  // 21
        -1.0,  1.0,  1.0, 1,  // 22

        -1.0, -1.0, -1.0, 1,  // 20
        -1.0,  1.0,  1.0, 1,  // 22
        -1.0,  1.0, -1.0, 1,  // 23
      ],
      uvCoords: [
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
      ]
  };

  var body = {
      vertices: [
        // Front face
        -1.0, -1.0,  1.0, 1,  // 0
         1.0, -1.0,  1.0, 1,  // 1
         1.0,  1.0,  1.0, 1,  // 2

        -1.0, -1.0,  1.0, 1,  // 0
         1.0,  1.0,  1.0, 1,  // 2
        -1.0,  1.0,  1.0, 1,  // 3

        // Back face
        -1.0, -1.0, -1.0, 1,  // 4
        -1.0,  1.0, -1.0, 1,  // 5
         1.0,  1.0, -1.0, 1,  // 6

        -1.0, -1.0, -1.0, 1,  // 4
         1.0,  1.0, -1.0, 1,  // 6
         1.0, -1.0, -1.0, 1,  // 7

        // Top face
        -1.0,  1.0, -1.0, 1,  // 8
        -1.0,  1.0,  1.0, 1,  // 9
         1.0,  1.0,  1.0, 1,  // 10

        -1.0,  1.0, -1.0, 1,  // 8
         1.0,  1.0,  1.0, 1,  // 10
         1.0,  1.0, -1.0, 1,  // 11

        // Bottom face
        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0, -1.0, 1,  // 13
         1.0, -1.0,  1.0, 1,  // 14

        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0,  1.0, 1,  // 14
        -1.0, -1.0,  1.0, 1,  // 15

        // Right face
         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0, -1.0, 1,  // 17
         1.0,  1.0,  1.0, 1,  // 18

         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0,  1.0, 1,  // 18
         1.0, -1.0,  1.0, 1,  // 19

        // Left face
        -1.0, -1.0, -1.0, 1,  // 20
        -1.0, -1.0,  1.0, 1,  // 21
        -1.0,  1.0,  1.0, 1,  // 22

        -1.0, -1.0, -1.0, 1,  // 20
        -1.0,  1.0,  1.0, 1,  // 22
        -1.0,  1.0, -1.0, 1,  // 23
      ],
      uvCoords: [
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
      ]
  };

  var arm = {
      vertices: [
        // Front face
        -1.0, -1.0,  1.0, 1,  // 0
         1.0, -1.0,  1.0, 1,  // 1
         1.0,  1.0,  1.0, 1,  // 2

        -1.0, -1.0,  1.0, 1,  // 0
         1.0,  1.0,  1.0, 1,  // 2
        -1.0,  1.0,  1.0, 1,  // 3

        // Back face
        -1.0, -1.0, -1.0, 1,  // 4
        -1.0,  1.0, -1.0, 1,  // 5
         1.0,  1.0, -1.0, 1,  // 6

        -1.0, -1.0, -1.0, 1,  // 4
         1.0,  1.0, -1.0, 1,  // 6
         1.0, -1.0, -1.0, 1,  // 7

        // Top face
        -1.0,  1.0, -1.0, 1,  // 8
        -1.0,  1.0,  1.0, 1,  // 9
         1.0,  1.0,  1.0, 1,  // 10

        -1.0,  1.0, -1.0, 1,  // 8
         1.0,  1.0,  1.0, 1,  // 10
         1.0,  1.0, -1.0, 1,  // 11

        // Bottom face
        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0, -1.0, 1,  // 13
         1.0, -1.0,  1.0, 1,  // 14

        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0,  1.0, 1,  // 14
        -1.0, -1.0,  1.0, 1,  // 15

        // Right face
         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0, -1.0, 1,  // 17
         1.0,  1.0,  1.0, 1,  // 18

         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0,  1.0, 1,  // 18
         1.0, -1.0,  1.0, 1,  // 19

        // Left face
        -1.0, -1.0, -1.0, 1,  // 20
        -1.0, -1.0,  1.0, 1,  // 21
        -1.0,  1.0,  1.0, 1,  // 22

        -1.0, -1.0, -1.0, 1,  // 20
        -1.0,  1.0,  1.0, 1,  // 22
        -1.0,  1.0, -1.0, 1,  // 23
      ],
      uvCoords: [
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
      ]
  };

  var leg = {
      vertices: [
        // Front face
        -1.0, -1.0,  1.0, 1,  // 0
         1.0, -1.0,  1.0, 1,  // 1
         1.0,  1.0,  1.0, 1,  // 2

        -1.0, -1.0,  1.0, 1,  // 0
         1.0,  1.0,  1.0, 1,  // 2
        -1.0,  1.0,  1.0, 1,  // 3

        // Back face
        -1.0, -1.0, -1.0, 1,  // 4
        -1.0,  1.0, -1.0, 1,  // 5
         1.0,  1.0, -1.0, 1,  // 6

        -1.0, -1.0, -1.0, 1,  // 4
         1.0,  1.0, -1.0, 1,  // 6
         1.0, -1.0, -1.0, 1,  // 7

        // Top face
        -1.0,  1.0, -1.0, 1,  // 8
        -1.0,  1.0,  1.0, 1,  // 9
         1.0,  1.0,  1.0, 1,  // 10

        -1.0,  1.0, -1.0, 1,  // 8
         1.0,  1.0,  1.0, 1,  // 10
         1.0,  1.0, -1.0, 1,  // 11

        // Bottom face
        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0, -1.0, 1,  // 13
         1.0, -1.0,  1.0, 1,  // 14

        -1.0, -1.0, -1.0, 1,  // 12
         1.0, -1.0,  1.0, 1,  // 14
        -1.0, -1.0,  1.0, 1,  // 15

        // Right face
         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0, -1.0, 1,  // 17
         1.0,  1.0,  1.0, 1,  // 18

         1.0, -1.0, -1.0, 1,  // 16
         1.0,  1.0,  1.0, 1,  // 18
         1.0, -1.0,  1.0, 1,  // 19

        // Left face
        -1.0, -1.0, -1.0, 1,  // 20
        -1.0, -1.0,  1.0, 1,  // 21
        -1.0,  1.0,  1.0, 1,  // 22

        -1.0, -1.0, -1.0, 1,  // 20
        -1.0,  1.0,  1.0, 1,  // 22
        -1.0,  1.0, -1.0, 1,  // 23
      ],
      uvCoords: [
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
      ]
  };

  var bodyparts = [head,body,arm,leg];

  self.init = function(texture) {
      tex = texture;
      for(var i in bodyparts) {
          var bodypart = bodyparts[i];
          bodypart.verticesFloatArr = new Float32Array(bodypart.vertices);
          bodypart.uvFloatArr = new Float32Array(bodypart.uvCoords);

          // Position buffer
          bodypart.positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, bodypart.positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, bodypart.verticesFloatArr, gl.STATIC_DRAW);

          // UV buffer
          bodypart.uvBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, bodypart.uvBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, bodypart.uvFloatArr, gl.STATIC_DRAW);

          // Just add properties because why not
          bodypart.positionBuffer.itemSize = 4;
          bodypart.positionBuffer.itemCount = bodypart.vertices / bodypart.positionBuffer.itemSize;

          bodypart.uvBuffer.itemSize = 2;
          bodypart.uvBuffer.itemCount = bodypart.uvCoords / bodypart.uvBuffer.itemSize;
      }
  };
  
  self.setAnimation = function(animation) {
  };

  self.tick = function(dt) {
    rotation += dt/1000 * Math.PI;
    //console.log(rotation);
  };

  self.render = function (dt) {
    var newMV;
    var newVec;
    mvstack.push(modelView);
      //head
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      newMV = mat4.create();
      newVec = vec3.
      mat4.
      newMV = mat4.create();
      mat4.rotateX(newMV, newMV, rotation/2);
      mat4.multiply(modelView, newMV, modelView);

      gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(program.aVertexPosition, positionBuffer.itemSize,
                             gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.vertexAttribPointer(program.aTextureCoord, uvBuffer.itemSize,
                             gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(program.uSampler, 0);

      gl.drawArrays(gl.TRIANGLES, 0, positionBuffer.itemCount);
    modelView = mvstack.pop();
  };
}
