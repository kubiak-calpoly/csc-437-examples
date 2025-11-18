# The Store

In MVU, all client-side state required to rendered every view is colocated in the _store_. 
This state is the app's _model_, and in TypeScript, we define
an interface `Model` to describe the model.
Our views will have access to the model and be able to react
to updates made to the model.
However, views may not mutate the model directly (it is 
an immutable data structure); instead they can only dispatch
_messages_ which the store then processes by invoking an _update_ function.
We can also define a type `Msg` which describes the set of 
all possible messages which the store is prepared to accept.

Mustang provides a generic custom element (typically defined
as `mu-store`) which provides access to the model and also
listens for messages (custom events) coming from lower in 
the DOM.

## `Store.Provider<Model, Msg>`

To use `mu-store` in your app, you must specialize Mustang's
`Store.Provider`, and provide the following:

- the `Model` type, defining the data stored in the store
- the `Msg` type, defining the set of all possible messages
- the `update` function, which takes a message and maps a current state to the next state
- the `init`ial state of the store, which must be of type `Model`
- the context key for your `mu-auth` provider

> Since the store manages interactions with the server, it needs
> access to the auth provider. That means that `<mu-auth>` must
> be above `<mu-store>` in the DOM. The context key used to initialize
> `Store.Provider` must match the `provides=` attribute of `<mu-auth>`.

### Usage

In a single-page app, the `<mu-store>` element is instantiated in 
the `index.html`. Typical usage with `<mu-auth>` and `<mu-switch>`
is as follows:

```html
<body>
  <mu-history provides="my:history">
    <mu-auth provides="my:auth">
      <mu-store provides="my:model">
        <!-- page content here -->
        <mu-switch></mu-switch>
      </mu-store>
    </mu-auth>
  </mu-history>
</body>
```

The `provides=` attribute identifies the store and allows
it to be accessed from views, including any views rendered
as a result of client-side routing.

### Extending `Store.Provider`

To define the custom element class for `mu-store`, you
must extend `Store.Provider`, provide the required type
arguments, and define the constructor.

```ts
import { define, Store } from "@calpoly/mustang";
import { Msg } from "./messages";
import { init, Model } from "./model";
import update from "./update";

class MyStore extends Store.Provider<Model,Msg> {
    constructor() {
      super(update, init, "my:auth");
    }
  }
  
  define({
    "mu-store": MyStore,
    // other definitions, e.g., mu-switch, mu-auth, etc
  })
```

### `Model` type

The type `Model` describes all the state needed to render every
view of your app. The `Model` type must extend `object`; 
it is usually described as an `interface`, 
where each property is uses by one or more views.
The store will maintain a single copy of this 
model and make it available to all views as `this.model`.

Along with the `Model` type, you must define the initial state
of the store, which will be a type `Model`.

> It is common to make all properties of `Model` optional,
> in which case `init: Model = {}` is an acceptable initial
> state

We will need to refer to the `Model` type from our views also,
so it should be defined in its own file.

### `Msg` type

Message dispatch in Mustang is implemented using custom events
where the `detail` field is an array. The array contains

- A `command` string
- A `payload` object (optional)
- A `callbacks` object (optional)

The type of the payload object varies, depending on the command.
The type of each message can therefore be defined in TypeScript
in such a way that the payload is type-safe:

```ts
type M1 = ["profile/request", {userid: string}];
```

The `Msg` type itself will be a union of the types of all
possible messages.

```ts
type Msg =
  | ["profile/request", {userid: string}]
  | ["profile/save", {userid: string, profile: Profile}]
  // etc for all messages used in the app
  ;
```

Mustang provides a type `Message.Base` which constrains the
implementation of messages to follow this array format.
In order to use a `Msg` type with `Store.Provider`, it
must extend the `Message.Base` type. (You don't need to 
reference `Message.Base`, but TypeScript will give you
an error if your `Msg` is not in conformance.)

### `update` function

The last element that must be provided in order to 
initialize `<mu-store>` is the `update` function.
The store listens for messages dispatched by views.
For each message, it calls `update`, passing it the message.
The purpose of `update` is to accept a message and 
compute the next state of the store. 

```ts
import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [command, payload, callbacks] = message;

  switch(command) {
    // implementation of each message case...
  }
  
  return model; // no change
}
```

This formulation of `update` allows for both synchronous
and asynchronous actions. If the next model state can
be computed synchronously, it should be returned from 
`update`. 

To defer a model update until after some asynchronous
action (such as `fetch`ing data from an API), you must
return one or more promises which resolve to messages. 
The type `ThenUpdate<Model,Msg>` describes this option:

```ts
type ThenUpdate<Model, Msg extends Message.Base> =
  [
    now: Model,
    ...later: Array<Promise<Msg | Message.None>>
  ]
```

The first entry in the array is the next model state,
which is applied synchronously. This can be used, for 
example, to invalidate old data and indicate that a new
API request is pending.

The remaining entries in the array are all promises that
resolve to a message type `Msg`. (`type Message.None = []`
can be used to cancel sending an asynchronous message.)
As each promise is resolved, the store
calls `update` with the message and the then-current model state to 
perform the update.

> This formulation of the update function guarantees that each
> state has exactly one successor state.
> Updates are handled sequentially, so that none of the resulting
> state transitions are wiped out by later updates.
