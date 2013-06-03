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
        delay: 5,
        cooldown: 10,
        damage: 7,
        stun: 11,
        sound: 'punchHit',
      },
      sideSmash: {
        range: vec3.fromValues(100.0, 3.5, 4.5),
        facing: true,
        knockback: {
          angle: Math.PI / 3.5,
          base: 30,
          growth: 500,
        },
        damage: 16,
        stun: 28,
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
    'mario': charClone('Mario', 'luigi'),
    'donkey%20kong': charClone('Donkey Kong', 'luigi'),
    'link': charClone('Link', 'luigi'),
    'samus': charClone('Samus', 'luigi'),
    'captain%20falcon': charClone('Captain Falcon', 'luigi'),
    'ness': charClone('Ness', 'luigi'),
    'yoshi': charClone('Yoshi', 'luigi'),
    'kirby': charClone('Kirby', 'luigi'),
    'fox': charClone('Fox', 'luigi'),
    'pikachu': charClone('Pikachu', 'luigi'),
    'jigglypuff': charClone('Jigglypuff', 'luigi'),
    'nightwing': charClone('Nightwing', 'luigi'),
    'robin': charClone('Robin', 'luigi'),
    'batman': charClone('Batman', 'luigi'),
    'superman': charClone('Superman', 'luigi'),
    'iron%20man': charClone('Iron Man', 'luigi'),
    'spiderman': charClone('Spiderman', 'luigi'),
  }

};

