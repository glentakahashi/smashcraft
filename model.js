function Model(vertices) {
  var self = this;
  var vPosition;
  var pMatrix;
  var mvMatrix;
  var positionBuffer;
  var v = vertices;

  self.init = function() {
    vPosition = gl.getAttribLocation(program, 'aVertexPosition');

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
            -1.0, -.8,
            -2.0/3.0, -.8,
            -2.0/3.0, -.4
             ]), 
        gl.STATIC_DRAW);

    // Just add properties because why not
    positionBuffer.itemSize = 2;
    positionBuffer.itemCount = 3;

  };
  
  self.setAnimation = function(animation) {
  };

  self.tick = function(dt) {
  };

  self.render = function (dt) {
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(vPosition, positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, positionBuffer.itemCount);
  };
}
