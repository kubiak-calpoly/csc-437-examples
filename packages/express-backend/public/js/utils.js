// utils.js -- web component utilities

// return an HTML <template> from tagged literal
export function html(strings, ...values) {
  const html = strings.flatMap((s, i) =>
    i ? [values[i - 1], s] : [s]
  );
  let tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}

// return a static event-handler for a web component
export function effect(fn) {
  return (event, ...rest) => {
    const host = event.target.getRootNode().host;
    fn.call(host, event, ...rest);
  };
}
