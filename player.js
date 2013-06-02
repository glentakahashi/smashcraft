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

  var vertexNormals = [
    // Front face
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
 
    // Back face
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
 
    // Top face
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
 
    // Bottom face
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
 
    // Right face
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
 
    // Left face
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
 
  ];
  
  var self = this;
  var model = new Model();

  // Game variables
  self.loc = vec3.fromValues(0.0, 0.0, 0.0);
  self.health = 0;
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
  self.airJumps = 0;
  self.airborne = true;
  self.stun = 0;

  // Physics shit v2
  // TODO: self applied acceleration and velocity should be separate from
  //       launch acceleration and launch velocity. no need for drift
  self.velocity = vec3.create();  // Not affected by terminal velocity
  self.acceleration = vec3.create();
  self.drift = vec3.create();  // Velocity: DI (horiz), fall speed (vertical)

  self.jump = function() {
    if (self.airborne) {
      if (self.airJumps <= 0)
        return;
      console.log(self.airJumps);
      self.airJumps -= 1;
    }
    self.acceleration[1] = self.stats.jumpHeight;

    // Jump cancels all forward/backward movement
    self.acceleration[2] = 0;
    self.drift[2] = 0;
    self.airborne = true;

    // Vertical momentum cancelling double jump
    if (self.airJumps < self.stats.airJumps) {
      self.drift[1] = 0.0;
    }

  };

  self.drop = function() {
    if (self.airborne)
      return;

    self.loc[1] += self.stats.physics.terminalNeg[1] * 1.01
    self.airborne = true;
  };

  self.move = function(dir) {
    // Don't move if stunned
    if (self.stun > 0)
      return;

    // If in air, do directional influence instead (slower than running)
    if (self.airborne) {
      self.acceleration[2] = self.stats.moveSpeed * dir * .20;
    }

    // Else do normal running
    else {
      self.acceleration[2] = dir * self.stats.moveSpeed;

      // Face the right direction
      if (dir < 0) {
        self.facing = -1;
      }
      else {
        self.facing = 1;
      }
    }

  };

  self.spawn = function() {
    vec3.copy(self.loc, vec3.fromValues(0.0, 24.0, 0.0));
    vec3.copy(self.delta, vec3.fromValues(0.0, 0.0, 0.0));
    vec3.set(self.drift, 0.0, 0.0, 0.0);
    self.health = 0;
    self.stun = 0;

    $('#'+self.stats.id).text(self.health);
  };

  self.die = function() {
    audio.playSfx('death');
    self.deaths += 1;
    self.spawn();
  };

  self.getHit = function(attack, facing) {
    var scaledPush = vec3.create();
    var scale = attack.push.scale *
                Math.pow(self.health / 100, attack.push.pow) +
                attack.push.min;
    vec3.scale(scaledPush, attack.push.facing, scale * facing);
    vec3.scaleAndAdd(scaledPush, scaledPush, attack.push.absolute, scale);
    vec3.copy(self.delta, scaledPush);

    if (typeof stunTime === 'undefined')
      var stunTime = 0;
    self.stun = Math.max(self.stun, attack.stun);
    self.health += attack.damage;

    // TODO: this is kinda hackish and odd
    $('#'+self.stats.id).text(self.health);
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
          other.getHit(curAttack, self.facing);
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
    model.init(vertices, textureCoords, vertexNormals, textures[self.stats.id]);

    self.spawn();
  };

  self.tick = function(dt) {
    var ms = dt / 1000;

    vec3.set(self.velocity, 0.0, 0.0, 0.0);
    // Self-applied acceleration
    vec3.add(self.drift, self.drift, self.acceleration);
    
    // Gravity only when not on ground
    if (self.airborne) {
      vec3.scaleAndAdd(self.drift, self.drift,
        constants.physics.G, ms * self.stats.physics.gravityScale);
    }
    else {
      self.airJumps = self.stats.airJumps;
    }

    // Terminal velocities for drift only
    vec3.min(self.drift, self.drift, self.stats.physics.terminalPos);
    vec3.max(self.drift, self.drift, self.stats.physics.terminalNeg);

    // Drift into velocity
    vec3.add(self.velocity, self.velocity, self.drift);

    // Smooth rotation
    if (self.facing == -1) {
      if (faceRotation >= 1.0)
        faceRotation = 1.0;
      else
        faceRotation += 1 / 8;
    }
    else {
      if (faceRotation <= 0.0)
        faceRotation = 0.0;
      else
        faceRotation -= 1 / 8;
    }

    // Only when not stunned
    if (self.stun <= 0) {
    }
    else {
      self.stun -= dt;
    }

    vec3.add(self.loc, self.loc, self.velocity);
    vec3.set(self.acceleration, 0.0, 0.0, 0.0);

    // Friction if grounded
    if (!self.airborne) {
      self.drift[2] /= 1.5;
    }

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
