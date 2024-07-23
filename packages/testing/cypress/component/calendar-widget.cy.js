import { define } from "@calpoly/mustang";
import { html } from "lit";
import { CalendarWidget } from "../../../app/src/components/calendar-widget";

define({ "c-w": CalendarWidget });

const start = "2024-06-01";
const end = "2024-06-30";
const opts = { includeShadowDom: true };

describe("calendar-widget.cy.js", () => {
  it("displays a full month", () => {
    cy.mount(
      html`
        <c-w start-date=${start} end-date=${end}></c-w>
      `
    );

    // has headings for each day of week

    cy.get("c-w").contains("h6", "Su", opts);
    cy.get("c-w").contains("h6", "Mo", opts);
    cy.get("c-w").contains("h6", "Tu", opts);
    cy.get("c-w").contains("h6", "We", opts);
    cy.get("c-w").contains("h6", "Th", opts);
    cy.get("c-w").contains("h6", "Sa", opts);
  });

  it("selects date when clicked", () => {
    let detail = {};

    cy.mount(
      html`
        <c-w start-date=${start} end-date=${end}></c-w>
      `
    );

    cy.document().then((doc) =>
      doc.addEventListener(
        "calendar-widget:select",
        (event) => {
          detail = event.detail;
        }
      )
    );

    // June 19 is a Wednesday

    cy.get("c-w")
      .contains("label > span", "19", opts)
      .parent("label")
      .should("be.visible")
      .should("have.css", "grid-column", "4")
      .should(
        "have.css",
        "background-color",
        "rgba(0, 0, 0, 0)"
      );

    // Click on June 19 and it should have a background color

    cy.get("c-w")
      .contains("label > span", "19", opts)
      .click()
      .parent("label")
      // .should(
      //   "not.have.css",
      //   "background-color",
      //   "rgba(0, 0, 0, 0)"
      // )
      .then(() =>
        expect(detail.date.toString()).to.equal(
          new Date("2024-06-19").toString()
        )
      );
  });
});
