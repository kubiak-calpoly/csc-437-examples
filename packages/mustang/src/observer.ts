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

  observe(fn: EffectFn<T> | undefined = undefined) {
    return new Promise<Effect<T>>((resolve, _) => {
      if (this._provider) {
        const effect = new Effect<T>(this._provider, fn);
        this._effects.push(effect);
        resolve(effect);
      } else {
        whenProviderReady<T>(this._target, this._contextLabel)
          .then((provider: Provider<T>) => {
            const effect = new Effect<T>(provider, fn);
            this._provider = provider;
            this._effects.push(effect);
            provider.attach((ev: Event) =>
              this._handleChange(ev as CustomEvent)
            );
            resolve(effect);
          })
          .catch((err) =>
            console.log(
              `Observer ${this._contextLabel}: ${err}`,
              err
            )
          );
      }
    });
  }

  _handleChange(ev: CustomEvent) {
    console.log(
      "Received change event for observers",
      ev,
      this._effects
    );
    ev.stopPropagation();
    this._effects.forEach((obs) => obs.runEffect());
  }
}

export type EffectFn<T extends object> = (value: T) => void;

export class Effect<T extends object> {
  _provider: Provider<T>;
  _effectFn?: EffectFn<T>;

  constructor(observable: Provider<T>, fn?: EffectFn<T>) {
    this._provider = observable;
    if (fn) this.setEffect(fn);
  }

  get context() {
    return this._provider.context;
  }

  get value() {
    return this.context.value;
  }

  setEffect(fn: EffectFn<T>) {
    this._effectFn = fn;
    this.runEffect();
  }

  runEffect() {
    if (this._effectFn) {
      this._effectFn(this.context.value);
    }
  }
}
