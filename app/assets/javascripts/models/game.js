app.module("Models", function (Models, app) {
  Models.Game = Backbone.Model.extend({
    defaults: {
      board: "012345678",
      thisPlayer: "X"
    },

    rows: function () {
      var b = this.get('board');
      return [
        b[0]+b[1]+b[2],
        b[3]+b[4]+b[5],
        b[6]+b[7]+b[8]
      ];
    },

    columns: function () {
      var b = this.get('board');
      return [
        b[0]+b[3]+b[6],
        b[1]+b[4]+b[7],
        b[2]+b[5]+b[8]
      ];
    },

    diagnols: function () {
      var b = this.get('board');
      return [
        b[0]+b[4]+b[8],
        b[2]+b[4]+b[6]
      ];
    },

    ranks: function() {
      return _.union(this.rows(), this.columns(), this.diagnols());
    },

    winner: function() {
      var ranks = this.ranks();
      var winner = _.find(ranks, function(rank) {
        if (rank === "XXX" || rank === "OOO") return true;
      });
      if (winner) return winner[0];
    },

    inspect: function() {
      return this.rows().join("\n");
    },

    turn: function(position) {
      var board = this.get('board').split('');
      if (board[position] == position) {
        board[position] = this.nextPlayer();
        this.set('board', board.join(''));
      }
    },

    nextPlayer: function() {
      var thisPlayer = this.get('thisPlayer');
      this.set('thisPlayer',((thisPlayer === "X") ? "O" : "X"));
      return thisPlayer;
    }

  });
});