import { Context, Provider } from "./context";
import { dispatcher } from "./message";
import { Service } from "./service";
import { ApplyMap } from "./update";

interface HistoryModel {
  location: Location;
  state: object;
}

type HistoryMsg =
  | [
    "history/navigate",
    {
      href: string;
      state?: object;
    }
  ]
  | [
    "history/redirect",
    {
      href: string;
      state?: object;
    }
  ];

class HistoryService extends Service<HistoryMsg, HistoryModel> {
  static EVENT_TYPE = "history:message";

  constructor(context: Context<HistoryModel>) {
    super(
      (msg, apply) => this.update(msg, apply),
      context,
      HistoryService.EVENT_TYPE
    );
  }

  update(message: HistoryMsg, apply: ApplyMap<HistoryModel>) {
    switch (message[0]) {
      case "history/navigate": {
        const { href, state } = message[1];
        apply(navigate(href, state));
        break;
      }
      case "history/redirect": {
        const { href, state } = message[1];
        apply(redirect(href, state));
        break;
      }
    }
  }
}

export class HistoryProvider extends Provider<HistoryModel> {
  constructor() {
    super({
      location: document.location,
      state: {}
    });

    this.addEventListener("click", (event: MouseEvent) => {
      const originalTarget = (
        event.composed ? event.composedPath()[0] : event.target
      ) as HTMLAnchorElement;
      if (
        originalTarget.tagName == "A" &&
        originalTarget.href &&
        event.button == 0
      ) {
        // It's a left click on an <a href=...>.
        const url = new URL(originalTarget.href);
        if (url.origin === this.context.value.location.origin) {
          console.log("Preventing Click Event on <A>", event);
          event.preventDefault();
          dispatch(originalTarget, "history/navigate", {
            href: url.pathname + url.search
          });
        }
      }
    });

    window.addEventListener("popstate", (event) => {
      this.context.value = {
        location: document.location,
        state: event.state
      };
    });
  }

  connectedCallback() {
    const service = new HistoryService(this.context);
    service.attach(this);
  }
}

function navigate(href: string, state: object = {}) {
  history.pushState(state, "", href);
  return () => ({
    location: document.location,
    state: history.state
  });
}

function redirect(href: string, state: object = {}) {
  history.replaceState(state, "", href);
  return () => ({
    location: document.location,
    state: history.state
  });
}

const dispatch = dispatcher<HistoryMsg>(
  HistoryService.EVENT_TYPE
);

export {
  HistoryProvider as Provider,
  HistoryService as Service,
  dispatch,
  type HistoryModel as Model,
  type HistoryMsg as Msg
};
