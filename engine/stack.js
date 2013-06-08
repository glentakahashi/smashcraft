function MatrixStack() {
  var self = this;
  var stack = [];

  self.push = function(m) {
    // Copy old MV. Otherwise it just adds another reference
    var oldMV = mat4.create();
    mat4.copy(oldMV, m);
    return stack.push(oldMV);
  };

  self.pop = function() {
    return stack.pop();
  };
}
