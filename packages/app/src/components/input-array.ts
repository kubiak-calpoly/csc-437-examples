import {
  css,
  html,
  shadow
} from "@unbndl/html";
import {
  fromAttributes,
  View,
  createView,
  createViewModel
} from "@unbndl/view";

interface InputArrayAttributes {
  name?: string;
}

interface InputArrayData extends InputArrayAttributes {
  values: Array<string>;
}

export class InputArrayElement extends HTMLElement {
  viewModel = createViewModel<InputArrayData>({
    values: [] as Array<string>
  }).with(fromAttributes<InputArrayAttributes>(this), "name");

  static formAssociated = true;

  get name(): string | undefined {
    return this.viewModel.$.name;
  }

  get value(): Array<string> {
    return this.viewModel.$.values;
  }

  set value(array: Array<string>) {
    this.viewModel.set("values", array);
  }

  constructor() {
    super();
    shadow(this)
      .styles(InputArrayElement.styles)
      .replace(this.viewModel.render(this.view))
      .delegate("input", {
        change: (ev: Event) => {
          const input = ev.target as HTMLInputElement;
          const item = input.closest("li");
          if (item) this.changeItem(item, input.value);
        }
      })
      .delegate("button.add", {
        click: (_: Event) => {
          this.addItem("");
        }
      })
      .delegate("button.remove", {
        click: (ev: Event) => {
          const button = ev.target as HTMLButtonElement;
          const item = button.closest("li");
          if (item) this.removeItem(item);
        }
      });
  }

  view = createView<InputArrayData>(html`
    <fieldset name=${($) => $.name || "undefined"}>
      <ul>
        ${($) =>
          View.map(
            this.itemView,
            $.values.map((s) => ({ value: s }))
          )}
      </ul>
      <button class="add">
        <slot name="label-add">Add an item</slot>
      </button>
    </fieldset>
  `);

  itemView = createView<{ value: string }>(html`
    <li>
      <input value=${($) => $.value} />
      <button class="remove">Remove</button>
    </li>
  `);

  static styles = css`
    fieldset {
      display: grid;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
      padding: 0;
      border: none;
    }
    ul {
      display: contents;
      list-style: none;
      padding: 0;
    }
    li {
      display: contents;
      button {
        grid-column: auto/-1;
      }
      input {
        grid-column: auto/-2;
      }
    }
  `;

  changeItem(item: HTMLElement, value: string) {
    const index = this.getItemIndex(item);
    if (index) this.viewModel.$.values[index] = value;
  }

  addItem(value: string) {
    this.viewModel.set(
      "values",
      this.viewModel.$.values.concat([value])
    );
  }

  removeItem(item: HTMLElement) {
    const index = this.getItemIndex(item);
    if (index >= 0)
      this.viewModel.set(
        "values",
        this.viewModel.$.values.toSpliced(index, 1)
      );
  }

  getItemIndex(item: HTMLElement): number {
    const list = item.parentElement;
    if (!list) return -1;
    const items = list.children;
    for (let i = 0; items && i < items.length; i++) {
      if (items[i] === item) return i;
    }
    return -1;
  }
}
