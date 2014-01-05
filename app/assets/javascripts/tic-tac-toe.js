window.app = (function(Backbone, Marionette) {
  var app = new Marionette.Application();

  app.addRegions({
    gameRegion: "#game-region"
  });

  app.on("initialize:after", function() {
    if (Backbone.history)
      Backbone.history.start();
  });

  return app;
})(Backbone, Marionette);