describe('Platform Editor Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.projectLayerInfo').click()
  })
  it('changes editor types', function () {
    cy.get('.toolItem').should('have.length', 1)
    cy.get('#x1').drag('.board', { position: 'center' })
    //   .trigger('pointerdown', { which: 1, button: 0 })
    //   .trigger('dragstart')
    // cy.get('.board').trigger('drop', 5, 10)
  })
})
