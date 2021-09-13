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
describe("update contact", function () {
  it("Change the create contact", () => {
    // go to contact
    cy.contains(/cypress royer/i).click()

    // delete all emails
    cy.get(".emails__list-email").children("svg").first().click()
    cy.get(".emails__list-email").children("svg").first().click()

    /* add new emails */

    cy.get("input[type=email").type("e2e@gmail.com")
    cy.get("button[form=new-email]").click()
    cy.get("input[type=email").type("testing@gmail.com")
    cy.get("button[form=new-email]").click()

    // change the first and last name
    cy.get(".form__first-name-input > .form__text-field")
      .clear()
      .should("have.value", "")
      .type("testing")
    cy.get(".form__last-name-input > .form__text-field")
      .clear()
      .should("have.value", "")
      .type("e2e")

    //  save
    cy.contains(/save/i).click()

    // change contact
    cy.get(".contacts__name")
      .not(cy.contains(/testing e2e/i))
      .first()
      .click()

    // find update contact
    cy.contains(/testing e2e/i).click()

    /* check that it was update */
    // name is correct
    cy.contains(/first name/i)
      .parent()
      .find("input")
      .should("have.value", "testing")

    cy.contains(/last name/i)
      .parent()
      .find("input")
      .should("have.value", "e2e")

    // emails are there
    cy.contains("e2e@gmail.com")
    cy.contains("testing@gmail.com")
  })
})

describe("delete contact ", function () {
  it("delete a contact", () => {
    // find update contact
    cy.contains(/testing e2e/i).click()

    // click delete button
    cy.get(".form__delete")
      .contains(/delete/i)
      .click()

    // check that the contact has been remove from the contact list
    cy.get(".contacts__name")
      .contains(/testing e2e/i)
      .should("not.exist")
  })
})
