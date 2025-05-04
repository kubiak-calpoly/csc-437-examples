(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();var $t,be;class rt extends Error{}rt.prototype.name="InvalidTokenError";function Ls(n){return decodeURIComponent(atob(n).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function Hs(n){let t=n.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Ls(t)}catch{return atob(t)}}function Ds(n,t){if(typeof n!="string")throw new rt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=n.split(".")[e];if(typeof s!="string")throw new rt(`Invalid token specified: missing part #${e+1}`);let i;try{i=Hs(s)}catch(o){throw new rt(`Invalid token specified: invalid base64 for part #${e+1} (${o.message})`)}try{return JSON.parse(i)}catch(o){throw new rt(`Invalid token specified: invalid json for part #${e+1} (${o.message})`)}}function Is(n,t){const e=Ge(t,n);return new Promise((s,i)=>{if(e){const o=e.localName;customElements.whenDefined(o).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Ge(n,t){const e=`[provides="${n}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Ge(n,i.host)}class js extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function Qe(n="mu:message"){return(t,...e)=>t.dispatchEvent(new js(e,n))}class ee{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function Vs(n){return t=>({...t,...n})}const Gt="mu:auth:jwt",Xe=class ts extends ee{constructor(t,e){super((s,i)=>this.update(s,i),t,ts.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(Bs(s)),Bt(i);case"auth/signout":return e(Ws()),Bt(this._redirectForLogin);case"auth/redirect":return Bt(this._redirectForLogin,{next:window.location.href});default:const o=t[0];throw new Error(`Unhandled Auth message "${o}"`)}}};Xe.EVENT_TYPE="auth:message";let Fs=Xe;const qs=Qe(Fs.EVENT_TYPE);function Bt(n,t={}){if(!n)return;const e=window.location.href,s=new URL(n,e);return Object.entries(t).forEach(([i,o])=>s.searchParams.set(i,o)),()=>{console.log("Redirecting to ",n),window.location.assign(s)}}class At{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(Gt),t}}class wt extends At{constructor(t){super();const e=Ds(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new wt(t);return localStorage.setItem(Gt,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(Gt);return t?wt.authenticate(t):new At}}function Bs(n){return Vs({user:wt.authenticate(n),token:n})}function Ws(){return n=>{const t=n.user;return{user:t&&t.authenticated?At.deauthenticate(t):t,token:""}}}function Et(n,t,e){const s=n.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${n.type}:`,i),s.dispatchEvent(i),n.stopPropagation()}function Qt(n,t="*"){return n.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const Ys=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:Qt,relay:Et},Symbol.toStringTag,{value:"Module"})),Ks=new DOMParser;function ft(n,...t){const e=t.map(l),s=n.map((a,p)=>{if(p===0)return[a];const f=e[p-1];return f instanceof Node?[`<ins id="mu-html-${p-1}"></ins>`,a]:[f,a]}).flat().join(""),i=Ks.parseFromString(s,"text/html"),o=i.head.childElementCount?i.head.children:i.body.children,r=new DocumentFragment;return r.replaceChildren(...o),e.forEach((a,p)=>{if(a instanceof Node){const f=r.querySelector(`ins#mu-html-${p}`);if(f){const u=f.parentNode;u==null||u.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${p}`)}}),r;function l(a,p){if(a===null)return"";switch(console.log("Processing parameter:",a),typeof a){case"string":return Ae(a);case"bigint":case"boolean":case"number":case"symbol":return Ae(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(l);return f.replaceChildren(...u),f}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function Ae(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Mt(n,t={mode:"open"}){const e=n.attachShadow(t),s={template:i,styles:o};return s;function i(r){const l=r.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function o(...r){e.adoptedStyleSheets=r}}$t=class extends HTMLElement{constructor(){super(),this._state={},Mt(this).template($t.template),this.addEventListener("change",n=>{const t=n.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",n=>{n.preventDefault(),Et(n,"mu-form:submit",this._state)})}set init(n){this._state=n||{},Js(this._state,this)}get form(){var n;return(n=this.shadowRoot)==null?void 0:n.querySelector("form")}},$t.template=ft`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function Js(n,t){const e=Object.entries(n);for(const[s,i]of e){const o=t.querySelector(`[name="${s}"]`);if(o){const r=o;switch(r.type){case"checkbox":const l=r;l.checked=!!i;break;case"date":r.value=i.toISOString().substr(0,10);break;default:r.value=i;break}}}return n}const es=class ss extends ee{constructor(t){super((e,s)=>this.update(e,s),t,ss.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(Gs(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(Qs(s,i));break}}}};es.EVENT_TYPE="history:message";let Zs=es;function Gs(n,t={}){return history.pushState(t,"",n),()=>({location:document.location,state:history.state})}function Qs(n,t={}){return history.replaceState(t,"",n),()=>({location:document.location,state:history.state})}const Xs=Qe(Zs.EVENT_TYPE);class St{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new we(this._provider,t);this._effects.push(i),e(i)}else Is(this._target,this._contextLabel).then(i=>{const o=new we(i,t);this._provider=i,this._effects.push(o),i.attach(r=>this._handleChange(r)),e(o)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),this._effects.forEach(e=>e.runEffect())}}class we{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const is=class ns extends HTMLElement{constructor(){super(),this._state={},this._user=new At,this._authObserver=new St(this,"blazing:auth"),Mt(this).template(ns.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;ti(i,this._state,e,this.authorization).then(o=>et(o,this)).then(o=>{const r=`mu-rest-form:${s}`,l=new CustomEvent(r,{bubbles:!0,composed:!0,detail:{method:e,[s]:o,url:i}});this.dispatchEvent(l)}).catch(o=>{const r="mu-rest-form:error",l=new CustomEvent(r,{bubbles:!0,composed:!0,detail:{method:e,error:o,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},et(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&Ee(this.src,this.authorization).then(e=>{this._state=e,et(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&Ee(this.src,this.authorization).then(i=>{this._state=i,et(i,this)});break;case"new":s&&(this._state={},et({},this));break}}};is.observedAttributes=["src","new","action"];is.template=ft`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function Ee(n,t){return fetch(n,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${n}:`,e))}function et(n,t){const e=Object.entries(n);for(const[s,i]of e){const o=t.querySelector(`[name="${s}"]`);if(o){const r=o;switch(r.type){case"checkbox":const l=r;l.checked=!!i;break;default:r.value=i;break}}}return n}function ti(n,t,e="PUT",s={}){return fetch(n,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const ei=class rs extends ee{constructor(t,e){super(e,t,rs.EVENT_TYPE,!1)}};ei.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=globalThis,se=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),Se=new WeakMap;let os=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(se&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Se.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Se.set(e,t))}return t}toString(){return this.cssText}};const si=n=>new os(typeof n=="string"?n:n+"",void 0,ie),ii=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new os(e,n,ie)},ni=(n,t)=>{if(se)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=vt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},xe=se?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return si(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ri,defineProperty:oi,getOwnPropertyDescriptor:ai,getOwnPropertyNames:li,getOwnPropertySymbols:ci,getPrototypeOf:hi}=Object,W=globalThis,Pe=W.trustedTypes,ui=Pe?Pe.emptyScript:"",ke=W.reactiveElementPolyfillSupport,ot=(n,t)=>n,xt={toAttribute(n,t){switch(t){case Boolean:n=n?ui:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ne=(n,t)=>!ri(n,t),Oe={attribute:!0,type:String,converter:xt,reflect:!1,hasChanged:ne};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),W.litPropertyMetadata??(W.litPropertyMetadata=new WeakMap);let F=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Oe){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&oi(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=ai(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get(){return i==null?void 0:i.call(this)},set(r){const l=i==null?void 0:i.call(this);o.call(this,r),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Oe}static _$Ei(){if(this.hasOwnProperty(ot("elementProperties")))return;const t=hi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ot("properties"))){const e=this.properties,s=[...li(e),...ci(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(xe(i))}else t!==void 0&&e.push(xe(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ni(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:xt).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const r=i.getPropertyOptions(o),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)==null?void 0:s.fromAttribute)!==void 0?r.converter:xt;this._$Em=o,this[o]=l.fromAttribute(e,r.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ne)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i)r.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],r)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[ot("elementProperties")]=new Map,F[ot("finalized")]=new Map,ke==null||ke({ReactiveElement:F}),(W.reactiveElementVersions??(W.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=globalThis,kt=Pt.trustedTypes,Te=kt?kt.createPolicy("lit-html",{createHTML:n=>n}):void 0,as="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,ls="?"+O,di=`<${ls}>`,H=document,ct=()=>H.createComment(""),ht=n=>n===null||typeof n!="object"&&typeof n!="function",re=Array.isArray,pi=n=>re(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Wt=`[ 	
\f\r]`,st=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Re=/>/g,N=RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Ne=/"/g,cs=/^(?:script|style|textarea|title)$/i,fi=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),it=fi(1),Y=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Me=new WeakMap,z=H.createTreeWalker(H,129);function hs(n,t){if(!re(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Te!==void 0?Te.createHTML(t):t}const mi=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",r=st;for(let l=0;l<e;l++){const a=n[l];let p,f,u=-1,c=0;for(;c<a.length&&(r.lastIndex=c,f=r.exec(a),f!==null);)c=r.lastIndex,r===st?f[1]==="!--"?r=Ce:f[1]!==void 0?r=Re:f[2]!==void 0?(cs.test(f[2])&&(i=RegExp("</"+f[2],"g")),r=N):f[3]!==void 0&&(r=N):r===N?f[0]===">"?(r=i??st,u=-1):f[1]===void 0?u=-2:(u=r.lastIndex-f[2].length,p=f[1],r=f[3]===void 0?N:f[3]==='"'?Ne:Ue):r===Ne||r===Ue?r=N:r===Ce||r===Re?r=st:(r=N,i=void 0);const h=r===N&&n[l+1].startsWith("/>")?" ":"";o+=r===st?a+di:u>=0?(s.push(p),a.slice(0,u)+as+a.slice(u)+O+h):a+O+(u===-2?l:h)}return[hs(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let Xt=class us{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const l=t.length-1,a=this.parts,[p,f]=mi(t,e);if(this.el=us.createElement(p,s),z.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=z.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(as)){const c=f[r++],h=i.getAttribute(u).split(O),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:o,name:d[2],strings:h,ctor:d[1]==="."?yi:d[1]==="?"?_i:d[1]==="@"?$i:zt}),i.removeAttribute(u)}else u.startsWith(O)&&(a.push({type:6,index:o}),i.removeAttribute(u));if(cs.test(i.tagName)){const u=i.textContent.split(O),c=u.length-1;if(c>0){i.textContent=kt?kt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],ct()),z.nextNode(),a.push({type:2,index:++o});i.append(u[c],ct())}}}else if(i.nodeType===8)if(i.data===ls)a.push({type:2,index:o});else{let u=-1;for(;(u=i.data.indexOf(O,u+1))!==-1;)a.push({type:7,index:o}),u+=O.length-1}o++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}};function K(n,t,e=n,s){var i,o;if(t===Y)return t;let r=s!==void 0?(i=e.o)==null?void 0:i[s]:e.l;const l=ht(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==l&&((o=r==null?void 0:r._$AO)==null||o.call(r,!1),l===void 0?r=void 0:(r=new l(n),r._$AT(n,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=r:e.l=r),r!==void 0&&(t=K(n,r._$AS(n,t.values),r,s)),t}let gi=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??H).importNode(e,!0);z.currentNode=i;let o=z.nextNode(),r=0,l=0,a=s[0];for(;a!==void 0;){if(r===a.index){let p;a.type===2?p=new oe(o,o.nextSibling,this,t):a.type===1?p=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(p=new vi(o,this,t)),this._$AV.push(p),a=s[++l]}r!==(a==null?void 0:a.index)&&(o=z.nextNode(),r++)}return z.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},oe=class ds{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),ht(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):pi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&ht(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Xt.createElement(hs(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===o)this._$AH.p(s);else{const r=new gi(o,this),l=r.u(this.options);r.p(s),this.T(l),this._$AH=r}}_$AC(t){let e=Me.get(t.strings);return e===void 0&&Me.set(t.strings,e=new Xt(t)),e}k(t){re(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new ds(this.O(ct()),this.O(ct()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}},zt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=K(this,t,e,0),r=!ht(t)||t!==this._$AH&&t!==Y,r&&(this._$AH=t);else{const l=t;let a,p;for(t=o[0],a=0;a<o.length-1;a++)p=K(this,l[s+a],e,a),p===Y&&(p=this._$AH[a]),r||(r=!ht(p)||p!==this._$AH[a]),p===v?t=v:t!==v&&(t+=(p??"")+o[a+1]),this._$AH[a]=p}r&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},yi=class extends zt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},_i=class extends zt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},$i=class extends zt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??v)===Y)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},vi=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}};const ze=Pt.litHtmlPolyfillSupport;ze==null||ze(Xt,oe),(Pt.litHtmlVersions??(Pt.litHtmlVersions=[])).push("3.2.0");const bi=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new oe(t.insertBefore(ct(),o),o,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let B=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=bi(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return Y}};B._$litElement$=!0,B.finalized=!0,(be=globalThis.litElementHydrateSupport)==null||be.call(globalThis,{LitElement:B});const Le=globalThis.litElementPolyfillSupport;Le==null||Le({LitElement:B});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ai={attribute:!0,type:String,converter:xt,reflect:!1,hasChanged:ne},wi=(n=Ai,t,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(e.name,n),s==="accessor"){const{name:r}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(r,a,n)},init(l){return l!==void 0&&this.P(r,void 0,n),l}}}if(s==="setter"){const{name:r}=e;return function(l){const a=this[r];t.call(this,l),this.requestUpdate(r,a,n)}}throw Error("Unsupported decorator location: "+s)};function ps(n){return(t,e)=>typeof e=="object"?wi(n,t,e):((s,i,o)=>{const r=i.hasOwnProperty(o);return i.constructor.createProperty(o,r?{...s,wrapped:!0}:s),r?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function fs(n){return ps({...n,state:!0,attribute:!1})}function Ei(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function Si(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ms={};(function(n){var t=function(){var e=function(u,c,h,d){for(h=h||{},d=u.length;d--;h[u[d]]=c);return h},s=[1,9],i=[1,10],o=[1,11],r=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,d,g,m,y,It){var w=y.length-1;switch(m){case 1:return new g.Root({},[y[w-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[y[w-1],y[w]]);break;case 4:case 5:this.$=y[w];break;case 6:this.$=new g.Literal({value:y[w]});break;case 7:this.$=new g.Splat({name:y[w]});break;case 8:this.$=new g.Param({name:y[w]});break;case 9:this.$=new g.Optional({},[y[w-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:o,15:r},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:o,15:r},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:o,15:r},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:o,15:r},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let d=function(g,m){this.message=g,this.hash=m};throw d.prototype=Error,new d(c,h)}},parse:function(c){var h=this,d=[0],g=[null],m=[],y=this.table,It="",w=0,_e=0,Us=2,$e=1,Ns=m.slice.call(arguments,1),_=Object.create(this.lexer),R={yy:{}};for(var jt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,jt)&&(R.yy[jt]=this.yy[jt]);_.setInput(c,R.yy),R.yy.lexer=_,R.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Vt=_.yylloc;m.push(Vt);var Ms=_.options&&_.options.ranges;typeof R.yy.parseError=="function"?this.parseError=R.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var zs=function(){var j;return j=_.lex()||$e,typeof j!="number"&&(j=h.symbols_[j]||j),j},A,U,E,Ft,I={},yt,x,ve,_t;;){if(U=d[d.length-1],this.defaultActions[U]?E=this.defaultActions[U]:((A===null||typeof A>"u")&&(A=zs()),E=y[U]&&y[U][A]),typeof E>"u"||!E.length||!E[0]){var qt="";_t=[];for(yt in y[U])this.terminals_[yt]&&yt>Us&&_t.push("'"+this.terminals_[yt]+"'");_.showPosition?qt="Parse error on line "+(w+1)+`:
`+_.showPosition()+`
Expecting `+_t.join(", ")+", got '"+(this.terminals_[A]||A)+"'":qt="Parse error on line "+(w+1)+": Unexpected "+(A==$e?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(qt,{text:_.match,token:this.terminals_[A]||A,line:_.yylineno,loc:Vt,expected:_t})}if(E[0]instanceof Array&&E.length>1)throw new Error("Parse Error: multiple actions possible at state: "+U+", token: "+A);switch(E[0]){case 1:d.push(A),g.push(_.yytext),m.push(_.yylloc),d.push(E[1]),A=null,_e=_.yyleng,It=_.yytext,w=_.yylineno,Vt=_.yylloc;break;case 2:if(x=this.productions_[E[1]][1],I.$=g[g.length-x],I._$={first_line:m[m.length-(x||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(x||1)].first_column,last_column:m[m.length-1].last_column},Ms&&(I._$.range=[m[m.length-(x||1)].range[0],m[m.length-1].range[1]]),Ft=this.performAction.apply(I,[It,_e,w,R.yy,E[1],g,m].concat(Ns)),typeof Ft<"u")return Ft;x&&(d=d.slice(0,-1*x*2),g=g.slice(0,-1*x),m=m.slice(0,-1*x)),d.push(this.productions_[E[1]][0]),g.push(I.$),m.push(I._$),ve=y[d[d.length-2]][d[d.length-1]],d.push(ve);break;case 3:return!0}}return!0}},p=function(){var u={EOF:1,parseError:function(h,d){if(this.yy.parser)this.yy.parser.parseError(h,d);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,d=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===g.length?this.yylloc.first_column:0)+g[g.length-d.length].length-d[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var d,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],d=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var y in m)this[y]=m[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,d,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),y=0;y<m.length;y++)if(d=this._input.match(this.rules[m[y]]),d&&(!h||d[0].length>h[0].length)){if(h=d,g=y,this.options.backtrack_lexer){if(c=this.test_match(d,m[y]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,d,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=p;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Si<"u"&&(n.parser=t,n.Parser=t.Parser,n.parse=function(){return t.parse.apply(t,arguments)})})(ms);function V(n){return function(t,e){return{displayName:n,props:t,children:e||[]}}}var gs={Root:V("Root"),Concat:V("Concat"),Literal:V("Literal"),Splat:V("Splat"),Param:V("Param"),Optional:V("Optional")},ys=ms.parser;ys.yy=gs;var xi=ys,Pi=Object.keys(gs);function ki(n){return Pi.forEach(function(t){if(typeof n[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:n}}var _s=ki,Oi=_s,Ti=/[\-{}\[\]+?.,\\\^$|#\s]/g;function $s(n){this.captures=n.captures,this.re=n.re}$s.prototype.match=function(n){var t=this.re.exec(n),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var Ci=Oi({Concat:function(n){return n.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(n){return{re:n.props.value.replace(Ti,"\\$&"),captures:[]}},Splat:function(n){return{re:"([^?]*?)",captures:[n.props.name]}},Param:function(n){return{re:"([^\\/\\?]+)",captures:[n.props.name]}},Optional:function(n){var t=this.visit(n.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(n){var t=this.visit(n.children[0]);return new $s({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),Ri=Ci,Ui=_s,Ni=Ui({Concat:function(n,t){var e=n.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(n){return decodeURI(n.props.value)},Splat:function(n,t){return t[n.props.name]?t[n.props.name]:!1},Param:function(n,t){return t[n.props.name]?t[n.props.name]:!1},Optional:function(n,t){var e=this.visit(n.children[0],t);return e||""},Root:function(n,t){t=t||{};var e=this.visit(n.children[0],t);return e?encodeURI(e):!1}}),Mi=Ni,zi=xi,Li=Ri,Hi=Mi;mt.prototype=Object.create(null);mt.prototype.match=function(n){var t=Li.visit(this.ast),e=t.match(n);return e||!1};mt.prototype.reverse=function(n){return Hi.visit(this.ast,n)};function mt(n){var t;if(this?t=this:t=Object.create(mt.prototype),typeof n>"u")throw new Error("A route spec is required");return t.spec=n,t.ast=zi.parse(n),t}var Di=mt,Ii=Di,ji=Ii;const Vi=Ei(ji);var Fi=Object.defineProperty,vs=(n,t,e,s)=>{for(var i=void 0,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=r(t,e,i)||i);return i&&Fi(t,e,i),i};const bs=class extends B{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>it`
      <h1>Not Found</h1>
    `,this._cases=t.map(i=>({...i,route:new Vi(i.path)})),this._historyObserver=new St(this,e),this._authObserver=new St(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),it`
      <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(qs(this,"auth/redirect"),it`
              <h1>Redirecting for Login</h1>
            `):e.view(e.params||{}):it`
              <h1>Authenticating</h1>
            `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),it`
              <h1>Redirecting to ${s}…</h1>
            `}}return this._fallback({})})()}</main>
    `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),o=s+e;for(const r of this._cases){const l=r.route.match(o);if(l)return{...r,path:s,params:l,query:i}}}redirect(t){Xs(this,"history/redirect",{href:t})}};bs.styles=ii`
    :host,
    main {
      display: contents;
    }
  `;let As=bs;vs([fs()],As.prototype,"_user");vs([fs()],As.prototype,"_match");const ws=class Es extends HTMLElement{constructor(){if(super(),Mt(this).template(Es.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};ws.template=ft`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;let qi=ws;const Bi=Object.freeze(Object.defineProperty({__proto__:null,Element:qi},Symbol.toStringTag,{value:"Module"})),Wi=class Ss extends HTMLElement{constructor(){super(),this._array=[],Mt(this).template(Ss.template),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(xs("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,o=e.closest("label");if(o){const r=Array.from(this.children).indexOf(o);this._array[r]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{Qt(t,"button.add")?Et(t,"input-array:add"):Qt(t,"button.remove")&&Et(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],Yi(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};Wi.template=ft`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style>
          :host {
            display: contents;
          }
          ul {
            display: contents;
          }
          button.add {
            grid-column: input / input-end;
          }
          ::slotted(label) {
            display: contents;
          }
        </style>
      </button>
    </template>
  `;function Yi(n,t){t.replaceChildren(),n.forEach((e,s)=>t.append(xs(e)))}function xs(n,t){const e=n===void 0?"":`value="${n}"`;return ft`
    <label>
      <input ${e} />
      <button class="remove" type="button">Remove</button>
    </label>
  `}function ae(n){return Object.entries(n).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Ki=Object.defineProperty,Ji=Object.getOwnPropertyDescriptor,Zi=(n,t,e,s)=>{for(var i=Ji(t,e),o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=r(t,e,i)||i);return i&&Ki(t,e,i),i};class Gi extends B{constructor(t){super(),this._pending=[],this._observer=new St(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Zi([ps()],Gi.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=globalThis,le=bt.ShadowRoot&&(bt.ShadyCSS===void 0||bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),He=new WeakMap;let Ps=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(le&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=He.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&He.set(e,t))}return t}toString(){return this.cssText}};const Qi=n=>new Ps(typeof n=="string"?n:n+"",void 0,ce),P=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new Ps(e,n,ce)},Xi=(n,t)=>{if(le)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=bt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},De=le?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Qi(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:tn,defineProperty:en,getOwnPropertyDescriptor:sn,getOwnPropertyNames:nn,getOwnPropertySymbols:rn,getPrototypeOf:on}=Object,C=globalThis,Ie=C.trustedTypes,an=Ie?Ie.emptyScript:"",Yt=C.reactiveElementPolyfillSupport,at=(n,t)=>n,Ot={toAttribute(n,t){switch(t){case Boolean:n=n?an:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},he=(n,t)=>!tn(n,t),je={attribute:!0,type:String,converter:Ot,reflect:!1,hasChanged:he};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),C.litPropertyMetadata??(C.litPropertyMetadata=new WeakMap);class q extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=je){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&en(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=sn(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get(){return i==null?void 0:i.call(this)},set(r){const l=i==null?void 0:i.call(this);o.call(this,r),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??je}static _$Ei(){if(this.hasOwnProperty(at("elementProperties")))return;const t=on(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(at("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(at("properties"))){const e=this.properties,s=[...nn(e),...rn(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(De(i))}else t!==void 0&&e.push(De(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xi(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const r=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:Ot).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const r=s.getPropertyOptions(i),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((o=r.converter)==null?void 0:o.fromAttribute)!==void 0?r.converter:Ot;this._$Em=i,this[i]=l.fromAttribute(e,r.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??he)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i)r.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],r)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}q.elementStyles=[],q.shadowRootOptions={mode:"open"},q[at("elementProperties")]=new Map,q[at("finalized")]=new Map,Yt==null||Yt({ReactiveElement:q}),(C.reactiveElementVersions??(C.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=globalThis,Tt=lt.trustedTypes,Ve=Tt?Tt.createPolicy("lit-html",{createHTML:n=>n}):void 0,ks="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,Os="?"+T,ln=`<${Os}>`,D=document,ut=()=>D.createComment(""),dt=n=>n===null||typeof n!="object"&&typeof n!="function",ue=Array.isArray,cn=n=>ue(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Kt=`[ 	
\f\r]`,nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Fe=/-->/g,qe=/>/g,M=RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Be=/'/g,We=/"/g,Ts=/^(?:script|style|textarea|title)$/i,hn=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),$=hn(1),J=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Ye=new WeakMap,L=D.createTreeWalker(D,129);function Cs(n,t){if(!ue(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ve!==void 0?Ve.createHTML(t):t}const un=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",r=nt;for(let l=0;l<e;l++){const a=n[l];let p,f,u=-1,c=0;for(;c<a.length&&(r.lastIndex=c,f=r.exec(a),f!==null);)c=r.lastIndex,r===nt?f[1]==="!--"?r=Fe:f[1]!==void 0?r=qe:f[2]!==void 0?(Ts.test(f[2])&&(i=RegExp("</"+f[2],"g")),r=M):f[3]!==void 0&&(r=M):r===M?f[0]===">"?(r=i??nt,u=-1):f[1]===void 0?u=-2:(u=r.lastIndex-f[2].length,p=f[1],r=f[3]===void 0?M:f[3]==='"'?We:Be):r===We||r===Be?r=M:r===Fe||r===qe?r=nt:(r=M,i=void 0);const h=r===M&&n[l+1].startsWith("/>")?" ":"";o+=r===nt?a+ln:u>=0?(s.push(p),a.slice(0,u)+ks+a.slice(u)+T+h):a+T+(u===-2?l:h)}return[Cs(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class pt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const l=t.length-1,a=this.parts,[p,f]=un(t,e);if(this.el=pt.createElement(p,s),L.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=L.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ks)){const c=f[r++],h=i.getAttribute(u).split(T),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:o,name:d[2],strings:h,ctor:d[1]==="."?pn:d[1]==="?"?fn:d[1]==="@"?mn:Lt}),i.removeAttribute(u)}else u.startsWith(T)&&(a.push({type:6,index:o}),i.removeAttribute(u));if(Ts.test(i.tagName)){const u=i.textContent.split(T),c=u.length-1;if(c>0){i.textContent=Tt?Tt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],ut()),L.nextNode(),a.push({type:2,index:++o});i.append(u[c],ut())}}}else if(i.nodeType===8)if(i.data===Os)a.push({type:2,index:o});else{let u=-1;for(;(u=i.data.indexOf(T,u+1))!==-1;)a.push({type:7,index:o}),u+=T.length-1}o++}}static createElement(t,e){const s=D.createElement("template");return s.innerHTML=t,s}}function Z(n,t,e=n,s){var r,l;if(t===J)return t;let i=s!==void 0?(r=e.o)==null?void 0:r[s]:e.l;const o=dt(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=i:e.l=i),i!==void 0&&(t=Z(n,i._$AS(n,t.values),i,s)),t}class dn{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??D).importNode(e,!0);L.currentNode=i;let o=L.nextNode(),r=0,l=0,a=s[0];for(;a!==void 0;){if(r===a.index){let p;a.type===2?p=new gt(o,o.nextSibling,this,t):a.type===1?p=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(p=new gn(o,this,t)),this._$AV.push(p),a=s[++l]}r!==(a==null?void 0:a.index)&&(o=L.nextNode(),r++)}return L.currentNode=D,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class gt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),dt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==J&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):cn(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&dt(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=pt.createElement(Cs(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const r=new dn(i,this),l=r.u(this.options);r.p(e),this.T(l),this._$AH=r}}_$AC(t){let e=Ye.get(t.strings);return e===void 0&&Ye.set(t.strings,e=new pt(t)),e}k(t){ue(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new gt(this.O(ut()),this.O(ut()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Lt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=Z(this,t,e,0),r=!dt(t)||t!==this._$AH&&t!==J,r&&(this._$AH=t);else{const l=t;let a,p;for(t=o[0],a=0;a<o.length-1;a++)p=Z(this,l[s+a],e,a),p===J&&(p=this._$AH[a]),r||(r=!dt(p)||p!==this._$AH[a]),p===b?t=b:t!==b&&(t+=(p??"")+o[a+1]),this._$AH[a]=p}r&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class pn extends Lt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class fn extends Lt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class mn extends Lt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??b)===J)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class gn{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const Jt=lt.litHtmlPolyfillSupport;Jt==null||Jt(pt,gt),(lt.litHtmlVersions??(lt.litHtmlVersions=[])).push("3.2.0");const yn=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new gt(t.insertBefore(ut(),o),o,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class S extends q{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=yn(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return J}}var Ze;S._$litElement$=!0,S.finalized=!0,(Ze=globalThis.litElementHydrateSupport)==null||Ze.call(globalThis,{LitElement:S});const Zt=globalThis.litElementPolyfillSupport;Zt==null||Zt({LitElement:S});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");const _n=P`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,tt={styles:_n},$n=P`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-display);
    line-height: var(--font-line-height-display);
  }
  h1 {
    font-size: var(--size-type-xxlarge);
    font-style: oblique;
    line-height: 1;
    font-weight: var(--font-weight-bold);
  }
  h2 {
    font-size: var(--size-type-xlarge);
    font-weight: var(--font-weight-bold);
  }
  h3 {
    font-size: var(--size-type-large);
    font-weight: var(--font-weight-normal);
  }
  h4 {
    font-size: var(--size-type-mlarge);
    font-weight: var(--font-weight-bold);
  }
  h5 {
    font-size: var(--size-type-body);
    font-weight: var(--font-weight-bold);
  }
  h6 {
    font-size: var(--size-type-body);
    font-weight: var(--font-weight-normal);
    font-style: italic;
  }
`,Ht={styles:$n},Ut=class Ut extends S{render(){return $`
      <header>
        <h1>Blazing Travels</h1>
        <nav>
          <p>
            <slot> Unnamed Tour</slot>
          </p>
          <mu-dropdown>
            <menu>
              <li>Hello, traveler</li>
              <li>
                <label class="dark-mode-switch" 
                  @change=${t=>{var e;return Ys.relay(t,"dark-mode",{checked:(e=t.target)==null?void 0:e.checked})}}
                >
                <input type="checkbox" />
                Dark Mode
                </label>
              </li>
            </menu>
          </mu-dropdown>
        </nav>
      </header>
      </template>`}static initializeOnce(){function t(e,s){e==null||e.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",e=>t(e.currentTarget,e.detail.checked))}};Ut.uses=ae({"mu-dropdown":Bi.Element}),Ut.styles=[tt.styles,Ht.styles,P`
    :host {
      display: contents;
    }
    header {
      --color-link: var(--color-link-inverted);

      display: flex;
      flex-wrap: wrap;
      align-items: bottom;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
  `];let Ct=Ut;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vn={attribute:!0,type:String,converter:Ot,reflect:!1,hasChanged:he},bn=(n=vn,t,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(e.name,n),s==="accessor"){const{name:r}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(r,a,n)},init(l){return l!==void 0&&this.P(r,void 0,n),l}}}if(s==="setter"){const{name:r}=e;return function(l){const a=this[r];t.call(this,l),this.requestUpdate(r,a,n)}}throw Error("Unsupported decorator location: "+s)};function k(n){return(t,e)=>typeof e=="object"?bn(n,t,e):((s,i,o)=>{const r=i.hasOwnProperty(o);return i.constructor.createProperty(o,r?{...s,wrapped:!0}:s),r?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rs(n){return k({...n,state:!0,attribute:!1})}const An=P`
  svg.icon {
    --size-icon: var(--size-icon-normal);

    display: inline-block;
    height: var(--size-icon);
    width: var(--size-icon);
    vertical-align: calc(0.5em - 0.5 * var(--size-icon));
    fill: currentColor;
  }
`,wn={styles:An};var En=Object.defineProperty,Dt=(n,t,e,s)=>{for(var i=void 0,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=r(t,e,i)||i);return i&&En(t,e,i),i};const fe=class fe extends S{constructor(){super(...arguments),this.mode="unknown"}render(){const e={air:"icon-airplane",rail:"icon-train",unknown:"icon-unknown"}[this.mode];return $`
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
    `}};fe.styles=[tt.styles,wn.styles,Ht.styles,P`
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
    `];let Rt=fe;Dt([k()],Rt.prototype,"mode");const me=class me extends S{render(){return $`
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
    `}};me.styles=[tt.styles,P`
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
    `];let te=me;const ge=class ge extends S{constructor(){super(...arguments),this.localtime="1970-01-01",this.tz="+0000"}render(){const t=new Date(this.localtime),e=t.getHours(),s=t.getMinutes(),i=e<12?"AM":"PM",o=(e>12?e-12:e||12).toString().padStart(2,"0"),r=s.toString().padStart(2,"0"),l=$`
      <span>${o}:${r} ${i}</span>
      <small>${this.tz}</small>
    `,a=this.code?$`<span>(${this.code})</span>`:"";return $`
      <span class="place">
        <slot></slot>${a}
      </span>
      <time datetime="${this.localtime}${this.tz}">
        ${l}
      </time>
    `}};ge.styles=[tt.styles,P`
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
    `];let G=ge;Dt([k()],G.prototype,"localtime");Dt([k()],G.prototype,"tz");Dt([k()],G.prototype,"code");var Sn=Object.defineProperty,de=(n,t,e,s)=>{for(var i=void 0,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=r(t,e,i)||i);return i&&Sn(t,e,i),i};const ye=class ye extends S{render(){return $`
      <header
        style="background-image: url(${this.imgSrc});)"
      >
        <a href="${this.href}">
          <h3><slot>Destination</slot></h3>
        </a>
        <p>${this.nights} nights</p>
      </header>
    `}};ye.styles=[tt.styles,Ht.styles,P`
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
    `];let Q=ye;de([k({attribute:"img-src"})],Q.prototype,"imgSrc");de([k()],Q.prototype,"href");de([k()],Q.prototype,"nights");var xn=Object.defineProperty,pe=(n,t,e,s)=>{for(var i=void 0,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=r(t,e,i)||i);return i&&xn(t,e,i),i};const Nt=class Nt extends S{constructor(){super(...arguments),this.destinations=[],this.transportations=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){console.log("Destinations",this.destinations);const t=this.destinations.length,e=this.destinations.map(r=>({startDate:r.startDate,endDate:r.endDate,html:$`
            <blz-destination
              img-src=${r.featuredImage}
              href=${r.link}
              nights=${Pn(r.startDate,r.endDate)}
            >
              ${r.name}
            </blz-destination>`})),i=this.transportations.map(r=>{const l=r.segments.length,a=$`
            <span slot="from">
              ${r.routing?r.routing[0]:r.segments[0].departure.name}
            </span>
          `,p=$`
            <span slot="to">
              ${r.routing?r.routing[l]:r.segments[l-1].arrival.name}
            </span>
          `,f=l>1&&r.routing?$`
              <span slot="via">${r.routing[1]}</span>
            `:"",u=r.segments.map(c=>$`
                <transportation-segment>
                  <span slot="carrier">${c.carrier}</span>
                  <span slot="number">${c.number}</span>
                  <end-point 
                    slot="departure"
                    localtime=${c.departure.localtime}
                    tz=${c.departure.tz}
                    code=${c.departure.code}
                  >
                    ${c.departure.name}
                  </end-point>
                  <end-point 
                    slot="arrival" 
                    localtime=${c.arrival.localtime} 
                    tz=${c.arrival.tz}
                    code=${c.arrival.code}
                  >
                    ${c.arrival.name}
                  </end-point>
                </transportation-segment>
                `);return{startDate:r.startDate,endDate:r.endDate,html:$`
            <blz-transportation mode=${r.mode}>
              ${a} ${p} ${f}
              ${u}
            </blz-transportation>
          `}}).flatMap((r,l)=>l<t?[r,e[l]]:[r]),o=r=>{const l=$`                
        <time datetime=${r.startDate}>
          ${Je(r.startDate)}
        </time>`;if(!r.endDate)return l;const a=$`
        <time datetime=${r.endDate}>
          ${Je(r.endDate)}
        </time>`;return $`${l}${a}`};return $`
      <section>
        <h2>Itinerary</h2>
        <dl>
          ${i.map(r=>$`
              <dt>${o(r)}</dt>
              <dd>${r.html}</dd>
            `)}
        </dl>
      </section>
    `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{if(e){const s=e;this.destinations=s.destinations.map(Ke),this.transportations=s.transportations.map(Ke)}})}};Nt.uses=ae({"blz-destination":Q,"blz-transportation":Rt,"transportation-segment":te,"end-point":G}),Nt.styles=[tt.styles,Ht.styles,P`
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
  `];let X=Nt;pe([k()],X.prototype,"src");pe([Rs()],X.prototype,"destinations");pe([Rs()],X.prototype,"transportations");function Pn(n,t){const e=t.getTime()-n.getTime();return Math.ceil(e/1e3/3600/24)}function Ke(n){const t=n,e=t.startDate?new Date(t.startDate):void 0,s=t.endDate?new Date(t.endDate):void 0;return{...n,startDate:e,endDate:s}}const kn=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Je(n){const t=kn[n.getUTCMonth()];return`${n.getUTCDate()} ${t}`}ae({"blz-header":Ct,"blz-itinerary":X});Ct.initializeOnce();
