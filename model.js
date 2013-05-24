function Model(vertices) {
  var self = this;
  var vPosition;
  var pMatrix;
  var mvMatrix;
  var positionBuffer;
  var v = vertices;

  self.init = function() {
    vPosition = gl.getAttribLocation(program, 'aVertexPosition');
/*
    pMatrix = gl.getUniformLocation(program, 'uPMatrix');
    mvMatrix = gl.getUniformLocation(program, 'uMVMatrix');
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
console.log(positionBuffer);
*/
      var buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
              -1.0, -.8,
              -1.0+1.0/3.0, -.8,
               ]), 
          gl.STATIC_DRAW);
      console.log(gl);
      gl.enableVertexAttribArray(vPosition);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

      // Draw it
      gl.drawArrays(gl.TRIANGLES, 0, 2);

  };
  
  self.setAnimation = function(animation) {
  };

  self.tick = function(dt) {
  };

  self.render = function (dt) {
return;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 30);
    console.log('asdf');
  };
}
