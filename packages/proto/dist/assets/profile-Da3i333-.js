import{i as m,O as p,d as g,f as v,x as c,r as f,h as y,a as b,n as u,c as $}from"./state-BVmPQKQF.js";var w=Object.defineProperty,l=(h,r,t,a)=>{for(var e=void 0,i=h.length-1,s;i>=0;i--)(s=h[i])&&(e=s(r,t,e)||e);return e&&w(r,t,e),e};const o=class o extends m{constructor(){super(...arguments),this.mode="view",this._authObserver=new p(this,"blazing:auth")}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{userid:r,name:t,nickname:a,home:e,airports:i=[],avatar:s,color:d}=this.traveler||{};return c`
        <button @click=${()=>{this.mode="edit"}}>
          Edit
        </button>
      <img src=${s} alt=${t} />
      <h1>${t}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${r}</dd>
        <dt>Nickname</dt>
        <dd>${a}</dd>
        <dt>Home City</dt>
        <dd>${e}</dd>
        <dt>Airports</dt>
        <dd>${i.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: ${d}"></span>
          </slot>
          <slot name="color-name">${d}</slot>
        </dd>
      </dl>
      </section>
      </template>`}renderEditor(){const{name:r,avatar:t,airports:a=[]}=this.traveler||{},e={...this.traveler,airports:a.join(" ")};return c`
      <mu-form 
        .init=${e}
        @mu-form:submit=${i=>{this.src&&this.handleSubmit(this.src,i.detail)}}>
        <img src=${t} alt=${r} />
        <h1><input name="name"></h1>
        <dl>
          <dt>Avatar</dt>
          <dd>
            <input
              type="file"
              @change=${i=>{const d=i.target.files;d&&d.length&&this.handleAvatarSelected(d)}}
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
      </mu-form>`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(r=>{this._user=r.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(r){fetch(r,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.traveler=t).catch(t=>console.log(`Failed to render data ${r}:`,t))}handleSubmit(r,t){const a={...this.traveler,...t};"airports"in t&&(a.airports=t.airports.split(" ")),this._avatar&&(a.avatar=this._avatar),fetch(r,{headers:{"Content-Type":"application/json",...this.authorization},method:"PUT",body:JSON.stringify(a)}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).then(e=>{this.traveler=e,this.mode="view"})}handleAvatarSelected(r){r&&r.length&&new Promise((a,e)=>{const i=new FileReader;i.onload=()=>a(i.result),i.onerror=s=>e(s),i.readAsDataURL(r[0])}).then(a=>this._avatar=a)}};o.uses=g({"mu-form":v.Element}),o.styles=[f.styles,y.styles,b`
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
  `];let n=o;l([u()],n.prototype,"src");l([$()],n.prototype,"traveler");l([u()],n.prototype,"mode");export{n as P};
