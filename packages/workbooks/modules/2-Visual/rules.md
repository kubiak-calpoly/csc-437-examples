---
title: Mapping CSS Styles to HTML with Rules
platform: web-standard
---

```html
<h1>Selected by tag name</h1>

<h1 class="fancy">Selected by class name</h1>

<h1 id="Chapter01">Selected by ID</h1>
```

## Mapping CSS Styles to HTML with Rules

In the previous section, we learned that we can add styling
to any element in our HTML by using the `style` attribute.
However, doing so means repeating the same CSS declarations
for every element that we want to style.

In general, we don't want to mix content and presentation like
this.
If we do, then modifying the presentation will be very tedious
and error-prone.
Also, whenever we add new content, we'd have to be careful to
be consistent and match the existing styles.

To keep presentation separate from content,
we should put our CSS style declarations
in a separate file from our HTML,
or at least a separate `<style>` section of our HTML.
But once we have our CSS and HTML separated,
we need to have a way to indicate how they relate to each other.
To that end, every CSS file is a list of _rules_ that indicate
how to apply styles to HTML elements.

We start each rule with a _selector_, which identifies
one or more HTML elements in our document.
You can think of a selector as a pattern that identifies
a set of matching elements.
The three most common types of selectors are:

- select all elements with a given tag name
- select all elements with given class name in their `class` attribute
- select the one element with a given `id` attribute

The style part of the rule is a list of property declarations,
surrounded by curly brackets (`{` &hellip; `}`).
As with the `style` attribute,
we must separate the declarations using a semi-colon.
It is also customary to put each declaration on its own line
and add a semi-colon after the last declaration.

### Type selector

Type selectors allow us to apply very general styling rules
to an entire document.
They require no changes to the HTML and also apply
uniformly to all newly authored content,
as long as it follows the same semantic HTML conventions.
Because they apply to an entire document (or even an entire site),
type selectors allow us to establish a baseline style
which we can specialize as need be.

Every element in a document has a type,
which is name that appears in the HTML start and end tags for the element.
To write a type selector,
we just write the name of the type we want to match, without the angle brackets.
For example, here is a rule that matches all `<h1>` elements
in the document, setting the `font` property.

```css
h1 {
  font-size: 32px;
  font-family: sans-serif;
  font-weight: normal;
}
```

### Class selector

Though the type selector is convenient for styling many elements
at once,
we often require more control.
What we'd like to do is group the elements into named sets, or classes,
and then write rules that apply a style to all elements in the class.

First we pick a name for our class, such as "fancy" in our example.
In our HTML, we will then add that name to the `class` attribute
on any element we wish to add to our class.
The same class name may be applied to many elements,
and an element's `class` attribute may include multiple class
names (separated by spaces).

Then to write our CSS rule, we will place a dot (`.`) immediately before
the class name:

```css
.fancy {
  color: darkOrange;
  font-style: italic;
  font-family: Georgia, serif;
}
```

### ID selector

There are times when we have a style that will only be used once
in a document.
What we want to do in those cases is _identify_ the particular element
in our HTML.
The HTML `id` attribute was designed for just this purpose.

The HTML standard prohibits more than one element in a document
with the same `id`, so an `id` rule is guaranteed to only match
one element.
In this respect, it is similar to using the style attribute,
but it allows us to keep all the styles together in the CSS
file for easier maintenance.

In writing CSS rule, we then refer to that element by placing a
hash `#` character in front of it.

```css
#Chapter01 {
  font-style: normal;
  font-size: 48px;
  font-family: Georgia, serif;
}
```

---

```html
<h1>Type rule &gt; built-in style</h1>

<h1 class="fancy">Class rule &gt; Type rule</h1>

<h1 class="fancy" id="Chapter01">
  ID rule &gt; Class rule &gt; Type rule
</h1>

<h1 class="fancy" style="font: italic 16px monospace">
  Inline style &gt; class rule &gt; type rule
</h1>
```

## Handling Conflicts between Rules

Declarations are assigned a precedence based on
whether they were applied inline (with `style=`),
by a CSS rule,
or as part of the browser's default stylesheet.
When two or more declarations on the same element conflict,
that conflict is then resolved by taking the one with
the highest precedence.

The order of precedence for applying styles is as follows:

1. Inline styles have the highest precedence.
2. CSS rules are next.
3. Browser defaults have the lowest precedence.

Among CSS rules,
the precedence is determined by the selector that matched the element
and caused the style to be applied.
The term for this selector-based calculation is _specificity_, which we will
look at in more detail later.
But for the basic selectors we have seen so far, the following
rules are sufficient:

1. Id rules are the most specific.
2. Class rules are next.
3. type name rules are the least specific.

Let's take a closer look at how these precedence rules work with the three
selectors we defined earlier.
Above are several `<h1>` elements with different combinations of
`style`, `class`, and `id` attributes applied.

On the first element, only the `h1` type name selector matches.
That rule includes declarations for `font-size` and `font-family` properties,
which potentially conflict with the browser's built-in rules.
Since any CSS rule has higher precedence than built-in rules,
the style declarations are applied.

On the second element, both the `h1` and `.fancy` selectors match.
Here we have a conflict between two CSS rules.
Let's look at them side-by-side.

| Property      |  `h1 {...}`  | `.fancy {...}` |
| :------------ | :----------: | :------------: |
| `color`       |              |  `darkOrange`  |
| `font-size`   |    `32px`    |                |
| `font-style`  |              |    `italic`    |
| `font-family` | `sans-serif` |   `Georgia`    |

From the table, we can see that the first three properties are
only specified in one rule or the other.
They can all be applied without conflicting.

However, the property `font-family` is specified in both rules.
In this case, we need to look at the specificity of those two rules
to determine which one will be applied.
Since class rules are more specific than type name rules,
the declaration `font-family: Georgia` is applied.

The third element has three selectors that match:
`h1`, `.fancy`, and `#Chapter01`.
We need to look at each declaration to determine which ones
to apply.
Again we'll look at the rules in a table.
Note that we've arranged the selectors in order of their specificity,
with the most specific at the right.

| | `h1` | `.fancy` | `#Chapter01` |
| Property | `{...}` | `{...}` | `{...}` |
| :------------ | :----------: | :------------: | :----------------: |
| `color` | | `darkOrange` | |
| `font-size` | `32px` | | `48px` |
| `font-style` | | `italic` | `normal` |
| `font-family` | `sans-serif` | `Georgia` |

There is only one `color` declaration, so it will be applied.
Of the two declarations for `font-size`, the one from the
`#Chapter01` rule is more specific, so `48px` gets applied.
Similarly, for `font-style`, the id rule is more specific,
so `normal` is applied.
Finally, since `font-family` is not modified by the id rule,
the `.fancy` rule is most specific, and
the `Georgia` value is applied.

In the final line, all the font properties declared in the
inline `style` take precedence over any of our CSS rules.
But since the `color` property is not declared inline,
the value provided by the class rule is applied.

---

```html
<h1>Just an H1</h1>

<h2>Just an H2</h2>
<hr />
<h1 class="fancy">A fancy H1</h1>

<h2 class="fancy">A fancy H2 doesn't look right</h2>
<hr />
<h2 class="fancy2">Our designer gave us this</h2>

<h1 class="fancy2">But we can't use that with an H1</h1>
```

## The Cascade

Cascade is what the "C" in "CSS" stands for;
it's fundamental to how CSS works.
And yet, even senior developers continue to be frustrated by the cascade,
spending too much of their time to try to defeat it.
Therefore, we're going to take the time to learn why the cascade was
invented in the first place, and why it still makes sense over 25 years later.
Along the way,
we'll learn how to work _with_ specificity to better express the design
intent and prioritize between conflicting demands.

The cascade was a a key part of the CSS language as proposed in October 1994 by
Håkon Wium Lie.
The newly-formed W3C was very interested in standardizing style sheets for the
web, and convened a committee to develop the CSS standard.
The CSS Level 1 Specification was released by the W3C in December 1996,
and soon after adopted (incompletely and incompatibly) by the warring
browsers, Microsoft Internet Explorer and Netscape Navigator.

Prior to CSS, the presentation of web pages was set by browser vendors,
so web pages looked different between browsers.
The original browser written by Tim Berners-Lee made use
of an internal stylesheet, but did not give users the ability to customize it.
Some browsers gave users access to this stylesheet, allowing users to override
the browser's styles, in much the same way that Microsoft Word allows the
default paragraph, heading, and list styles to be redefined.
These early examples of stylesheets were by necessity very general,
as they would be applied to every web page the user visited.

Meanwhile, web designers and publishers, expected to be able to
control how their content was presented on the web.
After all, this is what they were used to in print media,
and PDF afforded them this capability.
Brands especially didn't want
browser vendors or users changing the styling
of their pages, and would resort to converting type to images
for publishing to the web.

In response to the demand for publisher control of page styling,
Netscape added the HTML `<font>` element type in 1995.
While it gave publishers control over the color, face, and size of type
this element had to be inserted into the HTML at every place where
the designer wanted to change the font.
Nevertheless, the `<font>` element type made its way to the HTML 3.2 standard,
and though deprecated, is still a part of standard HTML.

So when the W3C released the CSS1 standard at the end of 1996,
there was an expectation that both publishers and consumers would have
control over presentation.
In addition, Netscape was pushing to add more presentation elements to HTML
to fend off pressure from Adobe's PDF.
But the W3C, led Tim Berners-Lee, were insistent
that presentation remain separate from content,
and later HTML standards would not allow any more elements like
`<center>` and `<font>`.
How was CSS going to satisfy these conflicting requirements?

The answer was the cascade.

> Cascading allows several style sheets to
> influence the presentation of a document.
>
> — Håkon Wium Lie,
> in [his thesis dissertation](https://www.wiumlie.no/2006/phd/css.pdf)

The solution was to allow CSS stylesheets to come from multiple sources.
They could be embedded in the HTML page using a `<style>` element.
Stylesheets served as separate files can be linked to multiple HTML pages on
the same site.
Users could also provide a stylesheet, either generally, or per-site.
And browser vendors would still provide the base styling for every element,
also expressible as CSS rules.

We've already seen how conflicts arise between rules in the same stylesheet.
When rules are coming from multiple stylesheets, developed independently
by people with different, or even competing, motivations, conflicts
become inevitable.
The cascade provides a mechanism for deciding how conflicts between
stylesheets are resolved.

Today, user stylesheets are not very commonly used or well supported,
despite the improvements they can make to accessibility.
Browser stylesheets have been fairly standardized, and many sites
apply a _reset_ to reduce dependency on browser styles anyway.
So do we still need the cascade even though 99.9% of the styles
are written by the developers or under their control?

The answer is yes, for reasons of _scaling_.
Very rarely does one developer write _all_ the CSS for a web site.
And even then, they don't write it at all at once, and it's
never all in their head at the same time.
In reality, CSS is written and modified by many people over
years and years.
And in the era of Open-Source Software, CSS can be coming
from developers who never worked on our project at all.

Let's take a look at a problem that often arises
new rules are added to a style sheet.
Continuing with our example of `h1` and `.fancy`,
let's add a rule for `h2`:

```css
h2 {
  color: fireBrick;
  font-family: sans-serif;
  font-size: 100%;
  font-weight: bold;
}
```

Our designer has decides that all `h2` elements should
have `color: fireBrick`.
It should be `sans-serif`, like the `h1`,
but since we have the color to make it noticeable,
it doesn't need to be any larger than our body text.
It should also be bold to make the color more obvious.

We also want to have a fancy version of our `h2` element.
Ideally, we would just add `class="fancy"` to our `<h2>`
and have it all work out.
But let's see what happens.
We'll make our table again to see what style declarations
result from combining our `h2` and `.fancy` rules.

| Property      |     `h2`     |   `.fancy`   |
| :------------ | :----------: | :----------: |
| `color`       | `fireBrick`  | `darkOrange` |
| `font-size`   |    `16px`    |              |
| `font-style`  |              |   `italic`   |
| `font-family` | `sans-serif` |  `Georgia`   |

Taking the right-most value in each row gives us
`darkOrange`, `16px`, `italic`, `Georgia`.
Unfortunately, this is not what our designer had in mind.
At this size and weight, the color, and italic make our `h2`
difficult to read.
The designer gave us this style instead, for every fancy `h2`:

```css
.fancy2 {
  font-family: Georgia;
  font-size: 24px;
  font-weight: normal;
}
```

If we put this `fancy2` class on an `h2` we get the styling we want,
but now we have to tell our HTML authors that they can use `fancy` for `h1` elements,
but they must use `fancy2` for `h2` elements because otherwise it won't match
the design.
Oh, and also, they can't use `fancy2` for `h1` because that's also an invalid
combination.

What we really want is one class name that we can use for `h1` and `h2`,
and maybe others.
But its effect needs to change, depending on the element it's applied to.
Moreover, we'd like there to be no unintended effects if the class is
added to an element which we haven't yet considered.

To put it another way, `fancy`-ness means something different for `h1`
and `h2` elements, and we're not even sure yet what it means for other
elements.

The simple class selectors we've written match _all_ elements with that class name,
but we are not able to compose a single style which can be applied
to all the matches.
Instead, we want to write two different rules that match different subsets
of all the elements with the class name.
To do that, we'll need compound selectors.

---

```html
<h1 class="schmancy">This is a schmancy H1</h1>

<h2 class="schmancy">This is a schmancy H2</h2>

<p class="schmancy">
  For any other schmancy element, we can changes.
</p>

<h1 class="schmancy" id="Chapter01">
  The ID rule still works with schmancy
</h1>
```

## Compound Selectors

Let's rewrite our CSS rules, being careful that each selector matches _specifically_
those elements to which we the corresponding style applies.
To re-terate, we want to use a single class name in our HTML files,
but apply difference styles when combined with `h1` and `h2` elements.

To make sure we've got a clean slate, we'll use a new class name, `schmancy`.
And we've checked with the designer to see if there's anything they
can say in general about what `schmancy`-ness means.
They said, we can assume that everything `schmancy` will use the `Georgia` font,
and--with some exceptions such as `h2`--be `italic`.

With this greater understanding of the design intent,
we can refactor our previous two class rules into three rules:

```css
.schmancy {
  font-family: Georgia, serif;
  font-style: italic;
}

h1.schmancy {
  color: darkOrange;
}

h2.schmancy {
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
}
```

We can verify that this CSS gives us the correct result by replacing the `fancy` class
in the HTML with `schmancy`.
Note that even without touching our ID rule, it still works as intended.

The first rule is a class rule `.schmancy`.
We know that the style declarations will be applied to any element with `schmancy`
in its `class` attribute, so long as there isn't a conflict with a declaration
in a rule with higher specificity.
Note how this clearly communicates what we now know about the design intent:
everything `schmancy` (with a few exceptions) will be `italic Georgia`.

The next rule is our first rule with a compound selector.
We know which elements the `h1` and `.schmancy` selectors match.
When we write two or more selectors next to each other, with no space in between,
the new selector will only match elements which match _all_ of the selectors.
So the selector `h1.schmancy` will match any element
whose tag name is `h1` and has the class name `schmancy` in its `class` attribute.

The only declaration we need in this rule is to set the color to `darkOrange`.
This is because any element that matches this rule also matches the
rules for `h1` and `.schmancy`, so we don't need to repeat anything we had there.

Let's compare these two rules to our original `.fancy` rule:

```css
.fancy {
  color: darkOrange;
  font-style: italic;
  font-family: Georgia, serif;
}
```

As you can see, we are using the same three style declarations,
but moved them into two separate rules.
We put the two font declarations into `.schmancy` because we now understand
that they should apply in general to (almost) all `schmancy` elements.
Whereas the color declaration only applies to elements which _also_
have a tag name of `h1`.

Now let's look at the other compound rule.
The selector, `h2.schmancy` will match all elements which match both
the `h2` and the `.schmancy` rules, which we've already written.
So we only need the style declarations which we don't already have
covered in those other rules.

Here is the previous class we had to style the fancy `h2`:

```css
.fancy2 {
  font-family: Georgia;
  font-size: 24px;
  font-weight: normal;
}
```

Of these three declarations, the first is covered by the `schmancy` rule,
so we can leave it our of our new rule.
The other two we need to carry along,
because we want to apply them instead of the declarations for `font-size`
and `font-weight` in our `h2` rule.

There is one last declaration in the rule for `h2.schmancy` which did
not appear in `.fancy`: `font-style: normal`.
This goes back to the design intent.
As we understand it, `h2` is an exception to the general rule that elements
in class `schmancy` are `italic`.
In CSS, this can be expressed by
declaring `font-style: italic` as part of `.schmancy`,
and then declaring the exception under `h2.schmancy`.

Our refactored CSS is clean and concise,
and the designer is happy with the results.
We're almost ready to move on to learning some more CSS properties.
But there is one more detail to clarify.

We intentionally created a conflict when we added the `font-style`
declaration to the rule for `h2.schmancy`,
but we haven't yet learned how CSS resolves conflicts in compound selectors.
It's now time to understand more completely how _specificity_ is calculated
and used to resolve conflicts between rules.

---

```html
<h2>Just the H2 styles</h2>

<p class="schmancy">Just the schmancy styles</p>

<h2 class="schmancy">The H2 and shmancy styles</h2>
```

## Specificity

There are many more kinds of selectors,
and ways that they can be combined,
which we will cover in a later section.
But at this point, we need to solidify our understanding of _specificity_,
and how CSS employs it to resolve conflicting style declarations
applied to the same element.
With this knowledge, we will also be prepared to write robust
and future-proof CSS rules which avoid surprises.

CSS, like HTML, is a declarative language.
We've seen that styles are built up from declarations,
specifying a property and the value it shall take on.
It is also a rule-based language.
Selectors are the control structure of CSS, taking the place
of `if-then-else` logic in an imperative language like Javascript.
Therefore, any conditional logic determining
the style applied to an element must be expressed using selectors.

CSS gives us a rich language for composing new selectors from existing ones.
We start with simple, general selectors to apply the broad strokes of a design,
which satisfy the base cases.
As we strive to meet more detailed requirements and address exceptions,
we combine selectors, to create more and more specific rules.

The cascade gives us a powerful tool to compose rules, called _specificity_.
The main idea behind specificity is: the more specific a rule,
the more precedence it should have in the case of conflict with other rules.
We saw earlier that specificity explains why a class rule takes precedence
over a type rule.
Now we will extend this notion of specificity to cover any CSS selector,
no matter how complex.

As we've seen earlier, the specificity of a simple selector depends on which
category of selector it is:

| Selector | |
| Category | Specificity |
| ----- | ----- |
| ID | High |
| Class | Medium |
| Type | Low |

- _ID_ selector (high specificity),
- _Class_ selector (middle specificity), or
- _Type_ selector (lowest specificity),

To quantify the specificity of more complex selectors, we need more than the levels
high, medium, and low.
In fact, since selectors can be arbitrarily complex,
we can not even describe specificity as a single number.
Instead we use a list of three numbers, or _triple_,
like we do for the coordinates of a point in 3-dimensional space.
Except instead of naming the coordinates
<math>
<mrow><mo>(</mo>
<mi>x</mi><mo>,</mo>
<mi>y</mi><mo>,</mo>
<mi>z</mi>
<mo>)</mo></mrow>
</math> we name them
<math>
<mrow><mo>(</mo>
<mi>i</mi><mo>,</mo>
<mi>c</mi><mo>,</mo>
<mi>t</mi>
<mo>)</mo></mrow>
</math>.

We start by defining the specificity of the three kinds of simple selectors
as triples as follows:

| Selector Category | Specificity |
| :---------------: | :---------: |
|        ID         |  `(1,0,0)`  |
|       Class       |  `(0,1,0)`  |
|       Type        |  `(0,0,1)`  |

To compute the specificity of a compound selector,
we first break it into its individual simple selectors.
Next, we categorize each simple selector as ID, Class, or Type.
(We will come across other selectors later, but they will all count
as Class selectors for the purposes of specificity calculation.)

Then, we take the list of categorized simple selectors
and make them rows in a table
(keeping any duplicate selectors).
For each (simple) selector, we fill in the specificity,
as defined based on its category.

For example, the selector `h1.fancy#Ch01`, we'd have this table:

| Selector | Category | Specificity |
| -------- | :------: | :---------: |
| `h1`     |   Type   |  `(0,0,1)`  |
| `.fancy` |  Class   |  `(0,1,0)`  |
| `#Ch01`  |    ID    |  `(1,0,0)`  |

Now, the final step
is to sum the specificities of the simple selectors, column-by-column.
That is, compute the sum of the `I` values,
followed by the sum of the `C` values,
and finally the sum of the `T` values.
The resulting triple is the specificity of the original selector.

| Selector | Category | Specificity |
| -------- | :------: | :---------: |
| `h1`     |   Type   |  `(0,0,1)`  |
| `.fancy` |  Class   |  `(0,1,0)`  |
| `#Ch01`  |    ID    |  `(1,0,0)`  |
| -----    |  -----   |    -----    |
|          |  Total:  |  `(1,1,1)`  |

To put it more concisely, the specificity of any selector is a triple, `(I,C,T)`, where

- `I` is the number of ID selectors,
- `C` is the number of Class selectors, and
- `T` is the number of Type selectors.

To understand how to compare the specificity of two rules, let's go back to
our latest example of the rules `.schmancy` and `h2.schmancy`.
Since `.schmancy` is a simple class selector, its specificity is `(0,1,0)`.
For `h2.schmancy`, we observe that it contains one class selector
and one type selector, so its specificity is `(0,1,1)`.

| Selector      | Specificity |
| ------------- | :---------: |
| `.schmancy`   |  `(0,1,0)`  |
| `h2.schmancy` |  `(0,1,1)`  |

To determine which specificity is higher,
we compare corresponding values in the triples,
starting at the left.
If the two values are equal, we move to the next position.
Once we find two values that are equal, the selector
that has the higher value in that position
has the higher specificity.

So, in this case, `h2.schmancy` has the higher specificity
because the `I` and `C` values are equal, and the
`T` value of `1` is greater than `0`.
