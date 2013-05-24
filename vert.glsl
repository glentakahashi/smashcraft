attribute vec2 a_position;
/*
 * x goes from -1 to 1, r goes from 0 to 1
 * y goes from -1 to 1, theta goes from 0 to 2*pi
 */

void main() {
  float r = (a_position.y + 1.5) / 2.5;
  float theta = (a_position.x + 1.0) * -3.14159;
  float x = r * cos(theta);
  float y = r * sin(theta);
  gl_Position = vec4(x, y, 0, 1);
  // gl_Position = vec4(a_position, 0, 1);
}
