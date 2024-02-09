let mountElement = null;
let state = {};
let registry = {};
let pending = {};

export function init(initialState, mountpoint) {
  Object.assign(state, initialState);
  mountElement =
    (mountpoint && document.getElementById(mountpoint)) ||
    document.body.appendChild(document.createElement("div"));
  customElements.define("kram-main", MainElement);
  customElements.define("kram-toc", TocElement);
  customElements.define("kram-scene", SceneElement);
}

export function register(module, name, language, bindFn) {
  const render = mount(module, name, bindFn);
  if (language && render) {
    const todo = pending[language];
    registry[language] = { name, module, render };
    console.log(
      `[kram-11ty] '${language}' scenes will be rendered from`,
      name,
      render
    );
    if (todo && todo.length) {
      console.log(
        "[kram-11ty] Resolving deferred scene rendering:",
        todo
      );
      todo.map((resolve) => resolve(render));
      pending[language] = undefined;
    }
  }
}

function whenCanRender(language) {
  return new Promise((resolve, reject) => {
    const reg = registry[language];
    const todo = pending[language];
    if (reg && reg.render) {
      resolve(reg.render);
    } else if (todo) {
      console.log(
        `Deferring total ${
          todo.length + 1
        } renders of language ${language}`
      );
      todo.push(resolve);
    } else {
      console.log(`Deferring 1 render of language ${language}`);
      pending[language] = [resolve];
    }
  });
}

function mount(mod, name, bindfn) {
  let render = (n, container) => {
    console.log(
      "Cannot render scene; module not mounted:",
      name
    );
  };

  try {
    if (bindfn) {
      render = bindfn(mod, mountElement, state);
    } else if (typeof (mod && mod.mount) === "function") {
      render = mod.mount(mountElement, state);
    } else {
      render = () => null;
    }
    console.log("Module mounted:", name, render);
  } catch (err) {
    console.log("Warning: module not mounted", name, err);
  }

  return render;
}

class MainElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      MainElement.html_template.cloneNode(true)
    );
  }

  static html_template = template`<article>
    <header>
      <h1><slot name="title">Untitled Workbook</slot></h1>
      <nav><slot name="nav"><a href="#">Contents</a></slot></nav>
    </header>
    <main><slot></slot></main>
  </article>
  <style>
    article {
      display: contents;
    }
    header { display: contents; }
    h1 {   
      font-family: var(--font-display);
      color: var(--color-accent);
      margin: 0;
      grid-column: header-start / span 3;
      align-self: baseline; }
    ::slotted([slot="title"]) { margin: 0; }
    nav { 
      grid-row: 1/span 2;
      grid-column: aside;
      align-self: baseline;
    }
    nav a {
      font-family: var(--font-display);
      color: var(--color-accent);
    }
    main { 
      display: contents; 
    }
  </style>
  `;
}

class TocElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      TocElement.html_template.cloneNode(true)
    );

    this.clickHandler = (ev) => {
      this.scrollToId(ev.target.dataset.idref);
    };
  }

  connectedCallback() {
    const toclist = this.shadowRoot.querySelector("#list");

    toclist.addEventListener("click", this.clickHandler);
  }

  scrollToId(idref) {
    console.log("Clicked on ", idref);

    if (idref) {
      const element = document.getElementById(idref);
      if (element) {
        element.scrollIntoView(true);
      }
    }
  }

  static html_template = template`<details>
    <summary><slot name="summary">Contents</slot></summary>
    <slot id="list"></slot>
  </details>
  <style>
  details { position: relative; z-index: 10; }
  summary { text-align: right; }
  #list { cursor: pointer; }
  `;
}

class SceneElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      SceneElement.html_template.cloneNode(true)
    );
  }

  connectedCallback() {
    const norender = this.getAttribute("norender");
    const lang = this.getAttribute("language");
    const scnum = this.getAttribute("scene");

    this.setAttribute("id", `scene-${scnum}`);
    this.shadowRoot
      .querySelector("#link")
      .setAttribute("href", `#scene-${scnum}`);
    this.style.setProperty("--scene-number", `"${scnum}"`);

    if (typeof norender !== "string") {
      const fig = document.createElement("figure");
      const node = document.createElement("div");
      fig.setAttribute("slot", "rendering");
      fig.appendChild(node);

      whenCanRender(lang).then((render) => {
        render(parseInt(scnum), node);
      });

      this.appendChild(fig);
    } else {
      this.style.setProperty("--scene-display-mode", "none");
    }
  }

  scrollIntoView(options) {
    const header = this.shadowRoot.querySelector("header");
    header.scrollIntoView(options);
  }

  static html_template = template`<section>
    <header>
      <a id="link" href="#">/</a>
      <slot name="rendering">
        <figure id="rendering">
          Nothing rendered (yet).
        </figure>
      </slot>
      <slot name="title"><h1></h1></slot>
      <slot name="scenecode">No code for this scene.</slot>
    </header>
    <main>
      <slot>Discussion</slot>
    </main>
  </section><style>
    :host { 
      --scene-number: "##";
      display: contents;
    }
    section {
      display: contents;
    }
    header {
      display: grid;
      grid-column: start / end;
      grid-template-columns: var(--grid-width-margin) 
          var(--page-grid-template) var(--grid-width-margin);
      /* grid-template-columns: subgrid; */
      align-items: baseline;
      column-gap: var(--spacing-medium);
      margin-block: var(--spacing-medium);
      background: var(--color-background-accent);
    }
    ::slotted([slot="title"]),
    slot[name="title"] > h1 { 
      grid-column: 2;
      margin-top: var(--spacing-medium);
      font-size: var(--font-size-large);
      font-weight: 300;
    }
    #link {
      grid-column: 2;
      margin-top: var(--spacing-medium);
      font-size: var(--font-size-large);
      text-decoration: none;
    }
    #link::before {
      display: inline-block;
      content: var(--scene-number);
      text-decoration: inherit;
    }
    slot[name="scenecode"],
    slot[name="rendering"] {
      visibility: hidden;
    }
    ::slotted([slot="scenecode"]) { 
      visibility: visible;
      grid-column: 3 / span 3;
    }
    ::slotted(figure[slot="rendering"]) {
      visibility: visible;
      display: flex;
      aspect-ratio: 4;
      margin: 0;
      grid-column: 2 / span 4;
      padding-inline: var(--scene-padding-inline);
      padding-block: var(--scene-padding-block);
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      background: var(--scene-background);
      border-radius: var(--scene-border-radius);
      font-family: var(--scene-font);
      color: var(--scene-text-color);
    }
    ::slotted(h1), ::slotted(h2), ::slotted(h3), h1, h2, h3, a {
      font-family: var(--font-display);
      color: var(--color-accent);      
      font-weight: 300;
    }
    main { 
      display: contents;
    }
  </style>`;
}

function template(strings, ...values) {
  const html = strings.flatMap((s, i) =>
    i ? [values[i - 1], s] : [s]
  );
  let tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}
