const opts = { includeShadowDom: true };

export function loginSequence(cy, username, pwd) {
  cy.visit("/app");

  cy.get("login-form").should("be.visible");

  cy.get("login-form")
    .contains("label > span", "Username")
    .next()
    .type(username);

  cy.get("login-form")
    .contains("label > span", "Password")
    .next()
    .type(pwd);

  cy.get("login-form")
    .contains("button", "Submit", opts)
    .click();

  cy.waitUntil(function () {
    return cy
      .get("blazing-header", opts)
      .contains("a > slot", `Hello, ${username}`, opts);
  });
}
