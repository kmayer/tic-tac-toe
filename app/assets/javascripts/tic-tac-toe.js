window.app = (function(Backbone, Marionette) {
  var app = new Marionette.Application();

  app.addRegions({
    gameRegion: "#game-region"
  });

  app.alert = function(message) { alert.call(window, message); };

  return app;
})(Backbone, Marionette);