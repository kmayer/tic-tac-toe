describe("Models.Player", function () {
  beforeEach(function () {
    this.game = new app.Models.Game();
    this.model = new app.Models.Player({game: this.game});
  });

  it("can make a move", function() {
    expect(this.model.move(0)).toBe(0);
  });

  describe("tactics", function() {
    it("will block ranks", function() {
      this.game.set({board: "012O4O678"});

      expect(this.model.move()).toBe(4);
    });

    it("will win the game", function() {
      this.game.set({board: "0X23456X8"});

      expect(this.model.move()).toBe(4);
    });
  });

  describe("bugs", function() {
    it("should choose 8, not 0", function() {
      this.game.set({board: "O12XO5X78", thisPlayer: "X"});

      expect(this.model.move()).toBe(8);
    });

    it("should choose 1, not 8", function() {
      this.game.set({board: "O1OOXXX78", thisPlayer: "X"})

      expect(this.model.move()).toBe(1);
    });
  });
});
