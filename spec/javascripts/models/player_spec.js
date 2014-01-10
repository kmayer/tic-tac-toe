describe("Models.Player", function () {
  beforeEach(function () {
    this.game = new app.Models.Game();
    this.model = new app.Models.Player();
  });

  it("can make a move as 'O'", function() {
    this.game.set({board: "X1XOO5678", nextPlayer: "O"});

    expect(this.model.move(this.game)).toBe(5);
  });

  describe("tactics", function() {
    it("will block ranks", function() {
      this.game.set({board: "012O4O678"});

      expect(this.model.move(this.game)).toBe(4);
    });

    describe("not_lose", function() {
      it("picks a blocking move", function() {
        this.game.set({board: "012O4O678", nextPlayer: "X"});

        expect(this.model.not_lose(this.game)).toBe(4);
      });

      it("is undefined when there's nothing", function() {
        this.game.set({board: "012X4X678", nextPlayer: "X"});

        expect(this.model.not_lose(this.game)).toBeUndefined();
      });
    });

    it("will win the game", function() {
      this.game.set({board: "0X23456X8"});

      expect(this.model.move(this.game)).toBe(4);
    });

    it("prefer corners", function() {
      spyOn(this.model, "default").and.callFake(function() { return undefined;} )
      spyOn(_, "random").and.callFake(function() {return 4;} )

      this.game.set({board: "012345678"});

      expect(this.model.move(this.game)).toBe(8);
    });
  });

  describe("bugs", function() {
    it("should choose 8, not 0", function() {
      this.game.set({board: "O12XO5X78", nextPlayer: "X"});

      expect(this.model.move(this.game)).toBe(8);
    });

    it("should choose 1, not 8", function() {
      this.game.set({board: "O1OOXXX78", nextPlayer: "X"})

      expect(this.model.move(this.game)).toBe(1);
    });

    it("should choose 7, not crash", function() {
      this.game.set({board: "XOXXOOO7X", nextPlayer: "X"})

      expect(this.model.move(this.game)).toBe(7);
    });
  });

  it("should play to a draw", function() {
    var samples = 1000;
    var tally = {"X":0, "O":0, "DRAW":0};

    for(var j = 0; j < samples; j++) {
      var game = new app.Models.Game();
      var player = new app.Models.Player();

      for(var moves = 0; !game.winner() && moves < 9; moves++) {
        game.turn(player.move(game));
      }
      tally[game.winner()] += 1;
    }

    console.log(tally);

    expect(tally["O"]).toBe(0);
    expect(tally["DRAW"]).toBeGreaterThan(samples * 0.64);
  })
});
