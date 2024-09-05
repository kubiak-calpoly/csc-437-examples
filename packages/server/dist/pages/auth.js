"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_exports = {};
__export(auth_exports, {
  LoginPage: () => LoginPage,
  RegistrationPage: () => RegistrationPage
});
module.exports = __toCommonJS(auth_exports);
const staticParts = {
  styles: [
    `
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

      login-form, registration-form {
        grid-area: fm;
      }

      p.register, p.login {
        display: block;
        grid-area: rq;
        text-align: center;
      }
    `
  ]
};
class LoginPage {
  static render() {
    return __spreadProps(__spreadValues({}, staticParts), {
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
      body: `<body>
        <mu-auth provides="blazing:auth">
          <article>
            <blz-header> </blz-header>
            <main class="page">
              <login-form api="/auth/login">
                <h3 slot="title">Sign in and go places!</h3>
              </login-form>
              <p class="register">
                Or did you want to
                <a href="./register"> register as a new user </a>?
              </p>
            </main>
          </article>
        </mu-auth>
      </body> `
    });
  }
}
class RegistrationPage {
  static render() {
    return __spreadProps(__spreadValues({}, staticParts), {
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
      body: `<body>
        <mu-auth provides="blazing:auth">
          <article>
            <blz-header> </blz-header>
            <main class="page">
              <registration-form api="/auth/register">
                <h3 slot="title">Sign up to plan your next trip!</h3>
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
