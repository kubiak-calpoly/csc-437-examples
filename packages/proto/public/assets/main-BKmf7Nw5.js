import{i as g,x as n,r as f,h as z,a as v,n as c,d as O,b as S,c as j}from"./state-By6HLBIX.js";import{H as _}from"./header-BPxdGmxf.js";import{i as J}from"./icon.css-JrZfBXGW.js";var U=Object.defineProperty,b=(o,s,e,l)=>{for(var a=void 0,r=o.length-1,t;r>=0;r--)(t=o[r])&&(a=t(s,e,a)||a);return a&&U(s,e,a),a};const x=class x extends g{constructor(){super(...arguments),this.mode="unknown"}render(){const e={air:"icon-airplane",rail:"icon-train",unknown:"icon-unknown"}[this.mode];return n`
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
    `}};x.styles=[f.styles,J.styles,z.styles,v`
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
    `];let $=x;b([c()],$.prototype,"mode");const k=class k extends g{render(){return n`
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
    `}};k.styles=[f.styles,v`
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
    `];let D=k;const M=class M extends g{constructor(){super(...arguments),this.localtime="1970-01-01",this.tz="+0000"}render(){const s=new Date(this.localtime),e=s.getHours(),l=s.getMinutes(),a=e<12?"AM":"PM",r=(e>12?e-12:e||12).toString().padStart(2,"0"),t=l.toString().padStart(2,"0"),i=n`
      <span>${r}:${t} ${a}</span>
      <small>${this.tz}</small>
    `,u=this.code?n`<span>(${this.code})</span>`:"";return n`
      <span class="place">
        <slot></slot>${u}
      </span>
      <time datetime="${this.localtime}${this.tz}">
        ${i}
      </time>
    `}};M.styles=[f.styles,v`
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
    `];let m=M;b([c()],m.prototype,"localtime");b([c()],m.prototype,"tz");b([c()],m.prototype,"code");var N=Object.defineProperty,w=(o,s,e,l)=>{for(var a=void 0,r=o.length-1,t;r>=0;r--)(t=o[r])&&(a=t(s,e,a)||a);return a&&N(s,e,a),a};const P=class P extends g{render(){return n`
      <header
        style="background-image: url(${this.imgSrc});)"
      >
        <a href="${this.href}">
          <h3><slot>Destination</slot></h3>
        </a>
        <p>${this.nights} nights</p>
      </header>
    `}};P.styles=[f.styles,z.styles,v`
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
    `];let p=P;w([c({attribute:"img-src"})],p.prototype,"imgSrc");w([c()],p.prototype,"href");w([c()],p.prototype,"nights");var R=Object.defineProperty,C=(o,s,e,l)=>{for(var a=void 0,r=o.length-1,t;r>=0;r--)(t=o[r])&&(a=t(s,e,a)||a);return a&&R(s,e,a),a};const y=class y extends g{constructor(){super(...arguments),this.destinations=[],this.transportations=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){console.log("Destinations",this.destinations);const s=this.destinations.length,e=this.destinations.map(t=>({startDate:t.startDate,endDate:t.endDate,html:n`
            <blz-destination
              img-src=${t.featuredImage}
              href=${t.link}
              nights=${q(t.startDate,t.endDate)}
            >
              ${t.name}
            </blz-destination>`})),a=this.transportations.map(t=>{const i=t.segments.length,u=n`
            <span slot="from">
              ${t.routing?t.routing[0]:t.segments[0].departure.name}
            </span>
          `,I=n`
            <span slot="to">
              ${t.routing?t.routing[i]:t.segments[i-1].arrival.name}
            </span>
          `,A=i>1&&t.routing?n`
              <span slot="via">${t.routing[1]}</span>
            `:"",F=t.segments.map(d=>n`
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
                `);return{startDate:t.startDate,endDate:t.endDate,html:n`
            <blz-transportation mode=${t.mode}>
              ${u} ${I} ${A}
              ${F}
            </blz-transportation>
          `}}).flatMap((t,i)=>i<s?[t,e[i]]:[t]),r=t=>{const i=n`                
        <time datetime=${t.startDate}>
          ${H(t.startDate)}
        </time>`;if(!t.endDate)return i;const u=n`
        <time datetime=${t.endDate}>
          ${H(t.endDate)}
        </time>`;return n`${i}${u}`};return n`
      <section>
        <h2>Itinerary</h2>
        <dl>
          ${a.map(t=>n`
              <dt>${r(t)}</dt>
              <dd>${t.html}</dd>
            `)}
        </dl>
      </section>
    `}hydrate(s){fetch(s).then(e=>e.json()).then(e=>{if(e){const l=e;this.destinations=l.destinations.map(T),this.transportations=l.transportations.map(T)}})}};y.uses=O({"blz-destination":p,"blz-transportation":$,"transportation-segment":D,"end-point":m}),y.styles=[f.styles,z.styles,v`
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
  `];let h=y;C([c()],h.prototype,"src");C([S()],h.prototype,"destinations");C([S()],h.prototype,"transportations");function q(o,s){const e=s.getTime()-o.getTime();return Math.ceil(e/1e3/3600/24)}function T(o){const s=o,e=s.startDate?new Date(s.startDate):void 0,l=s.endDate?new Date(s.endDate):void 0;return{...o,startDate:e,endDate:l}}const B=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function H(o){const s=B[o.getUTCMonth()];return`${o.getUTCDate()} ${s}`}O({"blz-header":_,"blz-itinerary":h,"mu-auth":j.Provider});_.initializeOnce();
