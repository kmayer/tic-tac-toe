app.module("GamesModule", function(thisModule, thisApp) {
  thisModule.GameView = Marionette.ItemView.extend({
    template: HandlebarsTemplates['game'],

    modelEvents: {
      "change" : "render"
    },

    events: {
      "click td[data-position]" : "cellClicked"
    },

    serializeData: function() {
      return _.inject(this.model.get('board').split(''), function(memo, position, index) {
        memo["pos"+index] = (position == "X" || position == "O") ? position : "&nbsp;";
        return memo;
      }, {})
    },

    cellClicked: function(event) {
      this.trigger("take:turn", $(event.currentTarget).data('position'));
    }
  });
});