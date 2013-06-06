function charClone(name, id) {
  return {
    name: name,
    id: id,
    jumpHeight: 1.0,
    airJumps: 2,
    moveSpeed: 0.35,
    physics: {
      gravityScale: 1.0,
      terminalPos: vec3.fromValues(0.0, 100, 0.4),
      terminalNeg: vec3.fromValues(0.0, -0.90, -0.4),
    },
    launchResistance: 500.0,
    attacks: {
      neutral: {
        range: vec3.fromValues(100.0, 6.5, 9.5),
        facing: true,
        knockback: {
          angle: Math.PI / 4,
          base: 12,
          growth: 100,
        },
        timing: {
          windup: 3,
          duration: 5,
          cooldown: 4,
        },
        damage: 7,
        stun: 16,
        sound: 'punchHit',
      },
      sideSmash: {
        range: vec3.fromValues(100.0, 5.5, 6.5),
        facing: true,
        knockback: {
          angle: Math.PI / 3.5,
          base: 30,
          growth: 500,
        },
        timing: {
          windup: 10,
          duration: 5,
          cooldown: 14,
        },
        damage: 16,
        stun: 28,
        sound: 'smashHit',
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
  }
};

$.get('characterData.csv', function(data) {
	var arr=CSVToArray(data);
	constants.heros=new Object();
	for(var i=1;i<arr.length;i++) {
		var ch=arr[i];
		var name=encodeURIComponent(ch[0].toLowerCase());
		var c = charClone(ch[0],name);
		c.jumpHeight = parseFloat(ch[1]);
		c.airJumps = parseFloat(ch[2]);
		c.physics.terminalPos = vec3.fromValues(0.0, 100, ch[3]);
	    c.physics.terminalNeg = vec3.fromValues(0.0, -0.90, -1*ch[3]);
	    c.physics.gravityScale = parseFloat(ch[4]);
		c.launchResistance=parseFloat(ch[5]);
		c.attacks.neutral.range = vec3.fromValues(100.0, parseFloat(ch[6]), 9.5);
		c.attacks.neutral.knockback.base = parseFloat(ch[7]);
		c.attacks.neutral.knockback.growth = parseFloat(ch[8]);
		c.attacks.neutral.timing.windup = parseFloat(ch[9]);
		c.attacks.neutral.timing.duration = parseFloat(ch[10]);
		c.attacks.neutral.timing.cooldown = parseFloat(ch[11]);
		c.attacks.neutral.damage = parseFloat(ch[12]);
		c.attacks.neutral.stun = parseFloat(ch[13]);
		c.attacks.sideSmash.range = vec3.fromValues(100.0, parseFloat(ch[14]), 9.5);
		c.attacks.sideSmash.knockback.base = parseFloat(ch[15]);
		c.attacks.sideSmash.knockback.growth = parseFloat(ch[16]);
		c.attacks.sideSmash.timing.windup = parseFloat(ch[17]);
		c.attacks.sideSmash.timing.duration = parseFloat(ch[18]);
		c.attacks.sideSmash.timing.cooldown = parseFloat(ch[19]);
		c.attacks.sideSmash.damage = parseFloat(ch[20]);
		c.attacks.sideSmash.stun = parseFloat(ch[21]);
		constants.heros[name] = c;
	}
});

function CSVToArray( strData, strDelimiter ){
	strDelimiter = (strDelimiter || ",");
	var objPattern = new RegExp(
		(
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
		);
	var arrData = [[]];
	var arrMatches = null;
	while (arrMatches = objPattern.exec( strData )){
		var strMatchedDelimiter = arrMatches[ 1 ];
		if (
			strMatchedDelimiter.length &&
			(strMatchedDelimiter != strDelimiter)
			){
			arrData.push( [] );
		}
		if (arrMatches[ 2 ]){
			var strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
				);
		} else {
			var strMatchedValue = arrMatches[ 3 ];
		}
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}
	return( arrData );
}
