import{i as v,O as U,d as C,a as L,e as _,x as a,r as f,h as z,b as m,c as k,n as c,f as N}from"./state-aM5ZerEX.js";var R=Object.defineProperty,A=(r,s,e,i)=>{for(var n=void 0,o=r.length-1,t;o>=0;o--)(t=r[o])&&(n=t(s,e,n)||n);return n&&R(s,e,n),n};const b=class b extends v{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new U(this,"blazing:auth")}render(){return a`
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
                  @change=${s=>{var e;return _.relay(s,"dark-mode",{checked:(e=s.target)==null?void 0:e.checked})}}
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
      </template>`}renderSignOutButton(){return a`
      <button
        @click=${s=>{_.relay(s,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return a`
      <a href="/login.html">
        Sign In…
      </a>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(s=>{const{user:e}=s;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function s(e,i){e==null||e.classList.toggle("dark-mode",i)}document.body.addEventListener("dark-mode",e=>s(e.currentTarget,e.detail.checked))}};b.uses=C({"mu-dropdown":L.Element}),b.styles=[f.styles,z.styles,m`
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
  `];let u=b;A([k()],u.prototype,"loggedIn");A([k()],u.prototype,"userid");const q=m`
  svg.icon {
    --size-icon: var(--size-icon-normal);

    display: inline-block;
    height: var(--size-icon);
    width: var(--size-icon);
    vertical-align: calc(0.5em - 0.5 * var(--size-icon));
    fill: currentColor;
  }
`,G={styles:q};var K=Object.defineProperty,w=(r,s,e,i)=>{for(var n=void 0,o=r.length-1,t;o>=0;o--)(t=r[o])&&(n=t(s,e,n)||n);return n&&K(s,e,n),n};const S=class S extends v{constructor(){super(...arguments),this.mode="unknown"}render(){const e={air:"icon-airplane",rail:"icon-train",unknown:"icon-unknown"}[this.mode];return a`
      <h3>
        <slot name="from">FCO</slot>
        <svg class="icon">
          <use
            href="/icons/transportation.svg#${e}" />
        </svg>
        <slot name="to">SFO</slot>
        <slot name="via"></slot>
      </h3>
      <slot></slot>
    `}};S.styles=[f.styles,G.styles,z.styles,m`
    :host {
      display: contents;
    }
    h3 {
      color: var(--color-accent);

    grid-column: header / -1;
    font-weight: var(--font-weight-bold);

    slot[name="from"]::after {
      content: " →";
    }
    slot[name="to"]::before {
      content: "→ ";
    }
    slot[name="via"]:has-slotted {
      font-style: italic;
      &::before {
        content: "(via ";
      }
      &::after {
        content: ")";
      }
    }
  }
    `];let $=S;w([c()],$.prototype,"mode");const T=class T extends v{render(){return a`
      <details>
        <summary>
          <slot name="carrier"></slot>
          <slot name="number"></slot>
        </summary>
        <dl>
          <dt>Depart</dt>
          <dd>
            <slot name="departure">Place and Time</slot>
          </dd>
          <dt>Arrive</dt>
          <dd>
            <slot name="arrival">Place and Time</slot>
          </dd>
        </dl>
      </details>
    `}};T.styles=[f.styles,m`
      :host {
        display: contents;
      }
      details {
        display: contents;

        summary {
          grid-column: header / span 2;
        }
      }
      dl {
        display: grid;
        grid-column: span 4 / -1;
        grid-template-columns: subgrid;
      }
      dt {
        font-family: var(--font-family-display);
        font-weight: var(--font-weight-bold);
      }
      dd {
        display: contents;
      }
    `];let x=T;const M=class M extends v{constructor(){super(...arguments),this.localtime="1970-01-01",this.tz="+0000"}render(){const s=new Date(this.localtime),e=s.getHours(),i=s.getMinutes(),n=e<12?"AM":"PM",o=(e>12?e-12:e||12).toString().padStart(2,"0"),t=i.toString().padStart(2,"0"),l=a`
      <span>${o}:${t} ${n}</span>
      <small>${this.tz}</small>
    `,y=this.code?a`<span>(${this.code})</span>`:"";return a`
      <span class="place">
        <slot></slot>${y}
      </span>
      <time datetime="${this.localtime}${this.tz}">
        ${l}
      </time>
    `}};M.styles=[f.styles,m`
    :host {
      display: contents;
    }
    .place {
      grid-column-end: span 2;
    }
    time {
      grid-column-end: -1;
      text-align: right;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    `];let h=M;w([c()],h.prototype,"localtime");w([c()],h.prototype,"tz");w([c()],h.prototype,"code");var Q=Object.defineProperty,O=(r,s,e,i)=>{for(var n=void 0,o=r.length-1,t;o>=0;o--)(t=r[o])&&(n=t(s,e,n)||n);return n&&Q(s,e,n),n};const P=class P extends v{render(){return a`
      <header
        style="background-image: url(${this.imgSrc});)"
      >
        <a href="${this.href}">
          <h3><slot>Destination</slot></h3>
        </a>
        <p>${this.nights} nights</p>
      </header>
    `}};P.styles=[f.styles,z.styles,m`
      :host {
        display: contents;
      }
      header {
        aspect-ratio: 16/9;
        padding: var(--size-spacing-medium);
        background-size: cover;
        grid-column: header / span 5;
        color: var(--color-text-inverted);
        text-align: right;
        text-shadow: var(--shadow-medium);

        h3 {
          color: currentColor;
        }
    
        a[href] {
          color: currentColor;
        }
      }
    `];let p=P;O([c({attribute:"img-src"})],p.prototype,"imgSrc");O([c()],p.prototype,"href");O([c()],p.prototype,"nights");var V=Object.defineProperty,I=(r,s,e,i)=>{for(var n=void 0,o=r.length-1,t;o>=0;o--)(t=r[o])&&(n=t(s,e,n)||n);return n&&V(s,e,n),n};const D=class D extends v{constructor(){super(...arguments),this.destinations=[],this.transportations=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){console.log("Destinations",this.destinations);const s=this.destinations.length,e=this.destinations.map(t=>({startDate:t.startDate,endDate:t.endDate,html:a`
            <blz-destination
              img-src=${t.featuredImage}
              href=${t.link}
              nights=${W(t.startDate,t.endDate)}
            >
              ${t.name}
            </blz-destination>`})),n=this.transportations.map(t=>{const l=t.segments.length,y=a`
            <span slot="from">
              ${t.routing?t.routing[0]:t.segments[0].departure.name}
            </span>
          `,F=a`
            <span slot="to">
              ${t.routing?t.routing[l]:t.segments[l-1].arrival.name}
            </span>
          `,H=l>1&&t.routing?a`
              <span slot="via">${t.routing[1]}</span>
            `:"",J=t.segments.map(d=>a`
                <transportation-segment>
                  <span slot="carrier">${d.carrier}</span>
                  <span slot="number">${d.number}</span>
                  <end-point 
                    slot="departure"
                    localtime=${d.departure.localtime}
                    tz=${d.departure.tz}
                    code=${d.departure.code}
                  >
                    ${d.departure.name}
                  </end-point>
                  <end-point 
                    slot="arrival" 
                    localtime=${d.arrival.localtime} 
                    tz=${d.arrival.tz}
                    code=${d.arrival.code}
                  >
                    ${d.arrival.name}
                  </end-point>
                </transportation-segment>
                `);return{startDate:t.startDate,endDate:t.endDate,html:a`
            <blz-transportation mode=${t.mode}>
              ${y} ${F} ${H}
              ${J}
            </blz-transportation>
          `}}).flatMap((t,l)=>l<s?[t,e[l]]:[t]),o=t=>{const l=a`                
        <time datetime=${t.startDate}>
          ${B(t.startDate)}
        </time>`;if(!t.endDate)return l;const y=a`
        <time datetime=${t.endDate}>
          ${B(t.endDate)}
        </time>`;return a`${l}${y}`};return a`
      <section>
        <h2>Itinerary</h2>
        <dl>
          ${n.map(t=>a`
              <dt>${o(t)}</dt>
              <dd>${t.html}</dd>
            `)}
        </dl>
      </section>
    `}hydrate(s){fetch(s).then(e=>e.json()).then(e=>{if(e){const i=e;this.destinations=i.destinations.map(j),this.transportations=i.transportations.map(j)}})}};D.uses=C({"blz-destination":p,"blz-transportation":$,"transportation-segment":x,"end-point":h}),D.styles=[f.styles,z.styles,m`
    :host {
      display: contents;
    }
    section {
      display: grid;
      grid-area: var(--grid-area);
      grid-template-columns: subgrid [start] [header] [] [] [highlights] [] [end];
      gap: var(--size-spacing-medium);
      align-items: baseline;
      margin: var(--size-spacing-small);

      > dl {
        display: contents;
        > dt {
          grid-column: start;
          text-align: right;
          font-family: var(--font-family-display);
          font-weight: var(--font-weight-bold);
        }
        > dd {
          display: grid;
          grid-template-columns: subgrid;
          grid-column: header / end;
        }
      }
      
      time + time::before {
        content: "–";
      }
    }
  `];let g=D;I([c()],g.prototype,"src");I([k()],g.prototype,"destinations");I([k()],g.prototype,"transportations");function W(r,s){const e=s.getTime()-r.getTime();return Math.ceil(e/1e3/3600/24)}function j(r){const s=r,e=s.startDate?new Date(s.startDate):void 0,i=s.endDate?new Date(s.endDate):void 0;return{...r,startDate:e,endDate:i}}const X=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function B(r){const s=X[r.getUTCMonth()];return`${r.getUTCDate()} ${s}`}C({"blz-header":u,"blz-itinerary":g,"mu-auth":N.Provider});u.initializeOnce();
