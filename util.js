// Global gl pls
function getShader(id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

var _texturesLoaded = 0;
function getTexture(src) {
  _texturesLoaded += 1;
  var tex = gl.createTexture();
  tex.image = new Image();
  tex.image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);

    // Tick the game after everything's loaded
    _texturesLoaded -= 1;
    if (_texturesLoaded == 0)
      game.tick();
  };
  tex.image.src = src;
  return tex;
}

function genScaledUV(x, y, z) {
  var textureCoords = [
    // Front face
    0.0, 0.0,
    x, 0.0,
    x, y,

    0.0, 0.0,
    x, y,
    0.0, y,

    // Back face
    x, 0.0,
    x, y,
    0.0, y,

    x, 0.0,
    0.0, y,
    0.0, 0.0,

    // Top face
    0.0, z,
    0.0, 0.0,
    x, 0.0,

    0.0, z,
    x, 0.0,
    x, z,

    // Bottom face
    x, z,
    0.0, z,
    0.0, 0.0,

    x, z,
    0.0, 0.0,
    x, 0.0,

    // Right face
    z, 0.0,
    z, y,
    0.0, y,

    z, 0.0,
    0.0, y,
    0.0, 0.0,

    // Left face
    0.0, 0.0,
    z, 0.0,
    z, y,

    0.0, 0.0,
    z, y,
    0.0, y,
  ];
  return textureCoords;
}
