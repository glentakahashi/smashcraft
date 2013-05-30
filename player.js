function Player() {
  // Constants
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
  self.loc = vec3.fromValues(0.0, 0.0, 0.0);
  self.health = null;
  self.deaths = 0;
  self.kills = 0;
  self.lastHit = {
    who: null,
    when : null
  }
  self.animation = null;
  self.stats = null;

  // Physics shit
  self.delta = vec3.create();
  self.facing = 0;
  var faceRotation = 0;
  self.jumps = 0;
  self.airborne = true;
  self.stun = 0;

  self.jump = function() {
    if (self.jumps <= 0)
      return;

    self.delta[1] = self.stats.jumpHeight;
    self.jumps -= 1;
  };

  self.drop = function() {
    if (self.airborne)
      return;

    self.loc[1] += constants.physics.TERMINAL_MAX[1] - 0.05;
  };

  self.move = function(dir) {
    // Don't move if stunned
    if (self.stun > 0)
      return;

    self.delta[2] = dir * self.stats.moveSpeed;

    // Face the right direction
    if (dir < 0) {
      self.facing = -1;
    }
    else {
      self.facing = 1;
    }
  };

  self.spawn = function() {
    vec3.copy(self.loc, vec3.fromValues(0.0, 24.0, 0.0));
    vec3.copy(self.delta, vec3.fromValues(0.0, 0.0, 0.0));
    self.health = self.stats.health;
    self.stun = 0;

    $('#'+self.stats.id).text(self.health);
  };

  self.die = function() {
    audio.playSfx('death');
    self.deaths += 1;
    self.spawn();
  };

  self.getHit = function(damage, push, stunTime) {
    if (typeof push !== 'undefined')
      vec3.copy(self.delta, push);
    if (typeof stunTime === 'undefined')
      var stunTime = 0;
    self.stun = Math.max(self.stun, stunTime);
    self.health -= damage;

    // TODO: this is kinda hackish and odd
    $('#'+self.stats.id).text(self.health);

    if (self.health <= 0) {
      self.die();
    }
  };

  self.attack = function(type) {
    var curAttack = self.stats.attacks[type];
    if (typeof curAttack === 'undefined')
      return;

    var hit = false;

    for (var p in game.players) {
      if (game.players[p] == self)
        continue;
      var other = game.players[p];
      var dist = vec3.create();
      vec3.subtract(dist, self.loc, other.loc);
      var push = vec3.create();

      // If is facing or attack doesn't need facing
      if (!curAttack.facing || dist[2] * self.facing < 0) {
        if (Math.abs(dist[0]) < curAttack.range[0] &&
            Math.abs(dist[1]) < curAttack.range[1] &&
            Math.abs(dist[2]) < curAttack.range[1]) {
          vec3.scaleAndAdd(push, push, curAttack.facingPush, self.facing);
          vec3.add(push, push, curAttack.absolutePush);

          other.getHit(curAttack.damage, push, curAttack.stun);
          hit = true;
        }
      }
    }

    if (hit)
      audio.playSfx(curAttack.sound);
    else
      audio.playSfx('punchMiss');
  };
  
  self.init = function(stats) {
    self.stats = stats;
    model.init(vertices, textureCoords, null, textures[self.stats.id]);

    self.spawn();
  };

  self.tick = function(dt) {
    var ms = dt / 1000;

    // Gravity only when not on ground
    if (self.airborne) {
      vec3.scaleAndAdd(self.delta, self.delta, constants.physics.G, ms * self.stats.weight);
    }

    // Terminal velocities
    vec3.max(self.delta, self.delta, constants.physics.TERMINAL_MAX);
    vec3.min(self.delta, self.delta, constants.physics.TERMINAL_MIN);

    // Smooth rotation
    if (self.facing == -1) {
      if (faceRotation >= 1.0)
        faceRotation = 1.0;
      else
        faceRotation += ms * 8;
    }
    else {
      if (faceRotation <= 0.0)
        faceRotation = 0.0;
      else
        faceRotation -= ms * 8;
    }

    // Only when not stunned
    if (self.stun <= 0) {
      // Friction
      self.delta[2] /= constants.physics.FRICTION_Z;
      if (self.delta[2] < 0.0001 && self.delta[2] > -0.0001)
        self.delta[2] = 0.0;
    }
    else {
      self.stun -= dt;
    }

    vec3.add(self.loc, self.loc, self.delta);

    model.tick(dt);
  };

  self.render = function (dt) {
    mvstack.push(modelView);
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      var newMV = mat4.create();
      // TODO: this transformation just puts the head on top of the origin
      mat4.translate(newMV, newMV, vec3.fromValues(0.0, 1.0, 0.0));
      mat4.translate(newMV, newMV, self.loc); // Move it to location
      mat4.rotateY(newMV, newMV, faceRotation * Math.PI);
      mat4.multiply(modelView, modelView, newMV);

      //mat4.translate(modelView, modelView, loc);
      model.render(dt);
    modelView = mvstack.pop();
  };
}
