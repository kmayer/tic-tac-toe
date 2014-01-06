app.module("GamesModule", function(thisModule, thisApp) {
  thisModule.Controller = Marionette.Controller.extend({
    initialize: function() {
      app.vent.on("winner", this.announceWinner);
    },

    new: function() {
      this.game = new app.Models.Game();
      var gameView = new app.GamesModule.GameView({model: this.game});
      this.listenTo(gameView, "take:turn", this.takeTurn, this);
      thisApp.gameRegion.show(gameView);
    },

    takeTurn: function(position) {
      this.game.turn(position);
      var winner = this.game.winner();
      if (winner) app.vent.trigger("winner", winner);
    },

    announceWinner: function(winner) {
      thisApp.alert('"' + winner +'" wins!');
    },

  });

  thisModule.addInitializer(function() {
    thisModule.controller = new thisModule.Controller();
  });

  thisModule.on("start", function() {
    thisModule.controller.new();
  });
});