import{i as u,x as m,r as p,h as D,a as g,O as b,d as f,n as $,b as z,c as k}from"./state-By6HLBIX.js";import{H as y}from"./header-BPxdGmxf.js";import{i as C}from"./icon.css-JrZfBXGW.js";const O=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],h=s=>{const e=(typeof s=="string"?new Date(s):s)||new Date,t=O[e.getUTCMonth()];return`${e.getUTCDate()} ${t}`};function _(s){const e=s;let t=s;return t.startDate=new Date(e.startDate),t.endDate=new Date(e.endDate),t}const c=class c extends u{render(){return m`<section>
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
    </template>`}};c.styles=[p.styles,D.styles,C.styles,g`
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
  `];let o=c;var S=Object.defineProperty,v=(s,e,t,r)=>{for(var a=void 0,i=s.length-1,l;i>=0;i--)(l=s[i])&&(a=l(e,t,a)||a);return a&&S(e,t,a),a};const d=class d extends u{constructor(){super(...arguments),this._authObserver=new b(this,"blazing:auth")}render(){const{name:e,startDate:t,endDate:r,featuredImage:a}=this.destination||{};return m`
        <header>
          <h2>${e}</h2>
          <p>
            from ${h(t)} to
            ${h(r)}
            ${r&&r.getFullYear()}
          </p>
        </header>
        <img class="hero" src=${a} />
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(e){fetch(e,{headers:this.authorization}).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.destination=_(t)).catch(t=>console.log(`Failed to render data ${e}:`,t))}};d.uses=f({"accommodation-info":o}),d.styles=[p.styles,g`
      :host {
        display: contents;
      }
      header {
        grid-column: 1 / span 3;
      }
    `];let n=d;v([$()],n.prototype,"src");v([z()],n.prototype,"destination");f({"blz-header":y,"mu-auth":k.Provider,"destination-view":n});y.initializeOnce();
