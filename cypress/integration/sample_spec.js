describe("My First Test", () => {
  it("Visits the top page", () => {
    cy.visit('http://localhost:3000')
    cy.pause()
    cy.contains('Compile').click()
  });
});
