# Examples for CSC 437

> _NOTE:_ The `main` branch of this repo is a work in progress
> as I am refactoring the exercises from last quarter.
>
> If you are enrolled in CSC 437 in the Spring of 2024, I
> suggest you follow the module-by-module links below to make
> sure you are looking at the proper branch.

This repo contains the code for an the app, Blazing Travel, used
as an example of a client-rendered web app for CSC 437.

The example proceeds in stages the following stages, each of
which is developed as a separate workspace in this monorepo:

- [Prototype](packages/proto/README.md) uses only HTML/CSS
  static files.
- [Server](packages/server/README.md) adds a backend API and
  communication with a database.
- [App](packages/app/README.md) adds routing and state
  management to the frontend, making it a single-page app.
- [Mustang](packages/mustang/README.md) is a lightweight
  frontend framework which we use to demonstrate what frameworks
  do and how they can improve developer experience.

Each module (week) of the course builds on the previous ones. In
this repo, there is a branch for each module so we can track the
progress:

- [Module 1](https://github.com/kubiak-calpoly/csc-437-examples/tree/mod-1):
  Information Architecture and HTML
- [Module 2](https://github.com/kubiak-calpoly/csc-437-examples/tree/mod-2):
  Styling and Layout with CSS
- [Module 3](https://github.com/kubiak-calpoly/csc-437-examples/tree/mod-3):
  Adding Interactions with Javascript
- [Module 4](https://github.com/kubiak-calpoly/csc-437-examples/tree/mod-4):
  MVC Architecture
- [Module 5](https://github.com/kubiak-calpoly/csc-437-examples/tree/mod-5):
  Client-Server Communication with REST
- [Module 6](https://github.com/kubiak-calpoly/csc-437-examples/tree/mod-6):
  Security and Handling Large Files
