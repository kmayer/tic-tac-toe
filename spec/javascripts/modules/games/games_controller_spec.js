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

  it("detects winning games", function() {
    this.controller.game.set("board", "XOO3X5678");
    this.controller.game.set("thisPlayer", "X");

    var spy = jasmine.createSpy("winner");
    app.vent.on("winner", spy);

    this.controller.takeTurn(8);

    expect(spy).toHaveBeenCalledWith("X");
  });

  it("detects draws", function() {
    this.controller.game.set("board", "XOXOOXXX8");
    this.controller.game.set("thisPlayer", "O")

    var spy = jasmine.createSpy("draw");
    app.vent.on("draw", spy);

    this.controller.takeTurn(8);

    expect(spy).toHaveBeenCalled();
  });
});