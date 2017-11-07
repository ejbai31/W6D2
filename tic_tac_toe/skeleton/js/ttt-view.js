class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (event =>{
      const $square = $(event.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer;
    try{
      this.game.playMove(pos);
    } catch (e) {
      alert("INVALID!");
      return;
    }
    $square.addClass(currentPlayer);
    if(this.game.isOver()){
      this.$el.off("click");
      this.$el.addClass("game-over");
      const winner = this.game.winner();
      const $capt = $("<figcaption>");
      if (winner){
        this.$el.addClass(`winner-${winner}`);
        $capt.html(`WINNER ${winner}`);
      }else{
        $capt.html("DRAW");
      }
      this.$el.append($capt);
    }
  }



  setupBoard() {
    const $ul = $("<ul></ul>");
    for(let rowIdx = 0; rowIdx < 3; rowIdx++){
      for(let colIdx = 0; colIdx < 3; colIdx++){
        const $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
