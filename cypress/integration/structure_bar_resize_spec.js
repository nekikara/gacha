const { isExportDeclaration } = require('typescript')

describe('StructureBar Resize Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('check Resizer', () => {
    cy.get('.structureBar .handle').then(($handle) => {
      const startX = $handle.width() / 2
      const startBarW = 250

      cy.get('.structureBar')
        .invoke('width')
        .should((width) => {
          expect(width).to.eq(startBarW)
        })

      cy.get('.structureBar .handle')
        .trigger('mousedown', startX, 100, { force: true })
        .trigger('mouseup', -100 + startX, 100, { force: true })
        .then(() => {
          cy.get('.structureBar')
            .invoke('width')
            .should((width) => {
              expect(width).to.eq(startBarW - 100)
            })
        })
    })
  })
})
