// type can be gl.FRAGMENT_SHADER or gl.VERTEX_SHADER
function getShader(gl, src, type) {
  var shader = gl.createShader(type);
  $.ajax(src, {async: false}).done(function(data, status) {
    gl.shaderSource(shader, data);
  });
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}
