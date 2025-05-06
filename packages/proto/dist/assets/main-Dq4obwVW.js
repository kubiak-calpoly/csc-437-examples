import{f as A,u as F,i as g,x as l,r as f,a as J,h as w,b as y,d as H,H as S}from"./icon.css-BXaNM7GT.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:A},N=(n=q,s,e)=>{const{kind:i,metadata:a}=e;let r=globalThis.litPropertyMetadata.get(a);if(r===void 0&&globalThis.litPropertyMetadata.set(a,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),i==="accessor"){const{name:t}=e;return{set(o){const c=s.get.call(this);s.set.call(this,o),this.requestUpdate(t,c,n)},init(o){return o!==void 0&&this.C(t,void 0,n,o),o}}}if(i==="setter"){const{name:t}=e;return function(o){const c=this[t];s.call(this,o),this.requestUpdate(t,c,n)}}throw Error("Unsupported decorator location: "+i)};function p(n){return(s,e)=>typeof e=="object"?N(n,s,e):((i,a,r)=>{const t=a.hasOwnProperty(r);return a.constructor.createProperty(r,i),t?Object.getOwnPropertyDescriptor(a,r):void 0})(n,s,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(n){return p({...n,state:!0,attribute:!1})}var R=Object.defineProperty,b=(n,s,e,i)=>{for(var a=void 0,r=n.length-1,t;r>=0;r--)(t=n[r])&&(a=t(s,e,a)||a);return a&&R(s,e,a),a};const P=class P extends g{constructor(){super(...arguments),this.mode="unknown"}render(){const e={air:"icon-airplane",rail:"icon-train",unknown:"icon-unknown"}[this.mode];return l`
      <h3>
        <slot name="from">FCO</slot>
        <svg class="icon">
          <use
            href="/icons/transportation.svg#${e}" />
        </svg>
        <slot name="to">SFO</slot>
        <slot name="via"></slot>
      </h3>
      <slot></slot>
    `}};P.styles=[f.styles,J.styles,w.styles,y`
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
    `];let v=P;b([p()],v.prototype,"mode");const M=class M extends g{render(){return l`
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
    `}};M.styles=[f.styles,y`
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
    `];let D=M;const O=class O extends g{constructor(){super(...arguments),this.localtime="1970-01-01",this.tz="+0000"}render(){const s=new Date(this.localtime),e=s.getHours(),i=s.getMinutes(),a=e<12?"AM":"PM",r=(e>12?e-12:e||12).toString().padStart(2,"0"),t=i.toString().padStart(2,"0"),o=l`
      <span>${r}:${t} ${a}</span>
      <small>${this.tz}</small>
    `,c=this.code?l`<span>(${this.code})</span>`:"";return l`
      <span class="place">
        <slot></slot>${c}
      </span>
      <time datetime="${this.localtime}${this.tz}">
        ${o}
      </time>
    `}};O.styles=[f.styles,y`
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
    `];let m=O;b([p()],m.prototype,"localtime");b([p()],m.prototype,"tz");b([p()],m.prototype,"code");var B=Object.defineProperty,z=(n,s,e,i)=>{for(var a=void 0,r=n.length-1,t;r>=0;r--)(t=n[r])&&(a=t(s,e,a)||a);return a&&B(s,e,a),a};const x=class x extends g{render(){return l`
      <header
        style="background-image: url(${this.imgSrc});)"
      >
        <a href="${this.href}">
          <h3><slot>Destination</slot></h3>
        </a>
        <p>${this.nights} nights</p>
      </header>
    `}};x.styles=[f.styles,w.styles,y`
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
    `];let h=x;z([p({attribute:"img-src"})],h.prototype,"imgSrc");z([p()],h.prototype,"href");z([p()],h.prototype,"nights");var G=Object.defineProperty,C=(n,s,e,i)=>{for(var a=void 0,r=n.length-1,t;r>=0;r--)(t=n[r])&&(a=t(s,e,a)||a);return a&&G(s,e,a),a};const $=class $ extends g{constructor(){super(...arguments),this.destinations=[],this.transportations=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){console.log("Destinations",this.destinations);const s=this.destinations.length,e=this.destinations.map(t=>({startDate:t.startDate,endDate:t.endDate,html:l`
            <blz-destination
              img-src=${t.featuredImage}
              href=${t.link}
              nights=${K(t.startDate,t.endDate)}
            >
              ${t.name}
            </blz-destination>`})),a=this.transportations.map(t=>{const o=t.segments.length,c=l`
            <span slot="from">
              ${t.routing?t.routing[0]:t.segments[0].departure.name}
            </span>
          `,_=l`
            <span slot="to">
              ${t.routing?t.routing[o]:t.segments[o-1].arrival.name}
            </span>
          `,I=o>1&&t.routing?l`
              <span slot="via">${t.routing[1]}</span>
            `:"",U=t.segments.map(d=>l`
                <transportation-segment>
                  <span slot="carrier">${d.carrier}</span>
                  <span slot="number">${d.number}</span>
                  <end-point 
                    slot="departure"
                    localtime=${d.departure.localtime}
                    tz=${d.departure.tz}
                    code=${d.departure.code}
                  >
                    ${d.departure.name}
                  </end-point>
                  <end-point 
                    slot="arrival" 
                    localtime=${d.arrival.localtime} 
                    tz=${d.arrival.tz}
                    code=${d.arrival.code}
                  >
                    ${d.arrival.name}
                  </end-point>
                </transportation-segment>
                `);return{startDate:t.startDate,endDate:t.endDate,html:l`
            <blz-transportation mode=${t.mode}>
              ${c} ${_} ${I}
              ${U}
            </blz-transportation>
          `}}).flatMap((t,o)=>o<s?[t,e[o]]:[t]),r=t=>{const o=l`                
        <time datetime=${t.startDate}>
          ${k(t.startDate)}
        </time>`;if(!t.endDate)return o;const c=l`
        <time datetime=${t.endDate}>
          ${k(t.endDate)}
        </time>`;return l`${o}${c}`};return l`
      <section>
        <h2>Itinerary</h2>
        <dl>
          ${a.map(t=>l`
              <dt>${r(t)}</dt>
              <dd>${t.html}</dd>
            `)}
        </dl>
      </section>
    `}hydrate(s){fetch(s).then(e=>e.json()).then(e=>{if(e){const i=e;this.destinations=i.destinations.map(T),this.transportations=i.transportations.map(T)}})}};$.uses=H({"blz-destination":h,"blz-transportation":v,"transportation-segment":D,"end-point":m}),$.styles=[f.styles,w.styles,y`
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
  `];let u=$;C([p()],u.prototype,"src");C([j()],u.prototype,"destinations");C([j()],u.prototype,"transportations");function K(n,s){const e=s.getTime()-n.getTime();return Math.ceil(e/1e3/3600/24)}function T(n){const s=n,e=s.startDate?new Date(s.startDate):void 0,i=s.endDate?new Date(s.endDate):void 0;return{...n,startDate:e,endDate:i}}const L=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function k(n){const s=L[n.getUTCMonth()];return`${n.getUTCDate()} ${s}`}H({"blz-header":S,"blz-itinerary":u});S.initializeOnce();
