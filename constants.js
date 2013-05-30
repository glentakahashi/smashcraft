var constants = {
  physics: {
    G: vec3.fromValues(0.0, -3.0, 0.0),
    TERMINAL_MAX: vec3.fromValues(-1000.0, -0.70, -1000.0),
    TERMINAL_MIN: vec3.fromValues(1000.0, 1000.0, 1000.0),
    FRICTION_Z: 1.5
  },

  heros: {
    guyman: {
      name: 'Guy-Man',
      id: 'guyman',
      health: 100,
      jumpHeight: 1.0,
      maxJumps: 2,
      weight: 1.0,
      moveSpeed: 0.35,
      attacks: {
        neutral: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          facingPush: vec3.fromValues(0.0, 0.0, 0.05),
          absolutePush: vec3.fromValues(0.0, 0.25, 0.0),
          damage: 15,
          stun: 200, // in MS
          sound: 'punchHit',
        },
        sideSmash: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          facingPush: vec3.fromValues(0.0, 0.0, 0.65),
          absolutePush: vec3.fromValues(0.0, 0.05, 0.0),
          damage: 15,
          stun: 500, // in MS
          sound: 'smashHit',
        }
      }
    },
    thomas: {
      name: 'Thomas',
      id: 'thomas',
      health: 100,
      jumpHeight: 0.6,
      maxJumps: 6,
      weight: 0.6,
      moveSpeed: 0.35,
      attacks: {
        neutral: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          facingPush: vec3.fromValues(0.0, 0.0, 0.075),
          absolutePush: vec3.fromValues(0.0, 0.25, 0.0),
          damage: 10,
          stun: 200, // in MS
          sound: 'punchHit',
        },
        sideSmash: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          facingPush: vec3.fromValues(0.0, 0.0, 0.65),
          absolutePush: vec3.fromValues(0.0, 0.35, 0.0),
          damage: 10,
          stun: 700, // in MS
          sound: 'smashHit',
        }
      }
    }
  }

};

