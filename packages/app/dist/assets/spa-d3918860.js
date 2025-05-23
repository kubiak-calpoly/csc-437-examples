import{i as h,s as $,x as o,d as w,a as pe,V as E,O as V,e as ee,b as T,f as te,h as q,c as ue,g as he,_ as ge}from"./lit-element-19d16ef1.js";import{n as d}from"./property-4e000f11.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(i){return d({...i,state:!0,attribute:!1})}var me=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,W=(i,e,a,r)=>{for(var t=r>1?void 0:r?fe(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&me(e,a,t),t};class _ extends ${constructor(){super(...arguments),this.color="white"}render(){return o`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}}_.styles=h`
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
  `;W([d()],_.prototype,"color",2);W([d()],_.prototype,"src",2);W([d()],_.prototype,"initial",2);var ve=Object.defineProperty,be=Object.getOwnPropertyDescriptor,ae=(i,e,a,r)=>{for(var t=r>1?void 0:r?be(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&ve(e,a,t),t};class I extends E{constructor(){super("blazing:model"),this.username="anonymous",this._authObserver=new V(this,"blazing:auth")}get profile(){return this.model.profile}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username,this.dispatchMessage(["profile/select",{userid:this.username}]))})}render(){const{avatar:e,name:a,nickname:r,userid:t,color:n}=this.profile||{},s=(r||a||t||"?").slice(0,1),l=`/app/profile/${t}/edit`;return o`
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
            <li><h3>${a||r||t}</h3></li>
            <li>
              <label @change=${ye}>
                <input type="checkbox" autocomplete="off" />
                Dark mode
              </label>
            </li>
            <li>
              <a href=${l}>Edit Profile</a>
            </li>
            <li>
              <a href="#" @click=${$e}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `}}I.uses=w({"drop-down":pe.Element,"profile-avatar":_});I.styles=h`
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
  `;ae([d()],I.prototype,"username",2);ae([b()],I.prototype,"profile",1);function ye(i){const a=i.target.checked;ee.relay(i,"dark-mode",{checked:a})}function $e(i){ee.relay(i,"auth:message",["auth/signout"])}const we={},De=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],O=i=>{const e=(typeof i=="string"?new Date(i):i)||new Date,a=De[e.getUTCMonth()];return`${e.getUTCDate()} ${a}`};function Y(i){const e=new Date(Date.parse(i)),a=e.getUTCDate(),r=e.getUTCMonth(),t=e.getUTCFullYear();return new Date(Date.UTC(t,r,a))}function A(i){const e=i;let a=i;return a.startDate=Y(e.startDate),a.endDate=e.endDate?Y(e.endDate):void 0,a}function xe(i,e,a){switch(i[0]){case"profile/save":_e(i[1],a).then(t=>e(n=>({...n,profile:t}))).then(()=>{const{onSuccess:t}=i[1];t&&t()}).catch(t=>{const{onFailure:n}=i[1];n&&n(t)});break;case"profile/select":ze(i[1],a).then(t=>e(n=>({...n,profile:t})));break;case"tour/index":Ce(a).then(t=>e(n=>({...n,tourIndex:t})));break;case"tour/select":Pe(i[1],a).then(t=>e(n=>({...n,tour:t})));break;case"tour/save-destination":Oe(i[1],a).then(t=>{const{index:n}=i[1];e(s=>{const l=s.tour;if(l&&t){let c=l.destinations.slice();return c.splice(n,1,t),{...s,tour:{...l,destinations:c}}}else return s})}).then(()=>{const{onSuccess:t}=i[1];t&&t()}).catch(t=>{const{onFailure:n}=i[1];n&&n(t)});break;default:const r=i[0];throw new Error(`Unhandled message "${r}"`)}}function _e(i,e){return fetch(`/api/profiles/${i.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...T.headers(e)},body:JSON.stringify(i.profile)}).then(a=>{if(a.status===200)return a.json();throw new Error(`Failed to save profile for ${i.userid}`)}).then(a=>{if(a)return a})}function ze(i,e){return fetch(`/api/profiles/${i.userid}`,{headers:T.headers(e)}).then(a=>{if(a.status===200)return a.json()}).then(a=>{if(a)return console.log("Profile:",a),a})}function Ce(i){return fetch("/api/tours",{headers:T.headers(i)}).then(e=>{if(e.status!==200)throw"Failed to load index of tours";return e.json()}).then(e=>{if(e){const{data:a}=e;return a.map(r=>A(r))}})}function Pe(i,e){return fetch(`/api/tours/${i.tourid}`,{headers:T.headers(e)}).then(a=>{if(a.status===200)return a.json()}).then(a=>{if(a){console.log("Tour:",a);let r=A(a);return r.destinations=r.destinations.map(A),r.transportation=r.transportation.map(A),r}})}function Oe(i,e){return fetch(`/api/tours/${i.tourid}/destinations/${i.index}`,{method:"PUT",headers:{"Content-Type":"application/json",...T.headers(e)},body:JSON.stringify(i.destination)}).then(a=>{if(a.status===200)return a.json();throw new Error(`Failed to save destination ${i.index}`)}).then(a=>{if(a)return A(a)})}var Ee=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,Se=(i,e,a,r)=>{for(var t=r>1?void 0:r?Te(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Ee(e,a,t),t};const je={air:"icon-airplane",bike:"icon-bike",boat:"icon-train",bus:"icon-train",metro:"icon-train",train:"icon-train",walking:"icon-train",tour:"icon-train"};class G extends ${render(){const e=`/icons/transportation.svg#${je[this.type||"tour"]}`;return o`
      <div class="card">
        <svg class="icon">
          <use href=${e} />
        </svg>
        <h3><slot>Name of Excursion</slot></h3>
      </div>
    `}}G.styles=h`
    :host {
      display: block;
      container: card / inline-size;
      height: 100%;
    }
    .card {
      display: flex;
      flex-direction: column;
      border: var(--line-weight-fine) solid var(--color-accent);
      padding: var(--size-spacing-medium);
      height: 100%;
    }
    @container card (min-width: 15rem) {
      .card {
        flex-direction: row;
      }
    }
    h3 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
      margin: 0;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
      flex-shrink: 0;
    }
  `;Se([d()],G.prototype,"type",2);const z=h`
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
`;var Ue=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,S=(i,e,a,r)=>{for(var t=r>1?void 0:r?Fe(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Ue(e,a,t),t};class y extends E{constructor(){var e;super("blazing:model"),this.tourid="",this.index=0,this.edit=!1,this.image=(e=this.destination)==null?void 0:e.featuredImage}get tour(){return this.model.tour}get destination(){var e;return(e=this.tour)==null?void 0:e.destinations[this.index]}attributeChangedCallback(e,a,r){super.attributeChangedCallback(e,a,r),e==="tour-id"&&a!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/select",{tourid:r}]))}render(){var v;const{name:e,startDate:a,endDate:r,featuredImage:t,excursions:n=[]}=this.destination||{},s=(v=this.tour)==null?void 0:v.name,l=this.image||t;console.log("Destination:",this.destination);const c=()=>this.edit?o`
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
          <img src=${l} />
        `:o`
          <header>
            <a
              class="breadcrumb"
              href="/app/tour/${this.tourid}">
              ${s}
            </a>
            <h2>${e}</h2>
            <p>
              from ${O(a)} to
              ${O(r)}
              ${r&&r.getFullYear()}
            </p>
            <a
              class="edit"
              href="/app/tour/${this.tourid}/destination/${this.index}/edit">
              Edit
            </a>
          </header>
          <img class="hero" src=${l} />
          <ul class="excursions">
            ${n.map(g=>o`
                  <li>
                    <excursion-card type="${g.type}">
                      ${g.name}
                    </excursion-card>
                  </li>
                `)}
          </ul>
        `;return o`
      <main class="page${this.edit?" editing":""}">
        ${c()}
      </main>
    `}_handleSubmit(e){if(console.log("Submitting form",e),this.destination&&this.tour){let a=e.detail;this.image&&(a.featuredImage=this.image),this.dispatchMessage(["tour/save-destination",{tourid:this.tourid,index:this.index,destination:a,onSuccess:()=>q.dispatch(this,"history/navigate",{href:`/app/tour/${this.tourid}/destination/${this.index}`}),onFailure:r=>{console.log("Error saving destination",r)}}])}}_handleFileSelected(e){const r=e.target.files[0];new Promise((n,s)=>{const l=new FileReader;l.onload=()=>n(l.result),l.onerror=c=>s(c),l.readAsArrayBuffer(r)}).then(n=>{const{name:s,size:l,type:c}=r,v=new URLSearchParams({filename:s}),g=new URL("/images",document.location.origin);g.search=v.toString(),console.log("Uploading file:",r),fetch(g,{method:"POST",headers:{"Content-Type":c,"Content-Length":l.toString()},body:n}).then(p=>{if(p.status===201)return p.json();throw p.status}).then(p=>{if(p)console.log("Image has been uploaded to",p.url),this.image=p.url;else throw"No JSON response"}).catch(p=>{console.log("Upload failed",p)})})}}y.uses=w({"mu-form":te.Element,"excursion-card":G});y.styles=[z,h`
      :host {
        display: contents;
      }
      header {
        grid-column: 1 / span 3;
      }
      main.page {
        --page-grids: 8;

        display: grid;
        grid-column: 1/-1;
        grid-template-columns: repeat(var(--page-grids), 1fr);
        gap: var(--size-spacing-small)
          var(--size-spacing-medium);
        padding: var(--size-spacing-medium);
        grid-template-rows: auto auto 1fr auto;
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }
      main.page.editing {
        grid-template-areas: "fm fm fm fm im im im im";
      }
      mu-form {
        grid-area: fm;
      }
      input {
        grid-column: input;
      }
      .excursions {
        display: contents;
      }
      .page > .hero {
        grid-column: span min(5, var(--page-grids)) / -1;
      }
      .page > .excursions {
        display: contents;
        list-style: none;
        padding: 0;
      }
      .excursions > * {
        grid-column: auto / span 2;
      }
      @media screen and (max-width: 50rem) {
        main.page {
          --page-grids: 4;
        }
      }
      @media screen and (max-width: 30rem) {
        main.page {
          --page-grids: 2;
        }
      }
      @media screen and (min-width: 75rem) and (max-width: 100rem) {
        main.page {
          --page-grids: 12;
        }
        .page > .hero {
          grid-column-start: span 8;
          grid-row: auto / span 2;
        }
      }
      @media screen and (min-width: 100rem) {
        main.page {
          --page-grids: 16;
        }
        .page > .hero {
          grid-column: 5 / span 8;
          grid-row: auto / span 3;
        }
      }
    `];S([d({attribute:"tour-id"})],y.prototype,"tourid",2);S([d({type:Number})],y.prototype,"index",2);S([d({type:Boolean})],y.prototype,"edit",2);S([b()],y.prototype,"tour",1);S([b()],y.prototype,"destination",1);S([b()],y.prototype,"image",2);const Ae=window.location.host,Ie="/ws";function Me(i,e){const a=new WebSocket(`ws://${Ae}${Ie}?channel=${i}`);return a.onmessage=r=>{console.log("Received message:",r.data);const t=JSON.parse(r.data);e(t)},{channel:i,socket:a}}function Ne(i,e){i.socket.send(JSON.stringify(e))}var ke=Object.defineProperty,Re=Object.getOwnPropertyDescriptor,K=(i,e,a,r)=>{for(var t=r>1?void 0:r?Re(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&ke(e,a,t),t};class M extends ${constructor(){super(...arguments),this.messages=[],this.username="anonymous",this._authObserver=new V(this,"blazing:auth")}firstUpdated(){!this.connection&&this.tourid&&(this.connection=Me(`chatroom${this.tourid}`,e=>this._handleMessage(e)),console.log("Connection created",this.connection))}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&e.username!==this.username&&(this.username=e.username)})}render(){return o`
      <ul>
        ${this.messages.map(e=>o`
              <li>${e.username}: ${e.text}</li>
            `)}
      </ul>
      <form @submit=${this._handleSubmit}>
        <input name="text" placeholder="Type a message..." />
        <input type="submit" value="Send"></input>
      </form>
    `}_handleSubmit(e){var a;if(e.preventDefault(),this.tourid&&this.username&&this.connection){const r=e.target,n=((a=new FormData(r).get("text"))==null?void 0:a.toString())||"";Ne(this.connection,{username:this.username,tourid:this.tourid,text:n}),r.reset()}}_handleMessage(e){console.log("Received message",e),this.messages=this.messages.concat([e])}}M.styles=[z,h``];K([d({attribute:"tour-id"})],M.prototype,"tourid",2);K([b()],M.prototype,"messages",2);K([d()],M.prototype,"username",2);var Je=Object.defineProperty,He=Object.getOwnPropertyDescriptor,re=(i,e,a,r)=>{for(var t=r>1?void 0:r?He(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Je(e,a,t),t};class j extends ${get entourage(){return this.using||{}}render(){const{name:e,people:a}=this.entourage,r=a||[],t=this.href?o`
          <a href=${this.href}>Chat Now...</a>
        `:"",n=s=>{const{userid:l,avatar:c,name:v="** NO NAME **",nickname:g,color:p}=s,L=(g||v||l).slice(0,1),B=o`
        <profile-avatar
          color=${p}
          src=${c}
          initial=${L}
          style="--avatar-size: 2em"></profile-avatar>
      `;return o`
        <tr>
          <td>
            <a href="/app/profile/${l}">${B}</a>
          </td>
          <td class="name">
            <a href="/app/profile/${l}">${v}</a>
          </td>
        </tr>
      `};return o`
      <section>
        <h3>${e||"Entourage"}</h3>
        ${t}
        <table>
          <tbody>${r.map(n)}</tbody>
        </table>
      </section>
    `}}j.uses=w({"profile-avatar":_});j.styles=h`
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
  `;re([d({attribute:!1})],j.prototype,"using",2);re([d()],j.prototype,"href",2);var Le=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,ie=(i,e,a,r)=>{for(var t=r>1?void 0:r?Be(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Le(e,a,t),t};class N extends E{constructor(){super("blazing:model")}get tour(){return this.model.tour}attributeChangedCallback(e,a,r){super.attributeChangedCallback(e,a,r),console.log("ATTRIBUTE CHANGED",e,a,r),e==="tour-id"&&a!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/select",{tourid:r}]))}render(){var r;const{entourage:e}=this.tour||{},a=(r=this.tour)==null?void 0:r.name;return console.log("RENDER",this.tourid,this.tour),e?o`
        <main class="page">
          <aside>
            <a
              class="breadcrumb"
              href="/app/tour/${this.tourid}">
              ${a}
            </a>
            <entourage-table
              .using=${e}></entourage-table>
          </aside>
          <section class="chat">
            <chat-room tour-id=${this.tourid}></chat-room>
          </section>
        </main>
      `:o``}}N.uses=w({"chat-room":M,"entourage-table":j});N.styles=[z,h`
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
    `];ie([d({attribute:"tour-id",reflect:!0})],N.prototype,"tourid",2);ie([b()],N.prototype,"tour",1);var Ye=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,We=(i,e,a,r)=>{for(var t=r>1?void 0:r?qe(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Ye(e,a,t),t};class Q extends E{get tourIndex(){return this.model.tourIndex||[]}constructor(){super("blazing:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["tour/index"])}render(){const e=a=>{const{name:r,startDate:t,endDate:n}=a,{_id:s}=a;return o`
        <dt>
          ${t.getUTCFullYear()}
        </dt>
        <dt>from
          <time datetime=${t}>
            ${O(t)}
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
    `}}Q.styles=[z,h`
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
    `];We([b()],Q.prototype,"tourIndex",1);var Ge=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,C=(i,e,a,r)=>{for(var t=r>1?void 0:r?Ke(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Ge(e,a,t),t};const ne=h`
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
`;class X extends ${render(){return o`
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
    `}}X.styles=[z,ne,h`
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
    `];C([d()],X.prototype,"username",2);class k extends ${render(){return o`
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
    `}_handleAvatarSelected(e){const r=e.target.files[0];new Promise((n,s)=>{const l=new FileReader;l.onload=()=>n(l.result),l.onerror=c=>s(c),l.readAsDataURL(r)}).then(n=>{this.dispatchEvent(new CustomEvent("profile:new-avatar",{bubbles:!0,composed:!0,detail:n}))})}}k.uses=w({"mu-form":te.Element,"input-array":ue.Element});k.styles=[z,ne,h`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `];C([d()],k.prototype,"username",2);C([d({attribute:!1})],k.prototype,"init",2);class P extends E{constructor(){super("blazing:model"),this.edit=!1,this.userid="",this.addEventListener("profile:new-avatar",e=>{this.newAvatar=e.detail})}get profile(){return this.model.profile}attributeChangedCallback(e,a,r){super.attributeChangedCallback(e,a,r),e==="user-id"&&a!==r&&r&&(console.log("Profiler Page:",r),this.dispatchMessage(["profile/select",{userid:r}]))}render(){const{color:e,avatar:a,name:r,userid:t,nickname:n,home:s,airports:l=[]}=this.profile||{},c=(r||n||t||"?").slice(0,1),v=l.map(p=>o`
          <li>${p}</li>
        `),g=o`
      <profile-avatar
        slot="avatar"
        color=${e}
        src=${this.newAvatar||a}
        initial=${c}></profile-avatar>
    `;return this.edit?o`
          <profile-editor
            username=${t}
            .init=${this.profile}
            @mu-form:submit=${p=>this._handleSubmit(p)}>
            ${g}
          </profile-editor>
        `:o`
          <profile-viewer username=${t}>
            ${g}
            <span slot="name">${r}</span>
            <span slot="userid">${t}</span>
            <span slot="nickname">${n}</span>
            <span slot="home">${s}</span>
            <ul slot="airports">
              ${v}
            </ul>
          </profile-viewer>
        `}_handleSubmit(e){console.log("Handling submit of mu-form");const a=this.newAvatar?{...e.detail,avatar:this.newAvatar}:e.detail;this.dispatchMessage(["profile/save",{userid:this.userid,profile:a,onSuccess:()=>q.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:r=>console.log("ERROR:",r)}])}}P.uses=w({"profile-viewer":X,"profile-editor":k,"profile-avatar":_});P.styles=[z];C([d({type:Boolean,reflect:!0})],P.prototype,"edit",2);C([d({attribute:"user-id",reflect:!0})],P.prototype,"userid",2);C([b()],P.prototype,"profile",1);C([b()],P.prototype,"newAvatar",2);var Qe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,se=(i,e,a,r)=>{for(var t=r>1?void 0:r?Xe(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Qe(e,a,t),t};class H extends ${constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(e){const a=new CustomEvent("calendar-widget:select",{bubbles:!0,composed:!0,detail:{date:e&&Y(e)}});this.dispatchEvent(a)}_handleClear(){var r;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("input:checked");e&&(e.checked=!1);const a=new CustomEvent("calendar-widget:clear",{bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){const e=new Date(this.startDate),a=new Date(this.endDate),r=Ze(e,a),t=n=>{const s={d:n.getUTCDate(),m:n.getUTCMonth()+1,y:n.getUTCFullYear(),day:n.getUTCDay()},l=({y:c,m:v,d:g})=>[c,v,g].join("-");return o`
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
          ${r.map(t)}
        </fieldset>
        <button
          id="clear"
          @click="${()=>this._handleClear()}">
          Clear Selection
        </button>
      </section>
    `}}H.styles=h`
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
  `;se([d({attribute:"start-date",type:Date})],H.prototype,"startDate",2);se([d({attribute:"end-date",type:Date})],H.prototype,"endDate",2);function Ze(i,e){const a=e?e.getTime():i.getTime();let r=[],t=new Date(i);for(;t.getTime()<=a;)r.push(new Date(t)),t.setUTCDate(t.getUTCDate()+1);return r}var Ve=Object.defineProperty,et=Object.getOwnPropertyDescriptor,R=(i,e,a,r)=>{for(var t=r>1?void 0:r?et(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&Ve(e,a,t),t};class U extends ${constructor(){super(...arguments),this.startDate="1970-01-01"}render(){const e=this.renderItem();return o`
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
    `}}U.styles=h`
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
  `;R([d({attribute:"start-date"})],U.prototype,"startDate",2);R([d({attribute:"end-date"})],U.prototype,"endDate",2);R([d()],U.prototype,"href",2);class oe extends U{renderItem(){const e=o`
      <slot></slot>
    `,a=this.href?o`
          <a class="itemLink" href="${this.href}">${e}</a>
        `:e,r=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return o`
      <section class="destination" style=${r}>
        <h3>${a}</h3>
      </section>
    `}}R([d({attribute:"img-src"})],oe.prototype,"imgSrc",2);class le extends U{renderItem(){const e={air:"icon-airplane",rail:"icon-train"},a=this.type?e[this.type]:"icon-default";return o`
      <section class="transportation">
        <h3 class="subgrid">
          <span>
            <slot name="origin">BGN</slot>
          </span>
          <svg class="icon">
            <use href="/icons/transportation.svg#${a}" />
          </svg>
          <span>
            <slot name="terminus">END</slot>
            <slot name="via"></slot>
          </span>
        </h3>
      </section>
    `}}R([d()],le.prototype,"type",2);var tt=Object.defineProperty,at=Object.getOwnPropertyDescriptor,Z=(i,e,a,r)=>{for(var t=r>1?void 0:r?at(e,a):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(t=(r?s(e,a,t):s(t))||t);return r&&t&&tt(e,a,t),t};class F extends E{constructor(){super("blazing:model"),this.tourid="",this.addEventListener("calendar-widget:select",e=>{const{detail:a}=e,{date:r}=a;this.selectedDate=r}),this.addEventListener("calendar-widget:clear",()=>{this.selectedDate=void 0})}get tour(){return this.model.tour}attributeChangedCallback(e,a,r){super.attributeChangedCallback(e,a,r),e==="tour-id"&&a!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/select",{tourid:r}]))}render(){const{endDate:e,destinations:a=[],transportation:r=[],entourage:t,name:n,startDate:s}=this.tour||{},l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],c=m=>{const f=m||new Date,u=l[f.getUTCMonth()];return`${f.getUTCDate()} ${u}`},v=(m,f)=>{const{startDate:u,endDate:D,name:x,featuredImage:J}=m;return o`
        <itinerary-destination
          start-date=${u}
          end-date=${D}
          img-src=${J}
          href="./${this.tourid}/destination/${f}">
          ${x}
        </itinerary-destination>
      `},g=m=>{const f=m.length,u=m[0],D=m[f-1],x=f>2?o`
              <span slot="via">
                ${m.slice(1,-1).join(", ")}
              </span>
            `:null;return o`
        <span slot="origin">${u}</span>
        <span slot="terminus">${D}</span>
        ${x}
      `},p=m=>{const{startDate:f,type:u,routing:D=[]}=m||{};return o`
        <itinerary-transportation
          start-date=${f}
          type=${u}>
          ${g(D)}
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
        `,B=(m,f)=>{const u=this.selectedDate;if(u&&(m.startDate>u||m.endDate<u))return"";const x=r[f],J=r[f+1],de=u&&(x.endDate||x.startDate).valueOf()!==u.valueOf(),ce=u&&J.startDate.valueOf()!==u.valueOf();return o`
        ${f||de?"":p(x)}
        ${v(m,f)}
        ${ce?"":p(J)}
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
          ${a.map(B)}
        </section>

        <entourage-table
          href="/app/entourage/${this.tourid}"
          .using=${t}></entourage-table>
      </main>
    `}}F.uses=w({"calendar-widget":H,"entourage-table":j,"itinerary-destination":oe,"itinerary-transportation":le});F.styles=[h`
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
    `];Z([d({attribute:"tour-id",reflect:!0})],F.prototype,"tourid",2);Z([b()],F.prototype,"tour",1);Z([b()],F.prototype,"selectedDate",2);const rt=[{auth:"protected",path:"/app/tour/:id/destination/:index/edit",view:i=>o`
      <destination-view
        edit
        tour-id=${i.id}
        index=${i.index}></destination-view>
    `},{auth:"protected",path:"/app/tour/:id/destination/:index",view:i=>o`
      <destination-view
        tour-id=${i.id}
        index=${i.index}></destination-view>
    `},{auth:"protected",path:"/app/tour/:id",view:i=>o`
      <tour-view tour-id=${i.id}></tour-view>
    `},{auth:"protected",path:"/app/profile/:id/edit",view:i=>o`
      <profile-view edit user-id=${i.id}></profile-view>
    `},{auth:"protected",path:"/app/profile/:id",view:i=>o`
      <profile-view user-id=${i.id}></profile-view>
    `},{auth:"protected",path:"/app/entourage/:id",view:i=>o`
      <entourage-view tour-id=${i.id}></entourage-view>
    `},{auth:"protected",path:"/app",view:()=>o`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];w({"mu-auth":T.Provider,"mu-history":q.Provider,"mu-store":class extends he.Provider{constructor(){super(xe,we,"blazing:auth")}},"mu-switch":class extends ge.Element{constructor(){super(rt,"blazing:history","blazing:auth")}},"blazing-header":I,"destination-view":y,"entourage-view":N,"home-view":Q,"profile-view":P,"tour-view":F});function it(i,e){i.classList.toggle("dark-mode",e)}document.body.addEventListener("dark-mode",i=>it(i.currentTarget,i.detail.checked));
