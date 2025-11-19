import{V as U,O as xt,d as C,a as Tt,x as d,r as w,h as R,i as g,b as y,e as Dt,c as D,f as It,g as Ct,j as it,n as u,k as b,_ as jt,s as Ut}from"./reset.css-CuY9dOe7.js";var Nt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,V=(s,t,e,r)=>{for(var a=r>1?void 0:r?Mt(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=(r?n(t,e,a):n(a))||a);return r&&a&&Nt(t,e,a),a};function Ft(s){const e=s.target.checked;Dt.relay(s,"dark-mode",{checked:e})}function At(s){Dt.relay(s,"auth:message",["auth/signout"])}const K=class K extends U{constructor(){super("blazing:model"),this.loggedIn=!1,this.userid="traveler",this._authObserver=new xt(this,"blazing:auth")}get profile(){return this.model.user}get tour(){return this.model.tour}render(){var n;const{userid:t,name:e,nickname:r}=this.profile||{},a=(n=this.tour)==null?void 0:n.name,i=t===this.userid?r||(e==null?void 0:e.split(" ")[0])||t:this.userid;return console.log("Rendering header element",this.userid,this.profile),d` <header>
      <h1>Blazing Travels</h1>
      <nav class=${this.loggedIn?"logged-in":"logged-out"}>
        <p><slot>${a||""}</slot></p>
        <mu-dropdown>
          <a slot="actuator">
            Hello,
            <span id="userid">${i||"Traveler"}</span>
          </a>
          <menu>
            <li>
              <a href="/app/profile/${this.userid}">
                View Profile
              </a>
            </li>
            <li>
              <a href="/app/profile/${this.userid}/edit">
                Edit Profile
              </a>
            </li>
            <li>
              <label @change=${Ft}>
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout" @click=${At}>Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a @click=${()=>location.assign("/login.html")}>Sign In</a>
            </li>
          </menu>
        </mu-dropdown>
      </nav>
    </header>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username,this.dispatchMessage(["user/request",{userid:this.userid}])):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function t(e,r){e.classList.toggle("dark-mode",r)}document.body.addEventListener("dark-mode",e=>{var r;return t(e.currentTarget,(r=e.detail)==null?void 0:r.checked)})}};K.uses=C({"mu-dropdown":Tt.Element}),K.styles=[w.styles,R.styles,g`
      :host {
        display: contents;
      }
      header {
        display: flex;
        grid-column: start / end;
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
      header p {
        --color-link: var(--color-link-inverted);
      }
      nav {
        display: flex;
        flex-direction: column;
        flex-basis: max-content;
        align-items: end;
      }
      a[slot="actuator"] {
        color: var(--color-link-inverted);
        cursor: pointer;
      }
      #userid:empty::before {
        content: "traveler";
      }
      menu a {
        color: var(--color-link);
        cursor: pointer;
        text-decoration: underline;
      }
      nav.logged-out .when-signed-in,
      nav.logged-in .when-signed-out {
        display: none;
      }
    `];let x=K;V([y()],x.prototype,"loggedIn",2);V([y()],x.prototype,"userid",2);V([y()],x.prototype,"profile",1);V([y()],x.prototype,"tour",1);const qt={},Rt=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],S=s=>{const t=(typeof s=="string"?new Date(s):s)||new Date,e=Rt[t.getUTCMonth()];return`${t.getUTCDate()} ${e}`};function rt(s){const t=new Date(Date.parse(s)),e=t.getUTCDate(),r=t.getUTCMonth(),a=t.getUTCFullYear();return new Date(Date.UTC(a,r,e))}function k(s){const t=s;let e=s;return e.startDate=rt(t.startDate),e.endDate=t.endDate?rt(t.endDate):void 0,e}function Jt(s,t,e){var i,n,l,p,f;const[r,a]=s;switch(r){case"profile/request":{const{userid:o}=a;if(((i=t.profile)==null?void 0:i.userid)===o)break;return[{...t,profile:{userid:o}},bt(a,e).then(c=>["profile/load",{userid:o,profile:c}])]}case"profile/load":{const{profile:o}=a;return{...t,profile:o}}case"profile/save":{const{userid:o}=a;return[t,Qt(a,e).then(c=>["profile/load",{userid:o,profile:c}])]}case"user/request":{const{userid:o}=a;if(((n=t.user)==null?void 0:n.userid)===o)break;return[{...t,user:{userid:o}},bt(a,e).then(c=>["user/load",{userid:o,user:c}])]}case"user/load":{const{user:o}=a;return{...t,user:o}}case"tour/index":{const{userid:o}=a;if(((l=t.tourIndex)==null?void 0:l.userid)===o)break;return[{...t,tourIndex:{userid:o,tours:[]}},Lt(o,e).then(c=>["tour/loadIndex",{userid:o,tours:c}])]}case"tour/loadIndex":{const{userid:o,tours:c}=a;if(t.tourIndex&&t.tourIndex.userid!==o)break;return{...t,tourIndex:{userid:o,tours:c}}}case"tour/request":{const{tourid:o}=a;if(((p=t.tourStatus)==null?void 0:p.tourid)===o)break;return[{...t,tour:void 0,tourStatus:{status:"pending",tourid:o}},Yt(s[1],e).then(c=>["tour/load",{tour:c,tourid:o}])]}case"tour/load":{const{tour:o}=a;if(console.log("TourStatus:",t.tourStatus,o),t.tourStatus&&t.tourStatus.tourid!==o.id)break;return{...t,tour:o,tourStatus:{status:"loaded",tourid:o.id}}}case"tour/save-destination":{const{tourid:o,index:c}=a;return[t,Bt(a,e).then(m=>["tour/load-destination",{tourid:o,index:c,destination:m}])]}case"tour/load-destination":{const{tourid:o,index:c,destination:m}=a,h=t.tour;if(!h||((f=t.tourStatus)==null?void 0:f.tourid)!==o)break;let v=h.destinations.slice();return v.splice(c,1,m),{...t,tour:{...h,destinations:v}}}default:const $=s[0];throw new Error(`Unhandled message "${$}"`)}return t}function Lt(s,t){return fetch(`/api/tours?userid=${s}`,{headers:D.headers(t)}).then(e=>{if(e.status!==200)throw"Failed to load index of tours";return e.json()}).then(e=>{if(e){const{data:r}=e;return r.map(a=>k(a))}else return[]})}function Yt(s,t){return fetch(`/api/tours/${s.tourid}`,{headers:D.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e){console.log("Tour:",e);let r=k(e);return r.destinations=r.destinations.map(k),r.transportation=r.transportation.map(k),r}else throw"No JSON in /api/tours response"})}function Bt(s,t){return fetch(`/api/tours/${s.tourid}/destinations/${s.index}`,{method:"PUT",headers:{"Content-Type":"application/json",...D.headers(t)},body:JSON.stringify(s.destination)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save destination ${s.index}`)}).then(e=>{if(e)return k(e);throw"No JSON in API response"})}function Qt(s,t){return fetch(`/api/travelers/${s.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...D.headers(t)},body:JSON.stringify(s.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${s.userid}`)}).then(e=>{if(e)return e;throw"No JSON in API response"})}function bt(s,t){return fetch(`/api/travelers/${s.userid}`,{headers:D.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e;throw"No JSON in response body"})}var Kt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,tt=(s,t,e,r)=>{for(var a=r>1?void 0:r?Gt(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=(r?n(t,e,a):n(a))||a);return r&&a&&Kt(t,e,a),a};const G=class G extends U{constructor(){var t;super("blazing:model"),this.tourid="",this.index=0,this.image=(t=this.destination)==null?void 0:t.featuredImage}get destination(){var t;return(t=this.model.tour)==null?void 0:t.destinations[this.index]}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="tour-id"&&e!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/request",{tourid:r}]))}render(){var l,p;const{featuredImage:t,accommodation:e,excursions:r=[]}=this.destination||{},a=this.image||t,i=e||{rate:{}},n=this.destination?{...this.destination,"acc-name":i.name,"acc-checkIn":i.checkIn&&new Date(i.checkIn),"acc-checkOut":i.checkOut&&new Date(i.checkOut),"acc-roomType":i.roomType,"acc-rate-amount":(l=i.rate)==null?void 0:l.amount,"acc-rate-currency":(p=i.rate)==null?void 0:p.currency,excursions:r.map(f=>f.name)}:{};return d`
      <main class="page">
        <mu-form
          .init=${n}
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
            <img src=${a} />
            <input
              type="file"
              @change=${this._handleFileSelected} />
          </label>
          <fieldset>
            <h3>Accommodation</h3>
            <label>
              <span>Name</span>
              <input name="acc-name" />
            </label>
            <label>
              <span>Check-in</span>
              <input type="date" name="acc-checkIn" />
            </label>
            <label>
              <span>Check-out</span>
              <input type="date" name="acc-checkOut" />
            </label>
            <label>
              <span>Room type</span>
              <select name="acc-roomType">
                <option value="S">Single</option>
                <option value="D">Double (full bed)</option>
                <option value="Q">Queen</option>
                <option value="K">King</option>
                <option value="2T">Two twin beds</option>
                <option value="2D">Two full beds</option>
                <option value="2Q">Two queen beds</option>
                <option value="Dorm">Dormitory</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <span>Room Rate</span>
              <input type="number" name="acc-rate-amount" />
              <select name="acc-rate-currency">
                <option value="USD" selected>USD</option>
                <option value="EUR">€</option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <h3>Excursions</h3>
            <label>
              <span></span>
            <input-array name="excursions"> </input-array>
          </fieldset>
        </mu-form>
      </main>
    `}_handleSubmit(t){if(console.log("Submitting form",t),this.destination){let e=t.detail;const r=a=>{const i=e[a];return delete e[a],i};this.image&&(e.featuredImage=this.image),e.accommodation={name:r("acc-name"),checkIn:r("acc-checkIn"),checkOut:r("acc-checkOut"),roomType:r("acc-roomType"),rate:{amount:r("acc-rate-amount"),currency:r("acc-rate-currency")}},e.excursions=e.excursions.map(a=>({name:a,type:"tour"})),this.dispatchMessage(["tour/save-destination",{tourid:this.tourid,index:this.index,destination:e},{onSuccess:()=>it.dispatch(this,"history/navigate",{href:`/app/destination/${this.tourid}/${this.index}`}),onFailure:a=>{console.log("Error saving destination",a)}}])}}_handleFileSelected(t){const r=t.target.files[0];new Promise((i,n)=>{const l=new FileReader;l.onload=()=>i(l.result),l.onerror=p=>n(p),l.readAsArrayBuffer(r)}).then(i=>{const{name:n,size:l,type:p}=r,f=new URLSearchParams({filename:n}),$=new URL("/images",document.location.origin);$.search=f.toString(),console.log("Uploading file:",r),fetch($,{method:"POST",headers:{"Content-Type":p,"Content-Length":l.toString()},body:i}).then(o=>{if(o.status===201)return o.json();throw o.status}).then(o=>{if(o)console.log("Image has been uploaded to",o.url),this.image=o.url;else throw"No JSON response"}).catch(o=>{console.log("Upload failed",o)})})}};G.uses=C({"mu-form":Ct.Element,"input-array":It.Element}),G.styles=[w.styles,g`
      :host {
        display: contents;
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
        grid-template-areas: "-- fm fm fm fm fm fm -1";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }
      mu-form {
        display: grid;
        grid-area: fm;
        grid-template-columns: subgrid;
      }
      input {
        grid-column: input / span 2;
      }
      fieldset {
        > h3 {
          grid-column: label / end;
        }
        > label {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
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
      }
      @media screen and (min-width: 100rem) {
        main.page {
          --page-grids: 16;
        }
      }
    `];let z=G;tt([u({attribute:"tour-id"})],z.prototype,"tourid",2);tt([u({type:Number})],z.prototype,"index",2);tt([y()],z.prototype,"destination",1);tt([y()],z.prototype,"image",2);const Xt=g`
  svg.icon {
    --size-icon: var(--size-icon-normal);

    display: inline-block;
    height: var(--size-icon);
    width: var(--size-icon);
    vertical-align: calc(0.5em - 0.5 * var(--size-icon));
    fill: currentColor;
  }
`,zt={styles:Xt};var Zt=Object.defineProperty,Ht=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&Zt(t,e,a),a};const ct=class ct extends b{render(){const{checkIn:t,checkOut:e,name:r,rate:a,roomType:i}=this.using||{};return d`
      <section>
        <h3>
          <svg class="icon">
            <use
              xlink:href="/icons/destination.svg#icon-hotel" />
          </svg>
          <span>${r}</span>
        </h3>
        <dl>
          <dt>Check-in</dt>
          <dd>
            <time datetime=${t}
              >${S(t)}</time
            >
          </dd>
          <dt>Check-out</dt>
          <dd>
            <time datetime=${e}
              >${S(e)}</time
            >
          </dd>
          <dt>Room Type</dt>
          <dd> ${i} </dd>
          <dt>Rate</dt>
          <dd>
            <span>${a==null?void 0:a.amount}</span>
            <span>${a==null?void 0:a.currency}</span>
          </dd>
        </dl>
      </section>
    `}};ct.styles=[w.styles,zt.styles,R.styles,g`
      :host {
        display: contents;
      }
      section {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid [dt] [dd];
        align-content: start;
      }
      svg.icon {
        --size-icon: var(--size-icon-large);
      }
      h3 {
        display: flex;
        grid-column: 1 / -1;
        align-items: center;
        gap: var(--size-spacing-medium);
      }
      dl {
        display: contents;
      }
      dt {
        font-family: var(--font-family-display);
        grid-column: dt;
      }
      dd {
        grid-column: dd / -1;
        justify-self: end;
      }
    `];let L=ct;Ht([u({attribute:!1})],L.prototype,"using");var Wt=Object.defineProperty,Et=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&Wt(t,e,a),a};const Vt={air:"icon-airplane",bike:"icon-bike",boat:"icon-train",bus:"icon-train",metro:"icon-train",train:"icon-train",walking:"icon-train",tour:"icon-train"},lt=class lt extends b{render(){const t=`/icons/transportation.svg#${Vt[this.type||"tour"]}`;return d`
      <div class="card">
        <svg class="icon">
          <use href=${t} />
        </svg>
        <h3><slot>Name of Excursion</slot></h3>
      </div>
    `}};lt.styles=g`
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
  `;let Y=lt;Et([u()],Y.prototype,"type");var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,et=(s,t,e,r)=>{for(var a=r>1?void 0:r?ee(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=(r?n(t,e,a):n(a))||a);return r&&a&&te(t,e,a),a};const X=class X extends U{constructor(){var t;super("blazing:model"),this.tourid="",this.index=0,this.image=(t=this.destination)==null?void 0:t.featuredImage}get destination(){var t;return(t=this.model.tour)==null?void 0:t.destinations[this.index]}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="tour-id"&&e!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/request",{tourid:r}]))}render(){const{name:t,startDate:e,endDate:r,featuredImage:a,accommodation:i,excursions:n=[]}=this.destination||{},l=this.image||a,p=i||{rate:{}};return console.log("Accommodation:",i),d`
      <main class="page">
        <header>
          <a class="breadcrumb" href="/app/tour/${this.tourid}">
            &larr; Back to tour
          </a>
          <h2>${t}</h2>
          <p>
            from ${S(e)} to
            ${S(r)}
            ${r&&r.getFullYear()}
          </p>
          <button
            @click=${()=>it.dispatch(this,"history/navigate",{href:`/app/destination/${this.tourid}/${this.index}/edit`})}
            >Edit</button
          >
        </header>
        <img class="hero" src=${l} />
        <accommodation-info .using=${p}> </accommodation-info>
        <ul class="excursions">
          ${n.map(f=>d`
                <li>
                  <excursion-card type="${f.type}">
                    ${f.name}
                  </excursion-card>
                </li>
              `)}
        </ul>
      </main>
    `}};X.uses=C({"excursion-card":Y,"accommodation-info":L}),X.styles=[w.styles,g`
      :host {
        display: contents;
      }
      header {
        grid-column: 1 / span 3;
      }
      a.breadcrumb {
        font-family: var(--font-family-display);
        color: var(--color-accent);
        text-decoration: none;
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
      .page > accommodation-info {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / span 3;
      }
      .page > .hero {
        grid-column: span min(5, var(--page-grids)) / -1;
        grid-row: auto / span 2;
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
    `];let _=X;et([u({attribute:"tour-id"})],_.prototype,"tourid",2);et([u({type:Number})],_.prototype,"index",2);et([y()],_.prototype,"destination",1);et([y()],_.prototype,"image",2);var ae=Object.defineProperty,st=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&ae(t,e,a),a};const ut=class ut extends b{constructor(){super(...arguments),this.color="white"}render(){return d`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};ut.styles=g`
    :host {
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
  `;let O=ut;st([u()],O.prototype,"color");st([u()],O.prototype,"src");st([u()],O.prototype,"initial");var re=Object.defineProperty,_t=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&re(t,e,a),a};const Z=class Z extends b{get entourage(){return this.using||{}}render(){const{name:t,people:e}=this.entourage,r=e||[],a=i=>{const{userid:n,avatar:l,name:p="** NO NAME **",nickname:f,color:$}=i,o=(f||p||n).slice(0,1);return d`
        <a href="/app/profile/${n}">
          <traveler-avatar
            color=${$}
            src=${l}
            initial=${o}
            style="--avatar-size: 2em">
          </traveler-avatar>
          <span>${p}</span>
        </a>
      `};return d`
      <section>
        <h3>${t||"Entourage"}</h3>
        ${r.map(a)}
      </section>
    `}};Z.uses=C({"traveler-avatar":O}),Z.styles=g`
    :host {
      gap: var(--size-spacing-medium);
    }
    * {
      margin: 0;
      box-sizing: border-box;
      align-self: center;
    }
    section {
      display: contents;
    }
    h3 {
      grid-column: 1 / -1;
    }
    a[href] {
      display: contents;
      font: inherit;
      color: inherit;
    }
    traveler-avatar {
      grid-column: 1;
      justify-self: center;
    }
    span {
      grid-column: 2 / -1;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
  `;let P=Z;_t([u({attribute:!1})],P.prototype,"using");_t([u()],P.prototype,"href");var ie=Object.defineProperty,se=Object.getOwnPropertyDescriptor,kt=(s,t,e,r)=>{for(var a=r>1?void 0:r?se(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=(r?n(t,e,a):n(a))||a);return r&&a&&ie(t,e,a),a};const H=class H extends U{get tour(){return this.model.tour}constructor(){super("blazing:model")}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="tour-id"&&e!==r&&r&&(console.log("Tour Page:",r),this.dispatchMessage(["tour/request",{tourid:r}]))}render(){var r;const{entourage:t}=this.tour||{entourage:{}},e=(r=this.tour)==null?void 0:r.name;return t?d`
        <main class="page">
          <aside>
            <a
              class="breadcrumb"
              href="/app/tour/${this.tourid}">
              ${e}
            </a>
            <entourage-table
              .using=${t}></entourage-table>
          </aside>
        </main>
      `:d``}};H.uses=C({"entourage-table":P}),H.styles=[w.styles,g`
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
    `];let M=H;kt([u({attribute:"tour-id",reflect:!0})],M.prototype,"tourid",2);kt([y()],M.prototype,"tour",1);var ne=Object.defineProperty,oe=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&ne(t,e,a),a};const pt=class pt extends b{constructor(){super(...arguments),this.src="/api/tours",this.tourIndex=new Array,this._authObserver=new xt(this,"blazing:auth"),this._user=new D.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t,{headers:D.headers(this._user)}).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load tour data:",e)).then(e=>{if(e){console.log("Tours:",e);const{data:r}=e,a=r.map(k);this.tourIndex=a}}).catch(e=>console.log("Failed to convert tour data:",e))}render(){const t=this.tourIndex.map(this.renderItem);return d`
      <main class="page">
        <header>
          <h2>Your Trips</h2>
        </header>
        <dl>${t}</dl>
      </main>
    `}renderItem(t){const{id:e,name:r,startDate:a,endDate:i,entourage:n}=t,l=t.entourage._id;return d`
      <dt>
        <time datetime=${a}>
          ${S(a)}
        </time>
        to
        <time datetime=${i}>
          ${S(i)}
        </time>
        ${a.getUTCFullYear()}
      </dt>
      <dd>
        <a href="/app/tour/${e}">${r}</a>
        with
        <a href="/app/entourage/${l}"
          >${n.name}</a
        >
      </dd>
    `}};pt.styles=[w.styles,g`
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
    `];let B=pt;oe([y()],B.prototype,"tourIndex");var de=Object.defineProperty,St=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&de(t,e,a),a};const ht=class ht extends b{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(t){const e=new CustomEvent("calendar-widget:select",{bubbles:!0,composed:!0,detail:{date:t&&rt(t)}});this.dispatchEvent(e)}_handleClear(){var r;const t=(r=this.shadowRoot)==null?void 0:r.querySelector("input:checked");t&&(t.checked=!1);const e=new CustomEvent("calendar-widget:clear",{bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){const t=new Date(this.startDate),e=new Date(this.endDate),r=ce(t,e),a=i=>{const n={d:i.getUTCDate(),m:i.getUTCMonth()+1,y:i.getUTCFullYear(),day:i.getUTCDay()},l=({y:p,m:f,d:$})=>[p,f,$].join("-");return d`
        <label style="grid-column: ${n.day+1}">
          <span>${n.d}</span>
          <input
            type="radio"
            name="cal"
            value="${l(n)}" />
        </label>
      `};return d`
      <section>
        <fieldset
          @change="${i=>{const n=i.target;this._handleChange(n.value)}}">
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
    `}};ht.styles=g`
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
  `;let F=ht;St([u({attribute:"start-date",type:Date})],F.prototype,"startDate");St([u({attribute:"end-date",type:Date})],F.prototype,"endDate");function ce(s,t){const e=t?t.getTime():s.getTime();let r=[],a=new Date(s);for(;a.getTime()<=e;)r.push(new Date(a)),a.setUTCDate(a.getUTCDate()+1);return r}const le=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],$t=s=>{const t=(typeof s=="string"?new Date(s):s)||new Date,e=le[t.getUTCMonth()];return`${t.getUTCDate()} ${e}`};var ue=Object.defineProperty,Ot=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&ue(t,e,a),a};const gt=class gt extends b{render(){return d`
      <span>${$t(this.from)}</span>
      ${this.to?d`<span>&nbsp;&ndash;&nbsp;${$t(this.to)}</span>`:""}
    `}};gt.styles=g`
    span {
      white-space: nowrap;
    }
  `;let A=gt;Ot([u()],A.prototype,"from");Ot([u()],A.prototype,"to");var pe=Object.defineProperty,nt=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&pe(t,e,a),a};const mt=class mt extends b{render(){return d`
      <header
        style="background-image: url(${this.imgSrc});)"
      >
        <a href="${this.href}">
          <h3><slot>Destination</slot></h3>
        </a>
        <p>${this.nights} nights</p>
      </header>
    `}};mt.styles=[w.styles,R.styles,g`
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
    `];let T=mt;nt([u({attribute:"img-src"})],T.prototype,"imgSrc");nt([u()],T.prototype,"href");nt([u()],T.prototype,"nights");var he=Object.defineProperty,at=(s,t,e,r)=>{for(var a=void 0,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=n(t,e,a)||a);return a&&he(t,e,a),a};const ft=class ft extends b{constructor(){super(...arguments),this.mode="unknown"}render(){const e={air:"icon-airplane",rail:"icon-train",unknown:"icon-unknown"}[this.mode];return d`
      <h3>
        <slot name="from">Origin</slot>
        <svg class="icon">
          <use
            href="/icons/transportation.svg#${e}" />
        </svg>
        <slot name="to">Terminus</slot>
        <slot name="via"></slot>
      </h3>
      <slot></slot>
    `}};ft.styles=[w.styles,zt.styles,R.styles,g`
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
    `];let Q=ft;at([u()],Q.prototype,"mode");const vt=class vt extends b{render(){return d`
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
    `}};vt.styles=[w.styles,g`
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
    `];let wt=vt;const yt=class yt extends b{constructor(){super(...arguments),this.localtime="1970-01-01",this.tz="+0000"}render(){const t=new Date(this.localtime),e=t.getHours(),r=t.getMinutes(),a=e<12?"AM":"PM",i=(e>12?e-12:e||12).toString().padStart(2,"0"),n=r.toString().padStart(2,"0"),l=d`
      <span>${i}:${n} ${a}</span>
      <small>${this.tz}</small>
    `,p=this.code?d`<span>(${this.code})</span>`:"";return d`
      <span class="place">
        <slot></slot>${p}
      </span>
      <time datetime="${this.localtime}${this.tz}">
        ${l}
      </time>
    `}};yt.styles=[w.styles,g`
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
    `];let q=yt;at([u()],q.prototype,"localtime");at([u()],q.prototype,"tz");at([u()],q.prototype,"code");var ge=Object.defineProperty,me=Object.getOwnPropertyDescriptor,ot=(s,t,e,r)=>{for(var a=r>1?void 0:r?me(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=(r?n(t,e,a):n(a))||a);return r&&a&&ge(t,e,a),a};const W=class W extends U{constructor(){super("blazing:model"),this.tourId=""}get tour(){return this.model.tour}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="tour-id"&&e!==r&&r&&this.dispatchMessage(["tour/request",{tourid:r}])}updated(t){console.log("Tour page updated:",t)}render(){const{endDate:t,destinations:e=[],transportation:r=[],entourage:a,name:i,startDate:n}=this.tour||{},l=c=>{var m,h;return console.log("isSelected",c.startDate.toISOString(),(m=c.endDate)==null?void 0:m.toISOString(),(h=this.dateSelection)==null?void 0:h.toISOString()),this.dateSelection?c.startDate<=this.dateSelection&&(c.endDate?c.endDate>=this.dateSelection:c.startDate>=this.dateSelection):!0},p=(c,m)=>{const{startDate:h,endDate:v,name:N,featuredImage:J}=c,Pt=Math.ceil((v.getTime()-h.getTime())/(1e3*60*60*24));return d`
        <itinerary-destination
          class=${l(c)?"":"hidden"}
          start-date=${h}
          end-date=${v}
          img-src=${J}
          nights=${Pt}
          href="/app/destination/${this.tourId}/${m}">
          ${N}
        </itinerary-destination>
      `},f=c=>{const m=c.length+1,h=c[0].departure,v=c[c.length-1].arrival,N=m>2?d`
            <span slot="via">
                ${c.slice(1).map(J=>J.departure.station||J.departure.name).join(", ")}
              </span>
          `:null;return d`
        <span
          slot="from">${h.station||h.name}</span>
        <span
          slot="to">${v.station||v.name}</span>
        ${N}
      `},$=c=>{const{startDate:m,type:h,segments:v}=c||{};return d`
        <itinerary-transportation
          class=${l(c)?"":"hidden"}
          start-date=${m}
          mode=${h}>
          ${f(v)}
        </itinerary-transportation>
      `},o=(c,m)=>{const h=r[m],v=r[m+1],N=m>0?"":d`
        <date-range
          class=${l(h)?"":"hidden"}
          from=${h.startDate}
          to="${h.endDate}">
        </date-range>
        ${$(h)}
      `;return d`
        ${N}
        <date-range
          class=${l(c)?"":"hidden"}
          from=${c.startDate}
          to="${c.endDate}">
        </date-range>
        ${p(c,m)}
        <date-range
          class=${l(v)?"":"hidden"}
          from=${v.startDate}
          to="${v.endDate}">
        </date-range>
        ${$(v)}
      `};return console.log("Rendering Tour page",this.tour),d`
      <main>
        <header>
          <h2>${i}</h2>
          <calendar-widget
            @calendar-widget:select=${this._handleSelection}
            @calendar-widget:clear=${this._handleClear}
            start-date=${n}
            end-date=${t}>
          </calendar-widget>
        </header>

        <section class="itinerary">
          ${e.map(o)}
        </section>

        <entourage-table
          href="/app/entourage/${this.tourId}"
          .using=${a}>
        </entourage-table>
      </main>
    `}_handleSelection(t){this.dateSelection=t.detail.date}_handleClear(){this.dateSelection=void 0}};W.uses=C({"calendar-widget":F,"date-range":A,"entourage-table":P,"itinerary-destination":T,"itinerary-transportation":Q}),W.styles=[g`
      :host {
        display: contents;
      }
      h2,
      p {
        margin: 0;
      }
      main {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
          "hd hd hd it it it it it"
          "en en en it it it it it"
          "xx xx xx it it it it it";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }

      header {
        grid-area: hd;
      }

      .itinerary {
        display: grid;
        grid-area: it;
        align-self: start;
        grid-template-columns: subgrid [start] [header] [] [] [end];
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;

        .hidden {
          display: none;
        }
      }

      map-viewer {
        grid-area: mv;
      }

      entourage-table {
        grid-area: en;
        display: grid;
        grid-template-columns: subgrid;
      }

      date-range {
        text-align: right;
        font-family: var(--font-family-display);
        color: var(--color-accent);
      }
    `];let I=W;ot([u({attribute:"tour-id"})],I.prototype,"tourId",2);ot([y()],I.prototype,"dateSelection",2);ot([y()],I.prototype,"tour",1);var fe=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,dt=(s,t,e,r)=>{for(var a=r>1?void 0:r?ve(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=(r?n(t,e,a):n(a))||a);return r&&a&&fe(t,e,a),a};const E=class E extends U{constructor(){super("blazing:model"),this.mode="view"}get traveler(){return this.model.profile}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{userid:t,name:e,nickname:r,home:a,airports:i=[],avatar:n,color:l}=this.traveler||{};return d`
        <button @click=${()=>{this.mode="edit"}}>
          Edit
        </button>
      <img src=${n} alt=${e} />
      <h1>${e}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${t}</dd>
        <dt>Nickname</dt>
        <dd>${r}</dd>
        <dt>Home City</dt>
        <dd>${a}</dd>
        <dt>Airports</dt>
        <dd>${i.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: ${l}"></span>
          </slot>
          <slot name="color-name">${l}</slot>
        </dd>
      </dl>
      </section>
      </template>`}renderEditor(){const{name:t,avatar:e,airports:r=[]}=this.traveler||{},a={...this.traveler,airports:r.join(" ")};return d`
      <mu-form
        .init=${a}
        @mu-form:submit=${this.handleSubmit}
    }>
        <img src=${e} alt=${t} />
        <h1><input name="name"></h1>
        <dl>
          <dt>Avatar</dt>
          <dd>
            <input
              type="file"
              @change=${i=>{const l=i.target.files;l&&l.length&&this.handleAvatarSelected(l)}}
            />
          </dd>
          <dt>Nickname</dt>
          <dd><input name="nickname"></dd>
          <dt>Home City</dt>
          <dd><input name="home"></dd>
          <dt>Airports</dt>
          <dd><input name="airports"></dd>
          <dt>Favorite Color</dt>
          <dd>
            <input type="color" name="color">
          </dd>
        </dl>
      </mu-form>`}attributeChangedCallback(t,e,r){super.attributeChangedCallback(t,e,r),t==="user-id"&&e!==r&&r&&this.dispatchMessage(["profile/request",{userid:r}])}handleSubmit(t){const e={...this.traveler,...t.detail};"airports"in t.detail&&(e.airports=t.detail.airports.split(" ")),this._avatar&&(e.avatar=this._avatar),this.userid&&this.dispatchMessage(["profile/save",{userid:this.userid,profile:e},{onSuccess:()=>this.mode="view",onFailure:r=>{console.log("Error saving profile",r)}}])}handleAvatarSelected(t){t&&t.length&&new Promise((r,a)=>{const i=new FileReader;i.onload=()=>r(i.result),i.onerror=n=>a(n),i.readAsDataURL(t[0])}).then(r=>this._avatar=r)}};E.uses=C({"mu-form":Ct.Element}),E.styles=[w.styles,R.styles,g`
    :host {
      display: contents;
      grid-column: 2/-2;
      display: grid;
      grid-template-columns: subgrid;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    h1 {
      grid-row: 4;
      grid-column: auto / span 2;
    }
    img {
      display: block;
      grid-column: auto / span 2;
      grid-row: 1 / span 4;
    }
    .swatch {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
    }
    dl {
      display: grid;
      grid-column: 1 / -1;
      grid-row: 5 / auto;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      grid-column: 1 / span 2;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: 3 / -1;
    }
    mu-form {
      display: contents;
    }
    input {
     margin: var(--size-spacing-medium) 0;
     font: inherit;
    }
  `];let j=E;dt([u({attribute:"user-id"})],j.prototype,"userid",2);dt([y()],j.prototype,"traveler",1);dt([u()],j.prototype,"mode",2);const ye=[{auth:"protected",path:"/app/destination/:tourId/:index/edit",view:s=>d`
      <destination-edit
        tour-id=${s.tourId}
        index=${s.index}>
      </destination-edit>
    `},{auth:"protected",path:"/app/destination/:tourId/:index",view:s=>d`
      <destination-view
        tour-id=${s.tourId}
        index=${s.index}>
      </destination-view>
    `},{auth:"protected",path:"/app/tour/:id",view:s=>d`
      <tour-view tour-id=${s.id}>
      </tour-view>
    `},{auth:"protected",path:"/app/entourage/:id",view:s=>d`
      <entourage-view tour-id=${s.id}>
      </entourage-view>
    `},{auth:"protected",path:"/app/profile/:id",view:s=>d`
      <profile-view user-id=${s.id}>
      </profile-view>
    `},{auth:"protected",path:"/app/profile/:id/edit",view:s=>d`
      <profile-view user-id=${s.id} mode="edit">
      </profile-view>
    `},{path:"/app",view:()=>d`<home-view></home-view>`},{path:"/",redirect:"/app"}];class be extends b{render(){return d`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),x.initializeOnce()}}C({"mu-auth":D.Provider,"mu-history":it.Provider,"mu-store":class extends Ut.Provider{constructor(){super(Jt,qt,"blazing:auth")}},"mu-switch":class extends jt.Element{constructor(){super(ye,"blazing:history","blazing:auth")}},"blazing-app":be,"blazing-header":x,"destination-view":_,"destination-edit":z,"entourage-view":M,"home-view":B,"profile-view":j,"tour-view":I});x.initializeOnce();
