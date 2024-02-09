const styles_css = `/* Kram: CSS in Scene 1 */
:root {
  --color-1: lightCoral;
  --color-2: plum;
}

.custom {
  background: linear-gradient(
    45deg,
    var(--color-1),
    var(--color-2)
  );
  padding: 1em;
}

/* Kram: CSS in Scene 2 */
:root {
  --direction-n: 0;
  --direction-e: 1;
  --direction-s: 2;
  --direction-w: 3;
  --direction-ne: calc(var(--direction-n) + 0.5);
  --direction-se: calc(var(--direction-e) + 0.5);
  --direction-sw: calc(var(--direction-s) + 0.5);
  --direction-nw: calc(var(--direction-w) + 0.5);
}

.custom-rotation {
  --gradient-rotation: calc(90deg * var(--from-direction, 0));
  background: linear-gradient(
    var(--gradient-rotation),
    var(--color-1),
    var(--color-2)
  );
  padding: 1em;
}

/* Kram: CSS in Scene 3 */
:root {
  --color-salmon: lightCoral;
  --color-aubergine: plum;
  --color-mint: honeydew;
  --color-sky: azure;
}

.custom-options {
  background: var(--color-option, var(--color-salmon));
  padding: 1em;
}

[data-color-option="salmon"] {
  --color-option: var(--color-salmon);
}

[data-color-option="aubergine"] {
  --color-option: var(--color-aubergine);
}

[data-color-option="mint"] {
  --color-option: var(--color-mint);
}

[data-color-option="sky"] {
  --color-option: var(--color-sky);
}
`;

export { styles_css as default };
