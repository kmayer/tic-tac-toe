app.module("GamesModule", function(thisModule, thisApp) {
  thisModule.GameView = Marionette.ItemView.extend({
    template: HandlebarsTemplates['game'],
    className: "game-board",

    modelEvents: {
      "change" : "render"
    },

    events: {
      "click div[data-position]" : "cellClicked"
    },

    serializeData: function() {
      return _.inject(this.model.get('board').split(''), function(memo, position, index) {
        if (position == "X") {
          memo["pos"+index] = '<i class="fa fa-times"></i>';
        } else if (position == "O") {
          memo["pos"+index] = '<i class="fa fa-circle-o"></i>';
        } else {
          memo["pos"+index] = "&nbsp;";
        }
        return memo;
      }, {})
    },

    cellClicked: function(event) {
      app.execute("take:turn", $(event.currentTarget).data('position'));
    }
  });
});