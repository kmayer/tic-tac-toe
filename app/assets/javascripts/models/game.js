app.module("Models", function (Models, app) {
  Models.Game = (function() {
    return Backbone.Model.extend({
      defaults: {
        board: "012345678",
        thisPlayer: "X"
      },

      ranks: function() {
        var board = this.get('board');
        return _.union(rows(board), columns(board), diagonals(board));
      },

      winner: function() {
        var ranks = this.ranks();
        var winner = _.find(ranks, function(rank) {
          if (rank === "XXX" || rank === "OOO") return true;
        });
        if (winner) return winner[0];
        if (this.get('board').search(/\d/) == -1) return "DRAW";
      },

      turn: function(position) {
        var board = this.get('board').split('');
        if (board[position] == position) {
          board[position] = nextPlayer(this);
          this.set('board', board.join(''));
        }
      }
    });
  })();

  function nextPlayer(model) {
    var thisPlayer = model.get('thisPlayer');
    model.set('thisPlayer',((thisPlayer === "X") ? "O" : "X"));
    return thisPlayer;
  }

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