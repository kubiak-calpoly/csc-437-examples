---
title: Style Properties
platform: none
---

## Style Properties

```html
<h1>No Style</h1>

<h1 style="color: fireBrick">The text color</h1>

<h1 style="background-color: mintCream">
  The background color
</h1>

<h1 style="border-color: plum; border-style: solid">
  The border color
</h1>

<h1
  style="color: fireBrick; 
  	background-color: mintCream;
	border-color: plum;
	border-style: solid"
>
  All three colors
</h1>
```

To style a paragraph in Word, or a shape in Illustrator,
we use the sidebar panels to specify characteristics like color,
font, margins, shadows.
Similarly, in CSS we have a rich set of style _properties_,
which we can apply to HTML elements.

The effect of assigning these properties in CSS is defined
in the CSS3 standard.
As long as we only use standard properties,
any standards-conforming browser will display
our styled elements the same way.
With that said, CSS3 is a _living_ standard,
meaning that it is always evolving.
New properties and features are periodically added to the standard,
but always in a way that does not invalidate code written to
any previous iteration of the standard.
That is, each new addition to CSS, and therefore each new release
of standards-conforming browsers, is guaranteed to be backward-compatible.

We will detail many of these properties in this chapter,
but to begin,
let's look at three properties which control color:

- `color`: the foreground color of an element. For text elements, the color of the text.
- `background-color`: the background color of an element. This color fills a box around the element, behind the foreground.
- `border-color`: the color of the border around an element. Note that to see an element's border, we need to also the element's `border-style`.

(For now we are also using some of the pre-defined color values defined by the
standard.)

In CSS, we set a style property using a `declaration`.
Declarations consist of a property name, a colon (`:`), and the value we
want the property to have.
For example, to set the text color to red, we can say `color: red`.
We can also create lists of declarations, using a semi-colon (`;`) to separate them.
A set of one or more declarations is called a `style`.

The quickest way to apply a style to a specific HTML element is to
use the `style` attribute on the element, as demonstrated in this example.
First we see the styling that is set by the browser as a default.
The exact style may vary between browsers and platforms, but in all likelihood
the color of the text will be black.
The next three lines show the effect of setting each of the three color
properties separately.
Finally, the last example shows all three combined into one `style`.
