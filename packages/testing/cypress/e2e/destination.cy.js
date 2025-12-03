import { loginSequence } from "./login.js";

const opts = { includeShadowDom: true };
const tourid = "65c7e92ea837ff7c15b669e5";
const creds = { username: "blaze", pwd: "123" };
const dest = "Rome";

describe("tour page", () => {
  beforeEach(() => {
    loginSequence(cy, creds.username, creds.pwd);
  });

  it("it displays the destination", () => {
    cy.visit(`/app/destination/${tourid}/2`);

    cy.get("main.page", opts)
      .contains("h2", dest)
      .should("be.visible");
  });

  it("it has a link back to the tour", () => {
    cy.visit(`/app/destination/${tourid}/2`);

    cy.get("main.page", opts)
      .contains("a.breadcrumb", "Back to tour")
      .click();

    cy.waitUntil(function () {
      return cy
        .get("tour-view", opts)
        .contains("h2", "Trip to Italy", opts)
        .should("be.visible");
    });
  });

  it("it can edit the destination name", () => {
    cy.visit(`/app/destination/${tourid}/2`);

    cy.get("main.page", opts)
      .contains("button", "Edit", opts)
      .click();

    cy.get("mu-form", opts)
      .contains("label > span", "Destination Name")
      .next()
      .clear()
      .type("When in Rome");

    cy.get("mu-form", opts)
      .contains("button", "Submit", opts)
      .click();

    cy.visit(`/app/destination/${tourid}/2`);

    cy.waitUntil(function () {
      return cy
        .get("main.page", opts)
        .contains("h2", dest)
        .should("be.visible");
    });
  });
});
