import{i as y,x as h,r as v,h as _,a as b,O as C,d as S,f as O,n as w,b as $,c as k}from"./state-By6HLBIX.js";import{H as z}from"./header-BPxdGmxf.js";import{i as T}from"./icon.css-JrZfBXGW.js";const U=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],p=r=>{const t=(typeof r=="string"?new Date(r):r)||new Date,e=U[t.getUTCMonth()];return`${t.getUTCDate()} ${e}`};function f(r){const t=r;let e=r;return e.startDate=new Date(t.startDate),e.endDate=new Date(t.endDate),e}const u=class u extends y{render(){return h`<section>
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
    </template>`}};u.styles=[v.styles,_.styles,T.styles,b`
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
  `];let m=u;var I=Object.defineProperty,c=(r,t,e,n)=>{for(var s=void 0,a=r.length-1,i;a>=0;a--)(i=r[a])&&(s=i(t,e,s)||s);return s&&I(t,e,s),s};const l=class l extends y{constructor(){super(...arguments),this.mode="view",this._authObserver=new C(this,"blazing:auth")}render(){return this.mode==="edit"?this.renderEditor():this.renderView()}renderView(){const{name:t,startDate:e,endDate:n,featuredImage:s}=this.destination||{};return h`
        <header>

          <h2>${t}</h2>
          <p>
            from ${p(e)} to
            ${p(n)}
            ${n&&n.getFullYear()}
          </p>
          <nav>
          <button @click=${()=>{this.mode="edit"}}>
            Edit
          </button></nav>
        </header>

        <img class="hero" src=${s} />
    `}renderEditor(){const{featuredImage:t}=this.destination||{},e=this._image||t,n=this.destination;return console.log("init",n),h`
      <mu-form
        .init=${n}
        @mu-form:submit=${s=>{this.src&&this.handleSubmit(this.src,s.detail)}}>
        <header>
          <h2><input name="name"></h2>
          <dl>
            <dt>"From date"</dt>
            <dd><input name="startDate" type="date"></dd>
            <dt>To date</dt>
            <dd><input name="endDate" type="date"></dd>
            <dt>Image</dt>
            <dd>
              <input
                type="file"
                @change=${s=>{const i=s.target.files;i&&i.length&&this.handleImageSelected(i)}}
              />
            </dd>
          </dl>
        </header>
        <img class="hero" src=${e} />
      </mu-form>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{this._user=t.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}hydrate(t){fetch(t,{headers:this.authorization}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).then(e=>this.destination=f(e)).catch(e=>console.log(`Failed to render data ${t}:`,e))}handleSubmit(t,e){console.log("Submitting form",e);const n={...this.destination,...e};this._image&&(n.featuredImage=this._image),fetch(t,{headers:{"Content-Type":"application/json",...this.authorization},method:"PUT",body:JSON.stringify(n)}).then(s=>{if(s.status!==200)throw`Status: ${s.status}`;return s.json()}).then(s=>{this.destination=f(s),this.mode="view"})}handleImageSelected(t){t&&t.length&&new Promise((n,s)=>{const a=new FileReader;a.onload=()=>n(a.result),a.onerror=i=>s(i),a.readAsArrayBuffer(t[0])}).then(n=>{const{name:s,size:a,type:i}=t[0],D=new URLSearchParams({filename:s}),g=new URL("/images",document.location.origin);g.search=D.toString(),fetch(g,{method:"POST",headers:{"Content-Type":i,"Content-Length":a.toString(),...this.authorization},body:n}).then(o=>{if(o.status===201)return o.json();throw o.status}).then(o=>{if(o)console.log("Image has been uploaded to",o.url),this._image=o.url;else throw"No JSON response"}).catch(o=>{console.log("Upload failed",o)})})}};l.uses=S({"accommodation-info":m,"mu-form":O.Element}),l.styles=[v.styles,b`
      :host {
        display: contents;
      }
      header {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / span 4;
        grid-auto-flow: dense;
        grid-template-rows: min-content;
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
    img.hero {
      grid-column: auto / span 4;
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
    `];let d=l;c([w()],d.prototype,"src");c([$()],d.prototype,"destination");c([w()],d.prototype,"mode");c([$()],d.prototype,"_image");S({"blz-header":z,"mu-auth":k.Provider,"destination-view":d});z.initializeOnce();
