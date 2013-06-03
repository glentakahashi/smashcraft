function Player(num) {
  var self = this;
  self.num = num;
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
  self.facing = 0;
  var faceRotation = 0;
  self.airJumps = 0;
  self.airborne = true;

  // Physics shit v2
  self.velocity = vec3.create();  // Not affected by terminal velocity

  self.launchVelocity = vec3.create();
  self.launchScalar = 0.0;
  self.launchAngle = 0.0;

  self.knockback = false;
  self.stun = 0;

  self.appliedForce = vec3.create();
  self.appliedVelocity = vec3.create();  // Velocity: DI (horiz), fall speed (vertical)

  var resistanceForce = 0.005;
  var resistanceVelocity = 0.0;

  self.jump = function() {
    // No jumping when stunned
    if (self.stun > 0)
      return;

    if (self.airborne) {
      if (self.airJumps <= 0)
        return;
      self.airJumps -= 1;
    }

    // Apply jumping force
    self.appliedForce[1] = self.stats.jumpHeight;

    // Jump cancels all forward/backward movement
    self.appliedForce[2] = 0;
    self.appliedVelocity[2] = 0;
    self.airborne = true;

    // Vertical momentum cancelling double jump
    if (self.airJumps < self.stats.airJumps) {
      self.appliedVelocity[1] = 0.0;
      self.launchScalar = 0.0;
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
      self.appliedForce[2] = self.stats.moveSpeed * dir * .20;
    }

    // Else do normal running
    else {
      self.appliedForce[2] = dir * self.stats.moveSpeed;

    }
    // Face the right direction
    if (dir < 0) {
      self.facing = -1;
    }
    else {
      self.facing = 1;
    }

  };

  self.spawn = function() {
    vec3.set(self.loc, 0.0, 24.0, 0.0);
    vec3.set(self.appliedVelocity, 0.0, 0.0, 0.0);
    vec3.set(self.appliedForce, 0.0, 0.0, 0.0);
    vec3.set(self.launchVelocity, 0.0, 0.0, 0.0);
    self.launchAngle = 0;
    self.launchScalar = 0;
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
    // Deal damage first
    self.health += attack.damage;

    // Compute knockback amount
    var k = attack.knockback.base +
        (self.health * attack.knockback.growth) / self.stats.launchResistance;
    k /= 100;
    self.launchScalar = k;

    // Flip launch angle based on facing direction
    if (facing == -1)
      self.launchAngle = Math.PI - attack.knockback.angle;
    else
      self.launchAngle = attack.knockback.angle;

    // Reset launch velocity variables
    resistanceVelocity = 0.0;
    vec3.set(self.launchVelocity, 0.0, 0.0, 0.0);

    // Add stun and knockback
    self.stun = attack.stun * k;
    self.knockback = true;

    // TODO: this is a hack
    // If in midair and they get hit, give them at least one jump
    if (self.airborne && self.airJumps == 0)
      self.airJumps = 1;
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
    model.init(vertices, textureCoords, vertexNormals, textures[self.num]);

    $('#p'+(num+1) + ' .name').text(self.stats.name);

    self.spawn();
  };

  self.tick = function(dt) {
    // Self-applied acceleration
    vec3.add(self.appliedVelocity, self.appliedVelocity, self.appliedForce);

    // Apply Launch Force to launch velocity
    if (self.knockback) {
      resistanceVelocity += resistanceForce;
      vec3.set(self.launchVelocity, 0.0,
        Math.sin(self.launchAngle) * Math.max(self.launchScalar - resistanceVelocity, 0.0),
        Math.cos(self.launchAngle) * Math.max(self.launchScalar - resistanceVelocity, 0.0))
    }
    else {
      resistanceVelocity += 8 * resistanceForce;
      vec3.set(self.launchVelocity, 0.0, 0.0,
        Math.cos(self.launchAngle) * Math.max(self.launchScalar - resistanceVelocity, 0.0))
    }
    
    // Gravity only when not on ground
    if (self.airborne) {
      vec3.scaleAndAdd(self.appliedVelocity, self.appliedVelocity,
        constants.physics.G, self.stats.physics.gravityScale);
    }
    else {
      self.airJumps = self.stats.airJumps;
    }

    // Terminal velocities for self-applied velocities only
    vec3.min(self.appliedVelocity, self.appliedVelocity, self.stats.physics.terminalPos);
    vec3.max(self.appliedVelocity, self.appliedVelocity, self.stats.physics.terminalNeg);

    // Applied velocity becomes velocity for this frame
    vec3.copy(self.velocity, self.appliedVelocity);

    // Add launch velocity to overall velocity
    vec3.add(self.velocity, self.velocity, self.launchVelocity);

    // Smooth rotation
    if (self.facing == -1) {
      if (faceRotation >= 1.0)
        faceRotation = 1.0;
      else
        faceRotation += 1 / 4;
    }
    else {
      if (faceRotation <= 0.0)
        faceRotation = 0.0;
      else
        faceRotation -= 1 / 4;
    }

    // Only when not stunned
    if (self.stun > 0) {
      self.stun -= dt;
    }
    else {
      self.stun = 0;
    }

    vec3.add(self.loc, self.loc, self.velocity);
    vec3.set(self.appliedForce, 0.0, 0.0, 0.0);

    // Friction if grounded
    if (!self.airborne) {
      self.appliedVelocity[2] /= 1.5;
    }

    model.tick(dt);
    $('#player' + (self.num + 1) + 'hp').text(self.health);
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
