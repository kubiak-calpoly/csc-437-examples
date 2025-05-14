import{i as b,O as y,x as o,r as k,h as w,a as z,b as _,n as v,d as O,c as x}from"./state-DerlYqys.js";import{H as f}from"./header-DAM_I-nj.js";var C=Object.defineProperty,c=(h,e,t,p)=>{for(var i=void 0,a=h.length-1,n;a>=0;a--)(n=h[a])&&(i=n(e,t,i)||i);return i&&C(e,t,i),i};const u=class u extends b{constructor(){super(...arguments),this.mode="view",this._authObserver=new y(this,"blazing:auth")}render(){const{userid:e,name:t,nickname:p,home:i,airports:a=[],avatar:n,color:m}=this.traveler||{},l=this.mode==="edit";function g(d,s=""){return l?o`<input 
        id="${d}-input"
        name="${d}" 
        value=${s}>`:s}function $(d,s){return l?o`<label for="${d}-input">${s}</label>`:s}return o`
      <p>${l?"":o`
        <button @click=${()=>{this.mode="edit"}}>
          Edit
        </button>
        `}
      </p>
      <img src=${n} alt=${t} />
      <h1>${g("name",t)}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${e}</dd>
        <dt>${$("nickname","Nickname")}</dt>
        <dd>${g("nickname",p)}</dd>
        <dt>Home City</dt>
        <dd>${i}</dd>
        <dt>Airports</dt>
        <dd>${a.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: #${m}"></span>
          </slot>
          <slot name="color-name">#${m}</slot>
        </dd>
      </dl>
      </section>
      </template>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(e){fetch(e,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.traveler=t).catch(t=>console.log(`Failed to render data ${e}:`,t))}};u.styles=[k.styles,w.styles,z`
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
      grid-column: 1 / span 4;
      grid-row: 5 / auto;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    dt {
      grid-column: 1 / span 2;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: 3 / -1;
    }
  `];let r=u;c([v()],r.prototype,"src");c([_()],r.prototype,"traveler");c([v()],r.prototype,"mode");O({"blz-header":f,"mu-auth":x.Provider,"profile-view":r});f.initializeOnce();
