app.module("Models", function (Models, app) {
  Models.Game = (function() {
    return Backbone.Model.extend({
      defaults: {
        board: "012345678",
        nextPlayer: "X"
      },

      ranks: function() {
        var board = this.get("board");
        return _.union(rows(board), columns(board), diagonals(board));
      },

      winner: function() {
        function find_winner(model) {
          var ranks = model.ranks();
          var winner = _.find(ranks, function(rank) {
            if (rank === "XXX" || rank === "OOO") return true;
          });
          if (winner) return winner[0];
          if (model.get("board").search(/\d/) === -1) return "DRAW";
        }

        this.set("winner", find_winner(this));
        return this.get("winner");
      },

      turn: function(position) {
        if (this.get("winner")) return;
        var board = this.get("board").split("");
        var thisPlayer = this.get("nextPlayer");
        if (board[position] == position) {
          board[position] = thisPlayer;
          this.set({board: board.join(""), nextPlayer: ((thisPlayer === "X") ? "O" : "X")});
        } else {
          throw {message: "Trying to take an already filled position, " + position + ", " + this.get("board")}
        }
      }
    });
  })();

  function rows(b) {
    return [
      b[0]+b[1]+b[2],
      b[3]+b[4]+b[5],
      b[6]+b[7]+b[8]
    ];
  }

  function columns(b) {
    return [
      b[0]+b[3]+b[6],
      b[1]+b[4]+b[7],
      b[2]+b[5]+b[8]
    ];
  }

  function diagonals(b) {
    return [
      b[0]+b[4]+b[8],
      b[2]+b[4]+b[6]
    ];
  }
});