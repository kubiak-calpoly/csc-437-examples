import{i as v,O as b,d as f,f as y,x as u,r as k,h as w,a as _,n as $,b as z}from"./state-By6HLBIX.js";var C=Object.defineProperty,p=(g,e,t,s)=>{for(var r=void 0,i=g.length-1,d;i>=0;i--)(d=g[i])&&(r=d(e,t,r)||r);return r&&C(e,t,r),r};const m=class m extends v{constructor(){super(...arguments),this.mode="view",this._authObserver=new b(this,"blazing:auth")}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{userid:e,name:t,nickname:s,home:r,airports:i=[],avatar:d,color:o}=this.traveler||{};return u`
        <button @click=${()=>{this.mode="edit"}}>
          Edit
        </button>
      <img src=${d} alt=${t} />
      <h1>${t}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${e}</dd>
        <dt>Nickname</dt>
        <dd>${s}</dd>
        <dt>Home City</dt>
        <dd>${r}</dd>
        <dt>Airports</dt>
        <dd>${i.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: #${o}"></span>
          </slot>
          <slot name="color-name">#${o}</slot>
        </dd>
      </dl>
      </section>
      </template>`}renderEditor(){const{userid:e,name:t,nickname:s,home:r,airports:i=[],avatar:d,color:o}=this.traveler||{};function n(c,h=""){return u`<input
        id="${c}-input"
        name="${c}"
        value=${h}>`}function l(c,h){return u`<label for="${c}-input">${h}</label>`}return u`
      <mu-form>
          <button slot="submit">
            Save
          </button>
        <img src=${d} alt=${t} />
        <h1>${n("name",t)}</h1>
        <dl>
          <dt>Username</dt>
          <dd>${e}</dd>
          <dt>${l("nickname","Nickname")}</dt>
          <dd>${n("nickname",s)}</dd>
          <dt>${l("home","Home City")}</dt>
          <dd>${n("home",r)}</dd>
          <dt>${l("airports","Airports")}</dt>
          <dd>
            ${n("airports",i.join(", "))}
          </dd>
          <dt>${l("color","Favorite Color")}</dt>
          <dd>
            <input type="color" name="color" value="#${o}">
          </dd>
        </dl>
      </mu-form>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(e){fetch(e,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.traveler=t).catch(t=>console.log(`Failed to render data ${e}:`,t))}};m.uses=f({"mu-form":y.Element}),m.styles=[k.styles,w.styles,_`
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
  `];let a=m;p([$()],a.prototype,"src");p([z()],a.prototype,"traveler");p([$()],a.prototype,"mode");export{a as P};
