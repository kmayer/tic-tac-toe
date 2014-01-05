describe("GamesModule.GameView", function() {
  beforeEach(function() {
    this.model = new app.Models.Game();
    this.view = new app.GamesModule.GameView({model: this.model});
  });

  it("#serializeData", function() {
    expect(this.view.serializeData()).toMatch({pos0: "&nbsp;", pos1: "&nbsp;", pos2: "&nbsp;", pos3: "&nbsp;", pos4: "&nbsp;", pos5: "&nbsp;", pos6: "&nbsp;", pos7: "&nbsp;", pos8: "&nbsp;"});
  });

  it("triggers 'take:turn'", function() {
    var spy = jasmine.createSpy('click');

    this.view.on("take:turn", spy)

    this.view.render();

    this.view.$("td[data-position=0]").click();

    expect(spy).toHaveBeenCalledWith(0);
  });
});