export default `<html>
            <body><div data-scene="2"><p class="boxed-text">Paragraphs are by default full width.</p>
<p class="narrow-box boxed-text">This box is narrow.</p>
<p class="narrow-box boxed-text">
  If we add more content to a narrow box, that content will wrap
  to as many lines as it needs, making the box taller.
</p>
<p class="narrow-box two-line-box boxed-text">
  If we constrain the height of the box, the content will
  overflow.
</p>
</div>
<div data-scene="3"><p class="boxed-text narrow-box">Too little text.</p>
<p class="boxed-text hug-box">This box hugs content.</p>
<p class="boxed-text squeeze-box">
  This box is as narrow as it can be.
</p>
<p class="boxed-text min-box">
  This box is not too narrow because it has a minimum width.
</p>
<p class="boxed-text min-box">
  This box has a minimum width, but if there are
  <em class="non-breaking">phrases that cannot be broken</em>
  , CSS will make room for them.
</p>
</div>
<div data-scene="4"><section class="boxed-section">
  <h1 class="boxed-text">
    <em>Metamorphosis</em>
    by Franz Kafka
  </h1>

  <p class="boxed-text with-margins">
    One morning, when Gregor Samsa woke from troubled dreams, he
    found himself transformed in his bed into a horrible vermin.
    He lay on his armour-like back, and if he lifted his head a
    little he could see his brown belly, slightly domed and
    divided by arches into stiff sections. The bedding was
    hardly able to cover it and seemed ready to slide off any
    moment. His many legs, pitifully thin compared with the size
    of the rest of him, waved about helplessly as he looked.
  </p>
  <p class="boxed-text with-padding">
    “What’s happened to me?” he thought. It wasn’t a dream. His
    room, a proper human room although a little too small, lay
    peacefully between its four familiar walls. A collection of
    textile samples lay spread out on the table—Samsa was a
    travelling salesman—and above it there hung a picture that
    he had recently cut out of an illustrated magazine and
    housed in a nice, gilded frame. It showed a lady fitted out
    with a fur hat and fur boa who sat upright, raising a heavy
    fur muff that covered the whole of her lower arm towards the
    viewer.
  </p>
</section>
</div>
<div data-scene="5"><section>
  <p class="content-box">Here is our content.</p>
  <img src="../_files/Box Model.svg" />
</section>
</div>
<div data-scene="6"><p class="content-box">
  This content box has a width of 200px. We've put a box with a
  border around it.
</p>

<p class="border-box">
  This border box has a width 200px. We've put the content
  inside.
</p>
</div></body>
            </html>`;