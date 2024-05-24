import { originalTarget, relay } from "../event";
import { html, shadow } from "../html";

class InputArrayElement extends HTMLElement {
  static template = html`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style>
          :host {
            display: contents;
          }
          ul {
            display: contents;
          }
          button.add {
            grid-column: input / input-end;
          }
          ::slotted(label) {
            display: contents;
          }
        </style>
      </button>
    </template>
  `;

  _array: Array<string> = [];

  get name() {
    return this.getAttribute("name");
  }

  get value() {
    return this._array;
  }

  set value(array) {
    this._array = Array.isArray(array) ? array : [array];
    populateArray(this._array, this);
  }

  constructor() {
    super();
    shadow(InputArrayElement.template).attach(this);

    this.addEventListener("input-array:add", (event) => {
      event.stopPropagation();
      this.append(renderItem("", this._array.length));
    });
    this.addEventListener("input-array:remove", (event) => {
      event.stopPropagation();
      this.removeClosestItem(event.target as HTMLElement);
    });
    this.addEventListener("change", (event) => {
      event.stopPropagation();
      // console.log("Change event:", event);
      const target = event.target as HTMLElement;

      if (target && target !== this) {
        const newEvent = new Event("change", { bubbles: true });
        const value = (target as HTMLInputElement).value;
        const item = target.closest("label");
        if (item) {
          const index = Array.from(this.children).indexOf(item);
          this._array[index] = value;
          this.dispatchEvent(newEvent);
        }
      }
    });

    this.addEventListener("click", (event) => {
      const addbutton = originalTarget(event, "button.add");
      if (addbutton) relay(event, "input-array:add");
      else {
        const removebutton = originalTarget(
          event,
          "button.remove"
        );
        if (removebutton) relay(event, "input-array:remove");
      }
    });
  }

  removeClosestItem(element: HTMLElement) {
    const item = element.closest("label");
    console.log("Removing closest item:", item, element);
    if (item) {
      const index = Array.from(this.children).indexOf(item);
      this._array.splice(index, 1);
      item.remove();
    }
  }
}

function populateArray(
  array: Array<string>,
  container: HTMLElement
) {
  container.replaceChildren();
  array.forEach((s, i) => container.append(renderItem(s, i)));
}

function renderItem(value: string | undefined, _: number) {
  const valueAttr =
    value === undefined ? "" : `value="${value}"`;

  return html`
    <label>
      <input ${valueAttr} />
      <button class="remove" type="button">Remove</button>
    </label>
  `;
}

export { InputArrayElement as Element };
