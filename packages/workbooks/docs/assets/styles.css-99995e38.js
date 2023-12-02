const styles_css = `/* Kram: CSS in Scene 5 */
:root {
  /* Design Tokens */
  --color-accent: rgb(42 143 42);
  --color-background-header: var(--color-accent);
  --color-background-page: rgb(237 233 217);
  --color-background-section: rgb(248 250 2248);
  --color-border-section: var(--color-accent);
  --color-link-inverted: rgb(255 208 0);
  --color-link: var(--color-accent);
  --color-text: rgb(51 51 51);
  --color-text-heading: var(--color-accent);
  --color-text-inverted: rgb(255 255 255);

  --font-body: Merriweather, Baskerville, Cambria, "Noto Serif",
    "Bitstream Charter", serif;
  --font-display: Kanit, "Trebuchet MS", Calibri, Roboto, "Segoe UI", Ubuntu,
    sans-serif;

  --lineweight-border-thin: 1px;
  --lineweight-rule: 1px;

  --size-font-body: 0.875rem;
  --size-font-title: 2.5rem;
  --size-radius-medium: 0.5rem;
  --size-spacing-small: 0.25rem;
  --size-spacing-medium: 0.5rem;
  --size-spacing-large: 1rem;

  --style-font-title: italic;

  --weight-font-body: 400;
  --weight-font-title: 700;
  --weight-font-title-muted: 200;
}

/* Kram: CSS in Scene 5 */
* {
  margin: 0;
}
body {
  background: var(--color-background-page);
  color: var(--color-text);
  font: var(--size-font-body) var(--font-body);
}
a {
  color: var(--color-link);
}
`;

export { styles_css as default };
