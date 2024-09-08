export * from "./auth";
export * from "./destination";

import renderWithDefaults, { PageParts } from "./renderPage";

const defaults = {
  stylesheets: [
    "/styles/reset.css",
    "/styles/tokens.css",
    "/styles/page.css"
  ],
  styles: [],
  scripts: [
    `
    import { define } from "@calpoly/mustang";
    import { HeaderElement } from "/scripts/header.js";

    define({
      "blz-header": HeaderElement
    });

    HeaderElement.initializeOnce();
    `
  ],
  googleFontURL:
    "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,700;1,700&family=Merriweather:wght@400;700&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
    //"@calpoly/mustang": "/unpkg/mustang.js"
  }
};

export function renderPage(page: PageParts) {
  return renderWithDefaults(page, defaults);
}
