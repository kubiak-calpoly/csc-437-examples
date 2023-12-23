import { css } from "lit";

export const reset = css`
  *,
  *::before,
  *::after {
    margin: 0;
    box-sizing: border-box;
  }
`;

export const elements = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-display);
  }
  h1 {
    font-size: 2.5rem;
    font-style: oblique;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: normal;
    font-style: oblique;
  }
  h4 {
    font-size: 1.25rem;
  }
  h5 {
    font-size: 1rem;
  }
  h6 {
    font-size: 1rem;
    font-weight: normal;
    font-style: italic;
  }
  h3,
  a {
    color: var(--color-accent);
  }
  p + * {
    margin-top: var(--size-spacing-small);
  }

  svg.icon {
    display: inline;
    height: 4rem;
    width: 4rem;
    vertical-align: top;
    fill: currentColor;
  }
  dt {
    color: var(--color-accent);
    font-family: var(--font-family-display);
    font-weight: bold;
  }
  input,
  select {
    font-family: inherit;
  }
  button {
    font-family: var(--font-family-display);
  }
  input,
  select,
  button {
    background: var(--color-background-control);
    border: 1px solid var(--color-border-control);
    border-radius: var(--size-corner-medium);
    padding: var(--size-spacing-small);
  }
`;
