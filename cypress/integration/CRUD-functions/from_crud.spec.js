describe("load the page", () => {
  it("load the page", () => {
    /* before each test go to the home page and wait for the form to load */
    cy.visit("localhost:8000")
    cy.get(".form")
  })
})
describe("create new Contact", function () {
  it("create new contact", () => {
    // click add new contact button
    cy.contains(/contacts/i).click()

    // fill text fields
    cy.contains(/first name/i)
      .parent()
      .find("input")
      .type("Cypress")
    cy.contains(/last name/i)
      .parent()
      .find("input")
      .type("Royer")

    /* add email */
    // add email by hitting enter key
    cy.get("input[type=email").type("cypress@gmail.com")
    cy.get("button[form=new-email]").click()
    cy.contains(/first name/i)
      .parent()
      .find("input")
      .should("have.value", "Cypress") // check that names fields were not deleted
    cy.get("input[type=email").type("royer@gmail.com")
    cy.get("button[form=new-email]").click()

    // click save button
    cy.contains(/save/i).click()

    // error duplication should not appear
    cy.contains(/contact already exist/i).should("not.exist")
    cy.contains(/Form failed to save/i).should("not.exist")
  })
})
