import { loginSequence } from "./login.js";

const opts = { includeShadowDom: true };
const tourid = "65c7e92ea837ff7c15b669e5";
const creds = { username: "blaze", pwd: "123" };
const dest = "Rome";

describe("tour page", () => {
  beforeEach(() => {
    loginSequence(cy, creds.username, creds.pwd);
  });

  it("is accessible after login", () => {
    cy.visit(`/app/tour/${tourid}`);

    cy.get("main.page", opts).should("be.visible");
  });

  it("can navigate to destination", () => {
    cy.visit(`/app/tour/${tourid}`);

    cy.get("itinerary-destination", opts)
      .contains(dest)
      .find("a.itemLink", opts)
      .click();

    cy.waitUntil(function () {
      return cy
        .get("main.page", opts)
        .contains("h2", dest)
        .should("be.visible");
    });
  });

  it("can filter destinations by date", () => {
    cy.visit(`/app/tour/${tourid}`);

    cy.get("calendar-widget", opts)
      .contains("label > span", "18", opts)
      .parent()
      .click();

    cy.get("itinerary-destination", opts)
      .contains("Venice")
      .find("section", opts)
      .should("be.visible");

    cy.get("itinerary-destination", opts)
      .contains("Florence")
      .find("section", opts)
      .should("be.visible");

    cy.get("itinerary-destination", opts)
      .contains("Rome")
      .should("not.exist");
  });
});
