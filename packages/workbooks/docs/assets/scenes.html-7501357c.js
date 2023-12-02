const scenes_html = `<html>
            <body><div data-scene="1"><hello-world></hello-world>
</div>
<div data-scene="2"><hello-world> web components </hello-world>
</div>
<div data-scene="3"><hello-style> component style </hello-style>

<h1>This &lt;H1&gt; has no style</h1>
</div>
<div data-scene="4"><greet-world>
  <span slot="greeting">Greetings</span>
  <span slot="recipient">earthlings</span>
</greet-world>
</div>
<div data-scene="5"><arrow-button></arrow-button>
<arrow-button heading="90deg"></arrow-button>
<arrow-button heading="180deg"></arrow-button>
<arrow-button heading="-90deg"></arrow-button>
<arrow-button heading="45deg"></arrow-button>
</div>
<div data-scene="6"><section>
  <nav class="menu-bar">
    <dropdown-menu>
      File
      <ul slot="menu">
        <li>New…</li>
        <li><hr /></li>
        <li>Open…</li>
        <li>Open Recent</li>
        <li><hr /></li>
        <li>Save</li>
        <li>Save As…</li>
        <li>Revert to Last Saved</li>
        <li><hr /></li>
        <li>Close</li>
      </ul>
    </dropdown-menu>
    <dropdown-menu> Edit </dropdown-menu>
    <dropdown-menu> View </dropdown-menu>
    <dropdown-menu> Help </dropdown-menu>
  </nav>
</section>
</div>
<div data-scene="8"><section>
  <nav class="menu-bar">
    <dropdown-base>
      File
      <command-menu slot="layer">
        <action-item>New…</action-item>
        <command-group>
          <action-item>Open…</action-item>
          <action-item>Open Recent</action-item>
        </command-group>
        <command-group>
          <action-item>Save</action-item>
          <action-item>Save As…</action-item>
          <action-item>Revert to Last Saved</action-item>
        </command-group>
        <action-item>Close</action-item>
      </command-menu>
    </dropdown-base>
    <dropdown-base>Edit</dropdown-base>
    <dropdown-base>View</dropdown-base>
    <dropdown-base>Help</dropdown-base>
  </nav>
</section>
</div>
<div data-scene="10"><format-data name="count">The count is {count}.</format-data>
<action-item>↑</action-item>
<action-item>↓</action-item>
<action-item>Reset</action-item>
</div></body>
            </html>`;

export { scenes_html as default };
