const opts = { includeShadowDom: true };

export function loginSequence(cy, username, pwd) {
  cy.visit("/login.html");

  cy.get("login-form").should("be.visible");

  cy.get("login-form")
    .contains("label > span", "Username")
    .next()
    .type(username)
    .blur();

  cy.get("login-form")
    .contains("label > span", "Password")
    .next()
    .type(pwd)
    .blur();

  cy.get("login-form")
    .contains("button", "Login", opts)
    .click();

  cy.waitUntil(function () {
    return cy
      .get("blazing-header", opts)
      .contains('a[slot="actuator"]', `Hello, ${username}`, opts);
  });
}
