describe("GamesModule.Controller", function() {
  beforeEach(function() {
    this.controller = new app.GamesModule.Controller();
    this.controller.new();
  });

  it("listens to 'take:turn'", function() {
    spyOn(this.controller.game, "turn");

    app.gameRegion.currentView.trigger("take:turn", 0);

    expect(this.controller.game.turn).toHaveBeenCalledWith(0);
  });

});