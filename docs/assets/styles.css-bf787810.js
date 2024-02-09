const styles_css = `/* Kram: CSS in Scene 2 */
.boxed-text {
  border: 1px solid lightCoral;
}

/* Kram: CSS in Scene 2 */
.narrow-box {
  width: 15em;
}

/* Kram: CSS in Scene 2 */
.two-line-box {
  height: 2.5em;
}

/* Kram: CSS in Scene 3 */
.hug-box {
  width: max-content;
}

.squeeze-box {
  width: min-content;
}

/* Kram: CSS in Scene 3 */
.min-box {
  min-width: 8em;
  width: min-content;
}

.non-breaking {
  white-space: nowrap;
}

/* Kram: CSS in Scene 4 */
.boxed-section {
  width: 25em;
  border: 1px solid plum;
}

.with-margins {
  margin: 2em;
}

.with-padding {
  padding: 2em;
}

/* Kram: CSS in Scene 5 */
.content-box {
  box-sizing: content-box; /* (default) */
  width: 200px;
  height: 50px;
  padding: 2rem;
  background: lightCoral;
  border: 0.5rem dashed plum;
  margin: 2rem;
}

/* Kram: CSS in Scene 6 */
.border-box {
  box-sizing: border-box;
  width: 200px;
  height: auto;
  padding: 2rem;
  background: azure;
  border: 0.5rem dashed plum;
  margin: 2rem 4.5rem;
}

/* Kram: CSS in Scene 6 */
* {
  /* reset the box model to use border-box */
  box-sizing: border-box;
}
`;

export { styles_css as default };
