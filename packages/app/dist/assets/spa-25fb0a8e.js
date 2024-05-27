import{u as te,f as re,i as g,s as w,x as o,d as D,a as ae,V as N,O as ie,e as B,b as j,c as ne,g as se,h as Y,j as oe,_ as le}from"./lit-element-c6a7c398.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de={attribute:!0,type:String,converter:te,reflect:!1,hasChanged:re},ce=(a=de,e,t)=>{const{kind:i,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(t.name,a),i==="accessor"){const{name:s}=t;return{set(d){const u=e.get.call(this);e.set.call(this,d),this.requestUpdate(s,u,a)},init(d){return d!==void 0&&this.P(s,void 0,a),d}}}if(i==="setter"){const{name:s}=t;return function(d){const u=this[s];e.call(this,d),this.requestUpdate(s,u,a)}}throw Error("Unsupported decorator location: "+i)};function l(a){return(e,t)=>typeof t=="object"?ce(a,e,t):((i,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,s?{...i,wrapped:!0}:i),s?Object.getOwnPropertyDescriptor(r,n):void 0})(a,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function U(a){return l({...a,state:!0,attribute:!1})}var pe=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,R=(a,e,t,i)=>{for(var r=i>1?void 0:i?ue(e,t):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&pe(e,t,r),r};class $ extends w{constructor(){super(...arguments),this.color="white"}render(){return o`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}}$.styles=g`
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
  `;R([l()],$.prototype,"color",2);R([l()],$.prototype,"src",2);R([l()],$.prototype,"initial",2);var he=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,W=(a,e,t,i)=>{for(var r=i>1?void 0:i?ge(e,t):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&he(e,t,r),r};class C extends N{constructor(){super("blazing:model"),this.username="anonymous",this._authObserver=new ie(this,"blazing:auth")}get profile(){return this.model.profile}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username,this.dispatchMessage(["profile/select",{userid:this.username}]))})}render(){const{avatar:e,name:t,nickname:i,userid:r,color:n}=this.profile||{},s=(i||t||r||"?").slice(0,1);return console.log("Rendering header for Profile:",this.profile),o`
      <header>
        <h1>Blazing Travels</h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, ${this.username}</slot>
          </a>
          <ul>
            <li>
              <profile-avatar
                color=${n}
                src=${e}
                initial="${s}"></profile-avatar>
            </li>
            <li><h3>${t||i||r}</h3></li>
            <li>
              <label @change=${fe}>
                <input type="checkbox" autocomplete="off" />
                Dark mode
              </label>
            </li>
            <li>
              <a href="#" @click=${me}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `}}C.uses=D({"drop-down":ae.Element,"profile-avatar":$});C.styles=g`
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
    h3 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
      width: min-content;
    }
    ul {
      list-style: none;
      padding: var(--size-spacing-medium);
    }
  `;W([l()],C.prototype,"username",2);W([U()],C.prototype,"profile",1);function fe(a){const t=a.target.checked;B.relay(a,"dark-mode",{checked:t})}function me(a){B.relay(a,"auth:message",["auth/signout"])}const ve={},be=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],L=a=>{const e=(typeof a=="string"?new Date(a):a)||new Date,t=be[e.getUTCMonth()];return`${e.getUTCDate()} ${t}`};function I(a){const e=new Date(Date.parse(a)),t=e.getUTCDate(),i=e.getUTCMonth(),r=e.getUTCFullYear();return new Date(Date.UTC(r,i,t))}function F(a){const e=a;let t=a;return t.startDate=I(e.startDate),t.endDate=e.endDate?I(e.endDate):void 0,t}function ye(a,e,t){switch(console.log("Updating for message:",a),a[0]){case"profile/save":$e(a[1],t).then(r=>e(n=>({...n,profile:r}))).then(()=>{const{onSuccess:r}=a[1];r&&r()}).catch(r=>{const{onFailure:n}=a[1];n&&n(r)});break;case"profile/select":we(a[1],t).then(r=>e(n=>({...n,profile:r})));break;case"tour/select":De(a[1],t).then(r=>e(n=>({...n,tour:r})));break;default:const i=a[0];throw new Error(`Unhandled Auth message "${i}"`)}}function $e(a,e){return fetch(`/api/profiles/${a.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...j.headers(e)},body:JSON.stringify(a.profile)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save profile for ${a.userid}`)}).then(t=>{if(t)return t})}function we(a,e){return fetch(`/api/profiles/${a.userid}`,{headers:j.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}function De(a,e){return fetch(`/api/tours/${a.tourid}`,{headers:j.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t){console.log("Tour:",t);let i=F(t);return i.destinations=i.destinations.map(F),i.transportation=i.transportation.map(F),i}})}const J=g`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;var xe=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,x=(a,e,t,i)=>{for(var r=i>1?void 0:i?ze(e,t):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&xe(e,t,r),r};const G=g`
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
`;class q extends w{render(){return o`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.username}/edit" class="edit">Edit</a>
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
    `}}q.styles=[J,G,g`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
        grid-row: 4;
        grid-column: value;
      }
      dl {
        display: grid;
        grid-column: key / end;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
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
    `];x([l()],q.prototype,"username",2);class P extends w{render(){return o`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.username}">Close</a>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this.init}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Nickname</span>
            <input name="nickname" />
          </label>
          <label>
            <span>Home City</span>
            <input name="home" />
          </label>
          <label>
            <span>Airports</span>
            <input-array name="airports">
              <span slot="label-add">Add an airport</span>
            </input-array>
          </label>
          <label>
            <span>Color</span>
            <input type="color" name="color" />
          </label>
          <label>
            <span>Avatar</span>
            <input name="avatar" />
          </label>
        </mu-form>
      </section>
    `}}P.uses=D({"mu-form":ne.Element,"input-array":se.Element});P.styles=[J,G,g`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
    `];x([l()],P.prototype,"username",2);x([l({attribute:!1})],P.prototype,"init",2);class z extends N{constructor(){super("blazing:model"),this.edit=!1,this.userid=""}get profile(){return this.model.profile}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e==="user-id"&&t!==i&&i&&(console.log("Profiler Page:",i),this.dispatchMessage(["profile/select",{userid:i}]))}render(){const{color:e,avatar:t,name:i,userid:r,nickname:n,home:s,airports:d=[]}=this.profile||{},u=(i||n||r||"?").slice(0,1),f=d.map(v=>o`
          <li>${v}</li>
        `),m=o`
      <profile-avatar
        slot="avatar"
        color=${e}
        src=${t}
        initial=${u}></profile-avatar>
    `;return this.edit?o`
          <profile-editor
            username=${r}
            .init=${this.profile}
            @mu-form:submit=${v=>this._handleSubmit(v)}>
            ${m}
          </profile-editor>
        `:o`
          <profile-viewer username=${r}>
            ${m}
            <span slot="name">${i}</span>
            <span slot="userid">${r}</span>
            <span slot="nickname">${n}</span>
            <span slot="home">${s}</span>
            <ul slot="airports">
              ${f}
            </ul>
          </profile-viewer>
        `}_handleSubmit(e){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{userid:this.userid,profile:e.detail,onSuccess:()=>Y.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:t=>console.log("ERROR:",t)}])}}z.uses=D({"profile-viewer":q,"profile-editor":P,"profile-avatar":$});z.styles=[J];x([l({type:Boolean,reflect:!0})],z.prototype,"edit",2);x([l({attribute:"user-id",reflect:!0})],z.prototype,"userid",2);x([U()],z.prototype,"profile",1);var _e=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,K=(a,e,t,i)=>{for(var r=i>1?void 0:i?Ce(e,t):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&_e(e,t,r),r};class S extends w{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(e){const t=new CustomEvent("calendar-widget:select",{bubbles:!0,composed:!0,detail:{date:e&&I(e)}});this.dispatchEvent(t)}_handleClear(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("input:checked");e&&(e.checked=!1);const t=new CustomEvent("calendar-widget:clear",{bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){const e=new Date(this.startDate),t=new Date(this.endDate),i=Pe(e,t),r=n=>{const s={d:n.getUTCDate(),m:n.getUTCMonth()+1,y:n.getUTCFullYear(),day:n.getUTCDay()},d=({y:u,m:f,d:m})=>[u,f,m].join("-");return o`
        <label style="grid-column: ${s.day+1}">
          <span>${s.d}</span>
          <input
            type="radio"
            name="cal"
            value="${d(s)}" />
        </label>
      `};return o`
      <section>
        <fieldset
          @change="${n=>{const s=n.target;this._handleChange(s.value)}}">
          <h6>Su</h6>
          <h6>Mo</h6>
          <h6>Tu</h6>
          <h6>We</h6>
          <h6>Th</h6>
          <h6>Fr</h6>
          <h6>Sa</h6>
          ${i.map(r)}
        </fieldset>
        <button
          id="clear"
          @click="${()=>this._handleClear()}">
          Clear Selection
        </button>
      </section>
    `}}S.styles=g`
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

    fieldset + button {
      margin-top: var(--size-spacing-large);
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
  `;K([l({attribute:"start-date",type:Date})],S.prototype,"startDate",2);K([l({attribute:"end-date",type:Date})],S.prototype,"endDate",2);function Pe(a,e){const t=e?e.getTime():a.getTime();let i=[],r=new Date(a);for(;r.getTime()<=t;)i.push(new Date(r)),r.setUTCDate(r.getUTCDate()+1);return i}var Oe=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,Q=(a,e,t,i)=>{for(var r=i>1?void 0:i?Te(e,t):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&Oe(e,t,r),r};class O extends w{get entourage(){return this.using||{}}render(){const{name:e,people:t}=this.entourage,i=t||[],r=this.href?o`
          <a href=${this.href}>Chat Now...</a>
        `:"",n=s=>{const{userid:d,avatar:u,name:f="** NO NAME **",nickname:m,color:v}=s,M=(m||f||d).slice(0,1),A=o`
        <profile-avatar
          color=${v}
          src=${u}
          initial=${M}
          style="--avatar-size: 2em"></profile-avatar>
      `;return o`
        <tr>
          <td>
            <a href="/app/profile/${d}">${A}</a>
          </td>
          <td class="name">
            <a href="/app/profile/${d}">${f}</a>
          </td>
        </tr>
      `};return o`
      <section>
        <h3>${e||"Entourage"}</h3>
        ${r}
        <table>
          <tbody>${i.map(n)}</tbody>
        </table>
      </section>
    `}}O.uses=D({"profile-avatar":$});O.styles=g`
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
    a[href] {
      font: inherit;
      color: inherit;
    }
    .name {
      width: 100%;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
    img {
      width: 100%;
    }
  `;Q([l({attribute:!1})],O.prototype,"using",2);Q([l()],O.prototype,"href",2);var Ee=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,T=(a,e,t,i)=>{for(var r=i>1?void 0:i?ke(e,t):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&Ee(e,t,r),r};class _ extends w{constructor(){super(...arguments),this.startDate="1970-01-01"}render(){const e=this.renderItem();return o`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${L(this.startDate)}
        </time>
        ${this.endDate?o`
              <time datetime=${this.endDate}>
                ${L(this.endDate)}
              </time>
            `:null}
      </span>
      ${e}
    `}renderItem(){return o`
      <slot></slot>
    `}}_.styles=g`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    :host(*) {
      display: contents;
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
  `;T([l({attribute:"start-date"})],_.prototype,"startDate",2);T([l({attribute:"end-date"})],_.prototype,"endDate",2);T([l()],_.prototype,"href",2);class X extends _{renderItem(){const e=o`
      <slot></slot>
    `,t=this.href?o`
          <a class="itemLink" href="${this.href}">${e}</a>
        `:e,i=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return o`
      <section class="destination" style=${i}>
        <h3>${t}</h3>
      </section>
    `}}T([l({attribute:"img-src"})],X.prototype,"imgSrc",2);class Z extends _{renderItem(){const e={air:"icon-airplane",rail:"icon-train"},t=this.type?e[this.type]:"icon-default";return o`
      <section class="transportation">
        <h3 class="subgrid">
          <span>
            <slot name="origin">BGN</slot>
          </span>
          <svg class="icon">
            <use href="/icons/transportation.svg#${t}" />
          </svg>
          <span>
            <slot name="terminus">END</slot>
            <slot name="via"></slot>
          </span>
        </h3>
      </section>
    `}}T([l()],Z.prototype,"type",2);var je=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,H=(a,e,t,i)=>{for(var r=i>1?void 0:i?Ue(e,t):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(r=(i?s(e,t,r):s(r))||r);return i&&r&&je(e,t,r),r};D({"calendar-widget":S,"entourage-table":O,"itinerary-destination":X,"itinerary-transportation":Z});class E extends N{constructor(){super("blazing:model"),this.tourid="",this.addEventListener("calendar-widget:select",e=>{const{detail:t}=e,{date:i}=t;this.selectedDate=i}),this.addEventListener("calendar-widget:clear",()=>{this.selectedDate=void 0})}get tour(){return this.model.tour}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e==="tour-id"&&t!==i&&i&&(console.log("Tour Page:",i),this.dispatchMessage(["tour/select",{tourid:i}]))}render(){const{endDate:e,destinations:t=[],transportation:i=[],entourage:r,name:n,startDate:s}=this.tour||{},d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],u=p=>{const h=p||new Date,c=d[h.getUTCMonth()];return`${h.getUTCDate()} ${c}`},f=p=>{const{startDate:h,endDate:c,link:b,name:y,featuredImage:k}=p;return o`
        <itinerary-destination
          start-date=${h}
          end-date=${c}
          img-src=${k}
          href=${b}>
          ${y}
        </itinerary-destination>
      `},m=p=>{const h=p.length,c=p[0],b=p[h-1],y=h>2?o`
              <span slot="via">
                ${p.slice(1,-1).join(", ")}
              </span>
            `:null;return o`
        <span slot="origin">${c}</span>
        <span slot="terminus">${b}</span>
        ${y}
      `},v=p=>{const{startDate:h,type:c,routing:b=[]}=p||{};return o`
        <itinerary-transportation
          start-date=${h}
          type=${c}>
          ${m(b)}
        </itinerary-transportation>
      `},M=()=>this.selectedDate?o`
          <p>
            ${u(this.selectedDate)}
            ${this.selectedDate.getFullYear()}
          </p>
        `:o`
          <p>
            from ${u(s)} to
            ${u(e)}
            ${e&&e.getFullYear()}
          </p>
        `,A=(p,h)=>{const c=this.selectedDate;if(c&&(p.startDate>c||p.endDate<c))return"";const y=i[h],k=i[h+1],V=c&&(y.endDate||y.startDate).valueOf()!==c.valueOf(),ee=c&&k.startDate.valueOf()!==c.valueOf();return o`
        ${h||V?"":v(y)}
        ${f(p)}
        ${ee?"":v(k)}
      `};return console.log("Rendering Tour page",this.tour),o`
      <main class="page">
        <header>
          <h2>${n}</h2>
          ${M()}
        </header>

        <calendar-widget
          start-date=${s}
          end-date=${e}></calendar-widget>

        <section class="itinerary">
          ${t.map(A)}
        </section>

        <entourage-table .using=${r}></entourage-table>
      </main>
    `}}E.styles=[g`
      :host {
        display: contents;
      }
      h2,
      p {
        margin: 0;
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
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }

      header {
        grid-area: hd;
      }

      calendar-widget {
        grid-area: ca;
        align-self: start;
        border: 1px solid var(--color-accent);
        padding: 1rem 0;
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
    `];H([l({attribute:"tour-id",reflect:!0})],E.prototype,"tourid",2);H([U()],E.prototype,"tour",1);H([U()],E.prototype,"selectedDate",2);const Se=[{path:"/app/tour/:id",view:a=>o`
      <tour-view tour-id=${a.id}></tour-view>
    `},{path:"/app/profile/:id/edit",view:a=>o`
      <profile-view edit user-id=${a.id}></profile-view>
    `},{path:"/app/profile/:id",view:a=>o`
      <profile-view user-id=${a.id}></profile-view>
    `},{path:"/app",view:()=>o`
      <landing-view></landing-view>
    `},{path:"/",redirect:"/app"}];D({"mu-auth":j.Provider,"mu-history":Y.Provider,"mu-store":class extends oe.Provider{constructor(){super(ye,ve,"blazing:auth")}},"mu-switch":class extends le.Element{constructor(){super(Se,"blazing:history")}},"blazing-header":C,"tour-view":E,"profile-view":z});function Me(a,e){a.classList.toggle("dark-mode",e)}document.body.addEventListener("dark-mode",a=>Me(a.currentTarget,a.detail.checked));
