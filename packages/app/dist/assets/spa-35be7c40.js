import{u as B,f as H,d as _,i as f,s as b,O as Y,x as s,D as W,e as M,a as x,V as A,h as G,b as K,_ as Q}from"./lit-element-f95d858a.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:H},Z=(n=X,t,e)=>{const{kind:r,metadata:a}=e;let i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),i.set(e.name,n),r==="accessor"){const{name:o}=e;return{set(c){const p=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,p,n)},init(c){return c!==void 0&&this.P(o,void 0,n),c}}}if(r==="setter"){const{name:o}=e;return function(c){const p=this[o];t.call(this,c),this.requestUpdate(o,p,n)}}throw Error("Unsupported decorator location: "+r)};function l(n){return(t,e)=>typeof e=="object"?Z(n,t,e):((r,a,i)=>{const o=a.hasOwnProperty(i);return a.constructor.createProperty(i,o?{...r,wrapped:!0}:r),o?Object.getOwnPropertyDescriptor(a,i):void 0})(n,t,e)}var V=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,et=(n,t,e,r)=>{for(var a=r>1?void 0:r?tt(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(a=(r?o(t,e,a):o(a))||a);return r&&a&&V(t,e,a),a};class z extends b{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new Y(this,"blazing:auth")}render(){return s`<header>
      <h1>Blazing Travels</h1>
      <drop-down>
        <a href="#" slot="actuator">
          <slot name="greeting"
            >Hello, ${this.username}</slot
          ></a
        >
        <ul>
          <li>
            <label @change=${rt}>
              <input type="checkbox" autocomplete="off" />
              Dark mode
            </label>
          </li>
          <li>
            <a href="#" @click=${at}> Sign out </a>
          </li>
        </ul>
      </drop-down>
    </header> `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this.username=t.username)})}}z.uses=_({"drop-down":W});z.styles=f`
    :host {
      display: contents;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    header {
      grid-column: start / end;
      margin: 0 calc(-0.5 * var(--page-grid-gap));
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      /* flex-wrap: wrap;
        gap: var(--size-spacing-xlarge); */
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header a[href] {
      color: var(--color-link-inverted);
    }
    h1 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-xxlarge);
      font-style: oblique;
      line-height: 1;
      font-weight: var(--font-weight-bold);
    }
    ul {
      list-style: none;
      padding: var(--size-spacing-medium);
    }
  `;et([l()],z.prototype,"username",2);function rt(n){const e=n.target.checked;M.relay(n,"dark-mode",{checked:e})}function at(n){M.relay(n,"auth:message",["auth/signout"])}const nt={},it=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],U=n=>{const t=(typeof n=="string"?new Date(n):n)||new Date,e=it[t.getUTCMonth()];return`${t.getUTCDate()} ${e}`};function j(n){const t=new Date(Date.parse(n)),e=t.getUTCDate(),r=t.getUTCMonth(),a=t.getUTCFullYear();return new Date(Date.UTC(a,r,e))}function S(n){const t=n;let e=n;return e.startDate=j(t.startDate),e.endDate=j(t.endDate),e}function ot(n,t,e){switch(n[0]){case"profile/save":st(n[1],e).then(a=>t(i=>({...i,profile:a})));break;case"profile/select":lt(n[1],e).then(a=>t(i=>({...i,profile:a})));break;case"tour/select":dt(n[1],e).then(a=>t(i=>({...i,tour:a})));break;default:const r=n[0];throw new Error(`Unhandled Auth message "${r}"`)}}function st(n,t){return fetch(`/api/profiles/${n.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...x.headers(t)},body:JSON.stringify(n.profile)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return e})}function lt(n,t){return fetch(`/api/profiles/${n.userid}`,{headers:x.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}function dt(n,t){return fetch(`/api/tours/${n.tourid}`,{headers:x.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e){console.log("Tour:",e);let r=S(e);return r.destinations=r.destinations.map(S),r}})}var ct=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,C=(n,t,e,r)=>{for(var a=r>1?void 0:r?ut(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(a=(r?o(t,e,a):o(a))||a);return r&&a&&ct(t,e,a),a};class I extends b{render(){return s`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button class="new">New…</button>
          <button class="edit">Edit</button>
          <button class="close">Close</button>
          <button class="delete">Delete</button>
        </nav>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
          <dt>Nickname</dt>
          <dd><slot name="nickname"></slot></dd>
          <dt>Home City</dt>
          <dd><slot name="home"></slot></dd>
          <dt>Airports</dt>
          <dd><slot name="airports"></slot></dd>
        </dl>
      </section>
    `}}I.styles=f`
    :host {
      --display-new-button: inline-block;
      --display-edit-button: inline-block;
      --display-close-button: none;
      --display-delete-button: none;
    }
    :host([mode="edit"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
      --display-delete-button: inline-block;
    }
    :host([mode="new"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
    }
    h1 {
      grid-row: 4;
      grid-column: value;
    }
    slot[name="avatar"] {
      display: block;
      grid-row: 1 / span 4;
    }
    nav {
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
    nav > .new {
      display: var(--display-new-button);
    }
    nav > .edit {
      display: var(--display-edit-button);
    }
    nav > .close {
      display: var(--display-close-button);
    }
    nav > .delete {
      display: var(--display-delete-button);
    }
    restful-form {
      display: none;
      grid-column: key / end;
    }
    restful-form input {
      grid-column: input;
    }
    restful-form[src] {
      display: block;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    restful-form[src] + dl {
      display: none;
    }
    dt {
      grid-column: key;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: value;
    }
    ::slotted(ul) {
      list-style: none;
      display: flex;
      gap: var(--size-spacing-medium);
    }
  `;class P extends b{constructor(){super(...arguments),this.color="white"}render(){return s`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      "></div>
    `}}P.styles=f`
    :host {
      display: contents;
      --avatar-backgroundColor: var(--color-accent);
      --avatar-size: 100px;
    }
    .avatar {
      grid-column: key;
      justify-self: end;
      position: relative;
      width: var(--avatar-size);
      aspect-ratio: 1;
      background-color: var(--avatar-backgroundColor);
      background-size: cover;
      border-radius: 50%;
      text-align: center;
      line-height: var(--avatar-size);
      font-size: calc(0.66 * var(--avatar-size));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
  `;C([l()],P.prototype,"color",2);C([l()],P.prototype,"src",2);class k extends A{constructor(){super("blazing:model"),this.userid=""}get profile(){return this.model.profile}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="user-id"&&e!==r&&r&&(console.log("Profiler Page:",r),this.dispatchMessage(["profile/select",{userid:r}]))}render(){const{color:t,avatar:e,name:r,userid:a,nickname:i,home:o,airports:c=[]}=this.profile||{},p=c.map(g=>s`
          <li>${g}</li>
        `);return s`
      <profile-viewer>
        <profile-avatar
          slot="avatar"
          color=${t}
          src=${e}></profile-avatar>
        <span slot="name">${r}</span>
        <span slot="userid">${a}</span>
        <span slot="nickname">${i}</span>
        <span slot="home">${o}</span>
        <ul slot="airports">
          ${p}
        </ul>
      </profile-viewer>
    `}}k.uses=_({"profile-viewer":I,"profile-avatar":P});C([l({attribute:"user-id",reflect:!0})],k.prototype,"userid",2);C([l()],k.prototype,"profile",1);var pt=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,N=(n,t,e,r)=>{for(var a=r>1?void 0:r?ht(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(a=(r?o(t,e,a):o(a))||a);return r&&a&&pt(t,e,a),a};class O extends b{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(t){const e=new CustomEvent("calendar-widget:select",{bubbles:!0,composed:!0,detail:{date:t&&j(t)}});this.dispatchEvent(e)}_handleClear(){var r;const t=(r=this.shadowRoot)==null?void 0:r.querySelector("input:checked");t&&(t.checked=!1);const e=new CustomEvent("calendar-widget:clear",{bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){const t=new Date(this.startDate),e=new Date(this.endDate),r=gt(t,e),a=i=>{const o={d:i.getUTCDate(),m:i.getUTCMonth()+1,y:i.getUTCFullYear(),day:i.getUTCDay()},c=({y:p,m:g,d:w})=>[p,g,w].join("-");return s`
        <label style="grid-column: ${o.day+1}">
          <span>${o.d}</span>
          <input
            type="radio"
            name="cal"
            value="${c(o)}" />
        </label>
      `};return s`
      <section>
        <fieldset
          @change="${i=>{const o=i.target;this._handleChange(o.value)}}">
          <h6>Su</h6>
          <h6>Mo</h6>
          <h6>Tu</h6>
          <h6>We</h6>
          <h6>Th</h6>
          <h6>Fr</h6>
          <h6>Sa</h6>
          ${r.map(a)}
        </fieldset>
        <button
          id="clear"
          @click="${()=>this._handleClear()}">
          Clear Selection
        </button>
      </section>
    `}}O.styles=f`
    * {
      margin: 0;
      box-sizing: border-box;
    }

    fieldset {
      display: grid;
      grid-template-columns: repeat(7, 2rem);
      gap: var(--size-spacing-small);
      justify-content: center;
      justify-items: streth;
      border: 0;
      padding: 0;
    }

    h6 {
      text-align: center;
    }

    label {
      position: relative;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      padding: var(--size-spacing-small);
      white-space: nowrap;
      text-align: center;
      background-color: var(--color-background-control);
      border: var(--line-weight-fine) solid var(--color-accent);
      color: var(--color-text-control);
      font-size: var(--size-type-small);
      z-index: 0;
    }

    input {
      appearance: none;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }

    input:checked {
      background: var(--color-accent);
    }

    label:has(input:checked) {
      background-color: var(--color-accent);
      color: var(--color-text-control-inverted);
    }

    button {
      display: block;
      margin: 0 auto;
    }
  `;N([l({attribute:"start-date",type:Date})],O.prototype,"startDate",2);N([l({attribute:"end-date",type:Date})],O.prototype,"endDate",2);function gt(n,t){const e=t?t.getTime():n.getTime();let r=[],a=new Date(n);for(;a.getTime()<=e;)r.push(new Date(a)),a.setUTCDate(a.getUTCDate()+1);return r}var mt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,J=(n,t,e,r)=>{for(var a=r>1?void 0:r?ft(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(a=(r?o(t,e,a):o(a))||a);return r&&a&&mt(t,e,a),a};class T extends b{get entourage(){return this.using||{}}render(){const{name:t,people:e}=this.entourage,r=e||[],a=this.href?s`
          <a href=${this.href}>Chat Now...</a>
        `:"",i=o=>{const{userid:c,avatar:p,name:g="** NO NAME **",nickname:w,color:$}=o,u=p?s`
            <img src="${p}" />
          `:(w||g).slice(0,1),d=$?`style="--color-avatar-bg: ${$}"`:"";return s`
        <tr>
          <td>
            <span class="avatar" ${d}>
              ${u}
            </span>
          </td>
          <td class="name">
            <a href="/app/profile/${c}">${g}</a>
          </td>
        </tr>
      `};return s`
      <section>
        <h3>${t||"Entourage"}</h3>
        ${a}
        <table>
          <tbody>${r.map(i)}</tbody>
        </table>
      </section>
    `}}T.styles=f`
    :host {
      --color-avatar-bg: var(--color-accent);
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    table {
      width: 100%;
    }
    thead {
      font-size: var(--size-font-min);
    }
    th,
    td {
      padding: 0 var(--size-spacing-small);
      vertical-align: middle;
    }
    .avatar {
      display: inline-block;
      position: relative;
      width: var(--size-icon-medium);
      aspect-ratio: 1;
      background-color: var(--color-avatar-bg);
      border-radius: 50%;
      text-align: center;
      font-size: calc(0.66 * var(--size-icon-medium));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
    .name {
      width: 100%;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
    a[href] {
      font: inherit;
      color: inherit;
    }
    img {
      width: 100%;
    }
  `;J([l({attribute:!1})],T.prototype,"using",2);J([l()],T.prototype,"href",2);var vt=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,y=(n,t,e,r)=>{for(var a=r>1?void 0:r?bt(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(a=(r?o(t,e,a):o(a))||a);return r&&a&&vt(t,e,a),a};class v extends b{constructor(){super(...arguments),this.startDate="1970-01-01",this.hidden=!1,this._calendar_widget_select=t=>{},this._calendar_widget_clear=t=>{}}render(){const t=this.renderItem();return s`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${U(this.startDate)}
        </time>
        ${this.endDate?s`
              <time datetime=${this.endDate}>
                ${U(this.endDate)}
              </time>
            `:null}
      </span>
      ${t}
    `}renderItem(){return s`
      <slot></slot>
    `}connectedCallback(){const t=r=>{const i=r.detail.date;i<new Date(this.startDate)||i>new Date(this.endDate||this.startDate)?this.setAttribute("hidden","hidden"):this.removeAttribute("hidden")},e=r=>{this.removeAttribute("hidden")};document.addEventListener("calendar-widget:select",this._calendar_widget_select=t),document.addEventListener("calendar-widget:clear",this._calendar_widget_clear=e),super.connectedCallback()}disconnectedCallback(){document.removeEventListener("calendar-widget:select",this._calendar_widget_select),document.removeEventListener("calendar-widget:clear",this._calendar_widget_clear),super.disconnectedCallback()}}v.styles=f`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    :host(*) {
      display: contents;
    }
    :host([hidden]) {
      display: none;
    }
    #dates {
      display: flex;
      grid-column: 1;
      place-self: stretch;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      font-size: var(--size-type-small);
      font-family: var(--font-family-display);
      border-bottom: var(--line-weight-superfine) solid
        var(--color-accent);
    }
    #dates time {
      white-space: nowrap;
    }
    #dates time:first-child {
      font-weight: var(--font-weight-bold);
    }
    #dates time + time {
      visibility: hidden;
    }
    .destination {
      grid-column: 2/-1;
      background: var(--color-background-card);
      border-radius: var(--size-corner-medium);
      aspect-ratio: 16/9;
      background-size: cover;
      background-position: left 25%;
    }
    .transportation {
      display: grid;
      grid-column: 2/-1;
      grid-template-columns: subgrid;
      place-items: center;
    }
    .transportation > h3 {
      display: contents;
      font-size: var(--size-type-mlarge);
      font-style: oblique;
    }
    .destination > h3 {
      padding: 0 var(--size-spacing-medium);
    }
    .destination[style] > h3 {
      color: var(--color-text-inverted);
      text-decoration: none;
      font-weight: var(--font-weight-bold;);
      text-shadow: var(--shadow-dropdown);
      text-align: right;
    }
    .transportation > h3 > :first-child {
      justify-self: end;
    }
    .transportation > h3 > :last-child {
      justify-self: start;
    }
    ::slotted([slot="via"]) {
      font-weight: var(--font-weight-light);
      font-style: normal;
      font-size: 75%;
    }
    ::slotted([slot="via"])::before {
      display: inline;
      content: "via ";
    }
    h3 {
      font-family: var(--font-family-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      color: var(--color-accent);
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
    }
  `;y([l({attribute:"start-date"})],v.prototype,"startDate",2);y([l({attribute:"end-date"})],v.prototype,"endDate",2);y([l()],v.prototype,"href",2);y([l({reflect:!0,type:Boolean})],v.prototype,"hidden",2);class F extends v{renderItem(){const t=s`
      <slot></slot>
    `,e=this.href?s`
          <a class="itemLink" href="${this.href}">${t}</a>
        `:t,r=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return s`
      <section class="destination" style=${r}>
        <h3>${e}</h3>
      </section>
    `}}y([l({attribute:"img-src"})],F.prototype,"imgSrc",2);class q extends v{renderItem(){const t={air:"icon-airplane",rail:"icon-train"},e=this.type?t[this.type]:"icon-default";return s`
      <section class="transportation">
        <h3 class="subgrid">
          <span>
            <slot name="origin">BGN</slot>
          </span>
          <svg class="icon">
            <use href="/icons/transportation.svg#${e}" />
          </svg>
          <span>
            <slot name="terminus">END</slot>
            <slot name="via"></slot>
          </span>
        </h3>
      </section>
    `}}y([l()],q.prototype,"type",2);var yt=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,L=(n,t,e,r)=>{for(var a=r>1?void 0:r?wt(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(a=(r?o(t,e,a):o(a))||a);return r&&a&&yt(t,e,a),a};_({"calendar-widget":O,"entourage-table":T,"itinerary-destination":F,"itinerary-transportation":q});class E extends A{constructor(){super("blazing:model"),this.tourid=""}get tour(){return this.model.tour}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="tour-id"&&e!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/select",{tourid:r}]))}render(){const{endDate:t,destinations:e=[],transportation:r=[],entourage:a,name:i,startDate:o}=this.tour||{},c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],p=u=>{const d=u||new Date,h=c[d.getUTCMonth()];return`${d.getUTCDate()} ${h}`},g=u=>{const{startDate:d,endDate:h,link:m,name:D,featuredImage:R}=u;return s`
        <itinerary-destination
          start-date=${d}
          end-date=${h}
          img-src=${R}
          href=${m}>
          ${D}
        </itinerary-destination>
      `},w=u=>{const d=u.length,h=u[0],m=u[d-1],D=d>2?s`
              <span slot="via">
                ${u.slice(1,-1).join(", ")}
              </span>
            `:null;return s`
        <span slot="origin">${h}</span>
        <span slot="terminus">${m}</span>
        ${D}
      `},$=u=>{const{startDate:d,type:h,routing:m=[]}=u||{};return s`
        <itinerary-transportation
          start-date=${d}
          type=${h}>
          ${w(m)}
        </itinerary-transportation>
      `};return console.log("Rendering Tour page",this.tour),s`
      <main class="page">
        <header>
          <h2>${i}</h2>
          <p>
            from ${p(o)} to
            ${p(t)}
            ${t&&t.getFullYear()}
          </p>
        </header>

        <calendar-widget
          start-date=${o}
          end-date=${t}></calendar-widget>

        <section class="itinerary">
          ${e.map((u,d)=>{const h=d===0?$(r[d]):"",m=g(u),D=$(r[d+1]);return s`
              ${h}${m}${D}
            `})}
        </section>

        <entourage-table .using=${a}></entourage-table>
      </main>
    `}}E.styles=[f`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "hd hd hd it it it it it"
          "ca ca ca it it it it it"
          "en en en it it it it it"
          "xx xx xx it it it it it";
      }

      header {
        grid-area: hd;
      }

      calendar-widget {
        grid-area: ca;
        align-self: start;
      }

      .itinerary {
        display: grid;
        grid-area: it;
        align-self: start;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;
      }

      entourage-table {
        grid-area: en;
      }
    `];L([l({attribute:"tour-id",reflect:!0})],E.prototype,"tourid",2);L([l()],E.prototype,"tour",1);const $t=[{path:"/app/tour/:id",view:n=>s`
      <tour-view tour-id=${n.id}></tour-view>
    `},{path:"/app/profile/:id",view:n=>s`
      <profile-view user-id=${n.id}></profile-view>
    `},{path:"/",redirect:"/app"}];_({"mu-auth":x.Provider,"mu-history":G.Provider,"mu-store":class extends K.Provider{constructor(){super(ot,nt,"blazing:auth")}},"mu-switch":class extends Q.Element{constructor(){super($t,"blazing:history")}},"blazing-header":z,"tour-view":E,"profile-view":k});
