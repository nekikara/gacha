describe("Button drawing Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  })
  it("Visits the top page", () => {
    cy.get('.headerFrame button[type="button"]')
  });

  it("Draws two buttons", () => {
    cy.get(".boardFrame")
      .trigger("mousedown", { clientX: 200, clientY: 400 })
      .trigger("mousemove", { clientX: 230, clientY: 450 })
      .trigger("mouseup", { clientX: 290, clientY: 470 });

    cy.get(".boardFrame")
      .trigger("mousedown", { clientX: 300, clientY: 200 })
      .trigger("mousemove", { clientX: 330, clientY: 250 })
      .trigger("mouseup", { clientX: 390, clientY: 270 });
  });
});
