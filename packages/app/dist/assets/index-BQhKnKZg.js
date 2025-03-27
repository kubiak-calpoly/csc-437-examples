(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var St,Ae;class ot extends Error{}ot.prototype.name="InvalidTokenError";function Ys(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function Ws(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Ys(t)}catch{return atob(t)}}function Xe(r,t){if(typeof r!="string")throw new ot("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new ot(`Invalid token specified: missing part #${e+1}`);let i;try{i=Ws(s)}catch(n){throw new ot(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new ot(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const Ks="mu:context",Gt=`${Ks}:change`;class Js{constructor(t,e){this._proxy=Gs(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class Zs extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new Js(t,this),this.style.display="contents"}attach(t){return this.addEventListener(Gt,t),t}detach(t){this.removeEventListener(Gt,t)}}function Gs(r,t){return new Proxy(r,{get:(s,i,n)=>{if(i==="then")return;const o=Reflect.get(s,i,n);return console.log(`Context['${i}'] => `,o),o},set:(s,i,n,o)=>{const l=r[i];console.log(`Context['${i.toString()}'] <= `,n);const a=Reflect.set(s,i,n,o);if(a){let p=new CustomEvent(Gt,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(p,{property:i,oldValue:l,value:n}),t.dispatchEvent(p)}else console.log(`Context['${i}] was not set to ${n}`);return a}})}function Qs(r,t){const e=ts(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function ts(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return ts(r,i.host)}class Xs extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function es(r="mu:message"){return(t,...e)=>t.dispatchEvent(new Xs(e,r))}class re{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function ti(r){return t=>({...t,...r})}const Qt="mu:auth:jwt",ss=class is extends re{constructor(t,e){super((s,i)=>this.update(s,i),t,is.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(si(s)),Bt(i);case"auth/signout":return e(ii()),Bt(this._redirectForLogin);case"auth/redirect":return Bt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};ss.EVENT_TYPE="auth:message";let rs=ss;const ns=es(rs.EVENT_TYPE);function Bt(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class ei extends Zs{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){super({user:K.authenticateFromLocalStorage()})}connectedCallback(){new rs(this.context,this.redirect).attach(this)}}class ht{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(Qt),t}}class K extends ht{constructor(t){super();const e=Xe(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new K(t);return localStorage.setItem(Qt,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(Qt);return t?K.authenticate(t):new ht}}function si(r){return ti({user:K.authenticate(r),token:r})}function ii(){return r=>{const t=r.user;return{user:t&&t.authenticated?ht.deauthenticate(t):t,token:""}}}function ri(r){return r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function ni(r){return r.authenticated?Xe(r.token||""):{}}const Xt=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:K,Provider:ei,User:ht,dispatch:ns,headers:ri,payload:ni},Symbol.toStringTag,{value:"Module"}));function os(r,t,e){const s=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});r.dispatchEvent(s)}function kt(r,t,e){const s=r.target;os(s,t,e)}function te(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const we=Object.freeze(Object.defineProperty({__proto__:null,dispatchCustom:os,originalTarget:te,relay:kt},Symbol.toStringTag,{value:"Module"})),oi=new DOMParser;function O(r,...t){const e=t.map(l),s=r.map((a,p)=>{if(p===0)return[a];const f=e[p-1];return f instanceof Node?[`<ins id="mu-html-${p-1}"></ins>`,a]:[f,a]}).flat().join(""),i=oi.parseFromString(s,"text/html"),n=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,p)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${p}`);if(f){const u=f.parentNode;u==null||u.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${p}`)}}),o;function l(a,p){if(a===null)return"";switch(typeof a){case"string":return Ee(a);case"bigint":case"boolean":case"number":case"symbol":return Ee(a.toString());case"object":if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(l);return f.replaceChildren(...u),f}return a instanceof Node?a:new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function Ee(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vt(r,t={mode:"open"}){const e=r.attachShadow(t),s={template:i,styles:n};return s;function i(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}St=class extends HTMLElement{constructor(){super(),this._state={},vt(this).template(St.template),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),kt(r,"mu-form:submit",this._state)})}set init(r){this._state=r||{},ai(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}},St.template=O`
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
        ::slotted(fieldset) {
          display: grid;
          grid-column: start / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function ai(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const as=class ls extends re{constructor(t){super((e,s)=>this.update(e,s),t,ls.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(ci(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(hi(s,i));break}}}};as.EVENT_TYPE="history:message";let li=as;function ci(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function hi(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const ui=es(li.EVENT_TYPE);class J{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new Se(this._provider,t);this._effects.push(i),e(i)}else Qs(this._target,this._contextLabel).then(i=>{const n=new Se(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),this._effects.forEach(e=>e.runEffect())}}class Se{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const cs=class hs extends HTMLElement{constructor(){super(),this._state={},this._user=new ht,this._authObserver=new J(this,"blazing:auth"),vt(this).template(hs.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;di(i,this._state,e,this.authorization).then(n=>st(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},st(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&xe(this.src,this.authorization).then(e=>{this._state=e,st(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&xe(this.src,this.authorization).then(i=>{this._state=i,st(i,this)});break;case"new":s&&(this._state={},st({},this));break}}};cs.observedAttributes=["src","new","action"];cs.template=O`
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
  `;function xe(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function st(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function di(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const pi=class us extends re{constructor(t,e){super(e,t,us.EVENT_TYPE,!1)}};pi.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt=globalThis,ne=xt.ShadowRoot&&(xt.ShadyCSS===void 0||xt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),Pe=new WeakMap;let ds=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ne&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Pe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Pe.set(e,t))}return t}toString(){return this.cssText}};const fi=r=>new ds(typeof r=="string"?r:r+"",void 0,oe),mi=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new ds(e,r,oe)},gi=(r,t)=>{if(ne)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=xt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},ke=ne?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return fi(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:yi,defineProperty:vi,getOwnPropertyDescriptor:_i,getOwnPropertyNames:$i,getOwnPropertySymbols:bi,getPrototypeOf:Ai}=Object,Z=globalThis,Ce=Z.trustedTypes,wi=Ce?Ce.emptyScript:"",Oe=Z.reactiveElementPolyfillSupport,at=(r,t)=>r,Ct={toAttribute(r,t){switch(t){case Boolean:r=r?wi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ae=(r,t)=>!yi(r,t),Te={attribute:!0,type:String,converter:Ct,reflect:!1,hasChanged:ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Z.litPropertyMetadata??(Z.litPropertyMetadata=new WeakMap);let B=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Te){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&vi(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=_i(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Te}static _$Ei(){if(this.hasOwnProperty(at("elementProperties")))return;const t=Ai(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(at("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(at("properties"))){const e=this.properties,s=[...$i(e),...bi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ke(i))}else t!==void 0&&e.push(ke(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gi(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Ct).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Ct;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ae)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[at("elementProperties")]=new Map,B[at("finalized")]=new Map,Oe==null||Oe({ReactiveElement:B}),(Z.reactiveElementVersions??(Z.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=globalThis,Tt=Ot.trustedTypes,Re=Tt?Tt.createPolicy("lit-html",{createHTML:r=>r}):void 0,ps="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,fs="?"+k,Ei=`<${fs}>`,H=document,ut=()=>H.createComment(""),dt=r=>r===null||typeof r!="object"&&typeof r!="function",le=Array.isArray,Si=r=>le(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Yt=`[ 	
\f\r]`,it=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ue=/-->/g,Ne=/>/g,N=RegExp(`>|${Yt}(?:([^\\s"'>=/]+)(${Yt}*=${Yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Me=/"/g,ms=/^(?:script|style|textarea|title)$/i,xi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),rt=xi(1),G=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Le=new WeakMap,L=H.createTreeWalker(H,129);function gs(r,t){if(!le(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Re!==void 0?Re.createHTML(t):t}const Pi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=it;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===it?f[1]==="!--"?o=Ue:f[1]!==void 0?o=Ne:f[2]!==void 0?(ms.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=N):f[3]!==void 0&&(o=N):o===N?f[0]===">"?(o=i??it,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?N:f[3]==='"'?Me:ze):o===Me||o===ze?o=N:o===Ue||o===Ne?o=it:(o=N,i=void 0);const h=o===N&&r[l+1].startsWith("/>")?" ":"";n+=o===it?a+Ei:u>=0?(s.push(p),a.slice(0,u)+ps+a.slice(u)+k+h):a+k+(u===-2?l:h)}return[gs(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let ee=class ys{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Pi(t,e);if(this.el=ys.createElement(p,s),L.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=L.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ps)){const c=f[o++],h=i.getAttribute(u).split(k),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?Ci:d[1]==="?"?Oi:d[1]==="@"?Ti:Lt}),i.removeAttribute(u)}else u.startsWith(k)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(ms.test(i.tagName)){const u=i.textContent.split(k),c=u.length-1;if(c>0){i.textContent=Tt?Tt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],ut()),L.nextNode(),a.push({type:2,index:++n});i.append(u[c],ut())}}}else if(i.nodeType===8)if(i.data===fs)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(k,u+1))!==-1;)a.push({type:7,index:n}),u+=k.length-1}n++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}};function Q(r,t,e=r,s){var i,n;if(t===G)return t;let o=s!==void 0?(i=e.o)==null?void 0:i[s]:e.l;const l=dt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=o:e.l=o),o!==void 0&&(t=Q(r,o._$AS(r,t.values),o,s)),t}let ki=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??H).importNode(e,!0);L.currentNode=i;let n=L.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new ce(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Ri(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=L.nextNode(),o++)}return L.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},ce=class vs{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),dt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==G&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Si(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&dt(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ee.createElement(gs(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new ki(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=Le.get(t.strings);return e===void 0&&Le.set(t.strings,e=new ee(t)),e}k(t){le(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new vs(this.O(ut()),this.O(ut()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}},Lt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=Q(this,t,e,0),o=!dt(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=Q(this,l[s+a],e,a),p===G&&(p=this._$AH[a]),o||(o=!dt(p)||p!==this._$AH[a]),p===$?t=$:t!==$&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ci=class extends Lt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},Oi=class extends Lt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Ti=class extends Lt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??$)===G)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},Ri=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}};const De=Ot.litHtmlPolyfillSupport;De==null||De(ee,ce),(Ot.litHtmlVersions??(Ot.litHtmlVersions=[])).push("3.2.0");const Ui=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new ce(t.insertBefore(ut(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let W=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=Ui(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return G}};W._$litElement$=!0,W.finalized=!0,(Ae=globalThis.litElementHydrateSupport)==null||Ae.call(globalThis,{LitElement:W});const He=globalThis.litElementPolyfillSupport;He==null||He({LitElement:W});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ni={attribute:!0,type:String,converter:Ct,reflect:!1,hasChanged:ae},zi=(r=Ni,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function _s(r){return(t,e)=>typeof e=="object"?zi(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $s(r){return _s({...r,state:!0,attribute:!1})}function Mi(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Li(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var bs={};(function(r){var t=function(){var e=function(u,c,h,d){for(h=h||{},d=u.length;d--;h[u[d]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,d,m,g,y,jt){var w=y.length-1;switch(g){case 1:return new m.Root({},[y[w-1]]);case 2:return new m.Root({},[new m.Literal({value:""})]);case 3:this.$=new m.Concat({},[y[w-1],y[w]]);break;case 4:case 5:this.$=y[w];break;case 6:this.$=new m.Literal({value:y[w]});break;case 7:this.$=new m.Splat({name:y[w]});break;case 8:this.$=new m.Param({name:y[w]});break;case 9:this.$=new m.Optional({},[y[w-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let d=function(m,g){this.message=m,this.hash=g};throw d.prototype=Error,new d(c,h)}},parse:function(c){var h=this,d=[0],m=[null],g=[],y=this.table,jt="",w=0,_e=0,Vs=2,$e=1,qs=g.slice.call(arguments,1),_=Object.create(this.lexer),R={yy:{}};for(var It in this.yy)Object.prototype.hasOwnProperty.call(this.yy,It)&&(R.yy[It]=this.yy[It]);_.setInput(c,R.yy),R.yy.lexer=_,R.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Vt=_.yylloc;g.push(Vt);var Fs=_.options&&_.options.ranges;typeof R.yy.parseError=="function"?this.parseError=R.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var Bs=function(){var q;return q=_.lex()||$e,typeof q!="number"&&(q=h.symbols_[q]||q),q},A,U,E,qt,V={},wt,x,be,Et;;){if(U=d[d.length-1],this.defaultActions[U]?E=this.defaultActions[U]:((A===null||typeof A>"u")&&(A=Bs()),E=y[U]&&y[U][A]),typeof E>"u"||!E.length||!E[0]){var Ft="";Et=[];for(wt in y[U])this.terminals_[wt]&&wt>Vs&&Et.push("'"+this.terminals_[wt]+"'");_.showPosition?Ft="Parse error on line "+(w+1)+`:
`+_.showPosition()+`
Expecting `+Et.join(", ")+", got '"+(this.terminals_[A]||A)+"'":Ft="Parse error on line "+(w+1)+": Unexpected "+(A==$e?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(Ft,{text:_.match,token:this.terminals_[A]||A,line:_.yylineno,loc:Vt,expected:Et})}if(E[0]instanceof Array&&E.length>1)throw new Error("Parse Error: multiple actions possible at state: "+U+", token: "+A);switch(E[0]){case 1:d.push(A),m.push(_.yytext),g.push(_.yylloc),d.push(E[1]),A=null,_e=_.yyleng,jt=_.yytext,w=_.yylineno,Vt=_.yylloc;break;case 2:if(x=this.productions_[E[1]][1],V.$=m[m.length-x],V._$={first_line:g[g.length-(x||1)].first_line,last_line:g[g.length-1].last_line,first_column:g[g.length-(x||1)].first_column,last_column:g[g.length-1].last_column},Fs&&(V._$.range=[g[g.length-(x||1)].range[0],g[g.length-1].range[1]]),qt=this.performAction.apply(V,[jt,_e,w,R.yy,E[1],m,g].concat(qs)),typeof qt<"u")return qt;x&&(d=d.slice(0,-1*x*2),m=m.slice(0,-1*x),g=g.slice(0,-1*x)),d.push(this.productions_[E[1]][0]),m.push(V.$),g.push(V._$),be=y[d[d.length-2]][d[d.length-1]],d.push(be);break;case 3:return!0}}return!0}},p=function(){var u={EOF:1,parseError:function(h,d){if(this.yy.parser)this.yy.parser.parseError(h,d);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,d=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var m=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var g=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===m.length?this.yylloc.first_column:0)+m[m.length-d.length].length-d[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[g[0],g[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var d,m,g;if(this.options.backtrack_lexer&&(g={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(g.yylloc.range=this.yylloc.range.slice(0))),m=c[0].match(/(?:\r\n?|\n).*/g),m&&(this.yylineno+=m.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:m?m[m.length-1].length-m[m.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],d=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var y in g)this[y]=g[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,d,m;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),y=0;y<g.length;y++)if(d=this._input.match(this.rules[g[y]]),d&&(!h||d[0].length>h[0].length)){if(h=d,m=y,this.options.backtrack_lexer){if(c=this.test_match(d,g[y]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,g[m]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,d,m,g){switch(m){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=p;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Li<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(bs);function F(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var As={Root:F("Root"),Concat:F("Concat"),Literal:F("Literal"),Splat:F("Splat"),Param:F("Param"),Optional:F("Optional")},ws=bs.parser;ws.yy=As;var Di=ws,Hi=Object.keys(As);function ji(r){return Hi.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var Es=ji,Ii=Es,Vi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Ss(r){this.captures=r.captures,this.re=r.re}Ss.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var qi=Ii({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(Vi,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Ss({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),Fi=qi,Bi=Es,Yi=Bi({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),Wi=Yi,Ki=Di,Ji=Fi,Zi=Wi;_t.prototype=Object.create(null);_t.prototype.match=function(r){var t=Ji.visit(this.ast),e=t.match(r);return e||!1};_t.prototype.reverse=function(r){return Zi.visit(this.ast,r)};function _t(r){var t;if(this?t=this:t=Object.create(_t.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=Ki.parse(r),t}var Gi=_t,Qi=Gi,Xi=Qi;const tr=Mi(Xi);var er=Object.defineProperty,xs=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&er(t,e,i),i};const Ps=class extends W{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>rt`
      <h1>Not Found</h1>
    `,this._cases=t.map(i=>({...i,route:new tr(i.path)})),this._historyObserver=new J(this,e),this._authObserver=new J(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),rt`
      <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(ns(this,"auth/redirect"),rt`
              <h1>Redirecting for Login</h1>
            `):e.view(e.params||{}):rt`
              <h1>Authenticating</h1>
            `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),rt`
              <h1>Redirecting to ${s}…</h1>
            `}}return this._fallback({})})()}</main>
    `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){ui(this,"history/redirect",{href:t})}};Ps.styles=mi`
    :host,
    main {
      display: contents;
    }
  `;let ks=Ps;xs([$s()],ks.prototype,"_user");xs([$s()],ks.prototype,"_match");const Cs=class Os extends HTMLElement{constructor(){if(super(),vt(this).template(Os.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Cs.template=O`
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
  `;let sr=Cs;const ir=Object.freeze(Object.defineProperty({__proto__:null,Element:sr},Symbol.toStringTag,{value:"Module"})),rr=class Ts extends HTMLElement{constructor(){super(),this._array=[],vt(this).template(Ts.template),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(Rs("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{te(t,"button.add")?kt(t,"input-array:add"):te(t,"button.remove")&&kt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],nr(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};rr.template=O`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
      </button>
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
    </template>
  `;function nr(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(Rs(e)))}function Rs(r,t){const e=r===void 0?O`<input />`:O`<input value="${r}" />`;return O`
    <label>
      ${e}
      <button class="remove" type="button"> Remove </button>
    </label>
  `}function he(r,...t){const e=r.map((i,n)=>n?[t[n-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}function $t(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var or=Object.defineProperty,ar=Object.getOwnPropertyDescriptor,lr=(r,t,e,s)=>{for(var i=ar(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&or(t,e,i),i};class cr extends W{constructor(t){super(),this._pending=[],this._observer=new J(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}lr([_s()],cr.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=globalThis,ue=Pt.ShadowRoot&&(Pt.ShadyCSS===void 0||Pt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),je=new WeakMap;let Us=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ue&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=je.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&je.set(e,t))}return t}toString(){return this.cssText}};const hr=r=>new Us(typeof r=="string"?r:r+"",void 0,de),Dt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Us(e,r,de)},ur=(r,t)=>{if(ue)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Pt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Ie=ue?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return hr(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:dr,defineProperty:pr,getOwnPropertyDescriptor:fr,getOwnPropertyNames:mr,getOwnPropertySymbols:gr,getPrototypeOf:yr}=Object,T=globalThis,Ve=T.trustedTypes,vr=Ve?Ve.emptyScript:"",Wt=T.reactiveElementPolyfillSupport,lt=(r,t)=>r,Rt={toAttribute(r,t){switch(t){case Boolean:r=r?vr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},pe=(r,t)=>!dr(r,t),qe={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:pe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),T.litPropertyMetadata??(T.litPropertyMetadata=new WeakMap);class Y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=qe){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&pr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=fr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??qe}static _$Ei(){if(this.hasOwnProperty(lt("elementProperties")))return;const t=yr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(lt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(lt("properties"))){const e=this.properties,s=[...mr(e),...gr(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Ie(i))}else t!==void 0&&e.push(Ie(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ur(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:Rt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:Rt;this._$Em=i,this[i]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??pe)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}Y.elementStyles=[],Y.shadowRootOptions={mode:"open"},Y[lt("elementProperties")]=new Map,Y[lt("finalized")]=new Map,Wt==null||Wt({ReactiveElement:Y}),(T.reactiveElementVersions??(T.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=globalThis,Ut=ct.trustedTypes,Fe=Ut?Ut.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ns="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,zs="?"+C,_r=`<${zs}>`,j=document,pt=()=>j.createComment(""),ft=r=>r===null||typeof r!="object"&&typeof r!="function",fe=Array.isArray,$r=r=>fe(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Kt=`[ 	
\f\r]`,nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,Ye=/>/g,z=RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),We=/'/g,Ke=/"/g,Ms=/^(?:script|style|textarea|title)$/i,br=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),v=br(1),X=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Je=new WeakMap,D=j.createTreeWalker(j,129);function Ls(r,t){if(!fe(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(t):t}const Ar=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=nt;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===nt?f[1]==="!--"?o=Be:f[1]!==void 0?o=Ye:f[2]!==void 0?(Ms.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=z):f[3]!==void 0&&(o=z):o===z?f[0]===">"?(o=i??nt,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?z:f[3]==='"'?Ke:We):o===Ke||o===We?o=z:o===Be||o===Ye?o=nt:(o=z,i=void 0);const h=o===z&&r[l+1].startsWith("/>")?" ":"";n+=o===nt?a+_r:u>=0?(s.push(p),a.slice(0,u)+Ns+a.slice(u)+C+h):a+C+(u===-2?l:h)}return[Ls(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class mt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Ar(t,e);if(this.el=mt.createElement(p,s),D.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=D.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Ns)){const c=f[o++],h=i.getAttribute(u).split(C),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?Er:d[1]==="?"?Sr:d[1]==="@"?xr:Ht}),i.removeAttribute(u)}else u.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Ms.test(i.tagName)){const u=i.textContent.split(C),c=u.length-1;if(c>0){i.textContent=Ut?Ut.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],pt()),D.nextNode(),a.push({type:2,index:++n});i.append(u[c],pt())}}}else if(i.nodeType===8)if(i.data===zs)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(C,u+1))!==-1;)a.push({type:7,index:n}),u+=C.length-1}n++}}static createElement(t,e){const s=j.createElement("template");return s.innerHTML=t,s}}function tt(r,t,e=r,s){var o,l;if(t===X)return t;let i=s!==void 0?(o=e.o)==null?void 0:o[s]:e.l;const n=ft(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=i:e.l=i),i!==void 0&&(t=tt(r,i._$AS(r,t.values),i,s)),t}class wr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??j).importNode(e,!0);D.currentNode=i;let n=D.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new bt(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Pr(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=D.nextNode(),o++)}return D.currentNode=j,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class bt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),ft(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==X&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):$r(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&ft(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=mt.createElement(Ls(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new wr(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=Je.get(t.strings);return e===void 0&&Je.set(t.strings,e=new mt(t)),e}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new bt(this.O(pt()),this.O(pt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Ht{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=tt(this,t,e,0),o=!ft(t)||t!==this._$AH&&t!==X,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=tt(this,l[s+a],e,a),p===X&&(p=this._$AH[a]),o||(o=!ft(p)||p!==this._$AH[a]),p===b?t=b:t!==b&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Er extends Ht{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Sr extends Ht{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class xr extends Ht{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??b)===X)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Pr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const Jt=ct.litHtmlPolyfillSupport;Jt==null||Jt(mt,bt),(ct.litHtmlVersions??(ct.litHtmlVersions=[])).push("3.2.0");const kr=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new bt(t.insertBefore(pt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class P extends Y{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=kr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return X}}var Qe;P._$litElement$=!0,P.finalized=!0,(Qe=globalThis.litElementHydrateSupport)==null||Qe.call(globalThis,{LitElement:P});const Zt=globalThis.litElementPolyfillSupport;Zt==null||Zt({LitElement:P});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");const Cr=he`
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
    font-style: oblique;
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
`,Or={styles:Cr},Tr=he`
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
`,Rr={styles:Tr},M=class M extends HTMLElement{constructor(){var e,s,i,n;super(),this._authObserver=new J(this,"blazing:auth"),vt(this).template(M.template).styles(Rr.styles,Or.styles,M.styles);const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".dark-mode-switch");t&&t.addEventListener("click",o=>we.relay(o,"dark-mode",{checked:o.target.checked})),this._userid=((s=this.shadowRoot)==null?void 0:s.querySelector("#userid"))||null,this._signout=((i=this.shadowRoot)==null?void 0:i.querySelector("#signout"))||null,(n=this._signout)==null||n.addEventListener("click",o=>we.relay(o,"auth:message",["auth/signout"]))}get userid(){var t;return(t=this._userid)==null?void 0:t.textContent}set userid(t){!t||t==="anonymous"?(this._userid&&(this._userid.textContent=""),this._signout&&(this._signout.disabled=!0)):(this._userid&&(this._userid.textContent=t),this._signout&&(this._signout.disabled=!1))}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&t.username!==this.userid&&(this.userid=t.username)})}static initializeOnce(){function t(e,s){e.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",e=>{var s;return t(e.currentTarget,(s=e.detail)==null?void 0:s.checked)})}};M.uses=$t({"mu-dropdown":ir.Element}),M.template=O`<template>
    <header>
      <h1>Blazing Travels</h1>
      <nav>
        <p><slot> Unnamed Tour </slot></p>
        <mu-dropdown>
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
          <menu>
            <li>
              <label class="dark-mode-switch">
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout">Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login">Sign In</a>
            </li>
          </menu>
        </mu-dropdown>
      </nav>
    </header>
  </template>`,M.styles=he`
    :host {
      display: contents;
    }
    header {
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
    header p {
      --color-link: var(--color-link-inverted);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
    a[slot="actuator"] {
      color: var(--color-link-inverted);
      cursor: pointer;
    }
    #userid:empty::before {
      content: "traveler";
    }
    menu a {
      color: var(--color-link);
      cursor: pointer;
      text-decoration: underline;
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }
  `;let se=M;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ur={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:pe},Nr=(r=Ur,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function S(r){return(t,e)=>typeof e=="object"?Nr(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function zr(r){return S({...r,state:!0,attribute:!1})}var Mr=Object.defineProperty,me=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Mr(t,e,i),i};const ge=class ge extends P{constructor(){super(...arguments),this.color="white"}render(){return v`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};ge.styles=Dt`
    :host {
      display: contents;
      --avatar-backgroundColor: var(--color-accent);
      --avatar-size: 100px;
    }
    .avatar {
      grid-column: key;
      justify-self: end;
      position: relative;
      width: var(--avatar-size);
      aspect-ratio: 1;
      background-color: var(--avatar-backgroundColor);
      background-size: cover;
      border-radius: 50%;
      text-align: center;
      line-height: var(--avatar-size);
      font-size: calc(0.66 * var(--avatar-size));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
  `;let et=ge;me([S()],et.prototype,"color");me([S()],et.prototype,"src");me([S()],et.prototype,"initial");var Lr=Object.defineProperty,Ds=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Lr(t,e,i),i};const zt=class zt extends P{get entourage(){return this.using||{}}render(){const{name:t,people:e}=this.entourage,s=e||[],i=this.href?v` <a href=${this.href}>Chat Now...</a> `:"",n=o=>{const{userid:l,avatar:a,name:p="** NO NAME **",nickname:f,color:u}=o,c=(f||p||l).slice(0,1),h=v`
        <traveler-avatar
          color=${u}
          src=${a}
          initial=${c}
          style="--avatar-size: 2em"></traveler-avatar>
      `;return v`
        <tr>
          <td>
            <a href="/app/profile/${l}">${h}</a>
          </td>
          <td class="name">
            <a href="/app/profile/${l}">${p}</a>
          </td>
        </tr>
      `};return v`
      <section>
        <h3>${t||"Entourage"}</h3>
        ${i}
        <table>
          <tbody>${s.map(n)}</tbody>
        </table>
      </section>
    `}};zt.uses=$t({"traveler-avatar":et}),zt.styles=Dt`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    table {
      width: 100%;
    }
    thead {
      font-size: var(--size-font-min);
    }
    th,
    td {
      padding: 0 var(--size-spacing-small);
      vertical-align: middle;
    }
    a[href] {
      font: inherit;
      color: inherit;
    }
    .name {
      width: 100%;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
    img {
      width: 100%;
    }
  `;let gt=zt;Ds([S({attribute:!1})],gt.prototype,"using");Ds([S()],gt.prototype,"href");const Dr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Nt=r=>{const t=(typeof r=="string"?new Date(r):r)||new Date,e=Dr[t.getUTCMonth()];return`${t.getUTCDate()} ${e}`};function Ze(r){const t=new Date(Date.parse(r)),e=t.getUTCDate(),s=t.getUTCMonth(),i=t.getUTCFullYear();return new Date(Date.UTC(i,s,e))}function Ge(r){const t=r;let e=r;return e.startDate=Ze(t.startDate),e.endDate=t.endDate?Ze(t.endDate):void 0,e}var Hr=Object.defineProperty,At=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Hr(t,e,i),i};const ye=class ye extends P{constructor(){super(...arguments),this.startDate="1970-01-01"}render(){const t=this.renderItem();return v`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${Nt(this.startDate)}
        </time>
        ${this.endDate?v`
              <time datetime=${this.endDate}>
                ${Nt(this.endDate)}
              </time>
            `:null}
      </span>
      ${t}
    `}renderItem(){return v`
      <slot></slot>
    `}};ye.styles=Dt`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    :host(*) {
      display: contents;
    }
    #dates {
      display: flex;
      grid-column: 1;
      place-self: stretch;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      font-size: var(--size-type-small);
      font-family: var(--font-family-display);
      border-bottom: var(--line-weight-superfine) solid
        var(--color-accent);
    }
    #dates time {
      white-space: nowrap;
    }
    #dates time:first-child {
      font-weight: var(--font-weight-bold);
    }
    #dates time + time {
      visibility: hidden;
    }
    .destination {
      grid-column: 2/-1;
      background: var(--color-background-card);
      border-radius: var(--size-corner-medium);
      aspect-ratio: 16/9;
      background-size: cover;
      background-position: left 25%;
    }
    .transportation {
      display: grid;
      grid-column: 2/-1;
      grid-template-columns: subgrid;
      place-items: center;
    }
    .transportation > h3 {
      display: contents;
      font-size: var(--size-type-mlarge);
      font-style: oblique;
    }
    .destination > h3 {
      padding: 0 var(--size-spacing-medium);
    }
    .destination[style] > h3 {
      color: var(--color-text-inverted);
      text-decoration: none;
      font-weight: var(--font-weight-bold;);
      text-shadow: var(--shadow-dropdown);
      text-align: right;
    }
    .transportation > h3 > :first-child {
      justify-self: end;
    }
    .transportation > h3 > :last-child {
      justify-self: start;
    }
    ::slotted([slot="via"]) {
      font-weight: var(--font-weight-light);
      font-style: normal;
      font-size: 75%;
    }
    ::slotted([slot="via"])::before {
      display: inline;
      content: "via ";
    }
    h3 {
      font-family: var(--font-family-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      color: var(--color-accent);
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
    }
  `;let I=ye;At([S({attribute:"start-date"})],I.prototype,"startDate");At([S({attribute:"end-date"})],I.prototype,"endDate");At([S()],I.prototype,"href");class Hs extends I{renderItem(){const t=v`
      <slot></slot>
    `,e=this.href?v`
          <a class="itemLink" href="${this.href}">${t}</a>
        `:t,s=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return v`
      <section class="destination" style=${s}>
        <h3>${e}</h3>
      </section>
    `}}At([S({attribute:"img-src"})],Hs.prototype,"imgSrc");class js extends I{renderItem(){const t={air:"icon-airplane",rail:"icon-train"},e=this.type?t[this.type]:"icon-default";return v`
      <section class="transportation">
        <h3 class="subgrid">
          <span>
            <slot name="origin">BGN</slot>
          </span>
          <svg class="icon">
            <use href="/icons/transportation.svg#${e}" />
          </svg>
          <span>
            <slot name="terminus">END</slot>
            <slot name="via"></slot>
          </span>
        </h3>
      </section>
    `}}At([S()],js.prototype,"type");var jr=Object.defineProperty,Is=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&jr(t,e,i),i};const Mt=class Mt extends P{constructor(){super(...arguments),this.tourid="",this._authObserver=new J(this,"blazing:auth"),this._user=new Xt.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.loadData()})}loadData(){const t=`/api/tours/${this.tourid}`;fetch(t,{headers:Xt.headers(this._user)}).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).catch(e=>console.log("Failed to load tour data:",e)).then(e=>{if(e){console.log("Tour:",e);let s=Ge(e);s.destinations=s.destinations.map(Ge),this.tour=s}}).catch(e=>console.log("Failed to convert tour data:",e))}render(){const{endDate:t,destinations:e=[],transportation:s=[],entourage:i,name:n,startDate:o}=this.tour||{},l=(c,h)=>{const{startDate:d,endDate:m,name:g,featuredImage:y}=c;return v`
        <itinerary-destination
          start-date=${d}
          end-date=${m}
          img-src=${y}
          href="/destination/${this.tourid}/${h}">
          ${g}
        </itinerary-destination>
      `},a=c=>{const h=c.length+1,d=c[0].departure,m=c[c.length-1].arrival,g=h>2?v`
              <span slot="via">
                ${c.slice(1,-1).map(y=>y.departure.name).join(", ")}
              </span>
            `:null;return v`
        <span slot="origin">${d.name}</span>
        <span slot="terminus">${m.name}</span>
        ${g}
      `},p=c=>{const{startDate:h,type:d,segments:m}=c||{};return v`
        <itinerary-transportation
          start-date=${h}
          type=${d}>
          ${a(m)}
        </itinerary-transportation>
      `},f=()=>v`
        <p>
          from ${Nt(o)} to
          ${Nt(t)}
          ${t&&t.getFullYear()}
        </p>
      `,u=(c,h)=>{const d=s[h],m=s[h+1];return v`
        ${h?"":p(d)}
        ${l(c,h)} ${p(m)}
      `};return console.log("Rendering Tour page",this.tour),v`
      <main class="page">
        <header>
          <h2>${n}</h2>
          ${f()}
        </header>

        <section class="itinerary">
          ${e.map(u)}
        </section>

        <entourage-table
          href="/app/entourage/${this.tourid}"
          .using=${i}></entourage-table>
      </main>
    `}};Mt.uses=$t({"entourage-table":gt,"itinerary-destination":Hs,"itinerary-transportation":js}),Mt.styles=[Dt`
      :host {
        display: contents;
      }
      h2,
      p {
        margin: 0;
      }
      main.page {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
          "hd hd hd it it it it it"
          "en en en it it it it it"
          "xx xx xx it it it it it";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }

      header {
        grid-area: hd;
      }

      .itinerary {
        display: grid;
        grid-area: it;
        align-self: start;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;
      }

      entourage-table {
        grid-area: en;
      }
    `];let yt=Mt;Is([S({attribute:"tour-id",reflect:!0})],yt.prototype,"tourid");Is([zr()],yt.prototype,"tour");const ve=class ve extends P{render(){return v`define({ "mu-auth": Auth.Provider,
      "blazing-app": AppElement });
      <article>
        <blazing-header></blazing-header>
        You can > do that if you want, but in the examples,
      </article> `}};ve.uses=$t({"blazing-header":se,"tour-view":yt});let ie=ve;$t({"mu-auth":Xt.Provider,"blazing-app":ie});
