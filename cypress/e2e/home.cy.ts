describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/home')
    cy.contains('Hello Angular')
  })
})
