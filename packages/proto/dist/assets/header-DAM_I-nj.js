import{i as g,O as m,d as p,e as v,f as u,x as i,r as b,h as f,a as k,b as c}from"./state-DerlYqys.js";var y=Object.defineProperty,h=(o,t,e,d)=>{for(var r=void 0,a=o.length-1,l;a>=0;a--)(l=o[a])&&(r=l(t,e,r)||r);return r&&y(t,e,r),r};const s=class s extends g{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new m(this,"blazing:auth")}render(){return i`
      <header>
        <h1>Blazing Travels</h1>
        <nav>
          <p>
            <slot> Unnamed Tour</slot>
          </p>
          <mu-dropdown>
            <a slot="actuator">
              Hello, ${this.userid||"traveler"}
            </a>
            <menu>
              <li>
                <label class="dark-mode-switch" 
                  @change=${t=>{var e;return u.relay(t,"dark-mode",{checked:(e=t.target)==null?void 0:e.checked})}}
                >
                <input type="checkbox" />
                Dark Mode
                </label>
              </li>
              <li>
                ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
              </li>
            </menu>
          </mu-dropdown>
        </nav>
      </header>
      </template>`}renderSignOutButton(){return i`
      <button
        @click=${t=>{u.relay(t,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return i`
      <a href="/login.html">
        Sign In…
      </a>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:e}=t;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function t(e,d){e==null||e.classList.toggle("dark-mode",d)}document.body.addEventListener("dark-mode",e=>t(e.currentTarget,e.detail.checked))}};s.uses=p({"mu-dropdown":v.Element}),s.styles=[b.styles,f.styles,k`
    :host {
      display: contents;
    }
    header {
      --color-link: var(--color-link-inverted);

      display: flex;
      flex-wrap: wrap;
      align-items: bottom;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
  `];let n=s;h([c()],n.prototype,"loggedIn");h([c()],n.prototype,"userid");export{n as H};
