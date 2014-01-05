app.module("GamesModule", function(thisModule, thisApp) {
  thisModule.Controller = Marionette.Controller.extend({
    new: function() {
      this.game = new app.Models.Game();
      var gameView = new app.GamesModule.GameView({model: this.game});
      this.listenTo(gameView, "take:turn", this.takeTurn, this);
      thisApp.gameRegion.show(gameView);
    },

    takeTurn: function(position) {
      this.game.turn(position);
    }

  });

  thisModule.addInitializer(function() {
    thisModule.controller = new thisModule.Controller();
  });

  thisModule.on("start", function() {
    thisModule.controller.new();
  });
});