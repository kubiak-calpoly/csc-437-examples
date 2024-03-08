const opts = { includeShadowDom: true };

export function loginSequence(cy, username, pwd) {
  cy.visit("/app");

  cy.get("dialog[open] > form:first-child", opts).should(
    "be.visible"
  );

  cy.get("dialog[open] > form:first-child", opts)
    .contains("label > span", "Username")
    .next()
    .type(username);

  cy.get("dialog[open] > form:first-child", opts)
    .contains("label > span", "Password")
    .next()
    .type(pwd);

  cy.get("dialog[open] > form:first-child", opts)
    .contains("button", "Sign in")
    .click();

  cy.waitUntil(function () {
    return cy.get("dialog", opts).should("not.be.visible");
  });

  cy.waitUntil(function () {
    return cy
      .get("blazing-header", opts)
      .contains("span", "Hello", opts);
  });
}
