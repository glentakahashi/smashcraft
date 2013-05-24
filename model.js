function Model() {
  var self = this;
  var positionBuffer;

  self.init = function(vertices) {
    var verticesFloatArr = new Float32Array(vertices);

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesFloatArr, gl.STATIC_DRAW);

    // Just add properties because why not
    positionBuffer.itemSize = 3;
    positionBuffer.itemCount = 12;

  };
  
  self.setAnimation = function(animation) {
  };

  self.tick = function(dt) {
  };

  self.render = function (dt) {
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(program.aVertexPosition, positionBuffer.itemSize,
                           gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, positionBuffer.itemCount);
  };
}
