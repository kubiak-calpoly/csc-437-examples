"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_exports = {};
__export(auth_exports, {
  LoginPage: () => LoginPage,
  RegistrationPage: () => RegistrationPage
});
module.exports = __toCommonJS(auth_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
const styles = [
  import_server.css`
    article {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main.page {
      --page-grids: 8;
      grid-template-areas:
        "-- -- -- -- -- -- -- --"
        "-1 -1 fm fm fm fm -2 -2"
        "-1 -1 rq rq rq rq -2 -2";
      grid-template-rows: 1fr auto 1fr;
      flex-basis: 100%;
    }

    login-form,
    registration-form {
      grid-area: fm;
    }

    p.register,
    p.login {
      display: block;
      grid-area: rq;
      text-align: center;
    }
  `
];
class LoginPage {
  render() {
    return (0, import_renderPage.default)({
      styles,
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { LoginForm } from "/scripts/login-form.js";

        define({
          "mu-auth": Auth.Provider,
          "login-form": LoginForm
        })
        `
      ],
      body: import_server.html`<body>
        <mu-auth provides="blazing:auth">
          <article>
            <blz-header> </blz-header>
            <main class="page">
              <login-form api="/auth/login">
                <h3 slot="title">Sign in and go places!</h3>
              </login-form>
              <p class="register">
                Or did you want to
                <a href="./register"> register as a new user </a
                >?
              </p>
            </main>
          </article>
        </mu-auth>
      </body> `
    });
  }
}
class RegistrationPage {
  render() {
    return (0, import_renderPage.default)({
      styles,
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { RegistrationForm } from "/scripts/registration-form.js";

        define({
          "mu-auth": Auth.Provider,
          "registration-form": RegistrationForm
        })
        `
      ],
      body: import_server.html`<body>
        <mu-auth provides="blazing:auth">
          <article>
            <blz-header> </blz-header>
            <main class="page">
              <registration-form api="/auth/register">
                <h3 slot="title"
                  >Sign up to plan your next trip!</h3
                >
              </registration-form>
              <p class="login">
                Already signed up? You can
                <a href="./login">log in</a> instead.
              </p>
            </main>
          </article>
        </mu-auth>
      </body> `
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginPage,
  RegistrationPage
});
