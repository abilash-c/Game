(function () {
  if (typeof UnblockMe === "undefined") {
    window.UnblockMe = {};
  };

  var Game = UnblockMe.Game = function () {
    this.blocks = [];
    this.addBlocks();
  };

  var data = global_unblockme_data[Math.floor(Math.random() * 250)];
  
  Game.DIM_X = parseInt(data.w) * 100;
  Game.DIM_Y = parseInt(data.h) * 100;
  Game.BORDER = 10;

  Game.BLOCK_VALUES = [];
  for (i=1;i < data.b.length;i++) {
    Game.BLOCK_VALUES.push({
    width: data.b[i].w * 100,
    height: data.b[i].h * 100,
    pos:[data.b[i]?.x ? data.b[i].x * 100 : 0, data.b[i]?.y ? data.b[i].y * 100 : 0],
    });
  }

  Game.TARGET_BLOCK_VALUE = {
    width: data.b[0].w * 100,
    height: data.b[0].h * 100,
    pos: [data.b[0]?.x ? data.b[0].x * 100 : 0, data.b[0]?.y ? data.b[0].y * 100: 0],
    color: "#D50000",
  };

  Game.EXIT_POS = [data.e.x * 100, data.e.y * 100]

  Game.prototype.addBlocks = function () {
    var that = this;

    // add normal blocks
    Game.BLOCK_VALUES.forEach(function (blockOption) {
      blockOption["game"] = that;
      that.blocks.push(new UnblockMe.Block(blockOption));
    });

    // add target block
    this.targetBlock = new UnblockMe.Block(Game.TARGET_BLOCK_VALUE);
    this.targetBlock.game = this;
    this.blocks.push(this.targetBlock);
  };

  Game.prototype.draw = function (ctx) {
    // clear and draw the big sqaure area
    var dimXw
    ctx.clearRect(0, 0, Game.DIM_X + Game.BORDER * 2,
       Game.DIM_Y  + Game.BORDER * 2);
    ctx.fillStyle = "#d9d5ce";
    ctx.fillRect(0, 0, Game.DIM_X + Game.BORDER * 2,
      Game.DIM_Y  + Game.BORDER * 2);
    ctx.lineWidth = Game.BORDER;
    ctx.strokeStyle="gray";
    ctx.strokeRect(0, 0, Game.DIM_X + Game.BORDER * 2,
      Game.DIM_Y  + Game.BORDER * 2);

    // draw every block
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].draw(ctx);
    };

    // draw exit
    ctx.beginPath();
    ctx.moveTo(Game.EXIT_POS[0] + Game.BORDER * 2,
      Game.EXIT_POS[1] + Game.BORDER);
    ctx.lineTo(Game.EXIT_POS[0] + Game.BORDER * 2,
      Game.EXIT_POS[1] + Game.BORDER + 100);
    ctx.lineWidth= Game.BORDER + 1;
    ctx.strokeStyle="white";
    ctx.stroke();
  };

  Game.prototype.isWon = function () {
    // compare top-right pos of target block and exit pos
    if (this.targetBlock.pos[0] + 200 === Game.EXIT_POS[0] &&
        this.targetBlock.pos[1] === Game.EXIT_POS[1]) {
      return true;
    } else {
      return false;
    };
  };

  Game.prototype.checkWon = function() {
    if (this.isWon()) { alert("win!") };
  };

})();
