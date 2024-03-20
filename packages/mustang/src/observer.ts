import { Provider, whenProviderReady } from "./context";

export class Observer<T extends object> {
  _target: HTMLElement;
  _contextLabel: string;
  _provider?: Provider<T>;
  _effects: Effect<T>[] = [];

  constructor(target: HTMLElement, contextLabel: string) {
    this._target = target;
    this._contextLabel = contextLabel;
  }

  observe() {
    return new Promise<Effect<T>>((resolve, _) => {
      if (this._provider) {
        const effect = new Effect<T>(this._provider);
        this._effects.push(effect);
        resolve(effect);
      } else {
        whenProviderReady<T>(
          this._target,
          this._contextLabel
        ).then((provider: Provider<T>) => {
          const effect = new Effect<T>(provider);
          this._provider = provider;
          this._effects.push(effect);
          provider.attach((ev: Event) =>
            this._handleChange(ev as CustomEvent)
          );
          resolve(effect);
        });
      }
    });
  }

  _handleChange(ev: CustomEvent) {
    console.log(
      "Received change event for observers",
      ev,
      this._effects
    );
    this._effects.forEach((obs) => obs.runEffect());
  }
}

export type EffectFn<T extends object> = (value: T) => void;

export class Effect<T extends object> {
  _provider: Provider<T>;
  _effectFn?: EffectFn<T>;

  constructor(observable: Provider<T>) {
    this._provider = observable;
  }

  get context() {
    return this._provider.context;
  }

  setEffect(fn: EffectFn<T>) {
    this._effectFn = fn;
    this.runEffect();
  }

  runEffect() {
    if (this._effectFn) {
      this._effectFn(this.context);
    }
  }
}
