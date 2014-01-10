app.module("Models", function (Models, app) {
  Models.Player = function() {
    return {
      tactics: ["win_game", "not_lose", "preferred", "default"],

      move: function(game) {
        var player = this;

        return _.chain(this.tactics)
          .map(function(tactic) { return player[tactic].call(player, game); })
          .reject(function(p) { return p === undefined; })
          .value()[0];
      },

      /* TACTICS */
      default: function(game) {
        return pick_slot(game.get("board"), new RegExp("\\d", "g"));
      },

      preferred: function(game) {
        return pick_slot(game.get("board"), new RegExp("[02468]", "g"));
      },

      win_game: function(game) {
        return find_run_with(game.ranks(), game.get("nextPlayer"));
      },

      not_lose: function(game) {
        return find_run_with(game.ranks(), oponnent(game.get("nextPlayer")));
      }
    };
  };

  function oponnent(player) {
    return ((player === "O") ? "X" : "O");
  }

  function find_first_slot(rank) {
    var position = rank.match(/\d/);
    if (position) return Number(position);
  }

  function pick_slot(board, regex) {
    var openSlots = board.match(regex);
    if (openSlots) return Number(openSlots[_.random(openSlots.length - 1)]);
  }

  function find_runs(array, player) {
    var index;
    var regex = new RegExp(player, "g");
    _.find(array, function(rank, i) {
      if (rank.replace(regex, '').length === 1) return index = i;
    });
    return index;
  }

  function find_run_with(ranks, letter) {
    var ranks = _.filter(ranks, function(rank) {
      return rank.match(/\d/);
    });
    var index = find_runs(ranks, letter);
    if (index !== undefined) {
      return find_first_slot(ranks[index]);
    }
  }
});
