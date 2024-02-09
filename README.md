# Examples for CSC 437

This repo contains the app, Blazing Travel, used as an example of
a client-rendered web app for CSC 437 (Winter 437).

The example proceeds in stages the following stages, each of which
is developed as a separate workspace in this monorepo:

- [Prototype](packages/proto/README.md) uses only HTML/CSS static files.
- Lit-Frontend adds interactivity using HTML custom elements codes in Typescript with Lit. Vite is used to transpile Typescript to JS.
- MVC adds a backend API and communication with a database.
- MVU adds routing and state management to the frontend, making t a single-page app.

Each module (week) of the course builds on the previous ones.
In this repo, there is a branch for each module so we can track
the progress:

- [Module 1](https://github.com/kubiak-calpoly/csc-437-examples/tree/mod-1): Information Architecture and HTML
