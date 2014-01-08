describe("GamesModule.Controller", function() {
  beforeEach(function() {
    this.controller = new app.GamesModule.Controller();
    this.controller.new();
  });

  it("listens to 'take:turn'", function() {
    spyOn(this.controller.game, "turn");

    app.execute("take:turn", 0);

    expect(this.controller.game.turn).toHaveBeenCalledWith(0);
  });

  it("does nothing once the game is over", function() {
    this.controller.game.set("winner", "anything");
    spyOn(this.controller.game, "turn");

    app.execute("take:turn", 0);

    expect(this.controller.game.turn).not.toHaveBeenCalled();
  });

  it("announces winning games", function() {
    this.controller.game.set({board: "XOO3X5678", nextPlayer: "X"});

    var spy = jasmine.createSpy("winner");
    app.vent.on("winner", spy);

    this.controller.takeTurn(8);

    expect(spy).toHaveBeenCalledWith("X");
  });

  it("announces draws", function() {
    this.controller.game.set({board: "XOXOOXXX8", nextPlayer: "O"});

    var spy = jasmine.createSpy("draw");
    app.vent.on("draw", spy);

    this.controller.takeTurn(8);

    expect(spy).toHaveBeenCalled();
  });
});