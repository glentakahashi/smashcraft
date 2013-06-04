function PlayerModel() {
  var self = this;
  var tex;
  var animation = 0;
  var animtime = 0.0;

  var head = {
      uvCoords: [
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
      ]
  };

  var body = {
      uvCoords: [
          // Front face
          5/16, 0.0,
          7/16, 0.0,
          7/16, 3/8,

          5/16, 0.0,
          7/16, 3/8,
          5/16, 3/8,

          // Back face
          5/8, 0.0,
          5/8, 3/8,
          1/2, 3/8,

          5/8, 0.0,
          1/2, 3/8,
          1/2, 0.0,

          // Top face
          5/16, 1/2,
          5/16, 3/8,
          7/16, 3/8,

          5/16, 1/2,
          7/16, 3/8,
          7/16, 1/2,

          // Bottom face
          9/16, 1/2,
          7/16, 1/2,
          7/16, 3/8,

          9/16, 1/2,
          7/16, 3/8,
          9/16, 3/8,

          // Right face
          4/16, 3/8,
          4/16, 0.0,
          5/16, 0.0,

          5/16, 3/8,
          4/16, 0.0,
          4/16, 3/8,

          // Left face
          7/16, 0.0,
          8/16, 0.0,
          8/16, 3/8,

          7/16, 0.0,
          8/16, 3/8,
          7/16, 3/8,
      ]
  };

  var leg = {
      uvCoords: [
          // Front face
          1/16, 0.0,
          2/16, 0.0,
          2/16, 3/8,

          1/16, 0.0,
          2/16, 3/8,
          1/16, 3/8,

          // Back face
          4/16, 0.0,
          4/16, 3/8,
          3/16, 3/8,

          4/16, 0.0,
          3/16, 3/8,
          3/16, 0.0,

          // Top face
          1/16, 4/8,
          1/16, 3/8,
          2/16, 3/8,

          1/16, 4/8,
          2/16, 3/8,
          2/16, 4/8,

          // Bottom face
          3/16, 4/8,
          2/16, 4/8,
          2/16, 3/8,

          3/16, 4/8,
          2/16, 3/8,
          3/16, 3/8,

          // Right face
          1/16, 0.0,
          1/16, 3/8,
          0/16, 3/8,

          1/16, 0.0,
          0/16, 3/8,
          0/16, 0.0,

          // Left face
          2/16, 0.0,
          3/16, 0.0,
          3/16, 3/8,

          2/16, 0.0,
          3/16, 3/8,
          2/16, 3/8,
      ]
  };

  var arm = {
      uvCoords: [
          // Front face
          11/16, 0.0,
          12/16, 0.0,
          12/16, 3/8,

          11/16, 0.0,
          12/16, 3/8,
          11/16, 3/8,

          // Back face
          14/16, 0.0,
          14/16, 3/8,
          13/16, 3/8,

          14/16, 0.0,
          13/16, 3/8,
          13/16, 0.0,

          // Top face
          11/16, 4/8,
          11/16, 3/8,
          12/16, 3/8,

          11/16, 4/8,
          12/16, 3/8,
          12/16, 4/8,

          // Bottom face
          13/16, 4/8,
          12/16, 4/8,
          12/16, 3/8,

          13/16, 4/8,
          12/16, 3/8,
          13/16, 3/8,

          // Right face
          11/16, 0.0,
          11/16, 3/8,
          10/16, 3/8,

          11/16, 0.0,
          10/16, 3/8,
          10/16, 0.0,

          // Left face
          12/16, 0.0,
          13/16, 0.0,
          13/16, 3/8,

          12/16, 0.0,
          13/16, 3/8,
          12/16, 3/8,
      ]
  };

  var bodyparts = [head,body,arm,leg];

  self.init = function(texture) {
      var vertices = [
          // Front face
          -1.0, -1.0,  1.0, 1,  // 0
          1.0, -1.0,  1.0, 1,  // 1
          1.0,  1.0,  1.0, 1,  // 2

          -1.0, -1.0,  1.0, 1,  // 0
          1.0,  1.0,  1.0, 1,  // 2
          -1.0,  1.0,  1.0, 1,  // 3

          // Back face
          -1.0, -1.0, -1.0, 1,  // 4
          -1.0,  1.0, -1.0, 1,  // 5
          1.0,  1.0, -1.0, 1,  // 6

          -1.0, -1.0, -1.0, 1,  // 4
          1.0,  1.0, -1.0, 1,  // 6
          1.0, -1.0, -1.0, 1,  // 7

          // Top face
          -1.0,  1.0, -1.0, 1,  // 8
          -1.0,  1.0,  1.0, 1,  // 9
          1.0,  1.0,  1.0, 1,  // 10

          -1.0,  1.0, -1.0, 1,  // 8
          1.0,  1.0,  1.0, 1,  // 10
          1.0,  1.0, -1.0, 1,  // 11

          // Bottom face
          -1.0, -1.0, -1.0, 1,  // 12
          1.0, -1.0, -1.0, 1,  // 13
          1.0, -1.0,  1.0, 1,  // 14

          -1.0, -1.0, -1.0, 1,  // 12
          1.0, -1.0,  1.0, 1,  // 14
          -1.0, -1.0,  1.0, 1,  // 15

          // Right face
          1.0, -1.0, -1.0, 1,  // 16
          1.0,  1.0, -1.0, 1,  // 17
          1.0,  1.0,  1.0, 1,  // 18

          1.0, -1.0, -1.0, 1,  // 16
          1.0,  1.0,  1.0, 1,  // 18
          1.0, -1.0,  1.0, 1,  // 19

          // Left face
          -1.0, -1.0, -1.0, 1,  // 20
          -1.0, -1.0,  1.0, 1,  // 21
          -1.0,  1.0,  1.0, 1,  // 22

          -1.0, -1.0, -1.0, 1,  // 20
          -1.0,  1.0,  1.0, 1,  // 22
          -1.0,  1.0, -1.0, 1,  // 23
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
      tex = texture;
      for(var i in bodyparts) {
          var bodypart = bodyparts[i];
          bodypart.vertices = vertices;
          bodypart.verticesFloatArr = new Float32Array(bodypart.vertices);
          bodypart.uvFloatArr = new Float32Array(bodypart.uvCoords);
          bodypart.normals = vertexNormals;
          bodypart.normalsFloatArr = new Float32Array(bodypart.normals);

          // Position buffer
          bodypart.positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, bodypart.positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, bodypart.verticesFloatArr, gl.STATIC_DRAW);

          // UV buffer
          bodypart.uvBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, bodypart.uvBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, bodypart.uvFloatArr, gl.STATIC_DRAW);

          // normal buffer
          bodypart.normalsBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, bodypart.normalsBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, bodypart.normalsFloatArr, gl.STATIC_DRAW);

          // Just add properties because why not
          bodypart.positionBuffer.itemSize = 4;
          bodypart.positionBuffer.itemCount = bodypart.vertices.length / bodypart.positionBuffer.itemSize;

          bodypart.uvBuffer.itemSize = 2;
          bodypart.uvBuffer.itemCount = bodypart.uvCoords.length / bodypart.uvBuffer.itemSize;

          bodypart.normalsBuffer.itemSize = 3;
          bodypart.normalsBuffer.itemCount = bodypart.normals.length / bodypart.normalsBuffer.itemSize;
      }
  };
  
  self.setAnimation = function(a) {
  //if its the same animation do dont anything
  //or if its in a punching/kicking animation. dont override those
      if(animation == a || animation > 2) return;
      animation = a;
      animtime = 0;
  };

  self.tick = function(dt) {
      animtime += dt;
      //idle
      if(animation == 0) {
      animtime = 0;
          for(var i in bodyparts) {
              bodyparts[i].rotation = 0;
              bodyparts[i].x = 0;
              bodyparts[i].y = 0;
              bodyparts[i].z = 0;
          }
          //walking
      } else if (animation == 1) {
          //head
          //stays same
          //body
          //stays same
          var temp = (Math.floor(animtime / 300) % 2) == 1;
          //arm
          if(temp) {
              arm.rotation = ((animtime % 300)-150) / 300;
          } else {
              arm.rotation = (150-(animtime % 300)) / 300;
          }
          //leg
          if(temp) {
              leg.rotation = ((animtime % 300)-150) / 300;
          } else {
              leg.rotation = (150-(animtime % 300)) / 300;
          }
          //jumping
      } else if (animation == 2 ) {
          arm.rotation = -1 * (5 * Math.PI / 6);
          var temp = animtime % 200;
          if(temp >= 100) {
          arm.rotation += -1 * (Math.PI / 2) * ((200 - (temp % 200)) / 200);
          } else {
          arm.rotation += -1 * (Math.PI / 2) * ((temp % 200) / 200);
          }
          //punching
      } else if (animation == 3 ) {
      //end of animation
          if(animtime >= 300) {
              animation = 0;
              //move arm down
          } else if (animtime >= 250) {
              arm.rotation = -1 * (Math.PI / 2) * ((100 - ((animtime - 250) % 100)) / 100);
              //move arm back
          } else if (animtime >= 150) {
          arm.rotation = -1 * (Math.PI / 2);
              arm.x = (100 - ((animtime - 150) % 100)) / 100;
              //move arm forward to punch
          } else if (animtime >= 50) {
          arm.rotation = -1 * (Math.PI / 2);
              arm.x = ((animtime - 50) % 100) / 100;
              //move arm up to punch
          } else {
              arm.rotation = -1 * (Math.PI / 2) * ((animtime % 50) / 50);
          }
      //kicking
      } else if (animation == 4 ) {
      //done
          if(animtime >= 300) {
              animation = 0;
          } else if (animtime >= 150) {
              leg.rotation = -1 * (Math.PI / 2) * ((150 - ((animtime - 150)) % 150) / 150);
          } else {
              leg.rotation = -1 * (Math.PI / 2) * ((animtime % 150) / 150);
          }
          //winning
      } else if (animation == 5) {
      }
  };

  self.render = function (dt) {
    gl.uniform1i(program.useNormalMap, 0);
    var newMV;
    var newVec;
    mvstack.push(modelView);
      //head
      mvstack.push(modelView);
        // Should make new matrix with new operations. Can't pre-multiply with webgl
        newMV = mat4.create();
        newVec = vec3.fromValues(0,5.5,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);

        gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(modelView, normalMatrix);
        gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, head.positionBuffer);
        gl.vertexAttribPointer(program.aVertexPosition, head.positionBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, head.uvBuffer);
        gl.vertexAttribPointer(program.aTextureCoord, head.uvBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, head.normalsBuffer);
        gl.vertexAttribPointer(program.aVertexNormal, head.normalsBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(program.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, head.positionBuffer.itemCount);
      modelView = mvstack.pop();
      //body
      mvstack.push(modelView);
        // Should make new matrix with new operations. Can't pre-multiply with webgl
        newMV = mat4.create();
        newVec = vec3.fromValues(0,3.0,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        newVec = vec3.fromValues(1,1.5,0.5);
        mat4.scale(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);

        gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(modelView, normalMatrix);
        gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, body.positionBuffer);
        gl.vertexAttribPointer(program.aVertexPosition, body.positionBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, body.uvBuffer);
        gl.vertexAttribPointer(program.aTextureCoord, body.uvBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, body.normalsBuffer);
        gl.vertexAttribPointer(program.aVertexNormal, body.normalsBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(program.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, body.positionBuffer.itemCount);
      modelView = mvstack.pop();
      //arm1
      mvstack.push(modelView);
        // Should make new matrix with new operations. Can't pre-multiply with webgl
        newMV = mat4.create();
        newVec = vec3.fromValues(1.5,3.0,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        //rotate the arm
        if(animation == 1 || animation == 2) {
        newMV = mat4.create();
        newVec = vec3.fromValues(0,0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        mat4.rotateX(newMV, newMV, -arm.rotation);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        newVec = vec3.fromValues(0,-0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        }
        //rotate
        newMV = mat4.create();
        newVec = vec3.fromValues(0.5,1.5,0.5);
        mat4.scale(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);

        gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(modelView, normalMatrix);
        gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, arm.positionBuffer);
        gl.vertexAttribPointer(program.aVertexPosition, arm.positionBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, arm.uvBuffer);
        gl.vertexAttribPointer(program.aTextureCoord, arm.uvBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, arm.normalsBuffer);
        gl.vertexAttribPointer(program.aVertexNormal, arm.normalsBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(program.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, arm.positionBuffer.itemCount);
      modelView = mvstack.pop();
      //arm2
      mvstack.push(modelView);
        // Should make new matrix with new operations. Can't pre-multiply with webgl
        newMV = mat4.create();
        newVec = vec3.fromValues(-1.5,3.0,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        if(animation == 3) {
        newMV = mat4.create();
        newVec = vec3.fromValues(0,0,arm.x);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        }
        if(animation == 1 || animation == 2 || animation == 3) {
        newMV = mat4.create();
        newVec = vec3.fromValues(0,0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        mat4.rotateX(newMV, newMV, arm.rotation);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        newVec = vec3.fromValues(0,-0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        }
        newMV = mat4.create();
        newVec = vec3.fromValues(-0.5,1.5,0.5);
        mat4.scale(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);

        gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(modelView, normalMatrix);
        gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, arm.positionBuffer);
        gl.vertexAttribPointer(program.aVertexPosition, arm.positionBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, arm.uvBuffer);
        gl.vertexAttribPointer(program.aTextureCoord, arm.uvBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, arm.normalsBuffer);
        gl.vertexAttribPointer(program.aVertexNormal, arm.normalsBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(program.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, arm.positionBuffer.itemCount);
      modelView = mvstack.pop();
      //leg1
      mvstack.push(modelView);
        // Should make new matrix with new operations. Can't pre-multiply with webgl
        newMV = mat4.create();
        newVec = vec3.fromValues(-0.5,0.5,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        if(animation == 1) {
        newMV = mat4.create();
        newVec = vec3.fromValues(0,0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        mat4.rotateX(newMV, newMV, -leg.rotation);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        newVec = vec3.fromValues(0,-0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        }
        newMV = mat4.create();
        newVec = vec3.fromValues(-0.5,1.5,0.5);
        mat4.scale(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);

        gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(modelView, normalMatrix);
        gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, leg.positionBuffer);
        gl.vertexAttribPointer(program.aVertexPosition, leg.positionBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, leg.uvBuffer);
        gl.vertexAttribPointer(program.aTextureCoord, leg.uvBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, leg.normalsBuffer);
        gl.vertexAttribPointer(program.aVertexNormal, leg.normalsBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(program.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, leg.positionBuffer.itemCount);
      modelView = mvstack.pop();
      //leg2
      mvstack.push(modelView);
        // Should make new matrix with new operations. Can't pre-multiply with webgl
        newMV = mat4.create();
        newVec = vec3.fromValues(0.5,0.5,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        if(animation == 1 || animation == 4) {
        newMV = mat4.create();
        newVec = vec3.fromValues(0,0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        mat4.rotateX(newMV, newMV, leg.rotation);
        mat4.multiply(modelView, modelView, newMV);
        newMV = mat4.create();
        newVec = vec3.fromValues(0,-0.75,0);
        mat4.translate(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);
        }
        newMV = mat4.create();
        newVec = vec3.fromValues(0.5,1.5,0.5);
        mat4.scale(newMV, newMV, newVec);
        mat4.multiply(modelView, modelView, newMV);

        gl.uniformMatrix4fv(program.uMVMatrix, false, modelView);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(modelView, normalMatrix);
        gl.uniformMatrix3fv(program.uNMatrix, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, leg.positionBuffer);
        gl.vertexAttribPointer(program.aVertexPosition, leg.positionBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, leg.uvBuffer);
        gl.vertexAttribPointer(program.aTextureCoord, leg.uvBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, leg.normalsBuffer);
        gl.vertexAttribPointer(program.aVertexNormal, leg.normalsBuffer.itemSize,
                               gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(program.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, leg.positionBuffer.itemCount);
      modelView = mvstack.pop();
    modelView = mvstack.pop();
  };
}
