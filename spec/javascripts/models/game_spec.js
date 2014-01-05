describe("Models.Game", function () {
  beforeEach(function () {
    this.model = new app.Models.Game();
  });

  it("has an inspect", function() {
    expect(this.model.inspect()).toBe("012\n345\n678");
  });

  describe("ranks and files", function() {
    it("has status in each row", function () {
      var rows = this.model.rows();

      expect(rows[0]).toBe("012");
      expect(rows[1]).toBe("345");
      expect(rows[2]).toBe("678");
    });

    it("has status in each column", function() {
      var cols = this.model.columns();

      expect(cols[0]).toBe("036");
      expect(cols[1]).toBe("147");
      expect(cols[2]).toBe("258");
    });

    it("has status in each diagnol", function() {
      var diags = this.model.diagnols();

      expect(diags[0]).toBe("048");
      expect(diags[1]).toBe("246");
    });
  });

  describe("winning", function() {
    it("has no winners", function() {
      this.model = new app.Models.Game({board: "012345678"});

      expect(this.model.winner()).toBeUndefined();
    });

    _.each(["X", "O"], function(X) {
      it("when there's a winning row for "+X, function() {
        this.model = new app.Models.Game({board: "eee345678".replace(/e/g, X)});

        expect(this.model.winner()).toBe(X);
      });

      it("when there's a winning column for "+X, function() {
        this.model = new app.Models.Game({board: "e12e45e78".replace(/e/g, X)});

        expect(this.model.winner()).toBe(X);
      });

      it("when there's a winning diagnol for "+X, function() {
        this.model = new app.Models.Game({board: "e123e567e".replace(/e/g, X)});

        expect(this.model.winner()).toBe(X);
      });
    });
  });

  describe("turns", function() {
    it("starts with 'X'", function() {
      this.model.turn(0);

      expect(this.model.get('board')).toBe("X12345678");
    });

    it("changes players with each turn", function() {
      this.model.turn(0);
      this.model.turn(1);

      expect(this.model.get('board')).toBe("XO2345678");
    });

    it("won't overwrite a previous move", function() {
      this.model.turn(0);
      this.model.turn(0);
      this.model.turn(1);

      expect(this.model.get('board')).toBe("XO2345678");
    })
  });

  it("a simple game where 'X' wins", function() {
    this.model.turn(0); // X| |
                        // -+-+-
                        //  | |
                        // -+-+-
                        //  | |

    expect(this.model.winner()).toBeUndefined();

    this.model.turn(2); // X| |O
                        // -+-+-
                        //  | |
                        // -+-+-
                        //  | |

    expect(this.model.winner()).toBeUndefined();

    this.model.turn(4); // X| |
                        // -+-+-
                        //  |X|
                        // -+-+-
                        //  | |

    expect(this.model.winner()).toBeUndefined();

    this.model.turn(1); // X|O|O
                        // -+-+-
                        //  |X|
                        // -+-+-
                        //  | |

    expect(this.model.winner()).toBeUndefined();

    this.model.turn(8); // X|O|O
                        // -+-+-
                        //  |X|
                        // -+-+-
                        //  | |X

    expect(this.model.winner()).toBe("X");

    expect(this.model.get('board')).toBe("XOO3X567X");
  });
});