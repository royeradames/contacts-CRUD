describe("load the page", () => {
  it("load the page", () => {
    /* before each test go to the home page and wait for the form to load */
    cy.visit("localhost:8000")
    cy.get(".form")
  })
})
