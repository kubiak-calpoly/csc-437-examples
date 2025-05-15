import{i as $,O as f,d as b,f as y,x as h,r as w,h as k,a as _,b as z,n as v}from"./state-By6HLBIX.js";var A=Object.defineProperty,p=(g,e,t,a)=>{for(var r=void 0,i=g.length-1,s;i>=0;i--)(s=g[i])&&(r=s(e,t,r)||r);return r&&A(e,t,r),r};const u=class u extends ${constructor(){super(...arguments),this.mode="view",this._authObserver=new f(this,"blazing:auth")}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{userid:e,name:t,nickname:a,home:r,airports:i=[],avatar:s,color:n}=this.traveler||{};return h`
        <button @click=${()=>{this.mode="edit"}}>
          Edit
        </button>
      <img src=${s} alt=${t} />
      <h1>${t}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${e}</dd>
        <dt>Nickname</dt>
        <dd>${a}</dd>
        <dt>Home City</dt>
        <dd>${r}</dd>
        <dt>Airports</dt>
        <dd>${i.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: ${n}"></span>
          </slot>
          <slot name="color-name">${n}</slot>
        </dd>
      </dl>
      </section>
      </template>`}renderEditor(){const{name:e,nickname:t,home:a,airports:r=[],avatar:i,color:s}=this.traveler||{};function n(d,c=""){return h`<input
        id="${d}-input"
        name="${d}"
        value=${c}>`}function o(d,c){return h`<label for="${d}-input">${c}</label>`}return h`
      <mu-form @mu-form:submit=${d=>{this.src&&this.handleSubmit(this.src,d.detail)}}>
        <label>
          <span>Avatar</span>

        </label>
        <img src=${i} alt=${e} />
        <h1>${n("name",e)}</h1>
        <dl>
          <dt>${o("_nickname","Avatar")}</dt>
          <dd>
            <input
              id="_avatar-input"
              type="file"
              name="_avatar"
              @change=${d=>{const m=d.target.files;m&&m.length&&this.handleAvatarSelected(m)}}
            />
          </dd>
          <dt>${o("nickname","Nickname")}</dt>
          <dd>${n("nickname",t)}</dd>
          <dt>${o("home","Home City")}</dt>
          <dd>${n("home",a)}</dd>
          <dt>${o("airports","Airports")}</dt>
          <dd>
            ${n("airports",r.join(", "))}
          </dd>
          <dt>${o("color","Favorite Color")}</dt>
          <dd>
            <input id="color-input" type="color" name="color" value="${s}">
          </dd>
        </dl>
      </mu-form>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(e){fetch(e,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.traveler=t).catch(t=>console.log(`Failed to render data ${e}:`,t))}handleSubmit(e,t){this._avatar&&(t.avatar=this._avatar),fetch(e,{headers:{"Content-Type":"application/json",...this.authorization},method:"PUT",body:JSON.stringify(t)}).then(a=>{if(a.status!==200)throw`Status: ${a.status}`;return a.json()}).then(a=>{const r=a;this.traveler=r,this.mode="view"})}handleAvatarSelected(e){e&&e.length&&new Promise((a,r)=>{const i=new FileReader;i.onload=()=>a(i.result),i.onerror=s=>r(s),i.readAsDataURL(e[0])}).then(a=>this._avatar=a)}};u.uses=b({"mu-form":y.Element}),u.styles=[w.styles,k.styles,_`
    :host {
      display: contents;
      grid-column: 2/-2;
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
  `];let l=u;p([v()],l.prototype,"src");p([z()],l.prototype,"traveler");p([v()],l.prototype,"mode");export{l as P};
