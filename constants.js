var constants = {
  physics: {
    G: vec3.fromValues(0.0, -3.0, 0.0),
    TERMINAL_MAX: vec3.fromValues(-1000.0, -0.70, -1000.0),
    TERMINAL_MIN: vec3.fromValues(1000.0, 1000.0, 1000.0),
    FRICTION_Z: 1.5
  },

  stage: {
    battlefield: {

    }
  },

  heros: {
    guyman: {
      name: 'Guy-Man',
      id: 'guyman',
      jumpHeight: 1.1,
      maxJumps: 2,
      weight: 1.0,
      moveSpeed: 0.35,
      attacks: {
        neutral: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          push: {
            facing: vec3.fromValues(0.0, 0.0, 0.25),
            absolute: vec3.fromValues(0.0, 0.25, 0.0),
            scale: 0.45,
            pow: 1.0,
            min: 0.3,
          },
          scale: 0.5,
          damage: 7,
          stun: 200, // in MS
          sound: 'punchHit',
        },
        sideSmash: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          push: {
            facing: vec3.fromValues(0.0, 0.0, 0.15),
            absolute: vec3.fromValues(0.0, 0.25, 0.0),
            scale: 1.0,
            pow: 4.0,
            min: 0.4,
          },
          damage: 15,
          stun: 500, // in MS
          sound: 'smashHit',
        }
      }
    },
    thomas: {
      name: 'Thomas',
      id: 'thomas',
      jumpHeight: 0.6,
      maxJumps: 6,
      weight: 0.6,
      moveSpeed: 0.35,
      attacks: {
        neutral: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          push: {
            facing: vec3.fromValues(0.0, 0.0, 0.15),
            absolute: vec3.fromValues(0.0, 0.25, 0.0),
            scale: 0.5,
            pow: 1.2,
            min: 0.2,
          },
          scale: 0.5,
          damage: 7,
          stun: 200, // in MS
          sound: 'punchHit',
        },
        sideSmash: {
          range: vec3.fromValues(100.0, 3.5, 4.5),
          facing: true,
          push: {
            facing: vec3.fromValues(0.0, 0.0, 0.15),
            absolute: vec3.fromValues(0.0, 0.25, 0.0),
            scale: 0.5,
            pow: 1.2,
            min: 0.2,
          },
          damage: 15,
          stun: 500, // in MS
          sound: 'smashHit',
        }
      }
    }
  }

};

