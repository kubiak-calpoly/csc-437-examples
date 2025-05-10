import{i as g,x as m,r as h,h as u,a as y,d as v,H as c}from"./header-B9vVfjwr.js";import{n as f,r as b}from"./state-CmAgHQWl.js";var $=Object.defineProperty,p=(o,a,t,i)=>{for(var d=void 0,r=o.length-1,e;r>=0;r--)(e=o[r])&&(d=e(a,t,d)||d);return d&&$(a,t,d),d};const n=class n extends g{render(){const{userid:a,name:t,nickname:i,home:d,airports:r=[],avatar:e,color:l}=this.traveler||{};return m`
      <img src=${e} alt=${t} />
      <h1>${t}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${a}</dd>
        <dt>Nickname</dt>
        <dd>${i}</dd>
        <dt>Home City</dt>
        <dd>${d}</dd>
        <dt>Airports</dt>
        <dd>${r.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: #${l}"></span>
          </slot>
          <slot name="color-name">#${l}</slot>
        </dd>
      </dl>
      </section>
      </template>`}attributeChangedCallback(a,t,i){super.attributeChangedCallback(a,t,i),a==="src"&&t!==i&&i&&this.hydrate(i)}hydrate(a){fetch(a).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.json()}).then(t=>this.traveler=t).catch(t=>console.log(`Failed to render data ${a}:`,t))}};n.styles=[h.styles,u.styles,y`
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
  `];let s=n;p([f()],s.prototype,"src");p([b()],s.prototype,"traveler");v({"blz-header":c,"profile-view":s});c.initializeOnce();
