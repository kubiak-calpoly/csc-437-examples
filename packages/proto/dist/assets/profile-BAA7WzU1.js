import{i as b,O as f,x as o,r as y,h as k,a as w,b as _,n as v}from"./state-DerlYqys.js";var z=Object.defineProperty,c=(h,e,t,p)=>{for(var r=void 0,s=h.length-1,n;s>=0;s--)(n=h[s])&&(r=n(e,t,r)||r);return r&&z(e,t,r),r};const u=class u extends b{constructor(){super(...arguments),this.mode="view",this._authObserver=new f(this,"blazing:auth")}render(){const{userid:e,name:t,nickname:p,home:r,airports:s=[],avatar:n,color:m}=this.traveler||{},l=this.mode==="edit";function g(d,i=""){return l?o`<input 
        id="${d}-input"
        name="${d}" 
        value=${i}>`:i}function $(d,i){return l?o`<label for="${d}-input">${i}</label>`:i}return o`
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
        <dd>${r}</dd>
        <dt>Airports</dt>
        <dd>${s.join(", ")}</dd>
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
      </template>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(e){fetch(e,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.traveler=t).catch(t=>console.log(`Failed to render data ${e}:`,t))}};u.styles=[y.styles,k.styles,w`
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
  `];let a=u;c([v()],a.prototype,"src");c([_()],a.prototype,"traveler");c([v()],a.prototype,"mode");export{a as P};
