app.module("GamesModule", function(thisModule, thisApp) {
  thisModule.Controller = Marionette.Controller.extend({
    initialize: function() {
      console.log("games!");
    },

    new: function() {
      var game = new app.Models.Game();
      var gameView = new app.GamesModule.GameView({model: game});
      thisApp.gameRegion.show(gameView);
    }

  });

  thisModule.addInitializer(function() {
    thisModule.controller = new thisModule.Controller();
  });

  thisModule.on("start", function() {
    thisModule.controller.new();
  });
});