const scenes_html = `<html>
            <body><div data-scene="1"><frp-example-1>
  <frp-view>
    <frp-bind on-click="Msg.Decrement">
      <button>Less cowbell</button>
    </frp-bind>
    <p>
      <frp-text>The sound of ${model.count} cowbells.</frp-text>
    </p>
    <frp-bind on-click="Msg.Increment">
      <button>More cowbell</button>
    </frp-bind>
  </frp-view>
</frp-example-1>
</div>
<div data-scene="3"><frp-example-2>
  <frp-view observing="{copyright_year, author, page_views}">
    <p>
      <frp-text
        >&copy; Copyright ${copyright_year} by
        ${author}.</frp-text
      >
    </p>
    <p>
      <frp-text
        >This page has been viewed ${page_views}
        times.</frp-text
      >
    </p>
  </frp-view>
  <frp-view>
    <p>
      <frp-bind
        on-click="() => ({page_views: model.page_views+1})"
      >
        <button>Increment View Counter</button>
      </frp-bind>
    </p>
    <p>
      <frp-bind
        value="model.author"
        on-change="() => ({author: this.value})"
      >
        <input />
      </frp-bind>
    </p>
  </frp-view>
</frp-example-2>
</div></body>
            </html>`;

export { scenes_html as default };
