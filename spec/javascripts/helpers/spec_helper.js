beforeEach(function() {
  app.alert = function(message) {
    console.log("window.alert(", message, ")");
  }
});