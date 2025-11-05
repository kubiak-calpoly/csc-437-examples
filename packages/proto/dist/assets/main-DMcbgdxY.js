import{i as g,x as n,r as f,h as z,a as v,n as c,O as J,d as T,b as H,c as S}from"./state-BVmPQKQF.js";import{H as I}from"./header-go4onkW3.js";import{i as U}from"./icon.css-RgkUvfMu.js";var N=Object.defineProperty,b=(r,e,s,d)=>{for(var a=void 0,o=r.length-1,t;o>=0;o--)(t=r[o])&&(a=t(e,s,a)||a);return a&&N(e,s,a),a};const O=class O extends g{constructor(){super(...arguments),this.mode="unknown"}render(){const s={air:"icon-airplane",rail:"icon-train",unknown:"icon-unknown"}[this.mode];return n`
      <h3>
        <slot name="from">FCO</slot>
        <svg class="icon">
          <use
            href="/icons/transportation.svg#${s}" />
        </svg>
        <slot name="to">SFO</slot>
        <slot name="via"></slot>
      </h3>
      <slot></slot>
    `}};O.styles=[f.styles,U.styles,z.styles,v`
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
    `];let $=O;b([c()],$.prototype,"mode");const _=class _ extends g{render(){return n`
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
    `}};_.styles=[f.styles,v`
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
    `];let D=_;const x=class x extends g{constructor(){super(...arguments),this.localtime="1970-01-01",this.tz="+0000"}render(){const e=new Date(this.localtime),s=e.getHours(),d=e.getMinutes(),a=s<12?"AM":"PM",o=(s>12?s-12:s||12).toString().padStart(2,"0"),t=d.toString().padStart(2,"0"),i=n`
      <span>${o}:${t} ${a}</span>
      <small>${this.tz}</small>
    `,u=this.code?n`<span>(${this.code})</span>`:"";return n`
      <span class="place">
        <slot></slot>${u}
      </span>
      <time datetime="${this.localtime}${this.tz}">
        ${i}
      </time>
    `}};x.styles=[f.styles,v`
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
    `];let m=x;b([c()],m.prototype,"localtime");b([c()],m.prototype,"tz");b([c()],m.prototype,"code");var R=Object.defineProperty,w=(r,e,s,d)=>{for(var a=void 0,o=r.length-1,t;o>=0;o--)(t=r[o])&&(a=t(e,s,a)||a);return a&&R(e,s,a),a};const k=class k extends g{render(){return n`
      <header
        style="background-image: url(${this.imgSrc});)"
      >
        <a href="${this.href}">
          <h3><slot>Destination</slot></h3>
        </a>
        <p>${this.nights} nights</p>
      </header>
    `}};k.styles=[f.styles,z.styles,v`
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
    `];let p=k;w([c({attribute:"img-src"})],p.prototype,"imgSrc");w([c()],p.prototype,"href");w([c()],p.prototype,"nights");var q=Object.defineProperty,C=(r,e,s,d)=>{for(var a=void 0,o=r.length-1,t;o>=0;o--)(t=r[o])&&(a=t(e,s,a)||a);return a&&q(e,s,a),a};const y=class y extends g{constructor(){super(...arguments),this.destinations=[],this.transportations=[],this._authObserver=new J(this,"blazing:auth")}render(){console.log("Destinations",this.destinations);const e=this.destinations.length,s=this.destinations.map(t=>({startDate:t.startDate,endDate:t.endDate,html:n`
            <blz-destination
              img-src=${t.featuredImage}
              href=${t.link}
              nights=${B(t.startDate,t.endDate)}
            >
              ${t.name}
            </blz-destination>`})),a=this.transportations.map(t=>{const i=t.segments.length,u=n`
            <span slot="from">
              ${t.routing?t.routing[0]:t.segments[0].departure.name}
            </span>
          `,A=n`
            <span slot="to">
              ${t.routing?t.routing[i]:t.segments[i-1].arrival.name}
            </span>
          `,F=i>1&&t.routing?n`
              <span slot="via">${t.routing[1]}</span>
            `:"",j=t.segments.map(l=>n`
                <transportation-segment>
                  <span slot="carrier">${l.carrier}</span>
                  <span slot="number">${l.number}</span>
                  <end-point 
                    slot="departure"
                    localtime=${l.departure.localtime}
                    tz=${l.departure.tz}
                    code=${l.departure.code}
                  >
                    ${l.departure.name}
                  </end-point>
                  <end-point 
                    slot="arrival" 
                    localtime=${l.arrival.localtime} 
                    tz=${l.arrival.tz}
                    code=${l.arrival.code}
                  >
                    ${l.arrival.name}
                  </end-point>
                </transportation-segment>
                `);return{startDate:t.startDate,endDate:t.endDate,html:n`
            <blz-transportation mode=${t.mode}>
              ${u} ${A} ${F}
              ${j}
            </blz-transportation>
          `}}).flatMap((t,i)=>i<e?[t,s[i]]:[t]),o=t=>{const i=n`                
        <time datetime=${t.startDate}>
          ${P(t.startDate)}
        </time>`;if(!t.endDate)return i;const u=n`
        <time datetime=${t.endDate}>
          ${P(t.endDate)}
        </time>`;return n`${i}${u}`};return n`
      <section>
        <h2>Itinerary</h2>
        <dl>
          ${a.map(t=>n`
              <dt>${o(t)}</dt>
              <dd>${t.html}</dd>
            `)}
        </dl>
      </section>
    `}get authorization(){return this._user?H.headers(this._user):{}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}hydrate(e){fetch(e,{headers:this.authorization}).then(s=>s.json()).then(s=>{if(s){const d=s;this.destinations=d.destinations.map(M),this.transportations=d.transportation.map(M)}})}};y.uses=T({"blz-destination":p,"blz-transportation":$,"transportation-segment":D,"end-point":m}),y.styles=[f.styles,z.styles,v`
    :host {
      display: contents;
    }
    section {
      display: grid;
      grid-area: var(--grid-area);
      grid-template-columns: subgrid [start] [header] [] [] [highlights] [] [end];
      gap: var(--size-spacing-medium);
      align-items: baseline;
      margin: var(--size-spacing-small);

      > dl {
        display: contents;
        > dt {
          grid-column: start;
          text-align: right;
          font-family: var(--font-family-display);
          font-weight: var(--font-weight-bold);
        }
        > dd {
          display: grid;
          grid-template-columns: subgrid;
          grid-column: header / end;
        }
      }
      
      time + time::before {
        content: "–";
      }
    }
  `];let h=y;C([c()],h.prototype,"src");C([S()],h.prototype,"destinations");C([S()],h.prototype,"transportations");function B(r,e){const s=e.getTime()-r.getTime();return Math.ceil(s/1e3/3600/24)}function M(r){const e=r,s=e.startDate?new Date(e.startDate):void 0,d=e.endDate?new Date(e.endDate):void 0;return{...r,startDate:s,endDate:d}}const G=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function P(r){const e=G[r.getUTCMonth()];return`${r.getUTCDate()} ${e}`}T({"blz-header":I,"blz-itinerary":h,"mu-auth":H.Provider});I.initializeOnce();
