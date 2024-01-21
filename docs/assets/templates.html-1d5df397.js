const templates_html = `<html>
          <body>
            <template id="frp-main-template">
  <section id="frp-main">
    <slot></slot>
  </section>
</template>

<template id="frp-view-template">
  <slot></slot>
</template>

<template id="frp-text-template">
  <slot>Use template literal syntax here.</slot>
  <span id="value" class="undefined-value"></span
  ><style>
    span.undefined-value,
    slot.filled {
      display: none;
    }

    span.error-value,
    slot.error {
      background: red;
      color: white;
    }
  </style></template
>

<template id="frp-bind-template">
  <slot></slot>
</template>

          </body>
        </html>`;

export { templates_html as default };
