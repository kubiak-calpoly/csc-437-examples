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

      login-form {
        grid-area: fm;
      }

      p.register {
        display: block;
        grid-area: rq;
        text-align: center;
      }
    `
  ],
  scripts: [
    `
    import { define, Auth } from "@calpoly/mustang";
    import { LoginForm } from "/scripts/login-form.js";

    define({
      "mu-auth": Auth.Provider,
      "login-form": LoginForm
    })
    `
  ]
};

export class LoginPage {
  static render() {
    return {
      ...staticParts,
      body: `<body>
        <mu-auth provides="blazing:auth">
          <article>
          <blz-header> </blz-header>
          <main class="page">
            <login-form api="/auth/login">
              <h3 slot="title">Sign in and Go Places!</h3>
            </login-form>
            <p class="register">
              Or did you want to
              <a href="./register"> register as a new user </a>?
            </p>
          </main>
          </article>
        </mu-auth>
      </body> `
    };
  }
}

export class RegistrationPage { }
