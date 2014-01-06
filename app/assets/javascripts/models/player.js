app.module("Models", function (Models, app) {
  Models.Player = (function() {
    return Backbone.Model.extend({
      tactics: ['arg', 'win_game', 'not_lose', 'default'],

      move: function(pos) {
        var player = this;

        var position = _.chain(this.tactics)
          .map(function(tactic) { return player[tactic].call(player, pos); })
          .reject(function(p) { return p === undefined; })
          .value()[0];
        this.get('game').turn(position);
      },

      /* TACTICS */
      arg: function(position) {
        return position;
      },

      default: function() {
        var openSlots = this.get('game').get('board').match(/\d/g);
        return Number(openSlots[_.random(openSlots.length - 1)]);
      },

      win_game: function() {
        return find_run_with(this, "X");
      },

      not_lose: function() {
        return find_run_with(this, "O");
      }
    });
  })();

  function find_slot(rank) {
    var position = rank.match(/\d/);
    if (position) return Number(position);
  }

  function find_runs(array, player) {
    var index;
    var regex = RegExp(player, "g");
    _.find(array, function(rank, i) {
      if (rank.replace(regex, '').length == 1) return index = i;
    });
    return index;
  }

  function find_run_with(model, letter) {
    var ranks = _.filter(model.get('game').ranks(), function(rank) {
      return rank.match(/\d/);
    });
    var index = find_runs(ranks, letter);
    if (index !== undefined) {
      return find_slot(ranks[index])
    }
  }
});
