describe("GamesModule.GameView", function() {
  beforeEach(function() {
    this.model = new app.Models.Game({board: "OX2345678"});
    this.view = new app.GamesModule.GameView({model: this.model});
  });

  it("#serializeData", function() {
    expect(this.view.serializeData()).toMatch({pos0: '<i class="fa fa-circle-o"></i>', pos1: '<i class="fa fa-times"></i>', pos2: "&nbsp;", pos3: "&nbsp;", pos4: "&nbsp;", pos5: "&nbsp;", pos6: "&nbsp;", pos7: "&nbsp;", pos8: "&nbsp;"});
  });

  it("triggers 'take:turn'", function() {
    var spy = jasmine.createSpy('click');

    app.commands.setHandler("take:turn", spy)

    this.view.render();

    this.view.$("div[data-position=0]").click();

    expect(spy).toHaveBeenCalledWith(0);
  });
});