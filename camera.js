function Camera() {
  self = this;
  // Actual values to be passed into GL
  var zoomActual = 5.0;
  var eyeActual = null;
  var atActual = null;

  // Target values to ease into
  self.zoomTarget = 5.0;
  self.eyeTarget = null;
  self.atTarget = null;

  // GL matrices
  var camera = null;
  var perspective = null;

  // Constant initial FOV
  var initFOV = Math.PI/2;

  var doLookAt = function() {
    mat4.lookAt(camera,
                eyeActual,
                atActual,
                vec3.fromValues(0, 1, 0)
               );
    gl.uniformMatrix4fv(program.uCMatrix, false, camera);
  };

  var doPerspective = function() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    mat4.perspective(perspective,
                     initFOV / zoomActual,
                     gl.viewportWidth / gl.viewportHeight,
                     0.1, 200);
    gl.uniformMatrix4fv(program.uPMatrix, false, perspective); 
  };

  self.init = function(eye, at) {
    self.eyeTarget = eye;
    self.atTarget = at;
    eyeActual = vec3.clone(eye);
    atActual = vec3.clone(at);

    // Viewport settings
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    // Camera settings
    camera = mat4.create();
    perspective = mat4.create();
  };

  self.tick = function(dt) {
    vec3.copy(eyeActual, self.eyeTarget);
    vec3.copy(atActual, self.atTarget);

    doLookAt();
    doPerspective();
  };
}
