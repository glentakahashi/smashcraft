function Game(stageNum,players,p1,p2,p3,p4) {
	$("canvas").css("background","url('"+$("#image"+stageNum).attr("src")+"') no-repeat center center fixed");
	$("body").css("background-color","black");
	
  var self = this;
  self.musicPlaying = false;

  // Game variables
  self.platforms = [];
  var bottomLimit=-30.0;
  var sideLimit=120.0;
  switch(stageNum) {
	case 5:
		//grassland
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 40.0), vec3.fromValues(0.0, 0.0, 0.0), "Block", "grass"));
		self.platforms.push(new Platform(vec3.fromValues(8.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, -24.0), "Trans", "dirt"));
		self.platforms.push(new Platform(vec3.fromValues(8.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, 24.0), "Trans", "dirt"));
		self.platforms.push(new Platform(vec3.fromValues(8.0, 1.0, 6.0), vec3.fromValues(0.0, 24.0, 0.0), "Trans", "dirt"));
		break;
	case 6:
		//jungle
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 36.0), vec3.fromValues(0.0, 0.0, 0.0), "Block", "dirt"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, -14.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, 14.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 24.0, -21.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 24.0, 0.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 24.0, 21.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 36.0, -14.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 36.0, 14.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 48.0, -21.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 48.0, 0.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 48.0, 21.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 60.0, -14.0), "Trans", "wood"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 60.0, 14.0), "Trans", "wood"));
		break;
	case 7:
		//nether
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 24.0), vec3.fromValues(0.0, 0.0, 0.0), "Block", 'lava'));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 15.0, -14.0), "Trans", 'lava', 1.5));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 15.0, 14.0), "Trans", 'lava', 1.5));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 3.0), vec3.fromValues(0.0, 8.0, -28.0), "Trans", 'lava', -1.5));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 3.0), vec3.fromValues(0.0, 8.0, 28.0), "Trans", 'lava', -1.2));
		break;
	case 8:
		//desert
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 36.0), vec3.fromValues(0.0, 0.0, 0.0), "Block", "sand"));
		break;
	case 9:
		//mountains
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 36.0), vec3.fromValues(0.0, 0.0, 0.0), "Block", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, -21.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, -7.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, 7.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 12.0, 21.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 24.0, -14.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 24.0, 0.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 24.0, 14.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 36.0, -7.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 36.0, 7.0), "Trans", "stone"));
		self.platforms.push(new Platform(vec3.fromValues(6.0, 1.0, 6.0), vec3.fromValues(0.0, 48.0, 0.0), "Trans", "stone"));
		break;
	case 0:
		//ocean
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 10.0), vec3.fromValues(0.0, 0.0, -25.0), "Block", "dirt"));
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 10.0), vec3.fromValues(0.0, 0.0, 0.0), "Block", "dirt"));
		self.platforms.push(new Platform(vec3.fromValues(8.0, 2.0, 10.0), vec3.fromValues(0.0, 0.0, 25.0), "Block", "dirt"));
		break;
  }

  self.players = [];
  for(var i=0;i<players;i++) self.players.push(new Player(i));
  self.controller = new Controller();
  self.camera = new Camera();

  // Initialize WebGL context, shaders
  var initGL = function() {
    var canvas = document.getElementById('canvas');

    // Initialize global GL variables
    gl = canvas.getContext('experimental-webgl');
    program = gl.createProgram();

    // Get and compile shaders
    var vertexShader = getShader('vertex-shader');
    var fragmentShader = getShader('fragment-shader');

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    // Get textures
    textures[0] = getTexture('img/characters/' + p1 + 'BMP.png');
    textures[1] = getTexture('img/characters/' + p2 + 'BMP.png');
    textures[2] = getTexture('img/characters/' + p3 + 'BMP.png');
    textures[3] = getTexture('img/characters/' + p4 + 'BMP.png');

    // Terrain textures
    textures.grassTerrain = getTexture('img/terrain/grass.png');
    textures.grassNormal = getTexture('img/terrain/grass-normal.png');
    textures.stoneTerrain = getTexture('img/terrain/stone.png');
    textures.stoneNormal = getTexture('img/terrain/stone-normal.png');
    textures.woodTerrain = getTexture('img/terrain/wood.png');
    textures.woodNormal = getTexture('img/terrain/wood-normal.png');
    textures.sandTerrain = getTexture('img/terrain/sand.png');
    textures.sandNormal = getTexture('img/terrain/sand-normal.png');
    textures.lavaTerrain = getTexture('img/terrain/lava.png');
    textures.lavaNormal = getTexture('img/terrain/lava-normal.png');
    textures.dirtTerrain = getTexture('img/terrain/dirt.png');
    textures.dirtNormal = getTexture('img/terrain/dirt-normal.png');

    // That steve
    textures.steve = getTexture('img/steve2.png');
    
    // Per-vertex attributes
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    program.aVertexNormal = gl.getAttribLocation(program, 'aVertexNormal');
    program.aVertexTangent = gl.getAttribLocation(program, 'aVertexTangent');

    // Transformation matrices
    program.uMVMatrix = gl.getUniformLocation(program, 'uMVMatrix');
    program.uPMatrix = gl.getUniformLocation(program, 'uPMatrix');
    program.uCMatrix = gl.getUniformLocation(program, 'uCMatrix');
    program.uNMatrix = gl.getUniformLocation(program, 'uNMatrix');

    // Lighting
    program.uAmbientColor = gl.getUniformLocation(program, 'uAmbientColor');
    program.uPointLightingLocation = gl.getUniformLocation(program, 'uPointLightingLocation');
    program.uPointLightingColor = gl.getUniformLocation(program, 'uPointLightingColor');

    // Texture Samplers
    program.uSampler = gl.getUniformLocation(program, 'uSampler');
    program.uNormalSampler = gl.getUniformLocation(program, 'uNormalSampler');

    // Flags
    program.stun = gl.getUniformLocation(program, 'stun');
    program.useNormalMap = gl.getUniformLocation(program, 'useNormalMap');

    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.enableVertexAttribArray(program.aTextureCoord);
    gl.enableVertexAttribArray(program.aVertexNormal);
    gl.enableVertexAttribArray(program.aVertexTangent);
    // Initialize matrices
    modelView = mat4.create();

    // Set perspective matrix
    //doPerspective();

    gl.clearColor(0.0, 0.0, 0.0, 0.0);  // Black
    gl.enable(gl.DEPTH_TEST);
  }

  var doPerspective = function() {
  };

  var initController = function() {
    self.controller.init();

    // Escape
    self.controller.tap(27, function() {
      reset=true;
    })

    // W
    self.controller.tap(87, function() {
      self.players[0].jump();
    });
    // S
    self.controller.hold(83, function() {
      self.players[0].drop();
    });
    // A
    self.controller.hold(65, function() {
      self.players[0].move(1);
    });
    // D
    self.controller.hold(68, function() {
      self.players[0].move(-1);
    });
    // Q
    self.controller.tap(81, function() {
      self.players[0].attack('neutral');
    });
    // E
    self.controller.tap(69, function() {
      self.players[0].attack('sideSmash');
    });


    // UP
    self.controller.tap(38, function() {
      self.players[1].jump();
    });
    // DOWN
    self.controller.hold(40, function() {
      self.players[1].drop();
    });
    // LEFT
    self.controller.hold(37, function() {
      self.players[1].move(1);
    });
    // RIGHT
    self.controller.hold(39, function() {
      self.players[1].move(-1);
    });
    // ENTER
    self.controller.tap(13, function() {
      self.players[1].attack('neutral');
    });
    // Right Shift
    self.controller.tap(16, function() {
      self.players[1].attack('sideSmash');
    });
    // backslash
    self.controller.tap(220, function() {
      self.players[1].attack('sideSmash');
    });

	if(self.players.length>2) {
	    // Y
	    self.controller.tap(89, function() {
	      self.players[2].jump();
	    });
	    // H
	    self.controller.hold(72, function() {
	      self.players[2].drop();
	    });
	    // J
	    self.controller.hold(71, function() {
	      self.players[2].move(1);
	    });
	    // G
	    self.controller.hold(74, function() {
	      self.players[2].move(-1);
	    });
	    // T
	    self.controller.tap(84, function() {
	      self.players[2].attack('neutral');
	    });
	    // U
	    self.controller.tap(85, function() {
	      self.players[2].attack('sideSmash');
	    });
	}
	if(self.players.length>3) {
	    // P
	    self.controller.tap(80, function() {
	      self.players[3].jump();
	    });
	    // ;
	    self.controller.hold(186, function() {
	      self.players[3].drop();
	    });
	    // '
	    self.controller.hold(76, function() {
	      self.players[3].move(1);
	    });
	    // L
	    self.controller.hold(222, function() {
	      self.players[3].move(-1);
	    });
	    // O
	    self.controller.tap(79, function() {
	      self.players[3].attack('neutral');
	    });
	    // [
	    self.controller.tap(219, function() {
	      self.players[3].attack('sideSmash');
	    });
	}
  };

  self.init = function() {
    initGL();
    self.camera.init(vec3.fromValues(80.0, 20, 0),
                     vec3.fromValues(0.0, 8.0, 0.0));
    initController();

    for (var i in self.platforms) {
      self.platforms[i].init();
    }
    self.players[0].init(constants.heros[p1]);
    self.players[1].init(constants.heros[p2]);
    if (players >= 3)
      self.players[2].init(constants.heros[p3]);
    if (players >= 4)
      self.players[3].init(constants.heros[p4]);
    if(players==2) {
		self.players[0].loc[2]=9;
		self.players[1].loc[2]=-9;
	} else if(players==3) {
		self.players[0].loc[2]=9;
		self.players[1].loc[2]=0;
		self.players[2].loc[2]=-9;
	} else if(players==4) {
		self.players[0].loc[2]=9;
		self.players[1].loc[2]=3;
		self.players[2].loc[2]=-3;
		self.players[3].loc[2]=-9;
	}

    if (p1 == 'snoop%20dogg' ||
        p2 == 'snoop%20dogg' ||
        p3 == 'snoop%20dogg' ||
        p4 == 'snoop%20dogg') {
      audio.playMusic('snoop');
    }
    else if (p1 == 'michael%20jordan' ||
             p2 == 'michael%20jordan' ||
             p3 == 'michael%20jordan' ||
             p4 == 'michael%20jordan') {
      audio.playMusic('slam');
    }
    else {
      audio.playMusic('pokemon');
    }
  };

  var lastTime = 0;
  self.tick = function() {
	if(reset) {
    // New frame
    audio.stopMusic();
		gameOverTime=0;
		reset=false;
		$("#game").hide();
		$("#selection").show();
		$("#winner").hide();
		$("body").css("background-color","white");
		setKeys();
	} else {	
	    requestAnimFrame(self.tick);
	
	//Is Game Over?
	var countAlive=0;
	var isAlive=0;
	for(var i=0;i<game.players.length;i++) {
		if(game.players[i].isDead==false) {
			countAlive++;
			isAlive=i;
		}
	}
	for(var i=0;i<game.players.length;i++) {
		switch(game.players[i].rank) {
			case 2:
				$("#p"+(i+1)+" .damage").text("2nd");
				break;
			case 3:
				$("#p"+(i+1)+" .damage").text("3rd");
				break;
			case 4:
				$("#p"+(i+1)+" .damage").text("4th");
				break;
		}
	}
	if(countAlive==1&&gameOverTime==0) {
		gameOverTime=new Date().getTime();
		$("#winner").show();
		$("#winner").text("Winner: "+game.players[isAlive].stats.name);
		$("#p"+(isAlive+1)+" .damage").text("1st");
		for(var i=0;i<game.players.length;i++) {
			game.players[i].spawn();
			game.players[i].loc[1]=2;
            game.players[i].setAnimation(5);
            game.players[i].winner = true;
		}
		window.onkeydown=function(e) {
			//reset game
			var currTime=new Date().getTime();
			if(e.which==27&&gameOverTime+10<currTime) {
				reset=true;
			}
		}
	}

    // Calculate dt
    var timeNow = new Date().getTime();
    var dt = 0;
    if (lastTime != 0) {
      dt = timeNow - lastTime;
    }
    lastTime = timeNow;

    // Controllers
    self.controller.tick();

    // Platforms
    for (var i in self.platforms) {
      self.platforms[i].tick(dt);
    }

    // Players
	var notDeadPlayers=0;
    var locSum = vec3.create();
    var minLoc = vec3.create();
    var maxLoc = vec3.create();
    for (var i in self.players) {
      var currentPlayer = self.players[i];

	  if(!currentPlayer.isDead) {
	  notDeadPlayers++;
      // Camera location math
      vec3.add(locSum, locSum, currentPlayer.loc);
      vec3.max(maxLoc, maxLoc, currentPlayer.loc);
      vec3.min(minLoc, minLoc, currentPlayer.loc);

      var airborne = true;

      // Player-platform collision
      for (var j in self.platforms) {
        var currentPlatform = self.platforms[j];
        if (currentPlayer.loc[2] <= currentPlatform.loc[2] + currentPlatform.scale[2] &&
            currentPlayer.loc[2] >= currentPlatform.loc[2] - currentPlatform.scale[2] &&
            // Above (terminal velocity below platform top)
            currentPlayer.loc[1] >= currentPlatform.loc[1] +
                                    currentPlatform.scale[1] +
                                    currentPlayer.stats.physics.terminalNeg[1] * currentPlatform.terminalLocation &&
            // Below (platform top + a little extra give)
            currentPlayer.loc[1] <= currentPlatform.loc[1] + currentPlatform.scale[1] + 0.1
            ) {

          if (currentPlayer.velocity[1] <= 0) {
            currentPlayer.loc[1] = currentPlatform.loc[1] + currentPlatform.scale[1];
            currentPlayer.velocity[1] = 0;
            currentPlayer.appliedVelocity[1] = 0;
            airborne = false;
            if (currentPlayer.airborne && currentPlayer.knockback)
              currentPlayer.knockback = false;
            break; // No need to check other platforms
          }

        }
      }

      currentPlayer.airborne = airborne;
      currentPlayer.tick(dt);

      // Die off the bottom
      if (currentPlayer.loc[1] < bottomLimit)
        currentPlayer.die();

      // Right wall
      if (currentPlayer.loc[2] < -1*sideLimit)
        currentPlayer.die();

      // Left wall
      if (currentPlayer.loc[2] > sideLimit)
        currentPlayer.die();
	  }

    }

    // Camera movement
    var dist = vec3.distance(minLoc, maxLoc);
    self.camera.setZoomTarget(35 / (Math.pow(dist, .65)));
    vec3.scale(self.camera.atTarget, locSum, 1/notDeadPlayers);

    self.camera.tick(dt);
    
    self.render(dt);
}
  };

  var t = 0;
  self.render = function (dt) {
    t += dt / 500;


    //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    //Lighting stuff
    gl.uniform3f(program.uAmbientColor, 0.2, 0.2, 0.2);
    gl.uniform3f(program.uPointLightingLocation, 20.0, 80.0 * Math.cos(t/4), 80 * Math.sin(t/4));
    gl.uniform3f(program.uPointLightingColor, 1.0, 1.0, 1.0);

    for (var i in self.platforms) {
      self.platforms[i].render();
    }
    for (var i in self.players) {
      self.players[i].render();
    }
  };
}
