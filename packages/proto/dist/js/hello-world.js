class HelloWorldElement extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById(
      "hello-world-template"
    );
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }
}

customElements.define("hello-world", HelloWorldElement);
