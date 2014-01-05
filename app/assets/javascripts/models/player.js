app.module("Models", function (Models, app) {
  Models.Player = Backbone.Model.extend({
    defaults: {
      player: "X"
    },

    tactics: ['arg', 'win_game', 'not_lose'],

    move: function(pos) {
      var player = this;

      var position = _.chain(this.tactics)
        .map(function(tactic) { return player[tactic].call(player, pos); })
        .reject(function(p) { return p === undefined; })
        .value()[0];
      this.get('game').turn(position);
    },

    arg: function(position) {
      return position;
    },

    find_runs: function(array, player) {
      var index;
      var regex = RegExp(player, "g");
      _.find(array, function(rank, i) {
        if (rank.replace(regex, '').length == 1) return index = i;
      });
      return index;
    },

    find_slot: function(rank) {
      return Number(rank.match(/\d/));
    },

    not_lose: function() {
      var ranks = this.get('game').ranks();
      var index = this.find_runs(ranks, "O");
      if (index !== undefined) {
        return this.find_slot(ranks[index])
      }
    },

    win_game: function() {
      var ranks = this.get('game').ranks();
      var index = this.find_runs(ranks, "X");
      if (index !== undefined) {
        return this.find_slot(ranks[index])
      }
    }

  });
});

