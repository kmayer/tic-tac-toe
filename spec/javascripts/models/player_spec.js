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

    it("prefer corners", function() {
      spyOn(this.model, "default").and.callFake(function() { return undefined;} )
      spyOn(_, "random").and.callFake(function() {return 4;} )

      this.game.set({board: "012345678"});

      expect(this.model.move()).toBe(8);
    });
  });

  describe("bugs", function() {
    it("should choose 8, not 0", function() {
      this.game.set({board: "O12XO5X78", nextPlayer: "X"});

      expect(this.model.move()).toBe(8);
    });

    it("should choose 1, not 8", function() {
      this.game.set({board: "O1OOXXX78", nextPlayer: "X"})

      expect(this.model.move()).toBe(1);
    });

    it("should choose 7, not crash", function() {
      this.game.set({board: "XOXXOOO7X", nextPlayer: "X"})

      expect(this.model.move()).toBe(7);
    });
  });
});
