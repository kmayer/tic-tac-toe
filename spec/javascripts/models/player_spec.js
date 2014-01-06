describe("Models.Player", function () {
  beforeEach(function () {
    this.game = new app.Models.Game();
    this.model = new app.Models.Player({game: this.game});
  });

  it("can make a move", function() {
    this.model.move(0);

    expect(this.game.get('board')).toBe("X12345678");
  });

  describe("tactics", function() {
    it("will block ranks", function() {
      this.game.set({board: "012O4O678"});

      this.model.move();

      expect(this.game.get('board')).toBe("012OXO678");
    });

    it("will win the game", function() {
      this.game.set({board: "0X23456X8"});

      this.model.move();

      expect(this.game.get('board')).toBe("0X23X56X8");
      expect(this.game.winner()).toBe("X");
    });
  });
  describe("bugs", function() {
    it("should choose 8, not 0", function() {
      this.game.set({board: "O12XO5X78", thisPlayer: "X"});

      this.model.move();

      expect(this.game.get('board')).toBe("O12XO5X7X");
    });
    it("should choose 1, not 8", function() {
      this.game.set({board: "O1OOXXX78", thisPlayer: "X"})

      this.model.move();

      expect(this.game.get('board')).toBe("OXOOXXX78");
    });
  });
});
