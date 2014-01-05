describe("GamesModule.GameView", function() {
  beforeEach(function() {
    this.model = new app.Models.Game();
    this.view = new app.GamesModule.GameView({model: this.model});
  });

  it("#serializeData", function() {
    expect(JSON.stringify(this.view.serializeData())).toBe(JSON.stringify({pos0: "0", pos1: "1", pos2: "2", pos3: "3", pos4: "4", pos5: "5", pos6: "6", pos7: "7", pos8: "8"}));
  });
});