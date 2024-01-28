---
title: CSS Custom Properties
platform: web-standard
---

# CSS Custom Properties

```html
<p class="custom">
  One morning, when Gregor Samsa woke from troubled dreams, he
  found himself transformed in his bed into a horrible vermin.
</p>

<p class="custom" style="--color-1: honeyDew; --color-2: azure">
  “What’s happened to me?” he thought. It wasn’t a dream. His
  room, a proper human room although a little too small, lay
  peacefully between its four familiar walls.
</p>
```

```css
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
```

---

## Calculating values from CSS variables

```html
<p class="custom-rotation">
  One morning, when Gregor Samsa woke from troubled dreams, he
  found himself transformed in his bed into a horrible vermin.
</p>

<p
  class="custom-rotation"
  style="--from-direction: var(--direction-sw)"
>
  “What’s happened to me?” he thought. It wasn’t a dream. His
  room, a proper human room although a little too small, lay
  peacefully between its four familiar walls.
</p>
```

```css
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
```

---

## CSS variables as a set of options

```html
<p class="custom-options" data-color-option="salmon">
  One morning, when Gregor Samsa woke from troubled dreams, he
  found himself transformed in his bed into a horrible vermin.
</p>
<p class="custom-options" data-color-option="aubergine">
  “What’s happened to me?” he thought. It wasn’t a dream. His
  room, a proper human room although a little too small, lay
  peacefully between its four familiar walls.
</p>
<p class="custom-options" data-color-option="mint">
  Gregor then turned to look out the window at the dull weather.
  Drops of rain could be heard hitting the pane, which made him
  feel quite sad.
</p>
<p class="custom-options" data-color-option="sky">
  Doing business like this takes much more effort than doing
  your own business at home, and on top of that there’s the
  curse of travelling, worries about making train connections,
  bad and irregular food, contact with different people all the
  time so that you can never get to know anyone or become
  friendly with them.
</p>
```

```css
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
```
