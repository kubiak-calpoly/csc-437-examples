(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe=globalThis,Ge=fe.ShadowRoot&&(fe.ShadyCSS===void 0||fe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ye=Symbol(),at=new WeakMap;let It=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ge&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=at.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&at.set(t,e))}return e}toString(){return this.cssText}};const A=r=>new It(typeof r=="string"?r:r+"",void 0,Ye),y=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,n,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[s+1],r[0]);return new It(t,r,Ye)},hr=(r,e)=>{if(Ge)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),n=fe.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,r.appendChild(i)}},lt=Ge?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return A(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:dr,defineProperty:ur,getOwnPropertyDescriptor:pr,getOwnPropertyNames:fr,getOwnPropertySymbols:gr,getPrototypeOf:mr}=Object,U=globalThis,ct=U.trustedTypes,_r=ct?ct.emptyScript:"",Ie=U.reactiveElementPolyfillSupport,Q=(r,e)=>r,ve={toAttribute(r,e){switch(e){case Boolean:r=r?_r:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Xe=(r,e)=>!dr(r,e),ht={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:Xe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),U.litPropertyMetadata??(U.litPropertyMetadata=new WeakMap);class M extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ht){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&ur(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=pr(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return n==null?void 0:n.call(this)},set(o){const l=n==null?void 0:n.call(this);s.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ht}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;const e=mr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){const t=this.properties,i=[...fr(t),...gr(t)];for(const n of i)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(lt(n))}else e!==void 0&&t.push(lt(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return hr(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){var s;const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:ve).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){var s;const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:ve;this._$Em=n,this[n]=l.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){if(i??(i=this.constructor.getPropertyOptions(e)),!(i.hasChanged??Xe)(this[e],t))return;this.P(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,o]of n)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(t)):this._$EU()}catch(n){throw e=!1,this._$EU(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[Q("elementProperties")]=new Map,M[Q("finalized")]=new Map,Ie==null||Ie({ReactiveElement:M}),(U.reactiveElementVersions??(U.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,be=Z.trustedTypes,dt=be?be.createPolicy("lit-html",{createHTML:r=>r}):void 0,Nt="$lit$",D=`lit$${(Math.random()+"").slice(9)}$`,Mt="?"+D,vr=`<${Mt}>`,L=document,te=()=>L.createComment(""),re=r=>r===null||typeof r!="object"&&typeof r!="function",kt=Array.isArray,br=r=>kt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Ne=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,pt=/>/g,z=RegExp(`>|${Ne}(?:([^\\s"'>=/]+)(${Ne}*=${Ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,gt=/"/g,Ht=/^(?:script|style|textarea|title)$/i,yr=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),f=yr(1),H=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),mt=new WeakMap,j=L.createTreeWalker(L,129);function qt(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(e):e}const $r=(r,e)=>{const t=r.length-1,i=[];let n,s=e===2?"<svg>":"",o=Y;for(let l=0;l<t;l++){const a=r[l];let c,u,h=-1,d=0;for(;d<a.length&&(o.lastIndex=d,u=o.exec(a),u!==null);)d=o.lastIndex,o===Y?u[1]==="!--"?o=ut:u[1]!==void 0?o=pt:u[2]!==void 0?(Ht.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=z):u[3]!==void 0&&(o=z):o===z?u[0]===">"?(o=n??Y,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?z:u[3]==='"'?gt:ft):o===gt||o===ft?o=z:o===ut||o===pt?o=Y:(o=z,n=void 0);const p=o===z&&r[l+1].startsWith("/>")?" ":"";s+=o===Y?a+vr:h>=0?(i.push(c),a.slice(0,h)+Nt+a.slice(h)+D+p):a+D+(h===-2?l:p)}return[qt(r,s+(r[t]||"<?>")+(e===2?"</svg>":"")),i]};class ne{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,o=0;const l=e.length-1,a=this.parts,[c,u]=$r(e,t);if(this.el=ne.createElement(c,i),j.currentNode=this.el.content,t===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=j.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(Nt)){const d=u[o++],p=n.getAttribute(h).split(D),b=/([.?@])?(.*)/.exec(d);a.push({type:1,index:s,name:b[2],strings:p,ctor:b[1]==="."?Er:b[1]==="?"?Ar:b[1]==="@"?Pr:Se}),n.removeAttribute(h)}else h.startsWith(D)&&(a.push({type:6,index:s}),n.removeAttribute(h));if(Ht.test(n.tagName)){const h=n.textContent.split(D),d=h.length-1;if(d>0){n.textContent=be?be.emptyScript:"";for(let p=0;p<d;p++)n.append(h[p],te()),j.nextNode(),a.push({type:2,index:++s});n.append(h[d],te())}}}else if(n.nodeType===8)if(n.data===Mt)a.push({type:2,index:s});else{let h=-1;for(;(h=n.data.indexOf(D,h+1))!==-1;)a.push({type:7,index:s}),h+=D.length-1}s++}}static createElement(e,t){const i=L.createElement("template");return i.innerHTML=e,i}}function q(r,e,t=r,i){var o,l;if(e===H)return e;let n=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const s=re(e)?void 0:e._$litDirective$;return(n==null?void 0:n.constructor)!==s&&((l=n==null?void 0:n._$AO)==null||l.call(n,!1),s===void 0?n=void 0:(n=new s(r),n._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=n:t._$Cl=n),n!==void 0&&(e=q(r,n._$AS(r,e.values),n,i)),e}class wr{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=((e==null?void 0:e.creationScope)??L).importNode(t,!0);j.currentNode=n;let s=j.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new he(s,s.nextSibling,this,e):a.type===1?c=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(c=new Cr(s,this,e)),this._$AV.push(c),a=i[++l]}o!==(a==null?void 0:a.index)&&(s=j.nextNode(),o++)}return j.currentNode=L,n}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class he{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),re(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):br(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==m&&re(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ne.createElement(qt(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===n)this._$AH.p(t);else{const o=new wr(n,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=mt.get(e.strings);return t===void 0&&mt.set(e.strings,t=new ne(e)),t}k(e){kt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new he(this.S(te()),this.S(te()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Se{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,t=this,i,n){const s=this.strings;let o=!1;if(s===void 0)e=q(this,e,t,0),o=!re(e)||e!==this._$AH&&e!==H,o&&(this._$AH=e);else{const l=e;let a,c;for(e=s[0],a=0;a<s.length-1;a++)c=q(this,l[i+a],t,a),c===H&&(c=this._$AH[a]),o||(o=!re(c)||c!==this._$AH[a]),c===m?e=m:e!==m&&(e+=(c??"")+s[a+1]),this._$AH[a]=c}o&&!n&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Er extends Se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class Ar extends Se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class Pr extends Se{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=q(this,e,t,0)??m)===H)return;const i=this._$AH,n=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==m&&(i===m||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Cr{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const Me=Z.litHtmlPolyfillSupport;Me==null||Me(ne,he),(Z.litHtmlVersions??(Z.litHtmlVersions=[])).push("3.1.2");const Sr=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let n=i._$litPart$;if(n===void 0){const s=(t==null?void 0:t.renderBefore)??null;i._$litPart$=n=new he(e.insertBefore(te(),s),s,void 0,t??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let _=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Sr(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return H}};var Lt;_._$litElement$=!0,_.finalized=!0,(Lt=globalThis.litElementHydrateSupport)==null||Lt.call(globalThis,{LitElement:_});const ke=globalThis.litElementPolyfillSupport;ke==null||ke({LitElement:_});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Or={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:Xe},Dr=(r=Or,e,t)=>{const{kind:i,metadata:n}=t;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),s.set(t.name,r),i==="accessor"){const{name:o}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(i==="setter"){const{name:o}=t;return function(l){const a=this[o];e.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function g(r){return(e,t)=>typeof t=="object"?Dr(r,e,t):((i,n,s)=>{const o=n.hasOwnProperty(s);return n.constructor.createProperty(s,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(n,s):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function C(r){return g({...r,state:!0,attribute:!1})}function ye(r){return r=r||[],Array.isArray(r)?r:[r]}function E(r){return`[Vaadin.Router] ${r}`}function xr(r){if(typeof r!="object")return String(r);const e=Object.prototype.toString.call(r).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(r)}`:e}const $e="module",we="nomodule",qe=[$e,we];function _t(r){if(!r.match(/.+\.[m]?js$/))throw new Error(E(`Unsupported type for bundle "${r}": .js or .mjs expected.`))}function Bt(r){if(!r||!w(r.path))throw new Error(E('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=r.bundle,t=["component","redirect","bundle"];if(!I(r.action)&&!Array.isArray(r.children)&&!I(r.children)&&!Ee(e)&&!t.some(i=>w(r[i])))throw new Error(E(`Expected route config "${r.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if(w(e))_t(e);else if(qe.some(i=>i in e))qe.forEach(i=>i in e&&_t(e[i]));else throw new Error(E('Expected route bundle to include either "'+we+'" or "'+$e+'" keys, or both'));r.redirect&&["bundle","component"].forEach(i=>{i in r&&console.warn(E(`Route config "${r.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`))})}function vt(r){ye(r).forEach(e=>Bt(e))}function bt(r,e){let t=document.head.querySelector('script[src="'+r+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",r),e===$e?t.setAttribute("type",$e):e===we&&t.setAttribute(we,""),t.async=!0),new Promise((i,n)=>{t.onreadystatechange=t.onload=s=>{t.__dynamicImportLoaded=!0,i(s)},t.onerror=s=>{t.parentNode&&t.parentNode.removeChild(t),n(s)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&i()})}function Rr(r){return w(r)?bt(r):Promise.race(qe.filter(e=>e in r).map(e=>bt(r[e],e)))}function ee(r,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${r}`,{cancelable:r==="go",detail:e}))}function Ee(r){return typeof r=="object"&&!!r}function I(r){return typeof r=="function"}function w(r){return typeof r=="string"}function Ft(r){const e=new Error(E(`Page not found (${r.pathname})`));return e.context=r,e.code=404,e}const k=new class{};function Ur(r){const e=r.port,t=r.protocol,s=t==="http:"&&e==="80"||t==="https:"&&e==="443"?r.hostname:r.host;return`${t}//${s}`}function yt(r){if(r.defaultPrevented||r.button!==0||r.shiftKey||r.ctrlKey||r.altKey||r.metaKey)return;let e=r.target;const t=r.composedPath?r.composedPath():r.path||[];for(let l=0;l<t.length;l++){const a=t[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Ur(e))!==window.location.origin)return;const{pathname:n,search:s,hash:o}=e;ee("go",{pathname:n,search:s,hash:o})&&(r.preventDefault(),r&&r.type==="click"&&window.scrollTo(0,0))}const Tr={activate(){window.document.addEventListener("click",yt)},inactivate(){window.document.removeEventListener("click",yt)}},zr=/Trident/.test(navigator.userAgent);zr&&!I(window.PopStateEvent)&&(window.PopStateEvent=function(r,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(r,!!e.bubbles,!!e.cancelable),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function $t(r){if(r.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:i}=window.location;ee("go",{pathname:e,search:t,hash:i})}const jr={activate(){window.addEventListener("popstate",$t)},inactivate(){window.removeEventListener("popstate",$t)}};var V=Yt,Lr=Qe,Ir=Hr,Nr=Kt,Mr=Gt,Wt="/",Jt="./",kr=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function Qe(r,e){for(var t=[],i=0,n=0,s="",o=e&&e.delimiter||Wt,l=e&&e.delimiters||Jt,a=!1,c;(c=kr.exec(r))!==null;){var u=c[0],h=c[1],d=c.index;if(s+=r.slice(n,d),n=d+u.length,h){s+=h[1],a=!0;continue}var p="",b=r[n],T=c[2],je=c[3],or=c[4],ue=c[5];if(!a&&s.length){var Le=s.length-1;l.indexOf(s[Le])>-1&&(p=s[Le],s=s.slice(0,Le))}s&&(t.push(s),s="",a=!1);var ar=p!==""&&b!==void 0&&b!==p,lr=ue==="+"||ue==="*",cr=ue==="?"||ue==="*",st=p||o,ot=je||or;t.push({name:T||i++,prefix:p,delimiter:st,optional:cr,repeat:lr,partial:ar,pattern:ot?qr(ot):"[^"+O(st)+"]+?"})}return(s||n<r.length)&&t.push(s+r.substr(n)),t}function Hr(r,e){return Kt(Qe(r,e))}function Kt(r){for(var e=new Array(r.length),t=0;t<r.length;t++)typeof r[t]=="object"&&(e[t]=new RegExp("^(?:"+r[t].pattern+")$"));return function(i,n){for(var s="",o=n&&n.encode||encodeURIComponent,l=0;l<r.length;l++){var a=r[l];if(typeof a=="string"){s+=a;continue}var c=i?i[a.name]:void 0,u;if(Array.isArray(c)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(c.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var h=0;h<c.length;h++){if(u=o(c[h],a),!e[l].test(u))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');s+=(h===0?a.prefix:a.delimiter)+u}continue}if(typeof c=="string"||typeof c=="number"||typeof c=="boolean"){if(u=o(String(c),a),!e[l].test(u))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+u+'"');s+=a.prefix+u;continue}if(a.optional){a.partial&&(s+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return s}}function O(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function qr(r){return r.replace(/([=!:$/()])/g,"\\$1")}function Vt(r){return r&&r.sensitive?"":"i"}function Br(r,e){if(!e)return r;var t=r.source.match(/\((?!\?)/g);if(t)for(var i=0;i<t.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return r}function Fr(r,e,t){for(var i=[],n=0;n<r.length;n++)i.push(Yt(r[n],e,t).source);return new RegExp("(?:"+i.join("|")+")",Vt(t))}function Wr(r,e,t){return Gt(Qe(r,t),e,t)}function Gt(r,e,t){t=t||{};for(var i=t.strict,n=t.start!==!1,s=t.end!==!1,o=O(t.delimiter||Wt),l=t.delimiters||Jt,a=[].concat(t.endsWith||[]).map(O).concat("$").join("|"),c=n?"^":"",u=r.length===0,h=0;h<r.length;h++){var d=r[h];if(typeof d=="string")c+=O(d),u=h===r.length-1&&l.indexOf(d[d.length-1])>-1;else{var p=d.repeat?"(?:"+d.pattern+")(?:"+O(d.delimiter)+"(?:"+d.pattern+"))*":d.pattern;e&&e.push(d),d.optional?d.partial?c+=O(d.prefix)+"("+p+")?":c+="(?:"+O(d.prefix)+"("+p+"))?":c+=O(d.prefix)+"("+p+")"}}return s?(i||(c+="(?:"+o+")?"),c+=a==="$"?"$":"(?="+a+")"):(i||(c+="(?:"+o+"(?="+a+"))?"),u||(c+="(?="+o+"|"+a+")")),new RegExp(c,Vt(t))}function Yt(r,e,t){return r instanceof RegExp?Br(r,e):Array.isArray(r)?Fr(r,e,t):Wr(r,e,t)}V.parse=Lr;V.compile=Ir;V.tokensToFunction=Nr;V.tokensToRegExp=Mr;const{hasOwnProperty:Jr}=Object.prototype,Be=new Map;Be.set("|false",{keys:[],pattern:/(?:)/});function wt(r){try{return decodeURIComponent(r)}catch{return r}}function Kr(r,e,t,i,n){t=!!t;const s=`${r}|${t}`;let o=Be.get(s);if(!o){const c=[];o={keys:c,pattern:V(r,c,{end:t,strict:r===""})},Be.set(s,o)}const l=o.pattern.exec(e);if(!l)return null;const a=Object.assign({},n);for(let c=1;c<l.length;c++){const u=o.keys[c-1],h=u.name,d=l[c];(d!==void 0||!Jr.call(a,h))&&(u.repeat?a[h]=d?d.split(u.delimiter).map(wt):[]:a[h]=d&&wt(d))}return{path:l[0],keys:(i||[]).concat(o.keys),params:a}}function Xt(r,e,t,i,n){let s,o,l=0,a=r.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(c){if(r===c)return{done:!0};const u=r.__children=r.__children||r.children;if(!s&&(s=Kr(a,e,!u,i,n),s))return{done:!1,value:{route:r,keys:s.keys,params:s.params,path:s.path}};if(s&&u)for(;l<u.length;){if(!o){const d=u[l];d.parent=r;let p=s.path.length;p>0&&e.charAt(p)==="/"&&(p+=1),o=Xt(d,e.substr(p),t,s.keys,s.params)}const h=o.next(c);if(!h.done)return{done:!1,value:h.value};o=null,l++}return{done:!0}}}}function Vr(r){if(I(r.route.action))return r.route.action(r)}function Gr(r,e){let t=e;for(;t;)if(t=t.parent,t===r)return!0;return!1}function Yr(r){let e=`Path '${r.pathname}' is not properly resolved due to an error.`;const t=(r.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function Xr(r,e){const{route:t,path:i}=e;if(t&&!t.__synthetic){const n={path:i,route:t};if(!r.chain)r.chain=[];else if(t.parent){let s=r.chain.length;for(;s--&&r.chain[s].route&&r.chain[s].route!==t.parent;)r.chain.pop()}r.chain.push(n)}}class ie{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||Vr,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){vt(e);const t=[...ye(e)];this.root.__children=t}addRoutes(e){return vt(e),this.root.__children.push(...ye(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,w(e)?{pathname:e}:e),i=Xt(this.root,this.__normalizePathname(t.pathname),this.baseUrl),n=this.resolveRoute;let s=null,o=null,l=t;function a(c,u=s.value.route,h){const d=h===null&&s.value.route;return s=o||i.next(d),o=null,!c&&(s.done||!Gr(u,s.value.route))?(o=s,Promise.resolve(k)):s.done?Promise.reject(Ft(t)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},t,s.value),Xr(l,s.value),Promise.resolve(n(l)).then(p=>p!=null&&p!==k?(l.result=p.result||p,l):a(c,u,p)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(c=>{const u=Yr(l);if(c?console.warn(u):c=new Error(u),c.context=c.context||l,c instanceof DOMException||(c.code=c.code||500),this.errorHandler)return l.result=this.errorHandler(c),l;throw c})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,i=this.constructor.__createUrl(e,t).href;if(i.slice(0,t.length)===t)return i.slice(t.length)}}ie.pathToRegexp=V;const{pathToRegexp:Et}=ie,At=new Map;function Qt(r,e,t){const i=e.name||e.component;if(i&&(r.has(i)?r.get(i).push(e):r.set(i,[e])),Array.isArray(t))for(let n=0;n<t.length;n++){const s=t[n];s.parent=e,Qt(r,s,s.__children||s.children)}}function Pt(r,e){const t=r.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function Ct(r){let e=r.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function Qr(r,e={}){if(!(r instanceof ie))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(i,n)=>{let s=Pt(t,i);if(!s&&(t.clear(),Qt(t,r.root,r.root.__children),s=Pt(t,i),!s))throw new Error(`Route "${i}" not found`);let o=At.get(s.fullPath);if(!o){let a=Ct(s),c=s.parent;for(;c;){const p=Ct(c);p&&(a=p.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),c=c.parent}const u=Et.parse(a),h=Et.tokensToFunction(u),d=Object.create(null);for(let p=0;p<u.length;p++)w(u[p])||(d[u[p].name]=!0);o={toPath:h,keys:d},At.set(a,o),s.fullPath=a}let l=o.toPath(n,e)||"/";if(e.stringifyQueryParams&&n){const a={},c=Object.keys(n);for(let h=0;h<c.length;h++){const d=c[h];o.keys[d]||(a[d]=n[d])}const u=e.stringifyQueryParams(a);u&&(l+=u.charAt(0)==="?"?u:`?${u}`)}return l}}let St=[];function Zr(r){St.forEach(e=>e.inactivate()),r.forEach(e=>e.activate()),St=r}const en=r=>{const e=getComputedStyle(r).getPropertyValue("animation-name");return e&&e!=="none"},tn=(r,e)=>{const t=()=>{r.removeEventListener("animationend",t),e()};r.addEventListener("animationend",t)};function Ot(r,e){return r.classList.add(e),new Promise(t=>{if(en(r)){const i=r.getBoundingClientRect(),n=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;r.setAttribute("style",`position: absolute; ${n}`),tn(r,()=>{r.classList.remove(e),r.removeAttribute("style"),t()})}else r.classList.remove(e),t()})}const rn=256;function He(r){return r!=null}function nn(r){const e=Object.assign({},r);return delete e.next,e}function $({pathname:r="",search:e="",hash:t="",chain:i=[],params:n={},redirectFrom:s,resolver:o},l){const a=i.map(c=>c.route);return{baseUrl:o&&o.baseUrl||"",pathname:r,search:e,hash:t,routes:a,route:l||a.length&&a[a.length-1]||null,params:n,redirectFrom:s,getUrl:(c={})=>me(x.pathToRegexp.compile(Zt(a))(Object.assign({},n,c)),o)}}function Dt(r,e){const t=Object.assign({},r.params);return{redirect:{pathname:e,from:r.pathname,params:t}}}function sn(r,e){e.location=$(r);const t=r.chain.map(i=>i.route).indexOf(r.route);return r.chain[t].element=e,e}function ge(r,e,t){if(I(r))return r.apply(t,e)}function xt(r,e,t){return i=>{if(i&&(i.cancel||i.redirect))return i;if(t)return ge(t[r],e,t)}}function on(r,e){if(!Array.isArray(r)&&!Ee(r))throw new Error(E(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${r}`));e.__children=[];const t=ye(r);for(let i=0;i<t.length;i++)Bt(t[i]),e.__children.push(t[i])}function pe(r){if(r&&r.length){const e=r[0].parentNode;for(let t=0;t<r.length;t++)e.removeChild(r[t])}}function me(r,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(r.replace(/^\//,""),t).pathname:r}function Zt(r){return r.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class x extends ie{constructor(e,t){const i=document.head.querySelector("base"),n=i&&i.getAttribute("href");super([],Object.assign({baseUrl:n&&ie.__createUrl(n,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=o=>this.__resolveRoute(o);const s=x.NavigationTrigger;x.setTriggers.apply(x,Object.keys(s).map(o=>s[o])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=$({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let i=Promise.resolve();I(t.children)&&(i=i.then(()=>t.children(nn(e))).then(s=>{!He(s)&&!I(t.children)&&(s=t.children),on(s,t)}));const n={redirect:s=>Dt(e,s),component:s=>{const o=document.createElement(s);return this.__createdByRouter.set(o,!0),o}};return i.then(()=>{if(this.__isLatestRender(e))return ge(t.action,[e,n],t)}).then(s=>{if(He(s)&&(s instanceof HTMLElement||s.redirect||s===k))return s;if(w(t.redirect))return n.redirect(t.redirect);if(t.bundle)return Rr(t.bundle).then(()=>{},()=>{throw new Error(E(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(s=>{if(He(s))return s;if(w(t.component))return n.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const i=++this.__lastStartedRenderId,n=Object.assign({search:"",hash:""},w(e)?{pathname:e}:e,{__renderId:i});return this.ready=this.resolve(n).then(s=>this.__fullyResolveChain(s)).then(s=>{if(this.__isLatestRender(s)){const o=this.__previousContext;if(s===o)return this.__updateBrowserHistory(o,!0),this.location;if(this.location=$(s),t&&this.__updateBrowserHistory(s,i===1),ee("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.__copyUnchangedElements(s,o),this.__previousContext=s,this.location;this.__addAppearingContent(s,o);const l=this.__animateIfNeeded(s);return this.__runOnAfterEnterCallbacks(s),this.__runOnAfterLeaveCallbacks(s,o),l.then(()=>{if(this.__isLatestRender(s))return this.__removeDisappearingContent(),this.__previousContext=s,this.location})}}).catch(s=>{if(i===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(n),pe(this.__outlet&&this.__outlet.children),this.location=$(Object.assign(n,{resolver:this})),ee("error",Object.assign({router:this,error:s},n)),s}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(i=>{const s=i!==t?i:e,l=me(Zt(i.chain),i.resolver)===i.pathname,a=(c,u=c.route,h)=>c.next(void 0,u,h).then(d=>d===null||d===k?l?c:u.parent!==null?a(c,u.parent,d):d:d);return a(i).then(c=>{if(c===null||c===k)throw Ft(s);return c&&c!==k&&c!==i?this.__fullyResolveChain(s,c):this.__amendWithOnBeforeCallbacks(i)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(sn(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(i=>this.__findComponentContextAfterAllRedirects(i)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(E(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${xr(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},i=t.chain||[],n=e.chain;let s=Promise.resolve();const o=()=>({cancel:!0}),l=a=>Dt(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,n.length)&&!(i[a].route!==n[a].route||i[a].path!==n[a].path&&i[a].element!==n[a].element||!this.__isReusableElement(i[a].element,n[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=n.length===i.length&&e.__divergedChainIndex==n.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=n.length-1;a>=0;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:o},i[a]);for(let a=0;a<n.length;a++)s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:o,redirect:l},n[a]),i[a].element.location=$(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:o},i[a])}if(!e.__skipAttach)for(let a=0;a<n.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=$(e,i[a].route)):(s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:o,redirect:l},n[a]),n[a].element&&(n[a].element.location=$(e,n[a].route)));return s.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,i,n){const s=$(t);return e.then(o=>{if(this.__isLatestRender(t))return xt("onBeforeLeave",[s,i,this],n.element)(o)}).then(o=>{if(!(o||{}).redirect)return o})}__runOnBeforeEnterCallbacks(e,t,i,n){const s=$(t,n.route);return e.then(o=>{if(this.__isLatestRender(t))return xt("onBeforeEnter",[s,i,this],n.element)(o)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,i){if(t>rn)throw new Error(E(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:i})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(E(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:i=""},n){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==i){const s=n?"replaceState":"pushState";window.history[s](null,document.title,e+t+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let i=this.__outlet;for(let n=0;n<e.__divergedChainIndex;n++){const s=t&&t.chain[n].element;if(s)if(s.parentNode===i)e.chain[n].element=s,i=s;else break}return i}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const i=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(i.children).filter(s=>this.__addedByRouter.get(s)&&s!==e.result);let n=i;for(let s=e.__divergedChainIndex;s<e.chain.length;s++){const o=e.chain[s].element;o&&(n.appendChild(o),this.__addedByRouter.set(o,!0),n===i&&this.__appearingContent.push(o),n=o)}}__removeDisappearingContent(){this.__disappearingContent&&pe(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(pe(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let i=t.chain.length-1;i>=e.__divergedChainIndex&&this.__isLatestRender(e);i--){const n=t.chain[i].element;if(n)try{const s=$(e);ge(n.onAfterLeave,[s,{},t.resolver],n)}finally{this.__disappearingContent.indexOf(n)>-1&&pe(n.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const i=e.chain[t].element||{},n=$(e,e.chain[t].route);ge(i.onAfterEnter,[n,{},e.resolver],i)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],i=(this.__appearingContent||[])[0],n=[],s=e.chain;let o;for(let l=s.length;l>0;l--)if(s[l-1].route.animate){o=s[l-1].route.animate;break}if(t&&i&&o){const l=Ee(o)&&o.leave||"leaving",a=Ee(o)&&o.enter||"entering";n.push(Ot(t,l)),n.push(Ot(i,a))}return Promise.all(n).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:i,hash:n}=e?e.detail:window.location;w(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:i,hash:n},!0))}static setTriggers(...e){Zr(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=Qr(this)),me(this.__urlForName(e,t),this)}urlForPath(e,t){return me(x.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:i,hash:n}=w(e)?this.__createUrl(e,"http://a"):e;return ee("go",{pathname:t,search:i,hash:n})}}const an=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,_e=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function ln(){function r(){return!0}return er(r)}function cn(){try{return hn()?!0:dn()?_e?!un():!ln():!1}catch{return!1}}function hn(){return localStorage.getItem("vaadin.developmentmode.force")}function dn(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function un(){return!!(_e&&Object.keys(_e).map(e=>_e[e]).filter(e=>e.productionMode).length>0)}function er(r,e){if(typeof r!="function")return;const t=an.exec(r.toString());if(t)try{r=new Function(t[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return r(e)}window.Vaadin=window.Vaadin||{};const Rt=function(r,e){if(window.Vaadin.developmentMode)return er(r,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=cn());function pn(){}const fn=function(){if(typeof Rt=="function")return Rt(pn)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});fn();x.NavigationTrigger={POPSTATE:jr,CLICK:Tr};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let tr=class extends Event{constructor(e,t,i){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=t,this.subscribe=i??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ut=class{constructor(e,t,i,n){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(s,o)=>{this.unsubscribe&&(this.unsubscribe!==o&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(s,o)),this.unsubscribe=o},this.host=e,t.context!==void 0){const s=t;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??!1}else this.context=t,this.callback=i,this.subscribe=n??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new tr(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class gn{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:i}]of this.subscriptions)t(this.o,i)},e!==void 0&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:n}=this.subscriptions.get(e);e(this.value,n)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let mn=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}};class Tt extends gn{constructor(e,t,i){var n,s;super(t.context!==void 0?t.initialValue:i),this.onContextRequest=o=>{const l=o.composedPath()[0];o.context===this.context&&l!==this.host&&(o.stopPropagation(),this.addCallback(o.callback,l,o.subscribe))},this.onProviderRequest=o=>{const l=o.composedPath()[0];if(o.context!==this.context||l===this.host)return;const a=new Set;for(const[c,{consumerHost:u}]of this.subscriptions)a.has(c)||(a.add(c),u.dispatchEvent(new tr(this.context,c,!0)));o.stopPropagation()},this.host=e,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),(s=(n=this.host).addController)==null||s.call(n,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new mn(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _n({context:r}){return(e,t)=>{const i=new WeakMap;if(typeof t=="object")return t.addInitializer(function(){i.set(this,new Tt(this,{context:r}))}),{get(){return e.get.call(this)},set(n){var s;return(s=i.get(this))==null||s.setValue(n),e.set.call(this,n)},init(n){var s;return(s=i.get(this))==null||s.setValue(n),n}};{e.constructor.addInitializer(o=>{i.set(o,new Tt(o,{context:r}))});const n=Object.getOwnPropertyDescriptor(e,t);let s;if(n===void 0){const o=new WeakMap;s={get:function(){return o.get(this)},set:function(l){i.get(this).setValue(l),o.set(this,l)},configurable:!0,enumerable:!0}}else{const o=n.set;s={...n,set:function(l){i.get(this).setValue(l),o==null||o.call(this,l)}}}return void Object.defineProperty(e,t,s)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function rr({context:r,subscribe:e}){return(t,i)=>{typeof i=="object"?i.addInitializer(function(){new Ut(this,{context:r,callback:n=>{this[i.name]=n},subscribe:e})}):t.constructor.addInitializer(n=>{new Ut(n,{context:r,callback:s=>{n[i]=s},subscribe:e})})}}const vn="http://localhost:3000",bn="/api",Fe="JWT_AUTH_TOKEN",We=class X{constructor(){this.authenticated=!1,this.username="fellow_traveler",this.signOut=()=>{}}static deauthenticate(e){const t=new X;return console.log("Deauthenticating",e,X._theUser),e===X._theUser&&(localStorage.removeItem(Fe),X._theUser=t),t}};We._theUser=new We;let R=We;class se extends R{constructor(e,t){super();const n=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(window.atob(n).split("").map(function(l){return"%"+("00"+l.charCodeAt(0).toString(16)).slice(-2)}).join("")),o=JSON.parse(s);console.log("Token payload",o),this.token=e,this.authenticated=!0,this.username=o.username,this.signOut=t}static authenticate(e,t){return R._theUser=new se(e,t),localStorage.setItem(Fe,e),R._theUser}static authenticateFromLocalStorage(e){const t=localStorage.getItem(Fe);return t?se.authenticate(t,e):R._theUser}}class Oe{constructor(e){this._base=bn,this.json=e}base(e=""){return this._base=e,this}get(e){return fetch(this._url(e),{headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}post(e){return fetch(this._url(e),{method:"POST",headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}put(e){return fetch(this._url(e),{method:"PUT",headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}_headers(){const e=this.json!==void 0,t=R._theUser.authenticated,i={"Content-Type":"application/json"};if(t){const s={Authorization:`Bearer ${R._theUser.token}`};return e?{...i,...s}:s}else return e?{...i}:void 0}_url(e){return`${vn}${this._base}${e}`}}class zt extends Oe{constructor(e){super(Object.fromEntries(e))}}class de extends Oe{constructor(){super(void 0)}}var yn=Object.defineProperty,$n=Object.getOwnPropertyDescriptor,De=(r,e,t,i)=>{for(var n=i>1?void 0:i?$n(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&yn(e,t,n),n};let Ze="auth",B=class extends _{constructor(){super(...arguments),this.loginStatus=0,this.registerStatus=0,this.user=se.authenticateFromLocalStorage(()=>this._signOut())}isAuthenticated(){return this.user.authenticated}firstUpdated(){this._toggleDialog(!this.isAuthenticated())}render(){const r=f`
      <dialog>
        <form
          @submit=${this._handleLogin}
          @change=${()=>this.loginStatus=0}>
          <h2>Existing User</h2>
          <label>
            <span>Username</span>
            <input name="username" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="pwd" />
          </label>
          <button type="submit">Sign in</button>
          <p
            >${this.loginStatus?`Login failed: ${this.loginStatus}`:""}</p
          >
        </form>
        <form
          @submit=${this._handleRegister}
          @change=${this.registerStatus=0}>
          <h2>New User</h2>
          <label>
            <span>Username</span>
            <input name="username" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="pwd" />
          </label>
          <button type="submit">Register</button>
          <p
            >${this.registerStatus?`Signup failed: ${this.registerStatus}`:""}</p
          >
          <p></p>
        </form>
      </dialog>
    `;return f`${this.isAuthenticated()?"":r}
      <slot></slot>`}_handleLogin(r){r.preventDefault();const e=r.target,t=new FormData(e);new zt(t).base().post("/login").then(n=>{if(n.status===200)return n.json();this.loginStatus=n.status}).then(n=>{n&&(console.log("Authentication:",n.token),this.user=se.authenticate(n.token,()=>this._signOut()),this._toggleDialog(!1),this.requestUpdate())})}_handleRegister(r){r.preventDefault();const e=r.target,t=new FormData(e);new zt(t).base().post("/signup").then(n=>{if(n.status===200)return n.json();this.registerStatus=n.status}).then(n=>{console.log("Registration:",n)})}_toggleDialog(r){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("dialog");e&&(r?(console.log("Showing dialog"),e.showModal()):(console.log("Closing dialog"),e.close()))}_signOut(){this.user=R.deauthenticate(this.user),this._toggleDialog(!this.isAuthenticated()),document.location.reload()}};B.styles=y`
    :host {
      display: contents;
    }
    dialog {
      display: flex;
      gap: 4rem;
    }
    form {
      display: grid;
      grid-template-columns: [start] 1fr 2fr [end];
      align-items: baseline;
    }
    form > label {
      display: contents;
    }
    form > h2 {
      grid-column: start / end;
      text-align: center;
    }
    input,
    button {
      font: inherit;
      line-height: inherit;
      margin: 0.25em;
    }
    button {
      grid-column: 2;
    }
  `;De([C()],B.prototype,"loginStatus",2);De([C()],B.prototype,"registerStatus",2);De([_n({context:Ze}),C()],B.prototype,"user",2);B=De([v("auth-required")],B);var wn=Object.defineProperty,En=Object.getOwnPropertyDescriptor,et=(r,e,t,i)=>{for(var n=i>1?void 0:i?En(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&wn(e,t,n),n};let oe=class extends _{constructor(){super(...arguments),this.open=!1,this.align="left"}render(){const r=this.align==="left"?"":"--position-left: auto; --position-right: 0;";return f`
      <input
        type="checkbox"
        id="is-shown"
        @change=${this._handleChange}
        .checked=${this.open} />
      <label for="is-shown">
        <slot>Menu</slot>
      </label>
      <slot name="menu" style=${r}>
        <ul>
          <li>Command 1</li>
          <li>Command 2</li>
          <li>Command 3</li>
        </ul>
      </slot>
    `}_handleChange(r){const e=r.target;this._toggle(e.checked)}_toggle(r){this.open=r,this._toggleClickAway(r)}_toggleClickAway(r){const e=t=>{t.composedPath().includes(this)?t.stopPropagation():this._toggle(!1)};r?document.addEventListener("click",e):document.removeEventListener("click",e)}};oe.styles=y`
    :host {
      --position-left: 0;
      --position-right: auto;

      display: inline-block;
      position: relative;
    }

    #is-shown {
      display: none;
    }

    label {
      cursor: pointer;
    }

    slot[name="menu"] {
      display: none;
      position: absolute;
      top: 100%;
      left: var(--position-left);
      right: var(--position-right);
    }

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }

    /* CSS for slotted elements and default slot content */

    ::slotted(ul[slot="menu"]),
    slot[name="menu"] > ul {
      margin: 0;
      padding: 0.25em;
      list-style: none;
      white-space: nowrap;
    }
  `;et([g({reflect:!0,type:Boolean})],oe.prototype,"open",2);et([g()],oe.prototype,"align",2);oe=et([v("drop-down")],oe);var An=Object.defineProperty,Pn=Object.getOwnPropertyDescriptor,nr=(r,e,t,i)=>{for(var n=i>1?void 0:i?Pn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&An(e,t,n),n};let Ae=class extends _{constructor(){super(...arguments),this.on=!1}render(){return f`<label>
      <slot>Label</slot>
      <span class="slider">
        <input type="checkbox" @change=${this._handleChange} />
      </span>
    </label>`}_handleChange(r){const e=r.target,t=new Event(r.type,{bubbles:!0,composed:!0});this.on=e==null?void 0:e.checked,this.dispatchEvent(t)}};Ae.styles=y`
    :host {
      display: block;
    }
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: var(--size-spacing-medium);
      line-height: 2em;
      cursor: pointer;
    }
    .slider {
      display: inline-block;
      border: 1px solid var(--color-border-control);
      border-radius: 0.75em;
      background-color: var(--color-background-control);
      height: 1.5em;
      width: 2.75em;
      position: relative;
      transition: background-color
        var(--time-transition-control);
    }
    .slider:has(input:checked) {
      background-color: var(--color-accent);
    }
    input {
      appearance: none;
      cursor: pointer;
      background-color: var(--color-foreground-control);
      border-radius: 50%;
      width: 1.25em;
      height: 1.25em;
      font-size: inherit;
      position: absolute;
      left: 0;
      transition: left var(--time-transition-control);
    }
    input:checked {
      left: 1.5em;
    }
  `;nr([g({reflect:!0,type:Boolean})],Ae.prototype,"on",2);Ae=nr([v("toggle-switch")],Ae);var Cn=Object.defineProperty,Sn=Object.getOwnPropertyDescriptor,xe=(r,e,t,i)=>{for(var n=i>1?void 0:i?Sn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Cn(e,t,n),n};let F=class extends _{constructor(){super(...arguments),this.name="preset",this.options=[1,2,3,4,5]}_renderButton(r){const e=this.value===r;return f`
      <label>
        <input
          type="radio"
          name=${this.name}
          .value=${r}
          .checked=${e} />
        ${r}
      </label>
    `}render(){return f`
      <div>
        <span><slot></slot></span>
        <span class="switches" @change=${this._handleChange}>
          ${this.options.map(r=>this._renderButton(r))}
        </span>
      </div>
    `}_handleChange(r){const e=r.target,t=new Event(r.type,{bubbles:!0,composed:!0});console.log("Preset changed",r),e&&(this.value=e.value?parseInt(e.value):void 0),this.dispatchEvent(t)}};F.styles=y`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    div {
      display: flex;
      flex-direction: column;
    }
    span.switches {
      display: flex;
      justify-content: stretch;
      border-radius: var(--size-corner-medium);
      border: var(--line-weight-fine) solid var(--color-accent);
      overflow: hidden;
      align-item: end;
      margin: var(--size-spacing-small) 0;
    }
    label {
      display: inline-block;
      flex-grow: 1;
      padding: var(--size-spacing-small);
      line-height: 1em;
      background-color: var(--color-background-control);
      color: var(--color-text-control);
      font-family: var(--font-family-display);
      transition: background-color
        var(--time-transition-control);
      cursor: pointer;
    }
    label:has(input:checked) {
      background-color: var(--color-accent);
      color: var(--color-text-control-inverted);
    }
    label + label {
      border-left: var(--line-weight-fine) solid
        var(--color-accent);
    }
    input {
      display: none;
    }
  `;xe([g({reflect:!0,type:Number})],F.prototype,"value",2);xe([g()],F.prototype,"name",2);xe([g({attribute:!1})],F.prototype,"options",2);F=xe([v("preset-buttons")],F);const G=`*{margin:0;box-sizing:border-box}body{line-height:1.5;min-height:100vh;display:flex;flex-direction:column}img{max-width:100%}
`;var On=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,ir=(r,e,t,i)=>{for(var n=i>1?void 0:i?Dn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&On(e,t,n),n};let Pe=class extends _{constructor(){super(...arguments),this.avatar=""}render(){return f`
      <ul>
        <li class="header">
          <img src=${this.avatar} />
          <h1><slot name="name">Your Name</slot></h1>
        </li>
        <li>
          <toggle-switch @change=${this._toggleDarkMode}>
            Dark Mode
          </toggle-switch>
        </li>
        <li>
          <preset-buttons
            name="font-size"
            .options=${[12,14,16,20,24]}
            value="16"
            @change=${this._selectFontSize}>
            Font Size
          </preset-buttons>
        </li>
        <slot></slot>
        <li>
          <slot name="logout">Sign out&hellip;</slot>
        </li>
      </ul>
    `}_toggleDarkMode(r){const e=r.target,t=document.body;console.log("Toggling Dark mode",r),e!=null&&e.on?t.classList.add("dark-mode"):t.classList.remove("dark-mode")}_selectFontSize(r){const e=r.target,t=document.documentElement;if(console.log("Selecting Font Size",r),e){const i=e.value?e.value.toString()+"px":"initial";t.style.fontSize=i}}};Pe.styles=[A(G),y`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        background-color: var(--color-background-page);
        color: var(--color-text);
        border: 1px solid var(--color-accent);
        border-radius: var(--size-corner-medium);
        padding: var(--size-spacing-small);
        width: min-content;
        box-shadow: var(--shadow-dropdown);
      }
      li {
        white-space: nowrap;
        border-color: var(--color-accent);
        border-width: var(--line-weight-superfine);
      }
      li.header {
        display: flex;
        flex-wrap: nowrap;
        align-items: end;
        line-height: var(--font-line-height-display);
      }
      li:first-child {
        border-bottom-style: solid;
      }
      li:last-child {
        border-top-style: solid;
      }
      img {
        display: inline;
        height: var(--size-icon-large);
      }
      h1 {
        font-size: var(--size-type-mlarge);
        line-height: var(--font-line-height-display);
        white-space: normal;
        text-align: right;
      }
    `];ir([g()],Pe.prototype,"avatar",2);Pe=ir([v("user-panel")],Pe);var xn=Object.defineProperty,Rn=Object.getOwnPropertyDescriptor,tt=(r,e,t,i)=>{for(var n=i>1?void 0:i?Rn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&xn(e,t,n),n};let ae=class extends _{constructor(){super(...arguments),this.user=new R}render(){const{avatar:r,name:e,nickname:t,userid:i,color:n}=this.profile||{},s=t||e&&e.split(" ")[0]||this.user.username;return f`
      <header>
        <h1>Blazing Travels</h1>
        <p>
          Hello,
          <drop-down align="right">
            ${s}
            <user-panel
              slot="menu"
              avatar=${r}
              color=${n}
              userid=${i}>
              <span slot="name">${e}</span>
              <button slot="logout" @click=${this._signOut}>
                Log out...
              </button>
            </user-panel>
          </drop-down>
        </p>
      </header>
    `}updated(r){if(console.log("Profile Data has been updated",r),r.has("user")){console.log("New user",this.user);const{username:e}=this.user;this._getData(`/profiles/${e}`)}return!0}_getData(r){new de().get(r).then(t=>t.status===200?t.json():null).then(t=>{console.log("Profile:",t),this.profile=t})}_signOut(){console.log("Signout"),this.user.signOut()}};ae.styles=[A(G),y`
      header {
        grid-area: header;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        gap: 0 var(--size-spacing-xlarge);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
      }
      header * + :last-child {
        flex-grow: 1;
        text-align: right;
      }
      header h1 {
        white-space: nowrap;
      }
      header a[href] {
        color: var(--color-link-inverted);
      }
      [slot="logout"] a {
        color: var(--color-accent);
        cursor: pointer;
        font-weight: var(--font-weight-bold);
      }
    `];tt([C()],ae.prototype,"profile",2);tt([rr({context:Ze,subscribe:!0}),g({attribute:!1})],ae.prototype,"user",2);ae=tt([v("blazing-header")],ae);var Un=Object.defineProperty,Tn=Object.getOwnPropertyDescriptor,rt=(r,e,t,i)=>{for(var n=i>1?void 0:i?Tn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Un(e,t,n),n};let le=class extends _{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(r){const e=new CustomEvent("calendar-widget:select",{bubbles:!0,detail:{date:r&&new Date(r)}});this.dispatchEvent(e)}_handleClear(){var t;const r=(t=this.shadowRoot)==null?void 0:t.querySelector("input:checked");r&&(r.checked=!1);const e=new CustomEvent("calendar-widget:clear",{bubbles:!0});this.dispatchEvent(e)}render(){const r=new Date(this.startDate),e=new Date(this.endDate),t=zn(r,e),i=n=>{const s={d:n.getUTCDate(),m:n.getUTCMonth()+1,y:n.getUTCFullYear(),day:n.getUTCDay()},o=({y:l,m:a,d:c})=>[l,a,c].join("-");return f`
        <label style="grid-column: ${s.day+1}">
          ${s.d}
          <input
            type="radio"
            name="cal"
            value="${o(s)}" />
        </label>
      `};return f` <section>
      <fieldset
        @change="${n=>{const s=n.target;this._handleChange(s.value)}}">
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
        ${t.map(i)}
      </fieldset>
      <button id="clear" @click="${()=>this._handleClear()}">
        Clear Selection
      </button>
    </section>`}};le.styles=y`
    * {
      margin: 0;
      box-sizing: border-box;
    }

    fieldset {
      display: grid;
      grid-template-columns: repeat(7, 2rem);
      gap: var(--size-spacing-small);
      justify-content: center;
      justify-items: streth;
      border: 0;
      padding: 0;
    }

    h6 {
      text-align: center;
    }

    label {
      position: relative;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      padding: var(--size-spacing-small);
      white-space: nowrap;
      text-align: center;
      background-color: var(--color-background-control);
      border: var(--line-weight-fine) solid var(--color-accent);
      color: var(--color-text-control);
      font-size: var(--size-type-small);
      z-index: 0;
    }

    input {
      appearance: none;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }

    input:checked {
      background: var(--color-accent);
    }

    label:has(input:checked) {
      background-color: var(--color-accent);
      color: var(--color-text-control-inverted);
    }

    button {
      display: block;
      margin: 0 auto;
    }
  `;rt([g({attribute:"start-date",type:Date})],le.prototype,"startDate",2);rt([g({attribute:"end-date",type:Date})],le.prototype,"endDate",2);le=rt([v("calendar-widget")],le);function zn(r,e){const t=e?e.getTime():r.getTime();let i=[],n=new Date(r);for(;n.getTime()<=t;)i.push(new Date(n)),n.setUTCDate(n.getUTCDate()+1);return i}var jn=Object.defineProperty,Ln=Object.getOwnPropertyDescriptor,nt=(r,e,t,i)=>{for(var n=i>1?void 0:i?Ln(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&jn(e,t,n),n};let ce=class extends _{constructor(){super(...arguments),this.path=""}render(){const{name:r,people:e}=this.entourage||{},t=e||[],i=n=>{const{userid:s,avatar:o,name:l="** NO NAME **",nickname:a,color:c}=n,u=o?f`<img src="${o}" />`:(a||l).slice(0,1),h=c?`style="--color-avatar-bg: ${c}"`:"";return f`
        <tr>
          <td>
            <span class="avatar" ${h}>
              ${u}
            </span>
          </td>
          <td class="name">
            <a href="./profile/${s}">${l}</a>
          </td>
        </tr>
      `};return f`<section>
      <h3>${r||"Entourage"}</h3>
      <table>
        <tbody>${t.map(i)}</tbody>
      </table>
    </section>`}connectedCallback(){this.path&&this._getData(this.path),super.connectedCallback()}attributeChangedCallback(r,e,t){r==="path"&&t&&t!==e&&this._getData(t),super.attributeChangedCallback(r,e,t)}_getData(r){new de().get(r).then(t=>t.status===200?t.json():null).then(t=>{console.log("Entourage:",t),this.entourage=t})}};ce.styles=y`
    :host {
      --color-avatar-bg: var(--color-accent);
    }
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
    .avatar {
      display: inline-block;
      position: relative;
      width: var(--size-icon-medium);
      aspect-ratio: 1;
      background-color: var(--color-avatar-bg);
      border-radius: 50%;
      text-align: center;
      font-size: calc(0.66 * var(--size-icon-medium));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
    .name {
      width: 100%;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
    a[href] {
      font: inherit;
      color: inherit;
    }
    img {
      width: 100%;
    }
  `;nt([g()],ce.prototype,"path",2);nt([C()],ce.prototype,"entourage",2);ce=nt([v("entourage-table")],ce);var In=Object.defineProperty,Nn=Object.getOwnPropertyDescriptor,S=(r,e,t,i)=>{for(var n=i>1?void 0:i?Nn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&In(e,t,n),n};let P=class extends _{constructor(){super(...arguments),this.startDate="1970-01-01",this.hidden=!1,this._calendar_widget_select=r=>{},this._calendar_widget_clear=r=>{}}render(){const r=this.renderItem(),e=this.href?f`<a class="itemLink" href="{href}">${r}</a>`:r;return f`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${jt(this.startDate)}
        </time>
        ${this.endDate?f` <time datetime=${this.endDate}>
              ${jt(this.endDate)}
            </time>`:null}
      </span>
      ${e}
    `}renderItem(){return f`<slot></slot>`}connectedCallback(){const r=t=>{const n=t.detail.date;n<new Date(this.startDate)||n>new Date(this.endDate||this.startDate)?(console.log("Hiding item",this),this.setAttribute("hidden","hidden")):(console.log("Revealing item",this),this.removeAttribute("hidden"))},e=t=>{this.removeAttribute("hidden")};document.addEventListener("calendar-widget:select",this._calendar_widget_select=r),document.addEventListener("calendar-widget:clear",this._calendar_widget_clear=e),super.connectedCallback()}disconnectedCallback(){document.removeEventListener("calendar-widget:select",this._calendar_widget_select),document.removeEventListener("calendar-widget:clear",this._calendar_widget_clear),super.disconnectedCallback()}};P.styles=y`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    :host(*) {
      display: contents;
    }
    :host([hidden]) {
      display: none;
    }
    #dates {
      display: flex;
      grid-column: start;
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
      grid-column: primary/end;
      background: var(--color-background-card);
      border-radius: var(--size-corner-medium);
      aspect-ratio: 16/9;
      background-size: cover;
      background-position: left 25%;
    }
    .transportation {
      display: grid;
      grid-column: primary/end;
      grid-template-columns: subgrid;
      align-items: center;
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
      text-align: right;
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
    a.itemLink {
      display: contents;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
    }
  `;S([g({attribute:"start-date"})],P.prototype,"startDate",2);S([g({attribute:"end-date"})],P.prototype,"endDate",2);S([g()],P.prototype,"href",2);S([g({reflect:!0,type:Boolean})],P.prototype,"hidden",2);P=S([v("itinerary-item")],P);let Je=class extends P{renderItem(){const r=f`<slot></slot>`,e=this.href?f`<a class=:itemLink" href="{href}">${r}</a>`:r,t=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return f`<section class="destination" style=${t}>
      <h3>${e}</h3>
    </section>`}};S([g({attribute:"img-src"})],Je.prototype,"imgSrc",2);Je=S([v("itinerary-destination")],Je);let Ke=class extends P{renderItem(){const r={air:"icon-airplane",rail:"icon-train"},e=this.type?r[this.type]:"icon-default";return f`<section class="transportation">
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
    </section>`}};S([g()],Ke.prototype,"type",2);Ke=S([v("itinerary-transportation")],Ke);const Mn=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function jt(r){const e=new Date(r),t=Mn[e.getUTCMonth()];return`${e.getUTCDate()} ${t}`}const it=`.page{font-family:var(--font-family-body);background-color:var(--color-background-page);color:var(--color-text);display:flex;flex-direction:column;height:100%;flex-basis:100%;flex-grow:1;width:100%;padding:2rem}body>section{margin:var(--size-spacing-medium)}h1,h2,h3,h4,h5,h6,dt,summary{font-family:var(--font-family-display);line-height:var(--font-line-height-display)}h1{font-size:var(--size-type-xxlarge);font-style:oblique;line-height:1;font-weight:var(--font-weight-bold)}h2{font-size:var(--size-type-xlarge);font-weight:var(--font-weight-bold)}h3{font-size:var(--size-type-large);font-weight:var(--font-weight-normal);font-style:oblique}h4{font-size:var(--size-type-mlarge);font-weight:var(--font-weight-bold)}h5{font-size:var(--size-type-body);font-weight:var(--font-weight-bold)}h6{font-size:var(--size-type-body);font-weight:var(--font-weight-normal);font-style:italic}dt{font-weight:var(--size-type-body)}h3,a{color:var(--color-accent)}svg.outline-map{fill:#ff0}svg.icon{display:inline;fill:currentColor;height:var(--size-icon-large);width:var(--size-icon-large);vertical-align:middle}
`;var kn=Object.defineProperty,Hn=Object.getOwnPropertyDescriptor,Re=(r,e,t,i)=>{for(var n=i>1?void 0:i?Hn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&kn(e,t,n),n};let W=class extends _{connectedCallback(){if(!this.tourId&&this.location){const r=new URL(this.location.toString());this.tourId=this.location.params.tour||r.searchParams.get("tour")||void 0}this.tourId&&this._getData(`/tours/${this.tourId}`),super.connectedCallback()}attributeChangedCallback(r,e,t){r==="tour-id"&&t&&t!==e&&this._getData(`/tours/${t}`),super.attributeChangedCallback(r,e,t)}render(){const{endDate:r,destinations:e=[],transportation:t=[],entourage:i,name:n,startDate:s}=this.tour||{},o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],l=h=>{const d=h||new Date,p=o[d.getUTCMonth()];return`${d.getUTCDate()} ${p}`},a=h=>{const{startDate:d,endDate:p,link:b,name:T,featuredImage:je}=h;return f`
        <itinerary-destination
          start-date=${d}
          end-date=${p}
          img-src=${je}
          href=${b}>
          ${T}
        </itinerary-destination>
      `},c=h=>{const d=h.length,p=h[0],b=h[d-1],T=d>2?f`<span slot="via"
              >${h.slice(1,-1).join(", ")}</span
            >`:null;return f`
        <span slot="origin"> ${p} </span>
        <span slot="terminus"> ${b} </span>
        ${T}
      `},u=h=>{const{startDate:d,type:p,routing:b=[]}=h||{};return f`
        <itinerary-transportation
          start-date=${d}
          type=${p}>
          ${c(b)}
        </itinerary-transportation>
      `};return f`
      <main class="page">
        <header>
          <h2>${n}</h2>
          <p>
            from ${l(s)} to
            ${l(r)}
            ${r&&r.getFullYear()}
          </p>
        </header>

        <calendar-widget
          start-date=${s}
          end-date=${r}>
        </calendar-widget>

        <section class="itinerary">
          ${e.map((h,d)=>{const p=d===0?u(t[d]):"",b=a(h),T=u(t[d+1]);return f`${p}${b}${T}`})}
        </section>

        <entourage-table path="/entourages/${i}">
        </entourage-table>
      </main>
    `}_getData(r){new de().get(r).then(t=>t.status===200?t.json():null).then(t=>{console.log("Tour:",t);let i=t,n=t;n.startDate=new Date(i.startDate),n.endDate=new Date(i.endDate),this.tour=t})}};W.styles=[A(G),A(it),y`
      main.page {
        display: grid;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        gap: var(--size-spacing-xlarge);

        grid-template-columns: min-content 1fr;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "header     itinerary"
          "calendar  itinerary"
          "entourage itinerary"
          "empty     itinerary";
      }

      header {
        grid-area: header;
      }

      calendar-widget {
        grid-area: calendar;
        align-self: start;
      }

      .itinerary {
        display: grid;
        grid-area: itinerary;
        align-self: start;
        grid-template-columns:
          [start] min-content [primary] 1fr var(
            --size-icon-large
          )
          1fr [end];
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;
      }
    `];Re([g({attribute:!1})],W.prototype,"location",2);Re([g({attribute:"tour-id"})],W.prototype,"tourId",2);Re([C()],W.prototype,"tour",2);W=Re([v("tour-page")],W);var qn=Object.defineProperty,Bn=Object.getOwnPropertyDescriptor,Ue=(r,e,t,i)=>{for(var n=i>1?void 0:i?Bn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&qn(e,t,n),n};let J=class extends _{constructor(){super(...arguments),this.path=""}connectedCallback(){this.path&&this._getData(this.path),super.connectedCallback()}attributeChangedCallback(r,e,t){r==="path"&&e!==t&&e&&this._getData(t),super.attributeChangedCallback(r,e,t)}updated(r){return console.log("updated Profile Form",r),r.get("authenticatedUser")&&this._getData(this.path),!0}render(){const{userid:r,name:e,nickname:t,city:i,airports:n=[],avatar:s}=this.profile||{},o="1991-08-06",l="#663399";return f`
      <form
        @submit=${this._handleSubmit}
        @change=${this._handleChange}>
        <label>
          <span>Username</span>
          <input name="userid" value=${r} />
        </label>
        <label>
          <span>Avatar</span>
          <input name="avatar" value=${s} />
        </label>
        <label>
          <span>Name</span>
          <input name="name" value=${e} />
        </label>
        <label>
          <span>Nickname</span>
          <input name="nickname" value=${t} />
        </label>
        <label>
          <span>Home City</span>
          <input name="city" value=${i} />
        </label>
        <label>
          <span>Airports</span>
          <input-array name="airports" .value=${n}>
          </input-array>
        </label>
        <label>
          <span>Color</span>
          <input type="color" name="color" value=${l} />
        </label>
        <label>
          <span>Birthdate</span>
          <input name="dob" type="date" value=${o} />
        <button type="submit">Submit</button>
      </form>
    `}_getData(r){new de().get(r).then(t=>t.status===200?t.json():null).then(t=>{this.profile=t})}_handleChange(r){const e=r.target,t=e.name,i=e.value;let n=this.profile;console.log("Changed",t,i),n[t]=i,this.profile=n}_handleSubmit(r){r.preventDefault(),new Oe(this.profile).put(this.path).then(t=>t.status===200?t.json():null).then(t=>{t&&(console.log("PUT request successful:",t),this.profile=t)}).catch(t=>console.log("Failed to POST form data",t))}};J.styles=y`
    form {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: baseline;
    }
    form > label {
      display: contents;
    }
    input,
    button {
      font: inherit;
      line-height: inherit;
      margin: 0.25em;
    }
    button {
      grid-column: 2;
    }
  `;Ue([g()],J.prototype,"path",2);Ue([C()],J.prototype,"profile",2);Ue([rr({context:Ze,subscribe:!0}),g({attribute:!1})],J.prototype,"user",2);J=Ue([v("profile-form")],J);var Fn=Object.defineProperty,Wn=Object.getOwnPropertyDescriptor,Te=(r,e,t,i)=>{for(var n=i>1?void 0:i?Wn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Fn(e,t,n),n};let N=class extends _{constructor(){super(...arguments),this.path=""}connectedCallback(){this.path&&this._fetchData(this.path),super.connectedCallback()}attributeChangedCallback(r,e,t){console.log("attributeChanged",e,t),r==="path"&&e!==t&&e&&this._fetchData(t),super.attributeChangedCallback(r,e,t)}render(){const{userid:r,name:e,nickname:t,city:i,airports:n=[]}=this.profile||{},s=o=>f`<dd>${o}</dd>`;return f`
      <section>
        ${this._renderAvatar()}
        <a href="./${r}/edit">Edit</a>
        <h1>${e}</h1>
        <dl>
          <dt>Username</dt>
          <dd>${r}</dd>
          <dt>Nickname</dt>
          <dd>${t}</dd>
          <dt>Home City</dt>
          <dd>${i}</dd>
          <dt>Airports</dt>
          ${n.map(s)}
        </dl>
      </section>
    `}_renderAvatar(){const{name:r,nickname:e,avatar:t,color:i}=this.profile||{},n=t?f`<img id="avatarImg" src="${t}" />`:(e||r||" ").slice(0,1),s=i?`--avatar-backgroundColor: ${i}`:"";return f` <div class="avatar" style=${s}>
      ${n}
    </div>`}_fetchData(r){new de().get(r).then(t=>t.status===200?t.json():null).then(t=>{this.profile=t})}};N.styles=[A(G),A(it),y`
      :host {
        --avatar-backgroundColor: var(--color-accent);
        --avatar-size: 100px;
        padding: var(--size-spacing-medium);
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 2fr [end];
        gap: var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
        grid-column: value;
      }
      dl {
        display: grid;
        grid-column: key / end;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
      }
      dt {
        grid-column: key;
        justify-self: end;
        color: var(--color-accent);
        font-family: var(--font-family-display);
      }
      dd {
        grid-column: value;
      }
      .avatar {
        grid-column: key;
        grid-row: auto/span 2;
        justify-self: end;
        position: relative;
        width: var(--avatar-size);
        aspect-ratio: 1;
        background-color: var(--avatar-backgroundColor);
        border-radius: 50%;
        text-align: center;
        line-height: var(--avatar-size);
        font-size: calc(0.66 * var(--avatar-size));
        font-family: var(--font-family-display);
        color: var(--color-link-inverted);
        overflow: hidden;
      }
      .name {
        width: 100%;
        font-family: var(--font-family-display);
        color: var(--color-accent);
      }
      img {
        width: 100%;
      }
    `];Te([g()],N.prototype,"path",2);Te([C()],N.prototype,"profile",2);N=Te([v("user-profile")],N);let Ve=class extends N{render(){const r=this.profile||{},{userid:e,name:t,nickname:i,city:n,airports:s=[]}=r;return console.log("Rendering form",this.profile),f`
      <section>
        <form @submit=${this._handleSubmit}>
          <dl>
            <dt>Username</dt>
            <dd
              ><input name="userid" disabled .value=${e}
            /></dd>
            <dt>Avatar</dt>
            <dd
              ><input
                name="avatar"
                type="file"
                @change=${this._handleAvatarSelected}
            /></dd>
            <dd>${this._renderAvatar()}</dd>
            <dt>Name</dt>
            <dd><input name="name" .value=${t} /></dd>
            <dt>Nickname</dt>
            <dd
              ><input name="nickname" .value=${i}
            /></dd>
            <dt>Home City</dt>
            <dd><input name="city" .value=${n} /></dd>
            <dt>Airports</dt>
            <dd
              ><input
                name="airports"
                .value=${s.join(", ")}
            /></dd>
          </dl>
          <button type="submit">Submit</button>
        </form>
      </section>
    `}_handleAvatarSelected(r){const t=r.target.files[0];new Promise((n,s)=>{const o=new FileReader;o.onload=()=>n(o.result),o.onerror=l=>s(l),o.readAsDataURL(t)}).then(n=>{this.profile={...this.profile,avatar:n}})}_handleSubmit(r){var o;r.preventDefault();const e=(o=this.profile)==null?void 0:o.avatar,t=r.target,i=new FormData(t);let n=Array.from(i.entries()).map(([l,a])=>a===""?[l]:[l,a]).map(([l,a])=>l==="airports"?[l,a.split(",").map(c=>c.trim())]:[l,a]);e&&n.push(["avatar",e]);const s=Object.fromEntries(n);console.log("Submitting Form",s),this._putData(s)}_putData(r){new Oe(r).put(this.path).then(t=>t.status===200?t.json():null).then(t=>{t&&(console.log("PUT request successful:",t),this.profile=t,window.history.back())}).catch(t=>console.log("Failed to POST form data",t))}};Ve.styles=[...N.styles,y`
      form {
        display: contents;
      }
      button {
        grid-column: value;
        width: 10em;
      }
      input {
        font: inherit;
      }
    `];Ve=Te([v("user-profile-edit")],Ve);var Jn=Object.defineProperty,Kn=Object.getOwnPropertyDescriptor,ze=(r,e,t,i)=>{for(var n=i>1?void 0:i?Kn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Jn(e,t,n),n};let K=class extends _{constructor(){super(...arguments),this.edit=!1}connectedCallback(){this.location&&(this.userid=this.location.params.userid,this.edit=this.location.params.edit==="edit"),super.connectedCallback()}render(){return f`
      <main class="page">
        ${this.edit?f`
              <user-profile-edit
                path="/profiles/${this.userid}">
              </user-profile-edit>
            `:f`
              <user-profile path="/profiles/${this.userid}">
              </user-profile>
            `}
      </main>
    `}};K.styles=[A(G),A(it),y`
      :host {
        display: contents;
      }
    `];ze([g({attribute:!1})],K.prototype,"location",2);ze([g()],K.prototype,"userid",2);ze([g()],K.prototype,"edit",2);K=ze([v("profile-page")],K);var Vn=Object.defineProperty,Gn=Object.getOwnPropertyDescriptor,sr=(r,e,t,i)=>{for(var n=i>1?void 0:i?Gn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Vn(e,t,n),n};let Ce=class extends _{firstUpdated(){var e;new x((e=this.shadowRoot)==null?void 0:e.querySelector("#outlet")).setRoutes([{path:"/app/profile/:userid/:edit(edit)",component:"profile-page"},{path:"/app/profile/:userid",component:"profile-page"},{path:"/app/:tour([0-9a-f]+)",component:"tour-page"},{path:"/app",component:"tour-page"},{path:"(.*)",redirect:"/app"}])}render(){return f`
      <auth-required>
        <blazing-header></blazing-header>
        <div id="outlet"></div>
      </auth-required>
    `}};Ce.styles=[A(G),y`
      :host {
        display: contents;
      }
      #outlet {
        display: contents;
      }
    `];sr([C()],Ce.prototype,"tourId",2);Ce=sr([v("blazing-app")],Ce);
