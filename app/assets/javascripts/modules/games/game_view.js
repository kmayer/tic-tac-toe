app.module("GamesModule", function(thisModule, thisApp) {
  thisModule.GameView = Marionette.ItemView.extend({
    template: HandlebarsTemplates['game'],

    modelEvents: {
      "change" : "render"
    },

    serializeData: function() {
      return _.inject(this.model.get('board').split(''), function(memo, position, index) {
        memo["pos"+index] = position;
        return memo;
      }, {})
    }
  });
});