describe("Models.Player", function () {
  beforeEach(function () {
    this.game = new app.Models.Game();
    this.model = new app.Models.Player({game: this.game});
  });

  it("can make a move", function() {
    this.model.move(0);

    expect(this.game.get('board')).toBe("X12345678");
  });

  it("knows which player it is", function() {
    expect(this.model.get('player')).toBe("X");
  });

  describe("tactics", function() {
    it("will block ranks", function() {
      this.game.set({board: "012O4O678"});

      this.model.move();

      expect(this.game.get('board')).toBe("012OXO678");
    });

    it("win the game", function() {
      this.game.set({board: "0X23456X8"});

      this.model.move();

      expect(this.game.get('board')).toBe("0X23X56X8");
      expect(this.game.winner()).toBe("X");
    });
  });
});
