import{i as y,x as l,r as v,h as z,a as $,O as w,d as b,f as k,n as D,b as O,c as C}from"./state-By6HLBIX.js";import{H as S}from"./header-BPxdGmxf.js";import{i as x}from"./icon.css-JrZfBXGW.js";const _=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],g=i=>{const e=(typeof i=="string"?new Date(i):i)||new Date,t=_[e.getUTCMonth()];return`${e.getUTCDate()} ${t}`};function f(i){const e=i;let t=i;return t.startDate=new Date(e.startDate),t.endDate=new Date(e.endDate),t}const p=class p extends y{render(){return l`<section>
        <h3>
          <svg class="icon">
            <use xlink:href="/icons/destination.svg#icon-hotel" />
          </svg>
          <slot name="name">Accommodation</slot>
        </h3>
        <dl>
          <dt>Check-in</dt>
          <dd>
            <slot name="check-in">
              <time datetime="1970-01-01">dd-Mmm</time>
            </slot>
          </dd>
          <dt>Check-out</dt>
          <dd>
            <slot name="check-out">
              <time datetime="1970-01-01">dd-Mmm</time>
            </slot> </dd
          ><dt>Room Type</dt>
          <dd>
            <slot name="room-type">Standard</slot>
          </dd>
          <dt>Sleeps</dt>
          <dd>
            <slot name="persons"># </slot>
          </dd>
          <dt>Rate</dt>
          <dd>
            <slot name="room-rate">###</slot>
            <slot name="currency">USD</slot>
          </dd>
        </dl>
      </section>
    </template>`}};p.styles=[v.styles,z.styles,x.styles,$`
    :host {
      display: contents;
    }
    section {
      display: grid;
      grid-area: acc;
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
  `];let h=p;var I=Object.defineProperty,m=(i,e,t,s)=>{for(var n=void 0,d=i.length-1,o;d>=0;d--)(o=i[d])&&(n=o(e,t,n)||n);return n&&I(e,t,n),n};const u=class u extends y{constructor(){super(...arguments),this.mode="view",this._authObserver=new w(this,"blazing:auth")}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{name:e,startDate:t,endDate:s,featuredImage:n}=this.destination||{};return l`
        <header>

          <h2>${e}</h2>
          <p>
            from ${g(t)} to
            ${g(s)}
            ${s&&s.getFullYear()}
          </p>
          <nav>
          <button @click=${()=>{this.mode="edit"}}>
            Edit
          </button></nav>
        </header>

        <img class="hero" src=${n} />
    `}renderEditor(){const{name:e,startDate:t,endDate:s,featuredImage:n}=this.destination||{};function d(a,c=""){return l`<input
        id="${a}-input"
        name="${a}"
        value=${c}>`}function o(a,c){return l`<input
        id="${a}-input"
        type="date"
        name="${a}"
        value=${c.toISOString().substring(0,10)}>`}return l`
      <mu-form @mu-form:submit=${a=>{this.src&&this.handleSubmit(this.src,a.detail)}}>
        <header>
          <h2>${d("name",e)}</h2>
          <dl>
            <dt>from</dt>
            <dd>${o("startDate",t)}</dd>
            <dt>to</dt>
            <dd>${o("endDate",s)}</dd>
          </dl>
        </header>
        <img class="hero" src=${n} />
      </mu-form>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(e){fetch(e,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.destination=f(t)).catch(t=>console.log(`Failed to render data ${e}:`,t))}handleSubmit(e,t){fetch(e,{headers:{"Content-Type":"application/json",...this.authorization},method:"PUT",body:JSON.stringify(t)}).then(s=>{if(s.status!==200)throw`Status: ${s.status}`;return s.json()}).then(s=>{this.destination=f(s),this.mode="view"})}};u.uses=b({"accommodation-info":h,"mu-form":k.Element}),u.styles=[v.styles,$`
      :host {
        display: contents;
      }
      header {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / span 4;
        grid-auto-flow: dense;
      }
    mu-form {
      display: contents;
    }
    nav {
      grid-column: auto / -1;
      text-align: right;
    }
    h2 {
      grid-column: 1 / span 3;
    }
    p {
      grid-column: 2 / -1;
    }
    input {
     margin: var(--size-spacing-medium) 0;
     font: inherit;
    }
    dl {
      display: grid;
      grid-column: 1 / span 4;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: span 3 / -1;
    }
    `];let r=u;m([D()],r.prototype,"src");m([O()],r.prototype,"destination");m([D()],r.prototype,"mode");b({"blz-header":S,"mu-auth":C.Provider,"destination-view":r});S.initializeOnce();
