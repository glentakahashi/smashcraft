function Player() {
  // Constants
  var MAX_JUMPS = 2;

  var vertices = [
    // Front face
    -1.0, -1.0,  1.0,  // 0
     1.0, -1.0,  1.0,  // 1
     1.0,  1.0,  1.0,  // 2

    -1.0, -1.0,  1.0,  // 0
     1.0,  1.0,  1.0,  // 2
    -1.0,  1.0,  1.0,  // 3

    // Back face
    -1.0, -1.0, -1.0,  // 4
    -1.0,  1.0, -1.0,  // 5
     1.0,  1.0, -1.0,  // 6

    -1.0, -1.0, -1.0,  // 4
     1.0,  1.0, -1.0,  // 6
     1.0, -1.0, -1.0,  // 7

    // Top face
    -1.0,  1.0, -1.0,  // 8
    -1.0,  1.0,  1.0,  // 9
     1.0,  1.0,  1.0,  // 10

    -1.0,  1.0, -1.0,  // 8
     1.0,  1.0,  1.0,  // 10
     1.0,  1.0, -1.0,  // 11

    // Bottom face
    -1.0, -1.0, -1.0,  // 12
     1.0, -1.0, -1.0,  // 13
     1.0, -1.0,  1.0,  // 14

    -1.0, -1.0, -1.0,  // 12
     1.0, -1.0,  1.0,  // 14
    -1.0, -1.0,  1.0,  // 15

    // Right face
     1.0, -1.0, -1.0,  // 16
     1.0,  1.0, -1.0,  // 17
     1.0,  1.0,  1.0,  // 18

     1.0, -1.0, -1.0,  // 16
     1.0,  1.0,  1.0,  // 18
     1.0, -1.0,  1.0,  // 19

    // Left face
    -1.0, -1.0, -1.0,  // 20
    -1.0, -1.0,  1.0,  // 21
    -1.0,  1.0,  1.0,  // 22

    -1.0, -1.0, -1.0,  // 20
    -1.0,  1.0,  1.0,  // 22
    -1.0,  1.0, -1.0,  // 23
  ];

  var textureCoords = [
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
  ];
  
  var self = this;
  var model = new Model();

  // Game variables
  self.loc = vec3.fromValues(2.0, 0.0, 0.0);
  self.health = 100;
  self.animation = null;
  self.stats = {
    maxHealth: 100,
    jumpHeight: 1.0,
    moveSpeed: 0.35,
    attacks: {
      neutral: {
        range: vec3.fromValues(100.0, 3.5, 3.5),
        facing: true,
        push: vec3.fromValues(0.0, 0.0, 5.0),
        damage: 10,
      }
    }
  };

  // Physics shit
  self.delta = vec3.create();
  self.facing = 0;
  var faceRotation = 0;
  var jumps = MAX_JUMPS;

  self.jump = function() {
    if (jumps > 0) {
      self.delta[1] = self.stats.jumpHeight;
      jumps -= 1;
    }
  };

  self.move = function(dir) {
    self.delta[2] = dir * self.stats.moveSpeed;
    if (dir < 0) {
      self.facing = -1;
    }
    else {
      self.facing = 1;
    }

  };

  self.attack = function(type) {
    for (var p in game.players) {
      if (game.players[p] == self)
        continue;
      var curAttack = self.stats.attacks[type];
      var other = game.players[p];
      var dist = vec3.create();
      vec3.subtract(dist, self.loc, other.loc);

      if (!curAttack.facing || dist[2] * self.facing < 0) {
        if (Math.abs(dist[2]) < curAttack.range[2] &&
            Math.abs(dist[1]) < curAttack.range[1]) {
          console.log('hit');
          vec3.scaleAndAdd(other.delta, other.delta, curAttack.push, self.facing);
        }
      }
    }
  };
  
  self.init = function(tex) {
    model.init(vertices, textureCoords, null, tex);
  };

  self.tick = function(dt) {
    // Gravity and terminal velocities
    var ms = dt / 1000;
    vec3.scaleAndAdd(self.delta, self.delta, game.physics.G, ms);
    vec3.max(self.delta, self.delta, game.physics.TERMINAL_MAX);
    vec3.min(self.delta, self.delta, game.physics.TERMINAL_MIN);

    if (self.loc[2] < -25 && self.delta[2] < 0)
      self.delta[2] = 0;
    else if (self.loc[2] > 25 && self.delta[2] > 0)
      self.delta[2] = 0;

    if (self.facing == -1) {
      // Smooth rotation
      if (faceRotation >= 1.0)
        faceRotation = 1.0;
      else
        faceRotation += ms * 8;
    }
    else {
      // Smooth rotation
      if (faceRotation <= 0.0)
        faceRotation = 0.0;
      else
        faceRotation -= ms * 8;
    }

    // Friction
    self.delta[2] /= game.physics.FRICTION_Z;
    if (self.delta[2] < 0.0001 && self.delta[2] > -0.0001)
      self.delta[2] = 0.0;

    vec3.add(self.loc, self.loc, self.delta);

    // TODO: this isn't ground
    if (self.loc[1] < 0) {
      self.loc[1] = 0.0;
      self.delta[1] = 0.0;
      jumps = MAX_JUMPS;
    }

    model.tick(dt);
  };

  self.render = function (dt) {
    mvstack.push(modelView);
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      var newMV = mat4.create();
      mat4.translate(newMV, newMV, self.loc); // Move it back
      mat4.rotateY(newMV, newMV, faceRotation * Math.PI);
      mat4.multiply(modelView, modelView, newMV);

      //mat4.translate(modelView, modelView, loc);
      model.render(dt);
    modelView = mvstack.pop();
  };
}
