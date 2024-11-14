import { CSSResult } from 'lit';
import { default as default_2 } from 'route-parser';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit';

declare class APIUser {
    authenticated: boolean;
    username: string;
    static deauthenticate(user: APIUser): APIUser;
}

declare type ApplyMap<M> = (fn: MapFn<M>) => void;

declare namespace Auth {
    export {
        AuthenticatedUser,
        dispatch_2 as dispatch,
        authHeaders as headers,
        tokenPayload as payload,
        AuthProvider as Provider,
        APIUser as User,
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

declare function authHeaders(user: APIUser | AuthenticatedUser): {
    Authorization?: string;
};

declare interface AuthModel {
    user?: APIUser | AuthenticatedUser;
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
}

declare interface AuthSuccessful {
    token: string;
    redirect?: string;
}

declare type Base = Type<string, object | undefined>;

declare type Case = CaseRoute & (ViewCase | RedirectCase);

declare interface CaseRoute {
    route: default_2;
}

declare type Command<M> = (model: M) => void;

declare class Context<T extends object> {
    _proxy: T;
    constructor(init: T, host: Provider<T>);
    get value(): T;
    set value(next: T);
    apply(mapFn: (t: T) => T): void;
}

export declare function css(template: TemplateStringsArray, ...params: string[]): CSSStyleSheet;

export declare function define(defns: ElementDefinitions): CustomElementRegistry;

declare class Dispatch<Msg extends Base> extends CustomEvent<Msg> {
    constructor(msg: Msg, eventType?: string);
}

declare const dispatch: (target: HTMLElement, ...msg: Base) => boolean;

declare const dispatch_2: (target: HTMLElement, ...msg: AuthMsg) => boolean;

declare const dispatch_3: (target: HTMLElement, ...msg: HistoryMsg) => boolean;

declare function dispatcher<Msg extends Base>(eventType?: string): (target: HTMLElement, ...msg: Msg) => boolean;

declare namespace Dropdown {
    export {
        DropdownElement as Element
    }
}
export { Dropdown }

declare class DropdownElement extends HTMLElement {
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
        relay,
        originalTarget
    }
}
export { Events }

declare function fetchData(src: string, authorization: {}): Promise<any>;

declare namespace Form {
    export {
        FormElement as Element,
        SubmitEvent_2 as SubmitEvent,
        FormValues as Values
    }
}
export { Form }

declare class FormElement extends HTMLElement {
    set init(x: FormValues);
    static template: DocumentFragment;
    static styles: CSSStyleSheet;
    get form(): HTMLFormElement | null | undefined;
    _state: FormValues;
    constructor();
}

declare class FormElement_2 extends HTMLElement {
    static observedAttributes: string[];
    get src(): string | null;
    get isNew(): boolean;
    action?: (obj: FormValues_2) => Message.Base;
    set init(x: FormValues_2);
    static template: DocumentFragment;
    get form(): HTMLFormElement | null | undefined;
    _state: FormValues_2;
    _user: Auth.User;
    constructor();
    _authObserver: Observer<Auth.Model>;
    get authorization(): {
        Authorization: string;
    } | {
        Authorization?: undefined;
    };
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
}

declare type FormValues = {
    [key: string]: unknown;
};

declare type FormValues_2 = {
    [key: string]: unknown;
};

declare namespace History_2 {
    export {
        HistoryProvider,
        HistoryProvider as Provider,
        HistoryService as Service,
        dispatch_3 as dispatch,
        HistoryModel as Model,
        HistoryMsg as Msg
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
] | [
"history/redirect",
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

export declare function html(template: TemplateStringsArray, ...values: unknown[]): DocumentFragment;

declare function identity<M>(model: M): M;

declare namespace InputArray {
    export {
        InputArrayElement as Element
    }
}
export { InputArray }

declare class InputArrayElement extends HTMLElement {
    static template: DocumentFragment;
    static styles: CSSStyleSheet;
    _array: Array<string>;
    get name(): string | null;
    get value(): string[];
    set value(array: string[]);
    constructor();
    removeClosestItem(element: HTMLElement): void;
}

declare type MapFn<M> = (model: M) => M;

declare type Match = MatchPath & (ViewCase | RedirectCase);

declare interface MatchPath {
    path: string;
    query?: URLSearchParams;
    params?: RouteParams;
}

declare namespace Message {
    export {
        dispatcher,
        Type,
        Base,
        Dispatch,
        dispatch
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

declare function originalTarget(event: Event, selector?: string): EventTarget | undefined;

declare class Provider<T extends object> extends HTMLElement {
    readonly context: Context<T>;
    constructor(init: T);
    attach(observer: EventListener): EventListener;
    detach(observer: EventListener): void;
}

declare interface RedirectCase {
    redirect: RouteRedirect;
}

declare function relay(event: Event, customType: string, detail?: any): void;

declare function replace<M>(replacements: Partial<M>): MapFn<M>;

declare namespace Rest {
    export {
        fetchData,
        FormElement_2 as FormElement
    }
}
export { Rest }

declare type RouteParams = {
    [key: string]: string;
};

declare type RouteRedirect = string | ((arg: RouteParams) => string);

declare type RouteView = (params: RouteParams, query?: URLSearchParams) => TemplateResult;

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

export declare function shadow(el: HTMLElement, options?: ShadowRootInit): {
    template: (fragment: DocumentFragment) => any;
    styles: (...sheets: CSSStyleSheet[]) => void;
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

declare type SubmitEvent_2<T> = CustomEvent & {
    detail: T;
};

declare namespace Switch {
    export {
        Switch_2 as Switch,
        Switch_2 as Element,
        RouteParams as Params,
        SwitchRoute as Route
    }
}
export { Switch }

declare class Switch_2 extends LitElement {
    _cases: Case[];
    _historyObserver: Observer<History_2.Model>;
    _authObserver: Observer<Auth.Model>;
    _user?: Auth.User;
    _fallback: RouteView;
    _match?: Match;
    constructor(routes: SwitchRoute[], historyContext: string, authContext?: string);
    connectedCallback(): void;
    render(): TemplateResult<1>;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    static styles: CSSResult;
    matchRoute(location: Location): Match | undefined;
    redirect(href: string): void;
}

declare interface SwitchPath {
    path: string;
}

declare type SwitchRoute = SwitchPath & (ViewCase | RedirectCase);

declare function tokenPayload(user: APIUser | AuthenticatedUser): object;

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
    _pending: Array<[EventTarget, CustomEvent]>;
    get model(): M;
    constructor(context: string);
    connectedCallback(): void;
    dispatchMessage(msg: Msg, target?: HTMLElement): void;
    ref<T>(key: keyof M): T | undefined;
}

declare interface ViewCase {
    view: RouteView;
    auth?: "public" | "protected";
}

export { }
