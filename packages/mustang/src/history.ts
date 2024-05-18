import { Context, Provider } from "./context";
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
      case "history/navigate":
        const { href, state } = message[1];
        apply(navigate(href, state));
    }
  }
}

export class HistoryProvider extends Provider<HistoryModel> {
  constructor() {
    super({
      location: document.location,
      state: {}
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

export {
  HistoryProvider as Provider,
  HistoryService as Service
};
