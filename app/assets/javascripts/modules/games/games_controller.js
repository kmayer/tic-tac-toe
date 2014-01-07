app.module("GamesModule", function(thisModule, thisApp) {
  thisModule.Controller = Marionette.Controller.extend({
    initialize: function() {
      app.vent.on("winner", this.announceWinner);
      app.vent.on("draw", this.announceDraw);
      app.commands.setHandler("take:turn", this.takeTurn, this);
    },

    new: function() {
      this.game = new app.Models.Game();
      this.player = new app.Models.Player({game: this.game});
      var gameView = new app.GamesModule.GameView({model: this.game});
      thisApp.gameRegion.show(gameView);
      app.execute("take:turn", this.player.move());
    },

    takeTurn: function(position) {
      this.game.turn(position);
      var winner = this.game.winner();
      if (winner === "DRAW") {
        app.vent.trigger("draw");
      } else if (winner) {
        app.vent.trigger("winner", winner);
      } else if (this.game.get('nextPlayer') == "X") {
        app.execute("take:turn", this.player.move());
      }
    },

    announceWinner: function(winner) {
      thisApp.alert('"' + winner +'" wins!');
    },

    announceDraw: function() {
      thisApp.alert("Draw.");
    }
  });

  thisModule.addInitializer(function() {
    thisModule.controller = new thisModule.Controller();
  });

  thisModule.on("start", function() {
    thisModule.controller.new();
  });
});