function Model() {
  var self = this;
  var positionBuffer;
  var uvBuffer;
  var tex;

  var rotation = 0; // TODO: this is a hack and doesn't belong here

  self.init = function(vertices, uvCoords, normals, texture) {
    var verticesFloatArr = new Float32Array(vertices);
    var uvFloatArr = new Float32Array(uvCoords);
    var vertexNormalFloatArr = new Float32Array(normals);
    tex = texture;

    // Position buffer
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesFloatArr, gl.STATIC_DRAW);

    // UV buffer
    uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvFloatArr, gl.STATIC_DRAW);

    //Normal buffer
    vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormalFloatArr, gl.STATIC_DRAW);
 
   // Just add properties because why not
    positionBuffer.itemSize = 3;
    positionBuffer.itemCount = 36;

    uvBuffer.itemSize = 2;
    uvBuffer.itemCount = 36;

    vertexNormalBuffer.itemSize = 3;
    vertexNormalBuffer.itemCount = 36;

  };
  
  self.setAnimation = function(animation) {
  };

  self.tick = function(dt) {
  };

  self.render = function (dt) {
    mvstack.push(modelView);
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      var newMV = mat4.create();
      mat4.multiply(modelView, modelView, newMV);

      gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);
      var normalMatrix = mat3.create();
      mat3.normalFromMat4(modelView, normalMatrix);
      //mat3.transpose(normalMatrix);
      gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

    
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(program.aVertexPosition, positionBuffer.itemSize,
                             gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.vertexAttribPointer(program.aTextureCoord, uvBuffer.itemSize,
                             gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
      gl.vertexAttribPointer(program.aVertexNormal, vertexNormalBuffer.itemSize,
                             gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(program.uSampler, 0);

      gl.drawArrays(gl.TRIANGLES, 0, positionBuffer.itemCount);
    modelView = mvstack.pop();
  };
}
