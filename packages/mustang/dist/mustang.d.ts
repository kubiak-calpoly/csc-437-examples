import { LitElement } from 'lit';

declare class APIUser {
    authenticated: boolean;
    username: string;
    static deauthenticate(user: APIUser): APIUser;
}

declare type ApplyMap<M> = (fn: MapFn<M>) => void;

declare namespace Auth {
    export {
        AuthenticatedUser,
        AuthProvider as Provider,
        APIUser as User,
        authHeaders as headers,
        AuthSuccessful,
        AuthModel as Model,
        AuthMsg as Msg,
        AuthService as Service
    }
}
export { Auth }

declare class AuthenticatedUser extends APIUser {
    token: string | undefined;
    constructor(token: string);
    static authenticate(token: string): AuthenticatedUser;
    static authenticateFromLocalStorage(): APIUser;
}

declare function authHeaders(user: APIUser): {
    Authorization?: string;
};

declare interface AuthModel {
    user?: APIUser;
    token?: string;
}

declare type AuthMsg = ["auth/signin", AuthSuccessful] | ["auth/signout"] | ["auth/redirect"];

declare type AuthorizedUpdate<Msg extends Message.Base, M extends object> = (message: Msg, apply: ApplyMap<M>, user: Auth.User) => Command<M> | void;

declare class AuthProvider extends Provider<AuthModel> {
    get redirect(): string | undefined;
    constructor();
    connectedCallback(): void;
}

declare class AuthService extends Service<AuthMsg, AuthModel> {
    static EVENT_TYPE: string;
    _redirectForLogin: string | undefined;
    constructor(context: Context<AuthModel>, redirectForLogin: string | undefined);
    update(message: AuthMsg, apply: ApplyMap<AuthModel>): (() => void) | undefined;
    static dispatch: (target: HTMLElement, ...msg: Base) => boolean;
}

declare interface AuthSuccessful {
    token: string;
    redirect?: string;
}

declare type Base = Type<string, object | undefined>;

declare type Command<M> = (model: M) => void;

declare class Context<T extends object> {
    _proxy: T;
    constructor(init: T, host: Provider<T>);
    get value(): T;
    set value(next: T);
    apply(mapFn: (t: T) => T): void;
}

export declare function define(defns: ElementDefinitions): CustomElementRegistry;

declare class Dispatch<Msg extends Base> extends CustomEvent<Msg> {
    constructor(msg: Msg, eventType?: string);
}

declare function dispatcher<Msg extends Base>(eventType: string): (target: HTMLElement, ...msg: Msg) => boolean;

export declare class DropdownElement extends HTMLElement {
    static template: DocumentFragment;
    constructor();
    toggle(): void;
}

export declare class Effect<T extends object> {
    _provider: Provider<T>;
    _effectFn?: EffectFn<T>;
    constructor(observable: Provider<T>, fn?: EffectFn<T>);
    get context(): Context<T>;
    get value(): T;
    setEffect(fn: EffectFn<T>): void;
    runEffect(): void;
}

export declare type EffectFn<T extends object> = (value: T) => void;

declare type ElementDefinitions = {
    [tag: string]: CustomElementConstructor;
};

declare namespace Events {
    export {
        relay
    }
}
export { Events }

declare function fetchData(src: string, authorization: {}): Promise<any>;

declare class FormElement extends HTMLElement {
    static observedAttributes: string[];
    get src(): string | null;
    get isNew(): boolean;
    static template: DocumentFragment;
    get form(): HTMLFormElement | null | undefined;
    _state: {
        [key: string]: any;
    };
    _user: Auth.User;
    constructor();
    _authObserver: Observer<Auth.Model>;
    get authorization(): {
        Authorization: string;
    } | {
        Authorization?: undefined;
    };
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

declare namespace History_2 {
    export {
        HistoryProvider,
        HistoryProvider as Provider,
        HistoryService as Service
    }
}
export { History_2 as History }

declare interface HistoryModel {
    location: Location;
    state: object;
}

declare type HistoryMsg = [
"history/navigate",
    {
    href: string;
    state?: object;
}
];

declare class HistoryProvider extends Provider<HistoryModel> {
    constructor();
    connectedCallback(): void;
}

declare class HistoryService extends Service<HistoryMsg, HistoryModel> {
    static EVENT_TYPE: string;
    constructor(context: Context<HistoryModel>);
    update(message: HistoryMsg, apply: ApplyMap<HistoryModel>): void;
}

export declare function html(template: TemplateStringsArray, ...params: string[]): DocumentFragment;

declare function identity<M>(model: M): M;

declare type MapFn<M> = (model: M) => M;

declare namespace Message {
    export {
        dispatcher,
        Type,
        Base,
        Dispatch
    }
}
export { Message }

export declare class Observer<T extends object> {
    _target: HTMLElement;
    _contextLabel: string;
    _provider?: Provider<T>;
    _effects: Effect<T>[];
    constructor(target: HTMLElement, contextLabel: string);
    observe(fn?: EffectFn<T> | undefined): Promise<Effect<T>>;
    _handleChange(ev: CustomEvent): void;
}

declare class Provider<T extends object> extends HTMLElement {
    readonly context: Context<T>;
    constructor(init: T);
    attach(observer: EventListener): EventListener;
    detach(observer: EventListener): void;
}

declare function relay(event: Event, customType: string, detail: any): void;

declare function replace<M>(replacements: Partial<M>): MapFn<M>;

declare namespace Rest {
    export {
        fetchData,
        FormElement
    }
}
export { Rest }

declare class Service<Msg extends Base, T extends object> {
    _context: Context<T>;
    _update: Update_2<Msg, T>;
    _eventType: string;
    _running: boolean;
    _pending: Array<Msg>;
    attach(host: Provider<T>): void;
    start(): void;
    constructor(update: Update_2<Msg, T>, context: Context<T>, eventType?: string, autostart?: boolean);
    apply(fn: MapFn<T>): void;
    consume(message: Msg): void;
    process(message: Msg): void;
}

export declare function shadow(fragment: DocumentFragment): {
    attach: (el: HTMLElement, options?: ShadowRootInit) => ShadowRoot;
};

declare namespace Store {
    export {
        StoreProvider as Provider,
        StoreService as Service
    }
}
export { Store }

declare class StoreProvider<M extends object, Msg extends Message.Base> extends Provider<M> {
    _updateFn: AuthorizedUpdate<Msg, M>;
    _authObserver: Observer<Auth.Model>;
    _user: Auth.User;
    constructor(update: AuthorizedUpdate<Msg, M>, init: M, authContext: string);
    connectedCallback(): void;
}

declare class StoreService<Msg extends Message.Base, M extends object> extends Service<Msg, M> {
    static EVENT_TYPE: string;
    constructor(context: Context<M>, updateFn: Update_2<Msg, M>);
}

declare type Type<msg extends string, T extends object | undefined> = [msg, T] | [msg];

declare namespace Update {
    export {
        identity,
        replace,
        ApplyMap,
        Command,
        MapFn,
        Update_2 as Update
    }
}
export { Update }

declare type Update_2<Msg extends Message.Base, M extends object> = (message: Msg, apply: ApplyMap<M>) => Command<M> | void;

export declare class View<M extends object, Msg extends Message.Base> extends LitElement {
    _observer?: Observer<M>;
    _context?: Context<M>;
    _lastModel?: M;
    get model(): M;
    constructor(context: string);
    connectedCallback(): void;
    dispatchMessage(msg: Msg, target?: HTMLElement): void;
    ref<T>(key: keyof M): T | undefined;
}

export { }
