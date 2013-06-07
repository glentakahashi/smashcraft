function Player(num) {
  var self = this;
  self.num = num;
  self.winner = false;
  
  var model = new PlayerModel();

  // Game variables
  self.loc = vec3.fromValues(0.0, 0.0, 0.0);
  self.health = 0;
  self.deaths = 0;
  self.kills = 0;
  self.lives = 3;
  self.isDead = false;
  self.inDanger = false;
  self.rank = 0;
  self.lastHit = {
    who: null,
    when : null
  }
  self.animation = null;
  self.stats = null;

  // Physics shit
  self.facing = -1;
  var faceRotation = 0;  // Rotation percentage 0.0 to 1.0
  self.airJumps = 0;
  self.airborne = true;
  self.dodging = 0;
  var prevAirborne = false;

  self.velocity = vec3.create();  // Not affected by terminal velocity

  // Knockback & Launch
  self.launchVelocity = vec3.create();
  self.launchScalar = 0.0;  // Scalar value of force
  self.launchAngle = 0.0;  // Angle of force
  self.knockback = false;  // Is currently in knockback
  self.stun = 0;  // Number of frames left in stun
  var resistanceForce = 0.010;
  var resistanceVelocity = 0.0;

  // Gravity and player movement
  self.appliedForce = vec3.create();
  self.appliedVelocity = vec3.create();  // Velocity: DI (horiz), fall speed (vertical)

  // Attacking
  var NOATTACK = 0;
  var WINDUP = 1;
  var ATTACK = 2;
  var COOLDOWN = 3;
  self.attackStage = NOATTACK;
  self.attackDuration = 0;  // Number of frames until next stage
  self.attackData = null;

  self.invincible = 0;  // Number of frames we can't get hit

  self.jump = function() {
    // No jumping when stunned
    if (self.stun > 0)
      return;

    // Double jumping
    if (self.airborne) {
      if (self.airJumps <= 0)
        return;
      self.airJumps -= 1;
    }

    // Play sound only when not grounded && attacking
    if (self.airborne || self.attackStage == NOATTACK)
      audio.sounds.jump.play();

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

    self.loc[1] += self.stats.physics.terminalNeg[1] * 1.2;
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
    // Else do normal running only if not attacking
    else if (self.attackStage == NOATTACK) {
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

  self.dodge = function() {
    if(self.dodging > self.stats.dodge.cooldown || self.airborne) {
      return;
    }
    audio.sounds.dodge.play();
    self.appliedForce[2] = self.facing * self.stats.dodge.speed;
    self.dodging = self.stats.dodge.time;
    self.stun = 1000;
    self.invincible = 1000;
  }

  self.spawn = function() {
    vec3.set(self.loc, 0.0, 24.0, 0.0);
    vec3.set(self.appliedVelocity, 0.0, 0.0, 0.0);
    vec3.set(self.appliedForce, 0.0, 0.0, 0.0);
    vec3.set(self.launchVelocity, 0.0, 0.0, 0.0);
    self.launchAngle = 0;
    self.launchScalar = 0;
    self.health = 0;
    self.stun = 0;

    $('#'+self.stats.num+' .damage').text(self.health);
  };

  self.die = function() {
    audio.sounds.death.play();
	$("#p"+(self.num+1)+" img")[0].remove();
    self.deaths += 1;
	self.spawn();
    self.inDanger = false;
	if(self.deaths>=self.lives) {
		self.loc[1]=0;
		self.isDead=true;
		var countAlive=0;
		for(var i=0;i<game.players.length;i++) {
			if(game.players[i].isDead==false) {
				countAlive++;
			}
		}
		self.rank=countAlive+1;
	}
  };

  self.getHit = function(attack, facing) {
    // Deal damage first
    self.health += attack.damage;

    // Compute knockback amount
    var k = attack.knockback.base +
        (self.health * attack.knockback.growth) / self.stats.launchResistance;
    k /= 100;
    self.launchScalar = k;

    // Cancel attack animation and stuff
    self.attackStage = NOATTACK;
    self.attackData = null;

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

    // Cancel all other momentum
    vec3.set(self.appliedForce, 0.0, 0.0, 0.0);
    vec3.set(self.appliedVelocity, 0.0, 0.0, 0.0);

    // If in midair and they get hit, give them at least one jump
    if (self.airborne && self.airJumps == 0)
      self.airJumps = 1;
  };

  self.attack = function(type) {
    if (self.stun > 0)
      return;

    // Only attack if not attacking
    if (self.attackStage != NOATTACK)
      return;

    var curAttack = self.stats.attacks[type];
    if (typeof curAttack === 'undefined')
      return;

  switch(type) {
      case 'neutral':
          model.setAnimation(3);
          break;
      case 'sideSmash':
          model.setAnimation(4);
          break;
  }

    self.attackStage = WINDUP;
    self.attackDuration = curAttack.timing.windup;
    self.attackData = curAttack;
  };

  var doAttack = function(attack) {
    var hit = false;

    for (var p in game.players) {
      if (game.players[p] == self)
        continue;

      var other = game.players[p];
      var dist = vec3.create();
      vec3.subtract(dist, self.loc, other.loc);
      var push = vec3.create();

      // If is facing or attack doesn't need facing
      if (!attack.facing || dist[2] * self.facing < 0) {
        if (Math.abs(dist[0]) < attack.range[0] &&
            Math.abs(dist[1]) < attack.range[1] &&
            Math.abs(dist[2]) < attack.range[1] &&
            other.invincible <= 0) {
          other.invincible = attack.timing.duration;
          other.getHit(attack, self.facing);
          hit = true;
        }
      }
    }

    if (hit)
      audio.sounds[attack.sound].play();

    return hit;
  };
  
  self.init = function(stats) {
    self.stats = stats;
    model.init(textures[self.num]);

    $('#p'+(num+1) + ' .name').text(self.stats.name);
	for(var i=0;i<self.lives;i++) {
		$("#p"+(num+1)+" .name").append("<img src='img/characters/"+self.stats.id+"Head.png' style='height: 20px;margin-left: 5px;'>");
	}
	$('#p' + (self.num + 1) + ' .damage').html('<span id="player'+(self.num + 1)+'hp">0</span>%');

    self.spawn();

  };

  self.setAnimation = function(a) {
  model.setAnimation(a);
  };

  self.tick = function(dt) {
	if(!self.isDead) {
    // Tick down invincibility
    self.invincible--;
    self.dodging--;
    if(self.dodging == 0) {
      self.facing *= -1;
      self.stun = 0;
      self.invincible = 0;
    }

    // Apply Launch Force to launch velocity
    if (self.knockback) {
      resistanceVelocity += resistanceForce;
      vec3.set(self.launchVelocity, 0.0,
        Math.sin(self.launchAngle) * Math.max(self.launchScalar - resistanceVelocity, 0.0),
        Math.cos(self.launchAngle) * Math.max(self.launchScalar - resistanceVelocity, 0.0))
    }

    // If not knockbacked, slide across the ground with more resistance
    else {
      resistanceVelocity += 8 * resistanceForce;
      vec3.set(self.launchVelocity, 0.0, 0.0,
        Math.cos(self.launchAngle) * Math.max(self.launchScalar - resistanceVelocity, 0.0))
    }
    
    // Gravity only when not on ground
    if (self.airborne) {
      vec3.scaleAndAdd(self.appliedVelocity, self.appliedVelocity,
        constants.physics.G, self.stats.physics.gravityScale);
        model.setAnimation(2);
    }
    else {
      if(self.inDanger && prevAirborne) {
    audio.sounds.crowd1.play();
    self.inDanger = false;
      }
      self.airJumps = self.stats.airJumps;
      // Animate walking
      if (Math.abs(self.appliedForce[2]) - 0.01 < 0) {
          model.setAnimation(0);
      }
      else {
          model.setAnimation(1);
      }
    }

    // Self-applied acceleration only when not attacking or in midair
    if (self.airborne || self.attackStage == NOATTACK) {
      vec3.add(self.appliedVelocity, self.appliedVelocity, self.appliedForce);
    }

    // Do attack stuff
    if (self.attackStage != NOATTACK) {
      self.attackDuration--;
      switch (self.attackStage) {
        case WINDUP:
          if (self.attackDuration <= 0) {
            self.attackStage = ATTACK;
            self.attackDuration = self.attackData.timing.duration;
            audio.sounds.punchMiss.play();
          }
          break;
        case ATTACK:
          if (self.attackDuration <= 0) {
            self.attackStage = COOLDOWN;
            self.attackDuration = self.attackData.timing.cooldown;
          }
          doAttack(self.attackData);
          break;
        case COOLDOWN:
          if (self.attackDuration <= 0) {
            self.attackStage = NOATTACK;
            self.attackDuration = 0;
          }
          break;
      }
    }

    // Terminal velocities for self-applied velocities only
    if(self.dodging > 0) {
        vec3.min(self.appliedVelocity, self.appliedVelocity, self.stats.physics.terminalPosDodging);
        vec3.max(self.appliedVelocity, self.appliedVelocity, self.stats.physics.terminalNegDodging);
    } else {
        vec3.min(self.appliedVelocity, self.appliedVelocity, self.stats.physics.terminalPos);
        vec3.max(self.appliedVelocity, self.appliedVelocity, self.stats.physics.terminalNeg);
    }

    // Add two velocity components
    vec3.copy(self.velocity, self.appliedVelocity);
    vec3.add(self.velocity, self.velocity, self.launchVelocity);

    // Smooth rotation
    if (self.facing == -1) {
      if (faceRotation >= 0.9)
        faceRotation = 0.9;
      else
        faceRotation += 1 / 4;
    }
    else {
      if (faceRotation <= 0.1)
        faceRotation = 0.1;
      else
        faceRotation -= 1 / 4;
    }

    if(self.winner) {
    faceRotation = 0.5;
    }

    // Only when not stunned
    if (self.stun > 0) {
      self.stun -= 1;
    }
    else {
      self.stun = 0;
    }

    // Move the guy and reset applied force
    vec3.add(self.loc, self.loc, self.velocity);
    if(self.dodging <= 0) {
        vec3.set(self.appliedForce, 0.0, 0.0, 0.0);
    }

    // Friction if grounded
    if (!self.airborne) {
      self.appliedVelocity[2] /= 1.5;
    }

    prevAirborne = self.airborne;
	$("#player"+(self.num+1)+"hp").text(self.health);
    model.tick(dt);
	}
  };

  self.render = function (dt) {
	if(!self.isDead) {
    mvstack.push(modelView);
      // Should make new matrix with new operations. Can't pre-multiply with webgl
      var newMV = mat4.create();
      // TODO: this transformation just puts the head on top of the origin
      mat4.translate(newMV, newMV, vec3.fromValues(0.0, 1.0, 0.0));
      mat4.translate(newMV, newMV, self.loc); // Move it to location
      mat4.rotateY(newMV, newMV, faceRotation * Math.PI);
      mat4.multiply(modelView, modelView, newMV);

      var stunned;
      if((Math.floor(self.stun))%2 == 0)
        stunned = false;
      else
        stunned = true;
      gl.uniform1i(program.stun, stunned);
      //mat4.translate(modelView, modelView, loc);
      model.render(dt);
    modelView = mvstack.pop();
	}
  };
}
