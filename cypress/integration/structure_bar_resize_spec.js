const { isExportDeclaration } = require('typescript')

describe('StructureBar Resize Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    // structureBar width
    cy.get('.structureBar').invoke('width').as('StartStructureBarWidth')
    cy.get('@StartStructureBarWidth').should('equal', 250)
    // handle width
    cy.get('.structureBar .handle').invoke('width').as('HandleWidth')
    cy.get('@HandleWidth').should('equal', 8)
  })

  context('Without a pane', () => {
    it('resizes the StructureBox', () => {
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

        cy.get('.structureBar')
          .invoke('width')
          .should((width) => {
            expect(width).to.eq(startBarW - 100)
          })
      })
    })
  })

  context('With a pane', () => {
    beforeEach(() => {
      cy.get('.projectLayerInfo').click()
      cy.get('.editorPaneFrame').should('exist').should('have.length', 1)
      // pane width
      cy.get('.editorPaneFrameInZone').invoke('width').as('PaneFrameWidth')
      cy.get('@PaneFrameWidth').should('equal', 700)
    })
    it('resizes the StructureBox', function () {
      const startX = this.HandleWidth
      cy.get('.structureBar .handle')
        .trigger('mousedown', startX, 100, { force: true })
        .trigger('mouseup', startX + 100, 100, { force: true })

      const startBarW = this.StartStructureBarWidth
      cy.get('.structureBar')
        .invoke('width')
        .should('equal', startBarW + 100)
    })
  })
})
