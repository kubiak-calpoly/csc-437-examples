import{i as g,s as x,x as o,d as $,a as ce,V as T,O as Z,e as V,b as E,f as ee,h as q,c as ue,g as pe,_ as he}from"./lit-element-f3126ddb.js";import{n as d}from"./property-9fa586ae.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(i){return d({...i,state:!0,attribute:!1})}var me=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,W=(i,e,t,r)=>{for(var a=r>1?void 0:r?ge(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&me(e,t,a),a};class _ extends x{constructor(){super(...arguments),this.color="white"}render(){return o`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}}_.styles=g`
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
  `;W([d()],_.prototype,"color",2);W([d()],_.prototype,"src",2);W([d()],_.prototype,"initial",2);var fe=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,te=(i,e,t,r)=>{for(var a=r>1?void 0:r?ve(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&fe(e,t,a),a};class I extends T{constructor(){super("blazing:model"),this.username="anonymous",this._authObserver=new Z(this,"blazing:auth")}get profile(){return this.model.profile}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username,this.dispatchMessage(["profile/select",{userid:this.username}]))})}render(){const{avatar:e,name:t,nickname:r,userid:a,color:n}=this.profile||{},s=(r||t||a||"?").slice(0,1),l=`/app/profile/${a}/edit`;return o`
      <header>
        <h1><a href="/app">Blazing Travels</a></h1>
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
            <li><h3>${t||r||a}</h3></li>
            <li>
              <label @change=${be}>
                <input type="checkbox" autocomplete="off" />
                Dark mode
              </label>
            </li>
            <li>
              <a href=${l}>Edit Profile</a>
            </li>
            <li>
              <a href="#" @click=${ye}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `}}I.uses=$({"drop-down":ce.Element,"profile-avatar":_});I.styles=g`
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
    a[href] {
      color: var(--color-link-inverted);
    }
    drop-down a[href]:not([slot="actuator"]) {
      color: var(--color-link);
    }
    h1 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-xxlarge);
      font-style: oblique;
      line-height: 1;
      font-weight: var(--font-weight-bold);
    }
    h1 a[href] {
      text-decoration: none;
      color: inherit;
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
  `;te([d()],I.prototype,"username",2);te([v()],I.prototype,"profile",1);function be(i){const t=i.target.checked;V.relay(i,"dark-mode",{checked:t})}function ye(i){V.relay(i,"auth:message",["auth/signout"])}const $e={},we=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],O=i=>{const e=(typeof i=="string"?new Date(i):i)||new Date,t=we[e.getUTCMonth()];return`${e.getUTCDate()} ${t}`};function Y(i){const e=new Date(Date.parse(i)),t=e.getUTCDate(),r=e.getUTCMonth(),a=e.getUTCFullYear();return new Date(Date.UTC(a,r,t))}function A(i){const e=i;let t=i;return t.startDate=Y(e.startDate),t.endDate=e.endDate?Y(e.endDate):void 0,t}function De(i,e,t){switch(i[0]){case"profile/save":xe(i[1],t).then(a=>e(n=>({...n,profile:a}))).then(()=>{const{onSuccess:a}=i[1];a&&a()}).catch(a=>{const{onFailure:n}=i[1];n&&n(a)});break;case"profile/select":_e(i[1],t).then(a=>e(n=>({...n,profile:a})));break;case"tour/index":Ce(t).then(a=>e(n=>({...n,tourIndex:a})));break;case"tour/select":ze(i[1],t).then(a=>e(n=>({...n,tour:a})));break;case"tour/save-destination":Pe(i[1],t).then(a=>{const{index:n}=i[1];e(s=>{const l=s.tour;if(l&&a){let c=l.destinations.slice();return c.splice(n,1,a),{...s,tour:{...l,destinations:c}}}else return s})}).then(()=>{const{onSuccess:a}=i[1];a&&a()}).catch(a=>{const{onFailure:n}=i[1];n&&n(a)});break;default:const r=i[0];throw new Error(`Unhandled message "${r}"`)}}function xe(i,e){return fetch(`/api/profiles/${i.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...E.headers(e)},body:JSON.stringify(i.profile)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save profile for ${i.userid}`)}).then(t=>{if(t)return t})}function _e(i,e){return fetch(`/api/profiles/${i.userid}`,{headers:E.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}function Ce(i){return fetch("/api/tours",{headers:E.headers(i)}).then(e=>{if(e.status!==200)throw"Failed to load index of tours";return e.json()}).then(e=>{if(e){const{data:t}=e;return t.map(r=>A(r))}})}function ze(i,e){return fetch(`/api/tours/${i.tourid}`,{headers:E.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t){console.log("Tour:",t);let r=A(t);return r.destinations=r.destinations.map(A),r.transportation=r.transportation.map(A),r}})}function Pe(i,e){return fetch(`/api/tours/${i.tourid}/destinations/${i.index}`,{method:"PUT",headers:{"Content-Type":"application/json",...E.headers(e)},body:JSON.stringify(i.destination)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save destination ${i.index}`)}).then(t=>{if(t)return A(t)})}const C=g`
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
`;var Oe=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,S=(i,e,t,r)=>{for(var a=r>1?void 0:r?Te(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Oe(e,t,a),a};class y extends T{constructor(){var e;super("blazing:model"),this.tourid="",this.index=0,this.edit=!1,this.image=(e=this.destination)==null?void 0:e.featuredImage}get tour(){return this.model.tour}get destination(){var e;return(e=this.tour)==null?void 0:e.destinations[this.index]}attributeChangedCallback(e,t,r){super.attributeChangedCallback(e,t,r),e==="tour-id"&&t!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/select",{tourid:r}]))}render(){var c;const{name:e,startDate:t,endDate:r,featuredImage:a}=this.destination||{},n=(c=this.tour)==null?void 0:c.name,s=this.image||a;console.log("Destination:",this.destination);const l=()=>this.edit?o`
          <mu-form
            .init=${this.destination}
            @mu-form:submit=${this._handleSubmit}>
            <label>
              <span>Destination Name</span>
              <input name="name" />
            </label>
            <label>
              <span>Dates</span>
              <input type="date" name="startDate" />
              to
              <input type="date" name="endDate" />
            </label>
            <label>
              <span>Featured Image</span>
              <input
                type="file"
                @change=${this._handleFileSelected} />
            </label>
          </mu-form>
          <img src=${s} />
        `:o`
          <header>
            <a
              class="breadcrumb"
              href="/app/tour/${this.tourid}">
              ${n}
            </a>
            <h2>${e}</h2>
            <p>
              from ${O(t)} to
              ${O(r)}
              ${r&&r.getFullYear()}
            </p>
            <a
              class="edit"
              href="/app/tour/${this.tourid}/destination/${this.index}/edit">
              Edit
            </a>
          </header>
          <img src=${s} />
        `;return o`
      <main class="page${this.edit?" editing":""}">
        ${l()}
      </main>
    `}_handleSubmit(e){if(console.log("Submitting form",e),this.destination&&this.tour){let t=e.detail;this.image&&(t.featuredImage=this.image),this.dispatchMessage(["tour/save-destination",{tourid:this.tourid,index:this.index,destination:t,onSuccess:()=>q.dispatch(this,"history/navigate",{href:`/app/tour/${this.tourid}/destination/${this.index}`}),onFailure:r=>{console.log("Error saving destination",r)}}])}}_handleFileSelected(e){const r=e.target.files[0];new Promise((n,s)=>{const l=new FileReader;l.onload=()=>n(l.result),l.onerror=c=>s(c),l.readAsArrayBuffer(r)}).then(n=>{const{name:s,size:l,type:c}=r,b=new URLSearchParams({filename:s}),f=new URL("/images",document.location.origin);f.search=b.toString(),console.log("Uploading file:",r),fetch(f,{method:"POST",headers:{"Content-Type":c,"Content-Length":l.toString()},body:n}).then(u=>{if(u.status===201)return u.json();throw u.status}).then(u=>{if(u)console.log("Image has been uploaded to",u.url),this.image=u.url;else throw"No JSON response"}).catch(u=>{console.log("Upload failed",u)})})}}y.uses=$({"mu-form":ee.Element});y.styles=[C,g`
      :host {
        display: contents;
      }
      header {
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
          "bc bc xx xx xx xx xx ed"
          "h2 h2 im im im im im im"
          "p  p  im im im im im im"
          "yy yy im im im im im im";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }
      main.page.editing {
        grid-template-areas: "fm fm fm fm im im im im";
      }
      img {
        grid-area: im;
      }
      .breadcrumb {
        grid-area: bc;
      }
      h2 {
        grid-area: h2;
      }
      p {
        grid-area: p;
      }
      .edit {
        grid-area: ed;
      }
      mu-form {
        grid-area: fm;
      }
      input {
        grid-column: input;
      }
    `];S([d({attribute:"tour-id"})],y.prototype,"tourid",2);S([d({type:Number})],y.prototype,"index",2);S([d({type:Boolean})],y.prototype,"edit",2);S([v()],y.prototype,"tour",1);S([v()],y.prototype,"destination",1);S([v()],y.prototype,"image",2);const Ee=window.location.host,Se="/ws";function je(i,e){const t=new WebSocket(`ws://${Ee}${Se}?channel=${i}`);return t.onmessage=r=>{console.log("Received message:",r.data);const a=JSON.parse(r.data);e(a)},{channel:i,socket:t}}function Ue(i,e){i.socket.send(JSON.stringify(e))}var Fe=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,G=(i,e,t,r)=>{for(var a=r>1?void 0:r?Ae(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Fe(e,t,a),a};class M extends x{constructor(){super(...arguments),this.messages=[],this.username="anonymous",this._authObserver=new Z(this,"blazing:auth")}firstUpdated(){!this.connection&&this.tourid&&(this.connection=je(`chatroom${this.tourid}`,e=>this._handleMessage(e)),console.log("Connection created",this.connection))}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username)})}render(){return o`
      <ul>
        ${this.messages.map(e=>o`
              <li>${e.username}: ${e.text}</li>
            `)}
      </ul>
      <form @submit=${this._handleSubmit}>
        <input name="text" placeholder="Type a message..." />
        <input type="submit" value="Send"></input>
      </form>
    `}_handleSubmit(e){var t;if(e.preventDefault(),this.tourid&&this.username&&this.connection){const r=e.target,n=((t=new FormData(r).get("text"))==null?void 0:t.toString())||"";Ue(this.connection,{username:this.username,tourid:this.tourid,text:n}),r.reset()}}_handleMessage(e){console.log("Received message",e),this.messages=this.messages.concat([e])}}M.styles=[C,g``];G([d({attribute:"tour-id"})],M.prototype,"tourid",2);G([v()],M.prototype,"messages",2);G([d()],M.prototype,"username",2);var Ie=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,ae=(i,e,t,r)=>{for(var a=r>1?void 0:r?Me(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Ie(e,t,a),a};class j extends x{get entourage(){return this.using||{}}render(){const{name:e,people:t}=this.entourage,r=t||[],a=this.href?o`
          <a href=${this.href}>Chat Now...</a>
        `:"",n=s=>{const{userid:l,avatar:c,name:b="** NO NAME **",nickname:f,color:u}=s,L=(f||b||l).slice(0,1),B=o`
        <profile-avatar
          color=${u}
          src=${c}
          initial=${L}
          style="--avatar-size: 2em"></profile-avatar>
      `;return o`
        <tr>
          <td>
            <a href="/app/profile/${l}">${B}</a>
          </td>
          <td class="name">
            <a href="/app/profile/${l}">${b}</a>
          </td>
        </tr>
      `};return o`
      <section>
        <h3>${e||"Entourage"}</h3>
        ${a}
        <table>
          <tbody>${r.map(n)}</tbody>
        </table>
      </section>
    `}}j.uses=$({"profile-avatar":_});j.styles=g`
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
  `;ae([d({attribute:!1})],j.prototype,"using",2);ae([d()],j.prototype,"href",2);var ke=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,re=(i,e,t,r)=>{for(var a=r>1?void 0:r?Ne(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&ke(e,t,a),a};class k extends T{constructor(){super("blazing:model")}get tour(){return this.model.tour}attributeChangedCallback(e,t,r){super.attributeChangedCallback(e,t,r),console.log("ATTRIBUTE CHANGED",e,t,r),e==="tour-id"&&t!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/select",{tourid:r}]))}render(){var r;const{entourage:e}=this.tour||{},t=(r=this.tour)==null?void 0:r.name;return console.log("RENDER",this.tourid,this.tour),e?o`
        <main class="page">
          <aside>
            <a
              class="breadcrumb"
              href="/app/tour/${this.tourid}">
              ${t}
            </a>
            <entourage-table
              .using=${e}></entourage-table>
          </aside>
          <section class="chat">
            <chat-room tour-id=${this.tourid}></chat-room>
          </section>
        </main>
      `:o``}}k.uses=$({"chat-room":M,"entourage-table":j});k.styles=[C,g`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-template-columns: fit-content 1fr;
        grid-template-areas: "aside chat";
      }
      aside {
        grid-area: aside;
      }
      .chat {
        grid-area: chat;
      }
    `];re([d({attribute:"tour-id",reflect:!0})],k.prototype,"tourid",2);re([v()],k.prototype,"tour",1);var Re=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,He=(i,e,t,r)=>{for(var a=r>1?void 0:r?Je(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Re(e,t,a),a};class K extends T{get tourIndex(){return this.model.tourIndex||[]}constructor(){super("blazing:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["tour/index"])}render(){const e=t=>{const{name:r,startDate:a,endDate:n}=t,{_id:s}=t;return o`
        <dt>
          ${a.getUTCFullYear()}
        </dt>
        <dt>from
          <time datetime=${a}>
            ${O(a)}
          </time>
        </dt>
        <dt> to
          <time datetime=${n}>
            ${O(n)}
          </time>
        </dt>
        <dd>
          <a href="/app/tour/${s}">${r}</a>
        </dt>
      `};return o`
      <main class="page">
        <header>
          <h2>Your Trips</h2>
        </header>
        <dl>${this.tourIndex.map(e)}</dl>
      </main>
    `}}K.styles=[C,g`
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
          "hd hd yr dt1 dt2 dd dd dd"
          "xx xx yr dt1 dt2 dd dd dd";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
        align-items: end;
      }
      header {
        grid-area: hd;
      }
      dl {
        display: contents;
      }
      dt {
        grid-area: yr;
        text-align: right;
      }
      dt + dt {
        grid-area: dt1;
        text-align: center;
      }
      dt + dt + dt {
        grid-area: dt2;
      }
      dd {
        grid-area: dd;
      }
      time {
        white-space: nowrap;
      }
    `];He([v()],K.prototype,"tourIndex",1);var Le=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,z=(i,e,t,r)=>{for(var a=r>1?void 0:r?Be(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Le(e,t,a),a};const ie=g`
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
`;class Q extends x{render(){return o`
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
    `}}Q.styles=[C,ie,g`
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
    `];z([d()],Q.prototype,"username",2);class N extends x{render(){return o`
      <section>
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
            <span>Avatar</span>
            <input
              name="avatar"
              type="file"
              @change=${this._handleAvatarSelected} />
          </label>
          <slot name="avatar"></slot>
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
        </mu-form>
      </section>
    `}_handleAvatarSelected(e){const r=e.target.files[0];new Promise((n,s)=>{const l=new FileReader;l.onload=()=>n(l.result),l.onerror=c=>s(c),l.readAsDataURL(r)}).then(n=>{this.dispatchEvent(new CustomEvent("profile:new-avatar",{bubbles:!0,composed:!0,detail:n}))})}}N.uses=$({"mu-form":ee.Element,"input-array":ue.Element});N.styles=[C,ie,g`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `];z([d()],N.prototype,"username",2);z([d({attribute:!1})],N.prototype,"init",2);class P extends T{constructor(){super("blazing:model"),this.edit=!1,this.userid="",this.addEventListener("profile:new-avatar",e=>{this.newAvatar=e.detail})}get profile(){return this.model.profile}attributeChangedCallback(e,t,r){super.attributeChangedCallback(e,t,r),e==="user-id"&&t!==r&&r&&(console.log("Profiler Page:",r),this.dispatchMessage(["profile/select",{userid:r}]))}render(){const{color:e,avatar:t,name:r,userid:a,nickname:n,home:s,airports:l=[]}=this.profile||{},c=(r||n||a||"?").slice(0,1),b=l.map(u=>o`
          <li>${u}</li>
        `),f=o`
      <profile-avatar
        slot="avatar"
        color=${e}
        src=${this.newAvatar||t}
        initial=${c}></profile-avatar>
    `;return this.edit?o`
          <profile-editor
            username=${a}
            .init=${this.profile}
            @mu-form:submit=${u=>this._handleSubmit(u)}>
            ${f}
          </profile-editor>
        `:o`
          <profile-viewer username=${a}>
            ${f}
            <span slot="name">${r}</span>
            <span slot="userid">${a}</span>
            <span slot="nickname">${n}</span>
            <span slot="home">${s}</span>
            <ul slot="airports">
              ${b}
            </ul>
          </profile-viewer>
        `}_handleSubmit(e){console.log("Handling submit of mu-form");const t=this.newAvatar?{...e.detail,avatar:this.newAvatar}:e.detail;this.dispatchMessage(["profile/save",{userid:this.userid,profile:t,onSuccess:()=>q.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:r=>console.log("ERROR:",r)}])}}P.uses=$({"profile-viewer":Q,"profile-editor":N,"profile-avatar":_});P.styles=[C];z([d({type:Boolean,reflect:!0})],P.prototype,"edit",2);z([d({attribute:"user-id",reflect:!0})],P.prototype,"userid",2);z([v()],P.prototype,"profile",1);z([v()],P.prototype,"newAvatar",2);var Ye=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,ne=(i,e,t,r)=>{for(var a=r>1?void 0:r?qe(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Ye(e,t,a),a};class H extends x{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(e){const t=new CustomEvent("calendar-widget:select",{bubbles:!0,composed:!0,detail:{date:e&&Y(e)}});this.dispatchEvent(t)}_handleClear(){var r;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("input:checked");e&&(e.checked=!1);const t=new CustomEvent("calendar-widget:clear",{bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){const e=new Date(this.startDate),t=new Date(this.endDate),r=We(e,t),a=n=>{const s={d:n.getUTCDate(),m:n.getUTCMonth()+1,y:n.getUTCFullYear(),day:n.getUTCDay()},l=({y:c,m:b,d:f})=>[c,b,f].join("-");return o`
        <label style="grid-column: ${s.day+1}">
          <span>${s.d}</span>
          <input
            type="radio"
            name="cal"
            value="${l(s)}" />
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
          ${r.map(a)}
        </fieldset>
        <button
          id="clear"
          @click="${()=>this._handleClear()}">
          Clear Selection
        </button>
      </section>
    `}}H.styles=g`
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
  `;ne([d({attribute:"start-date",type:Date})],H.prototype,"startDate",2);ne([d({attribute:"end-date",type:Date})],H.prototype,"endDate",2);function We(i,e){const t=e?e.getTime():i.getTime();let r=[],a=new Date(i);for(;a.getTime()<=t;)r.push(new Date(a)),a.setUTCDate(a.getUTCDate()+1);return r}var Ge=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,R=(i,e,t,r)=>{for(var a=r>1?void 0:r?Ke(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Ge(e,t,a),a};class U extends x{constructor(){super(...arguments),this.startDate="1970-01-01"}render(){const e=this.renderItem();return o`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${O(this.startDate)}
        </time>
        ${this.endDate?o`
              <time datetime=${this.endDate}>
                ${O(this.endDate)}
              </time>
            `:null}
      </span>
      ${e}
    `}renderItem(){return o`
      <slot></slot>
    `}}U.styles=g`
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
  `;R([d({attribute:"start-date"})],U.prototype,"startDate",2);R([d({attribute:"end-date"})],U.prototype,"endDate",2);R([d()],U.prototype,"href",2);class se extends U{renderItem(){const e=o`
      <slot></slot>
    `,t=this.href?o`
          <a class="itemLink" href="${this.href}">${e}</a>
        `:e,r=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return o`
      <section class="destination" style=${r}>
        <h3>${t}</h3>
      </section>
    `}}R([d({attribute:"img-src"})],se.prototype,"imgSrc",2);class oe extends U{renderItem(){const e={air:"icon-airplane",rail:"icon-train"},t=this.type?e[this.type]:"icon-default";return o`
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
    `}}R([d()],oe.prototype,"type",2);var Qe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,X=(i,e,t,r)=>{for(var a=r>1?void 0:r?Xe(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(a=(r?s(e,t,a):s(a))||a);return r&&a&&Qe(e,t,a),a};class F extends T{constructor(){super("blazing:model"),this.tourid="",this.addEventListener("calendar-widget:select",e=>{const{detail:t}=e,{date:r}=t;this.selectedDate=r}),this.addEventListener("calendar-widget:clear",()=>{this.selectedDate=void 0})}get tour(){return this.model.tour}attributeChangedCallback(e,t,r){super.attributeChangedCallback(e,t,r),e==="tour-id"&&t!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/select",{tourid:r}]))}render(){const{endDate:e,destinations:t=[],transportation:r=[],entourage:a,name:n,startDate:s}=this.tour||{},l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],c=h=>{const m=h||new Date,p=l[m.getUTCMonth()];return`${m.getUTCDate()} ${p}`},b=(h,m)=>{const{startDate:p,endDate:w,name:D,featuredImage:J}=h;return o`
        <itinerary-destination
          start-date=${p}
          end-date=${w}
          img-src=${J}
          href="./${this.tourid}/destination/${m}">
          ${D}
        </itinerary-destination>
      `},f=h=>{const m=h.length,p=h[0],w=h[m-1],D=m>2?o`
              <span slot="via">
                ${h.slice(1,-1).join(", ")}
              </span>
            `:null;return o`
        <span slot="origin">${p}</span>
        <span slot="terminus">${w}</span>
        ${D}
      `},u=h=>{const{startDate:m,type:p,routing:w=[]}=h||{};return o`
        <itinerary-transportation
          start-date=${m}
          type=${p}>
          ${f(w)}
        </itinerary-transportation>
      `},L=()=>this.selectedDate?o`
          <p>
            ${c(this.selectedDate)}
            ${this.selectedDate.getFullYear()}
          </p>
        `:o`
          <p>
            from ${c(s)} to
            ${c(e)}
            ${e&&e.getFullYear()}
          </p>
        `,B=(h,m)=>{const p=this.selectedDate;if(p&&(h.startDate>p||h.endDate<p))return"";const D=r[m],J=r[m+1],le=p&&(D.endDate||D.startDate).valueOf()!==p.valueOf(),de=p&&J.startDate.valueOf()!==p.valueOf();return o`
        ${m||le?"":u(D)}
        ${b(h,m)}
        ${de?"":u(J)}
      `};return console.log("Rendering Tour page",this.tour),o`
      <main class="page">
        <header>
          <h2>${n}</h2>
          ${L()}
        </header>

        <calendar-widget
          start-date=${s}
          end-date=${e}></calendar-widget>

        <section class="itinerary">
          ${t.map(B)}
        </section>

        <entourage-table
          href="/app/entourage/${this.tourid}"
          .using=${a}></entourage-table>
      </main>
    `}}F.uses=$({"calendar-widget":H,"entourage-table":j,"itinerary-destination":se,"itinerary-transportation":oe});F.styles=[g`
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
    `];X([d({attribute:"tour-id",reflect:!0})],F.prototype,"tourid",2);X([v()],F.prototype,"tour",1);X([v()],F.prototype,"selectedDate",2);const Ze=[{path:"/app/tour/:id/destination/:index/edit",view:i=>o`
      <destination-view
        edit
        tour-id=${i.id}
        index=${i.index}></destination-view>
    `},{path:"/app/tour/:id/destination/:index",view:i=>o`
      <destination-view
        tour-id=${i.id}
        index=${i.index}></destination-view>
    `},{path:"/app/tour/:id",view:i=>o`
      <tour-view tour-id=${i.id}></tour-view>
    `},{path:"/app/profile/:id/edit",view:i=>o`
      <profile-view edit user-id=${i.id}></profile-view>
    `},{path:"/app/profile/:id",view:i=>o`
      <profile-view user-id=${i.id}></profile-view>
    `},{path:"/app/entourage/:id",view:i=>o`
      <entourage-view tour-id=${i.id}></entourage-view>
    `},{path:"/app",view:()=>o`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];$({"mu-auth":E.Provider,"mu-history":q.Provider,"mu-store":class extends pe.Provider{constructor(){super(De,$e,"blazing:auth")}},"mu-switch":class extends he.Element{constructor(){super(Ze,"blazing:history")}},"blazing-header":I,"destination-view":y,"entourage-view":k,"home-view":K,"profile-view":P,"tour-view":F});function Ve(i,e){i.classList.toggle("dark-mode",e)}document.body.addEventListener("dark-mode",i=>Ve(i.currentTarget,i.detail.checked));
