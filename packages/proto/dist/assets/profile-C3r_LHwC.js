import{i as v,O as f,d as b,f as y,x as u,r as w,h as k,a as z,n as $,b as C}from"./state-By6HLBIX.js";var _=Object.defineProperty,p=(g,e,t,i)=>{for(var r=void 0,s=g.length-1,a;s>=0;s--)(a=g[s])&&(r=a(e,t,r)||r);return r&&_(e,t,r),r};const h=class h extends v{constructor(){super(...arguments),this.mode="view",this._authObserver=new f(this,"blazing:auth")}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{userid:e,name:t,nickname:i,home:r,airports:s=[],avatar:a,color:o}=this.traveler||{};return u`
        <button @click=${()=>{this.mode="edit"}}>
          Edit
        </button>
      <img src=${a} alt=${t} />
      <h1>${t}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${e}</dd>
        <dt>Nickname</dt>
        <dd>${i}</dd>
        <dt>Home City</dt>
        <dd>${r}</dd>
        <dt>Airports</dt>
        <dd>${s.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: ${o}"></span>
          </slot>
          <slot name="color-name">${o}</slot>
        </dd>
      </dl>
      </section>
      </template>`}renderEditor(){const{userid:e,name:t,nickname:i,home:r,airports:s=[],avatar:a,color:o}=this.traveler||{};function l(d,m=""){return u`<input
        id="${d}-input"
        name="${d}"
        value=${m}>`}function c(d,m){return u`<label for="${d}-input">${m}</label>`}return u`
      <mu-form @mu-form:submit=${d=>{this.src&&this.handleSubmit(this.src,d.detail)}}>
        <img src=${a} alt=${t} />
        <h1>${l("name",t)}</h1>
        <dl>
          <dt>Username</dt>
          <dd>${e}</dd>
          <dt>${c("nickname","Nickname")}</dt>
          <dd>${l("nickname",i)}</dd>
          <dt>${c("home","Home City")}</dt>
          <dd>${l("home",r)}</dd>
          <dt>${c("airports","Airports")}</dt>
          <dd>
            ${l("airports",s.join(", "))}
          </dd>
          <dt>${c("color","Favorite Color")}</dt>
          <dd>
            <input type="color" name="color" value="${o}">
          </dd>
        </dl>
      </mu-form>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(e){fetch(e,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.traveler=t).catch(t=>console.log(`Failed to render data ${e}:`,t))}handleSubmit(e,t){fetch(e,{headers:{"Content-Type":"application/json",...this.authorization},method:"PUT",body:JSON.stringify(t)}).then(i=>{if(i.status!==200)throw`Status: ${i.status}`;return i.json()}).then(i=>{const r=i;this.traveler=r,this.mode="view"})}};h.uses=b({"mu-form":y.Element}),h.styles=[w.styles,k.styles,z`
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
  `];let n=h;p([$()],n.prototype,"src");p([C()],n.prototype,"traveler");p([$()],n.prototype,"mode");export{n as P};
