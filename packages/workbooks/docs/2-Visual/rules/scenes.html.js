export default `<html>
            <body><div data-scene="1"><h1>Selected by tag name</h1>

<h1 class="fancy">Selected by class name</h1>

<h1 id="Chapter01">Selected by ID</h1>
</div>
<div data-scene="2"><h1>Type rule &gt; built-in style</h1>

<h1 class="fancy">Class rule &gt; Type rule</h1>

<h1 class="fancy" id="Chapter01">
  ID rule &gt; Class rule &gt; Type rule
</h1>

<h1 class="fancy" style="font: italic 16px monospace">
  Inline style &gt; class rule &gt; type rule
</h1>
</div>
<div data-scene="3"><h1>Just an H1</h1>

<h2>Just an H2</h2>
<hr />
<h1 class="fancy">A fancy H1</h1>

<h2 class="fancy">A fancy H2 doesn't look right</h2>
<hr />
<h2 class="fancy2">Our designer gave us this</h2>

<h1 class="fancy2">But we can't use that with an H1</h1>
</div>
<div data-scene="4"><h1 class="schmancy">This is a schmancy H1</h1>

<h2 class="schmancy">This is a schmancy H2</h2>

<p class="schmancy">
  For any other schmancy element, we can changes.
</p>

<h1 class="schmancy" id="Chapter01">
  The ID rule still works with schmancy
</h1>
</div>
<div data-scene="5"><h2>Just the H2 styles</h2>

<p class="schmancy">Just the schmancy styles</p>

<h2 class="schmancy">The H2 and shmancy styles</h2>
</div></body>
            </html>`;