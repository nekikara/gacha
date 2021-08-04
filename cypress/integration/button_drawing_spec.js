describe('Button drawing Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  xit('Visits the top page', () => {
    cy.get('.headerFrame button[type="button"]')
  })

  xit('Draws two buttons', () => {
    cy.get('.boardFrame')
      .trigger('mousedown', 0, 0)
      .trigger('mousemove', 50, 100)
      .trigger('mouseup', 75, 125)

    cy.get('.boardFrame').then(($board) => {
      const h = $board.height()
      const w = $board.width()
      const halfH = h / 2
      const halfW = w / 2
      cy.get('.boardFrame')
        .trigger('mousedown', halfW, halfH)
        .trigger('mousemove', halfW - 10, halfH - 10)
        .trigger('mouseup', halfW - 200, halfH - 100)
    })
  })
})
