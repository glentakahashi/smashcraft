function charClone(name, id) {
  return {
    name: name,
    id: id,
    jumpHeight: 1.0,
    airJumps: 2,
    moveSpeed: 0.35,
    physics: {
      gravityScale: 1.0,
      terminalPos: vec3.fromValues(0.0, 100, 0.3),
      terminalNeg: vec3.fromValues(0.0, -1.0, -0.3),
    },
    launchResistance: 500.0,
    attacks: {
      neutral: {
        range: vec3.fromValues(100.0, 3.5, 4.5),
        facing: true,
        knockback: {
          angle: Math.PI / 6,
          base: 10,
          growth: 100,
        },
        damage: 7,
        stun: 200,
        sound: 'punchHit',
      },
      sideSmash: {
        range: vec3.fromValues(100.0, 3.5, 4.5),
        facing: true,
        knockback: {
          angle: Math.PI / 4,
          base: 30,
          growth: 300,
        },
        damage: 16,
        stun: 700,
        sound: 'punchHit',
      },
    }
  }
}
var constants = {
  physics: {
    G: vec3.fromValues(0.0, -0.0375, 0.0),
    TERMINAL_MAX: vec3.fromValues(-1000.0, -1.0, -1000.0),
    TERMINAL_MIN: vec3.fromValues(1000.0, 1000.0, 1000.0),
    FRICTION_Z: 1.5
  },

  stage: {
    battlefield: {

    }
  },

  heros: {
    'luigi': charClone('Luigi', 'luigi'),
    'mario': charClone('Luigi', 'luigi'),
    'donkey%20kong': charClone('Luigi', 'luigi'),
    'link': charClone('Luigi', 'luigi'),
    'samus': charClone('Luigi', 'luigi'),
    'captain%20falcon': charClone('Luigi', 'luigi'),
    'ness': charClone('Luigi', 'luigi'),
    'yoshi': charClone('Luigi', 'luigi'),
    'kirby': charClone('Luigi', 'luigi'),
    'fox': charClone('Luigi', 'luigi'),
    'pikachu': charClone('Luigi', 'luigi'),
    'jigglypuff': charClone('Luigi', 'luigi'),
    'nightwing': charClone('Luigi', 'luigi'),
    'robin': charClone('Luigi', 'luigi'),
    'batman': charClone('Luigi', 'luigi'),
    'superman': charClone('Luigi', 'luigi'),
    'iron%20man': charClone('Luigi', 'luigi'),
    'spiderman': charClone('Luigi', 'luigi'),
  }

};

