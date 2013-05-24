function Model() {
  var self = this;
  var positionBuffer;
  var colorBuffer;

  var rotation = 0; // TODO: this is a hack and doesn't belong here

  self.init = function(vertices, colors, normals) {
    var verticesFloatArr = new Float32Array(vertices);
    var colorsFloatArr = new Float32Array(colors);

    // Position buffer
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesFloatArr, gl.STATIC_DRAW);

    // Color buffer
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorsFloatArr, gl.STATIC_DRAW);

    // Just add properties because why not
    positionBuffer.itemSize = 3;
    positionBuffer.itemCount = 12;

    colorBuffer.itemSize = 4;
    colorBuffer.itemCount = 12;

  };
  
  self.setAnimation = function(animation) {
  };

  self.tick = function(dt) {
    rotation += dt/1000 * Math.PI;
    //console.log(rotation);
  };

  self.render = function (dt) {
    // TODO: move this into somewhere less dumb
    mat4.lookAt(camera, vec3.fromValues(5, 0, 0), vec3.create(), vec3.fromValues(0, 1, 0));
    gl.uniformMatrix4fv(program.uCMatrix, false, camera);


    mvstack.push(modelView);
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      var newMV = mat4.create();
      mat4.rotateY(newMV, newMV, rotation);
      mat4.multiply(modelView, modelView, newMV);

      gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(program.aVertexPosition, positionBuffer.itemSize,
                             gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(program.aVertexColor, colorBuffer.itemSize,
                             gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, positionBuffer.itemCount);
    modelView = mvstack.pop();
  };
}
