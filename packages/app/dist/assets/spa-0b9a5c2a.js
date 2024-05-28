import{u as ce,f as ue,i as g,s as x,x as o,d as $,a as pe,V as T,O as Z,e as V,b as E,c as ee,h as Y,g as he,j as me,_ as ge}from"./lit-element-cee05e3b.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe={attribute:!0,type:String,converter:ce,reflect:!1,hasChanged:ue},ve=(i=fe,e,t)=>{const{kind:a,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(t.name,i),a==="accessor"){const{name:s}=t;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,c,i)},init(l){return l!==void 0&&this.P(s,void 0,i),l}}}if(a==="setter"){const{name:s}=t;return function(l){const c=this[s];e.call(this,l),this.requestUpdate(s,c,i)}}throw Error("Unsupported decorator location: "+a)};function d(i){return(e,t)=>typeof t=="object"?ve(i,e,t):((a,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,s?{...a,wrapped:!0}:a),s?Object.getOwnPropertyDescriptor(r,n):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(i){return d({...i,state:!0,attribute:!1})}var be=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,W=(i,e,t,a)=>{for(var r=a>1?void 0:a?ye(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&be(e,t,r),r};class _ extends x{constructor(){super(...arguments),this.color="white"}render(){return o`
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
  `;W([d()],_.prototype,"color",2);W([d()],_.prototype,"src",2);W([d()],_.prototype,"initial",2);var $e=Object.defineProperty,we=Object.getOwnPropertyDescriptor,te=(i,e,t,a)=>{for(var r=a>1?void 0:a?we(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&$e(e,t,r),r};class M extends T{constructor(){super("blazing:model"),this.username="anonymous",this._authObserver=new Z(this,"blazing:auth")}get profile(){return this.model.profile}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username,this.dispatchMessage(["profile/select",{userid:this.username}]))})}render(){const{avatar:e,name:t,nickname:a,userid:r,color:n}=this.profile||{},s=(a||t||r||"?").slice(0,1),l=`/app/profile/${r}/edit`;return o`
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
            <li><h3>${t||a||r}</h3></li>
            <li>
              <label @change=${De}>
                <input type="checkbox" autocomplete="off" />
                Dark mode
              </label>
            </li>
            <li>
              <a href=${l}>Edit Profile</a>
            </li>
            <li>
              <a href="#" @click=${xe}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `}}M.uses=$({"drop-down":pe.Element,"profile-avatar":_});M.styles=g`
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
  `;te([d()],M.prototype,"username",2);te([v()],M.prototype,"profile",1);function De(i){const t=i.target.checked;V.relay(i,"dark-mode",{checked:t})}function xe(i){V.relay(i,"auth:message",["auth/signout"])}const _e={},Ce=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],O=i=>{const e=(typeof i=="string"?new Date(i):i)||new Date,t=Ce[e.getUTCMonth()];return`${e.getUTCDate()} ${t}`};function B(i){const e=new Date(Date.parse(i)),t=e.getUTCDate(),a=e.getUTCMonth(),r=e.getUTCFullYear();return new Date(Date.UTC(r,a,t))}function A(i){const e=i;let t=i;return t.startDate=B(e.startDate),t.endDate=e.endDate?B(e.endDate):void 0,t}function Pe(i,e,t){switch(i[0]){case"profile/save":ze(i[1],t).then(r=>e(n=>({...n,profile:r}))).then(()=>{const{onSuccess:r}=i[1];r&&r()}).catch(r=>{const{onFailure:n}=i[1];n&&n(r)});break;case"profile/select":Oe(i[1],t).then(r=>e(n=>({...n,profile:r})));break;case"tour/index":Te(t).then(r=>e(n=>({...n,tourIndex:r})));break;case"tour/select":Ee(i[1],t).then(r=>e(n=>({...n,tour:r})));break;case"tour/save-destination":Se(i[1],t).then(r=>{const{index:n}=i[1];e(s=>{const l=s.tour;if(l&&r){let c=l.destinations.slice();return c.splice(n,1,r),{...s,tour:{...l,destinations:c}}}else return s})}).then(()=>{const{onSuccess:r}=i[1];r&&r()}).catch(r=>{const{onFailure:n}=i[1];n&&n(r)});break;default:const a=i[0];throw new Error(`Unhandled message "${a}"`)}}function ze(i,e){return fetch(`/api/profiles/${i.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...E.headers(e)},body:JSON.stringify(i.profile)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save profile for ${i.userid}`)}).then(t=>{if(t)return t})}function Oe(i,e){return fetch(`/api/profiles/${i.userid}`,{headers:E.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}function Te(i){return fetch("/api/tours",{headers:E.headers(i)}).then(e=>{if(e.status!==200)throw"Failed to load index of tours";return e.json()}).then(e=>{if(e){const{data:t}=e;return t.map(a=>A(a))}})}function Ee(i,e){return fetch(`/api/tours/${i.tourid}`,{headers:E.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t){console.log("Tour:",t);let a=A(t);return a.destinations=a.destinations.map(A),a.transportation=a.transportation.map(A),a}})}function Se(i,e){return fetch(`/api/tours/${i.tourid}/destinations/${i.index}`,{method:"PUT",headers:{"Content-Type":"application/json",...E.headers(e)},body:JSON.stringify(i.destination)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save destination ${i.index}`)}).then(t=>{if(t)return A(t)})}const C=g`
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
`;var je=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,S=(i,e,t,a)=>{for(var r=a>1?void 0:a?Ue(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&je(e,t,r),r};class y extends T{constructor(){var e;super("blazing:model"),this.tourid="",this.index=0,this.edit=!1,this.image=(e=this.destination)==null?void 0:e.featuredImage}get tour(){return this.model.tour}get destination(){var e;return(e=this.tour)==null?void 0:e.destinations[this.index]}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e==="tour-id"&&t!==a&&a&&(console.log("Tour Page:",a),this.dispatchMessage(["tour/select",{tourid:a}]))}render(){var c;const{name:e,startDate:t,endDate:a,featuredImage:r}=this.destination||{},n=(c=this.tour)==null?void 0:c.name,s=this.image||r;console.log("Destination:",this.destination);const l=()=>this.edit?o`
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
              ${O(a)}
              ${a&&a.getFullYear()}
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
    `}_handleSubmit(e){if(console.log("Submitting form",e),this.destination&&this.tour){let t=e.detail;this.image&&(t.featuredImage=this.image),this.dispatchMessage(["tour/save-destination",{tourid:this.tourid,index:this.index,destination:t,onSuccess:()=>Y.dispatch(this,"history/navigate",{href:`/app/tour/${this.tourid}/destination/${this.index}`}),onFailure:a=>{console.log("Error saving destination",a)}}])}}_handleFileSelected(e){const a=e.target.files[0];new Promise((n,s)=>{const l=new FileReader;l.onload=()=>n(l.result),l.onerror=c=>s(c),l.readAsArrayBuffer(a)}).then(n=>{const{name:s,size:l,type:c}=a,b=new URLSearchParams({filename:s}),f=new URL("/images",document.location.origin);f.search=b.toString(),console.log("Uploading file:",a),fetch(f,{method:"POST",headers:{"Content-Type":c,"Content-Length":l.toString()},body:n}).then(u=>{if(u.status===201)return u.json();throw u.status}).then(u=>{if(u)console.log("Image has been uploaded to",u.url),this.image=u.url;else throw"No JSON response"}).catch(u=>{console.log("Upload failed",u)})})}}y.uses=$({"mu-form":ee.Element});y.styles=[C,g`
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
    `];S([d({attribute:"tour-id"})],y.prototype,"tourid",2);S([d({type:Number})],y.prototype,"index",2);S([d({type:Boolean})],y.prototype,"edit",2);S([v()],y.prototype,"tour",1);S([v()],y.prototype,"destination",1);S([v()],y.prototype,"image",2);const Fe=window.location.host,Ae="/ws";function Me(i,e){const t=new WebSocket(`ws://${Fe}${Ae}?channel=${i}`);return t.onmessage=a=>{console.log("Received message:",a.data);const r=JSON.parse(a.data);e(r)},{channel:i,socket:t}}function ke(i,e){i.socket.send(JSON.stringify(e))}var Ie=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,G=(i,e,t,a)=>{for(var r=a>1?void 0:a?Ne(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&Ie(e,t,r),r};class k extends x{constructor(){super(...arguments),this.messages=[],this.username="anonymous",this._authObserver=new Z(this,"blazing:auth")}firstUpdated(){!this.connection&&this.tourid&&(this.connection=Me(`chatroom${this.tourid}`,e=>this._handleMessage(e)),console.log("Connection created",this.connection))}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username)})}render(){return o`
      <ul>
        ${this.messages.map(e=>o`
              <li>${e.username}: ${e.text}</li>
            `)}
      </ul>
      <form @submit=${this._handleSubmit}>
        <input name="text" placeholder="Type a message..." />
        <input type="submit" value="Send"></input>
      </form>
    `}_handleSubmit(e){var t;if(e.preventDefault(),this.tourid&&this.username&&this.connection){const a=e.target,n=((t=new FormData(a).get("text"))==null?void 0:t.toString())||"";ke(this.connection,{username:this.username,tourid:this.tourid,text:n}),a.reset()}}_handleMessage(e){console.log("Received message",e),this.messages=this.messages.concat([e])}}k.styles=[C,g``];G([d({attribute:"tour-id"})],k.prototype,"tourid",2);G([v()],k.prototype,"messages",2);G([d()],k.prototype,"username",2);var Re=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,re=(i,e,t,a)=>{for(var r=a>1?void 0:a?Je(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&Re(e,t,r),r};class j extends x{get entourage(){return this.using||{}}render(){const{name:e,people:t}=this.entourage,a=t||[],r=this.href?o`
          <a href=${this.href}>Chat Now...</a>
        `:"",n=s=>{const{userid:l,avatar:c,name:b="** NO NAME **",nickname:f,color:u}=s,L=(f||b||l).slice(0,1),q=o`
        <profile-avatar
          color=${u}
          src=${c}
          initial=${L}
          style="--avatar-size: 2em"></profile-avatar>
      `;return o`
        <tr>
          <td>
            <a href="/app/profile/${l}">${q}</a>
          </td>
          <td class="name">
            <a href="/app/profile/${l}">${b}</a>
          </td>
        </tr>
      `};return o`
      <section>
        <h3>${e||"Entourage"}</h3>
        ${r}
        <table>
          <tbody>${a.map(n)}</tbody>
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
  `;re([d({attribute:!1})],j.prototype,"using",2);re([d()],j.prototype,"href",2);var He=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,ae=(i,e,t,a)=>{for(var r=a>1?void 0:a?Le(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&He(e,t,r),r};class I extends T{constructor(){super("blazing:model")}get tour(){return this.model.tour}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),console.log("ATTRIBUTE CHANGED",e,t,a),e==="tour-id"&&t!==a&&a&&(console.log("Tour Page:",a),this.dispatchMessage(["tour/select",{tourid:a}]))}render(){var a;const{entourage:e}=this.tour||{},t=(a=this.tour)==null?void 0:a.name;return console.log("RENDER",this.tourid,this.tour),e?o`
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
      `:o``}}I.uses=$({"chat-room":k,"entourage-table":j});I.styles=[C,g`
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
    `];ae([d({attribute:"tour-id",reflect:!0})],I.prototype,"tourid",2);ae([v()],I.prototype,"tour",1);var qe=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,Ye=(i,e,t,a)=>{for(var r=a>1?void 0:a?Be(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&qe(e,t,r),r};class K extends T{get tourIndex(){return this.model.tourIndex||[]}constructor(){super("blazing:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["tour/index"])}render(){const e=t=>{const{name:a,startDate:r,endDate:n}=t,{_id:s}=t;return o`
        <dt>
          ${r.getUTCFullYear()}
        </dt>
        <dt>from
          <time datetime=${r}>
            ${O(r)}
          </time>
        </dt>
        <dt> to
          <time datetime=${n}>
            ${O(n)}
          </time>
        </dt>
        <dd>
          <a href="/app/tour/${s}">${a}</a>
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
    `];Ye([v()],K.prototype,"tourIndex",1);var We=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,P=(i,e,t,a)=>{for(var r=a>1?void 0:a?Ge(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&We(e,t,r),r};const ie=g`
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
    `];P([d()],Q.prototype,"username",2);class N extends x{render(){return o`
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
    `}_handleAvatarSelected(e){const a=e.target.files[0];new Promise((n,s)=>{const l=new FileReader;l.onload=()=>n(l.result),l.onerror=c=>s(c),l.readAsDataURL(a)}).then(n=>{this.dispatchEvent(new CustomEvent("profile:new-avatar",{bubbles:!0,composed:!0,detail:n}))})}}N.uses=$({"mu-form":ee.Element,"input-array":he.Element});N.styles=[C,ie,g`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `];P([d()],N.prototype,"username",2);P([d({attribute:!1})],N.prototype,"init",2);class z extends T{constructor(){super("blazing:model"),this.edit=!1,this.userid="",this.addEventListener("profile:new-avatar",e=>{this.newAvatar=e.detail})}get profile(){return this.model.profile}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e==="user-id"&&t!==a&&a&&(console.log("Profiler Page:",a),this.dispatchMessage(["profile/select",{userid:a}]))}render(){const{color:e,avatar:t,name:a,userid:r,nickname:n,home:s,airports:l=[]}=this.profile||{},c=(a||n||r||"?").slice(0,1),b=l.map(u=>o`
          <li>${u}</li>
        `),f=o`
      <profile-avatar
        slot="avatar"
        color=${e}
        src=${this.newAvatar||t}
        initial=${c}></profile-avatar>
    `;return this.edit?o`
          <profile-editor
            username=${r}
            .init=${this.profile}
            @mu-form:submit=${u=>this._handleSubmit(u)}>
            ${f}
          </profile-editor>
        `:o`
          <profile-viewer username=${r}>
            ${f}
            <span slot="name">${a}</span>
            <span slot="userid">${r}</span>
            <span slot="nickname">${n}</span>
            <span slot="home">${s}</span>
            <ul slot="airports">
              ${b}
            </ul>
          </profile-viewer>
        `}_handleSubmit(e){console.log("Handling submit of mu-form");const t=this.newAvatar?{...e.detail,avatar:this.newAvatar}:e.detail;this.dispatchMessage(["profile/save",{userid:this.userid,profile:t,onSuccess:()=>Y.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:a=>console.log("ERROR:",a)}])}}z.uses=$({"profile-viewer":Q,"profile-editor":N,"profile-avatar":_});z.styles=[C];P([d({type:Boolean,reflect:!0})],z.prototype,"edit",2);P([d({attribute:"user-id",reflect:!0})],z.prototype,"userid",2);P([v()],z.prototype,"profile",1);P([v()],z.prototype,"newAvatar",2);var Ke=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,ne=(i,e,t,a)=>{for(var r=a>1?void 0:a?Qe(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&Ke(e,t,r),r};class H extends x{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(e){const t=new CustomEvent("calendar-widget:select",{bubbles:!0,composed:!0,detail:{date:e&&B(e)}});this.dispatchEvent(t)}_handleClear(){var a;const e=(a=this.shadowRoot)==null?void 0:a.querySelector("input:checked");e&&(e.checked=!1);const t=new CustomEvent("calendar-widget:clear",{bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){const e=new Date(this.startDate),t=new Date(this.endDate),a=Xe(e,t),r=n=>{const s={d:n.getUTCDate(),m:n.getUTCMonth()+1,y:n.getUTCFullYear(),day:n.getUTCDay()},l=({y:c,m:b,d:f})=>[c,b,f].join("-");return o`
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
          ${a.map(r)}
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
  `;ne([d({attribute:"start-date",type:Date})],H.prototype,"startDate",2);ne([d({attribute:"end-date",type:Date})],H.prototype,"endDate",2);function Xe(i,e){const t=e?e.getTime():i.getTime();let a=[],r=new Date(i);for(;r.getTime()<=t;)a.push(new Date(r)),r.setUTCDate(r.getUTCDate()+1);return a}var Ze=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,R=(i,e,t,a)=>{for(var r=a>1?void 0:a?Ve(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&Ze(e,t,r),r};class U extends x{constructor(){super(...arguments),this.startDate="1970-01-01"}render(){const e=this.renderItem();return o`
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
        `:e,a=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return o`
      <section class="destination" style=${a}>
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
    `}}R([d()],oe.prototype,"type",2);var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,X=(i,e,t,a)=>{for(var r=a>1?void 0:a?tt(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(a?s(e,t,r):s(r))||r);return a&&r&&et(e,t,r),r};class F extends T{constructor(){super("blazing:model"),this.tourid="",this.addEventListener("calendar-widget:select",e=>{const{detail:t}=e,{date:a}=t;this.selectedDate=a}),this.addEventListener("calendar-widget:clear",()=>{this.selectedDate=void 0})}get tour(){return this.model.tour}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e==="tour-id"&&t!==a&&a&&(console.log("Tour Page:",a),this.dispatchMessage(["tour/select",{tourid:a}]))}render(){const{endDate:e,destinations:t=[],transportation:a=[],entourage:r,name:n,startDate:s}=this.tour||{},l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],c=h=>{const m=h||new Date,p=l[m.getUTCMonth()];return`${m.getUTCDate()} ${p}`},b=(h,m)=>{const{startDate:p,endDate:w,name:D,featuredImage:J}=h;return o`
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
        `,q=(h,m)=>{const p=this.selectedDate;if(p&&(h.startDate>p||h.endDate<p))return"";const D=a[m],J=a[m+1],le=p&&(D.endDate||D.startDate).valueOf()!==p.valueOf(),de=p&&J.startDate.valueOf()!==p.valueOf();return o`
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
          ${t.map(q)}
        </section>

        <entourage-table
          href="/app/entourage/${this.tourid}"
          .using=${r}></entourage-table>
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
    `];X([d({attribute:"tour-id",reflect:!0})],F.prototype,"tourid",2);X([v()],F.prototype,"tour",1);X([v()],F.prototype,"selectedDate",2);const rt=[{path:"/app/tour/:id/destination/:index/edit",view:i=>o`
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
    `},{path:"/",redirect:"/app"}];$({"mu-auth":E.Provider,"mu-history":Y.Provider,"mu-store":class extends me.Provider{constructor(){super(Pe,_e,"blazing:auth")}},"mu-switch":class extends ge.Element{constructor(){super(rt,"blazing:history")}},"blazing-header":M,"destination-view":y,"entourage-view":I,"home-view":K,"profile-view":z,"tour-view":F});function at(i,e){i.classList.toggle("dark-mode",e)}document.body.addEventListener("dark-mode",i=>at(i.currentTarget,i.detail.checked));
