(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const me=globalThis,Ge=me.ShadowRoot&&(me.ShadyCSS===void 0||me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ye=Symbol(),ct=new WeakMap;let Ht=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ge&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ct.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ct.set(t,e))}return e}toString(){return this.cssText}};const E=r=>new Ht(typeof r=="string"?r:r+"",void 0,Ye),b=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,n,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[s+1],r[0]);return new Ht(t,r,Ye)},yr=(r,e)=>{if(Ge)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),n=me.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,r.appendChild(i)}},dt=Ge?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return E(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$r,defineProperty:wr,getOwnPropertyDescriptor:Er,getOwnPropertyNames:Ar,getOwnPropertySymbols:Pr,getPrototypeOf:Sr}=Object,R=globalThis,ht=R.trustedTypes,Cr=ht?ht.emptyScript:"",je=R.reactiveElementPolyfillSupport,Z=(r,e)=>r,ye={toAttribute(r,e){switch(e){case Boolean:r=r?Cr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Xe=(r,e)=>!$r(r,e),ut={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:Xe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);class N extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ut){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&wr(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=Er(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return n==null?void 0:n.call(this)},set(o){const c=n==null?void 0:n.call(this);s.call(this,o),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ut}static _$Ei(){if(this.hasOwnProperty(Z("elementProperties")))return;const e=Sr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Z("properties"))){const t=this.properties,i=[...Ar(t),...Pr(t)];for(const n of i)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(dt(n))}else e!==void 0&&t.push(dt(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yr(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){var s;const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:ye).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){var s;const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:ye;this._$Em=n,this[n]=c.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){if(i??(i=this.constructor.getPropertyOptions(e)),!(i.hasChanged??Xe)(this[e],t))return;this.P(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,o]of n)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(t)):this._$EU()}catch(n){throw e=!1,this._$EU(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[Z("elementProperties")]=new Map,N[Z("finalized")]=new Map,je==null||je({ReactiveElement:N}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=globalThis,$e=ee.trustedTypes,pt=$e?$e.createPolicy("lit-html",{createHTML:r=>r}):void 0,kt="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,Ft="?"+x,Or=`<${Ft}>`,M=document,re=()=>M.createComment(""),ne=r=>r===null||typeof r!="object"&&typeof r!="function",Bt=Array.isArray,xr=r=>Bt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Ie=`[ 	
\f\r]`,X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,gt=/>/g,T=RegExp(`>|${Ie}(?:([^\\s"'>=/]+)(${Ie}*=${Ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,_t=/"/g,qt=/^(?:script|style|textarea|title)$/i,Dr=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),f=Dr(1),k=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),vt=new WeakMap,z=M.createTreeWalker(M,129);function Vt(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(e):e}const Rr=(r,e)=>{const t=r.length-1,i=[];let n,s=e===2?"<svg>":"",o=X;for(let c=0;c<t;c++){const a=r[c];let l,d,h=-1,u=0;for(;u<a.length&&(o.lastIndex=u,d=o.exec(a),d!==null);)u=o.lastIndex,o===X?d[1]==="!--"?o=ft:d[1]!==void 0?o=gt:d[2]!==void 0?(qt.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=T):d[3]!==void 0&&(o=T):o===T?d[0]===">"?(o=n??X,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,l=d[1],o=d[3]===void 0?T:d[3]==='"'?_t:mt):o===_t||o===mt?o=T:o===ft||o===gt?o=X:(o=T,n=void 0);const p=o===T&&r[c+1].startsWith("/>")?" ":"";s+=o===X?a+Or:h>=0?(i.push(l),a.slice(0,h)+kt+a.slice(h)+x+p):a+x+(h===-2?c:p)}return[Vt(r,s+(r[t]||"<?>")+(e===2?"</svg>":"")),i]};class ie{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,o=0;const c=e.length-1,a=this.parts,[l,d]=Rr(e,t);if(this.el=ie.createElement(l,i),z.currentNode=this.el.content,t===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=z.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(kt)){const u=d[o++],p=n.getAttribute(h).split(x),A=/([.?@])?(.*)/.exec(u);a.push({type:1,index:s,name:A[2],strings:p,ctor:A[1]==="."?Tr:A[1]==="?"?zr:A[1]==="@"?Mr:Oe}),n.removeAttribute(h)}else h.startsWith(x)&&(a.push({type:6,index:s}),n.removeAttribute(h));if(qt.test(n.tagName)){const h=n.textContent.split(x),u=h.length-1;if(u>0){n.textContent=$e?$e.emptyScript:"";for(let p=0;p<u;p++)n.append(h[p],re()),z.nextNode(),a.push({type:2,index:++s});n.append(h[u],re())}}}else if(n.nodeType===8)if(n.data===Ft)a.push({type:2,index:s});else{let h=-1;for(;(h=n.data.indexOf(x,h+1))!==-1;)a.push({type:7,index:s}),h+=x.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function F(r,e,t=r,i){var o,c;if(e===k)return e;let n=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const s=ne(e)?void 0:e._$litDirective$;return(n==null?void 0:n.constructor)!==s&&((c=n==null?void 0:n._$AO)==null||c.call(n,!1),s===void 0?n=void 0:(n=new s(r),n._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=n:t._$Cl=n),n!==void 0&&(e=F(r,n._$AS(r,e.values),n,i)),e}class Ur{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=((e==null?void 0:e.creationScope)??M).importNode(t,!0);z.currentNode=n;let s=z.nextNode(),o=0,c=0,a=i[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new he(s,s.nextSibling,this,e):a.type===1?l=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(l=new jr(s,this,e)),this._$AV.push(l),a=i[++c]}o!==(a==null?void 0:a.index)&&(s=z.nextNode(),o++)}return z.currentNode=M,n}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class he{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),ne(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):xr(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==m&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ie.createElement(Vt(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===n)this._$AH.p(t);else{const o=new Ur(n,this),c=o.u(this.options);o.p(t),this.T(c),this._$AH=o}}_$AC(e){let t=vt.get(e.strings);return t===void 0&&vt.set(e.strings,t=new ie(e)),t}k(e){Bt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new he(this.S(re()),this.S(re()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,t=this,i,n){const s=this.strings;let o=!1;if(s===void 0)e=F(this,e,t,0),o=!ne(e)||e!==this._$AH&&e!==k,o&&(this._$AH=e);else{const c=e;let a,l;for(e=s[0],a=0;a<s.length-1;a++)l=F(this,c[i+a],t,a),l===k&&(l=this._$AH[a]),o||(o=!ne(l)||l!==this._$AH[a]),l===m?e=m:e!==m&&(e+=(l??"")+s[a+1]),this._$AH[a]=l}o&&!n&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Tr extends Oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class zr extends Oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class Mr extends Oe{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=F(this,e,t,0)??m)===k)return;const i=this._$AH,n=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==m&&(i===m||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class jr{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const Le=ee.litHtmlPolyfillSupport;Le==null||Le(ie,he),(ee.litHtmlVersions??(ee.litHtmlVersions=[])).push("3.1.2");const Ir=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let n=i._$litPart$;if(n===void 0){const s=(t==null?void 0:t.renderBefore)??null;i._$litPart$=n=new he(e.insertBefore(re(),s),s,void 0,t??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let v=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ir(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return k}};var Nt;v._$litElement$=!0,v.finalized=!0,(Nt=globalThis.litElementHydrateSupport)==null||Nt.call(globalThis,{LitElement:v});const Ne=globalThis.litElementPolyfillSupport;Ne==null||Ne({LitElement:v});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lr={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:Xe},Nr=(r=Lr,e,t)=>{const{kind:i,metadata:n}=t;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),s.set(t.name,r),i==="accessor"){const{name:o}=t;return{set(c){const a=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,a,r)},init(c){return c!==void 0&&this.P(o,void 0,r),c}}}if(i==="setter"){const{name:o}=t;return function(c){const a=this[o];e.call(this,c),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function g(r){return(e,t)=>typeof t=="object"?Nr(r,e,t):((i,n,s)=>{const o=n.hasOwnProperty(s);return n.constructor.createProperty(s,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(n,s):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function K(r){return g({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Wt=class extends Event{constructor(e,t,i){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=t,this.subscribe=i??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let bt=class{constructor(e,t,i,n){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(s,o)=>{this.unsubscribe&&(this.unsubscribe!==o&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(s,o)),this.unsubscribe=o},this.host=e,t.context!==void 0){const s=t;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??!1}else this.context=t,this.callback=i,this.subscribe=n??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new Wt(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Hr{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:i}]of this.subscriptions)t(this.o,i)},e!==void 0&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:n}=this.subscriptions.get(e);e(this.value,n)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let kr=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}};class yt extends Hr{constructor(e,t,i){var n,s;super(t.context!==void 0?t.initialValue:i),this.onContextRequest=o=>{const c=o.composedPath()[0];o.context===this.context&&c!==this.host&&(o.stopPropagation(),this.addCallback(o.callback,c,o.subscribe))},this.onProviderRequest=o=>{const c=o.composedPath()[0];if(o.context!==this.context||c===this.host)return;const a=new Set;for(const[l,{consumerHost:d}]of this.subscriptions)a.has(l)||(a.add(l),d.dispatchEvent(new Wt(this.context,l,!0)));o.stopPropagation()},this.host=e,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),(s=(n=this.host).addController)==null||s.call(n,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new kr(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Kt({context:r}){return(e,t)=>{const i=new WeakMap;if(typeof t=="object")return t.addInitializer(function(){i.set(this,new yt(this,{context:r}))}),{get(){return e.get.call(this)},set(n){var s;return(s=i.get(this))==null||s.setValue(n),e.set.call(this,n)},init(n){var s;return(s=i.get(this))==null||s.setValue(n),n}};{e.constructor.addInitializer(o=>{i.set(o,new yt(o,{context:r}))});const n=Object.getOwnPropertyDescriptor(e,t);let s;if(n===void 0){const o=new WeakMap;s={get:function(){return o.get(this)},set:function(c){i.get(this).setValue(c),o.set(this,c)},configurable:!0,enumerable:!0}}else{const o=n.set;s={...n,set:function(c){i.get(this).setValue(c),o==null||o.call(this,c)}}}return void Object.defineProperty(e,t,s)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Jt({context:r,subscribe:e}){return(t,i)=>{typeof i=="object"?i.addInitializer(function(){new bt(this,{context:r,callback:n=>{this[i.name]=n},subscribe:e})}):t.constructor.addInitializer(n=>{new bt(n,{context:r,callback:s=>{n[i]=s},subscribe:e})})}}let Fr=class extends v{constructor(e,t,i){super(),this.updateFn=e,this.getModel=t,this.setModel=i,this.addEventListener("mvu:message",n=>{const s=n.detail;console.log("Got message: ",s),this.receive(s)})}receive(e){const t=this.updateFn(this.getModel(),e),i=t;typeof(i==null?void 0:i.then)=="function"?i.then(n=>{const s=n(this.getModel());console.log("Updating model in Promise:",s),this.setModel(s)}):(console.log("Updating model:",t),this.setModel(t))}},Br=class extends v{dispatchMessage(e,t=this){const i=new CustomEvent("mvu:message",{bubbles:!0,composed:!0,detail:e});t.dispatchEvent(i)}};class qr{constructor(){this._handlers=new Map,this.update=this._update.bind(this)}addMessage(e,t){console.log("Message added for dispatch:",e),this._handlers.set(e,t)}_update(e,t){const{type:i}=t,n=this._handlers.get(i);return n?n(t,e):e}}function Vr(r){return e=>Object.assign({},e,r)}function Wr(r){return r}const Kr=window.location.origin,Jr="/api",ke="JWT_AUTH_TOKEN",Fe=class Q{constructor(){this.authenticated=!1,this.username="fellow_traveler",this.signOut=()=>{}}static deauthenticate(e){const t=new Q;return console.log("Deauthenticating",e,Q._theUser),e===Q._theUser&&(localStorage.removeItem(ke),Q._theUser=t),t}};Fe._theUser=new Fe;let P=Fe;class se extends P{constructor(e,t){super();const n=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(window.atob(n).split("").map(function(c){return"%"+("00"+c.charCodeAt(0).toString(16)).slice(-2)}).join("")),o=JSON.parse(s);console.log("Token payload",o),this.token=e,this.authenticated=!0,this.username=o.username,this.signOut=t}static authenticate(e,t){return P._theUser=new se(e,t),localStorage.setItem(ke,e),P._theUser}static authenticateFromLocalStorage(e){const t=localStorage.getItem(ke);return t?se.authenticate(t,e):P._theUser}}class Qe{constructor(e){this._base=Jr,this.json=e}base(e=""){return this._base=e,this}get(e){return fetch(this._url(e),{headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}post(e){return fetch(this._url(e),{method:"POST",headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}put(e){return fetch(this._url(e),{method:"PUT",headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}_headers(){const e=this.json!==void 0,t=P._theUser.authenticated,i={"Content-Type":"application/json"};if(t){const s={Authorization:`Bearer ${P._theUser.token}`};return e?{...i,...s}:s}else return e?{...i}:void 0}_url(e){return`${Kr}${this._base}${e}`}}class $t extends Qe{constructor(e){super(Object.fromEntries(e))}}class Ze extends Qe{constructor(){super(void 0)}}var Gr=Object.defineProperty,Yr=Object.getOwnPropertyDescriptor,Gt=(r,e,t,i)=>{for(var n=i>1?void 0:i?Yr(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Gr(e,t,n),n};const Yt="BlazingModel",Xr={user:new P};class Xt extends Fr{constructor(e){super(e,()=>this.model,t=>this.model=t),this.model=Xr}}Gt([Kt({context:Yt}),K()],Xt.prototype,"model",2);class ue extends Br{getFromModel(e){if(this._model)return this._model[e]}}Gt([Jt({context:Yt,subscribe:!0}),g({attribute:!1})],ue.prototype,"_model",2);const Qr=()=>new qr,et=Vr,tt=Wr,Zr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B=r=>{const e=(typeof r=="string"?new Date(r):r)||new Date,t=Zr[e.getUTCMonth()];return`${e.getUTCDate()} ${t}`};function wt(r){const e=r;let t=r;return t.startDate=new Date(e.startDate),t.endDate=new Date(e.endDate),t}var en=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,rt=(r,e,t,i)=>{for(var n=i>1?void 0:i?tn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&en(e,t,n),n};let oe=class extends v{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(r){const e=new CustomEvent("calendar-widget:select",{bubbles:!0,detail:{date:r&&new Date(r)}});this.dispatchEvent(e)}_handleClear(){var t;const r=(t=this.shadowRoot)==null?void 0:t.querySelector("input:checked");r&&(r.checked=!1);const e=new CustomEvent("calendar-widget:clear",{bubbles:!0});this.dispatchEvent(e)}render(){const r=new Date(this.startDate),e=new Date(this.endDate),t=rn(r,e),i=n=>{const s={d:n.getUTCDate(),m:n.getUTCMonth()+1,y:n.getUTCFullYear(),day:n.getUTCDay()},o=({y:c,m:a,d:l})=>[c,a,l].join("-");return f`
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
    </section>`}};oe.styles=b`
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
  `;rt([g({attribute:"start-date",type:Date})],oe.prototype,"startDate",2);rt([g({attribute:"end-date",type:Date})],oe.prototype,"endDate",2);oe=rt([_("calendar-widget")],oe);function rn(r,e){const t=e?e.getTime():r.getTime();let i=[],n=new Date(r);for(;n.getTime()<=t;)i.push(new Date(n)),n.setUTCDate(n.getUTCDate()+1);return i}var nn=Object.defineProperty,sn=Object.getOwnPropertyDescriptor,nt=(r,e,t,i)=>{for(var n=i>1?void 0:i?sn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&nn(e,t,n),n};let ae=class extends v{constructor(){super(...arguments),this.path=""}get entourage(){return this.using||{}}render(){const{name:r,people:e}=this.entourage,t=e||[],i=n=>{const{userid:s,avatar:o,name:c="** NO NAME **",nickname:a,color:l}=n,d=o?f`<img src="${o}" />`:(a||c).slice(0,1),h=l?`style="--color-avatar-bg: ${l}"`:"";return f`
        <tr>
          <td>
            <span class="avatar" ${h}>
              ${d}
            </span>
          </td>
          <td class="name">
            <a href="./profile/${s}">${c}</a>
          </td>
        </tr>
      `};return f`<section>
      <h3>${r||"Entourage"}</h3>
      <table>
        <tbody>${t.map(i)}</tbody>
      </table>
    </section>`}};ae.styles=b`
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
  `;nt([g({attribute:!1})],ae.prototype,"using",2);nt([g()],ae.prototype,"path",2);ae=nt([_("entourage-table")],ae);var on=Object.defineProperty,an=Object.getOwnPropertyDescriptor,C=(r,e,t,i)=>{for(var n=i>1?void 0:i?an(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&on(e,t,n),n};let S=class extends v{constructor(){super(...arguments),this.startDate="1970-01-01",this.hidden=!1,this._calendar_widget_select=r=>{},this._calendar_widget_clear=r=>{}}render(){const r=this.renderItem();return f`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${B(this.startDate)}
        </time>
        ${this.endDate?f` <time datetime=${this.endDate}>
              ${B(this.endDate)}
            </time>`:null}
      </span>
      ${r}
    `}renderItem(){return f`<slot></slot>`}connectedCallback(){const r=t=>{const n=t.detail.date;n<new Date(this.startDate)||n>new Date(this.endDate||this.startDate)?(console.log("Hiding item",this),this.setAttribute("hidden","hidden")):(console.log("Revealing item",this),this.removeAttribute("hidden"))},e=t=>{this.removeAttribute("hidden")};document.addEventListener("calendar-widget:select",this._calendar_widget_select=r),document.addEventListener("calendar-widget:clear",this._calendar_widget_clear=e),super.connectedCallback()}disconnectedCallback(){document.removeEventListener("calendar-widget:select",this._calendar_widget_select),document.removeEventListener("calendar-widget:clear",this._calendar_widget_clear),super.disconnectedCallback()}};S.styles=b`
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
  `;C([g({attribute:"start-date"})],S.prototype,"startDate",2);C([g({attribute:"end-date"})],S.prototype,"endDate",2);C([g()],S.prototype,"href",2);C([g({reflect:!0,type:Boolean})],S.prototype,"hidden",2);S=C([_("itinerary-item")],S);let Be=class extends S{renderItem(){const r=f`<slot></slot>`,e=this.href?f`<a class="itemLink" href="${this.href}"
          >${r}</a
        >`:r,t=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return f`<section class="destination" style=${t}>
      <h3>${e}</h3>
    </section>`}};C([g({attribute:"img-src"})],Be.prototype,"imgSrc",2);Be=C([_("itinerary-destination")],Be);let qe=class extends S{renderItem(){const r={air:"icon-airplane",rail:"icon-train"},e=this.type?r[this.type]:"icon-default";return f`<section class="transportation">
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
    </section>`}};C([g()],qe.prototype,"type",2);qe=C([_("itinerary-transportation")],qe);const J=`*{margin:0;box-sizing:border-box}body{line-height:1.5;min-height:100vh;display:flex;flex-direction:column}img{max-width:100%}
`,xe=`.page{font-family:var(--font-family-body);background-color:var(--color-background-page);color:var(--color-text);display:flex;flex-direction:column;height:100%;flex-basis:100%;flex-grow:1;width:100%;padding:2rem}body>section{margin:var(--size-spacing-medium)}h1,h2,h3,h4,h5,h6,dt,summary{font-family:var(--font-family-display);line-height:var(--font-line-height-display)}h1{font-size:var(--size-type-xxlarge);font-style:oblique;line-height:1;font-weight:var(--font-weight-bold)}h2{font-size:var(--size-type-xlarge);font-weight:var(--font-weight-bold)}h3{font-size:var(--size-type-large);font-weight:var(--font-weight-normal);font-style:oblique}h4{font-size:var(--size-type-mlarge);font-weight:var(--font-weight-bold)}h5{font-size:var(--size-type-body);font-weight:var(--font-weight-bold)}h6{font-size:var(--size-type-body);font-weight:var(--font-weight-normal);font-style:italic}dt{font-weight:var(--size-type-body)}h3,a{color:var(--color-accent)}svg.outline-map{fill:#ff0}svg.icon{display:inline;fill:currentColor;height:var(--size-icon-large);width:var(--size-icon-large);vertical-align:middle}
`;var ln=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,De=(r,e,t,i)=>{for(var n=i>1?void 0:i?cn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&ln(e,t,n),n};let q=class extends ue{get tourId(){var r;return(r=this.location)==null?void 0:r.params.tour}get tour(){return this.getFromModel("tour")}attributeChangedCallback(r,e,t){r==="tour-id"&&e!==t&&t&&(console.log("Tour Page:",t),this.dispatchMessage({type:"TourSelected",tourId:t})),super.attributeChangedCallback(r,e,t)}render(){const{endDate:r,destinations:e=[],transportation:t=[],entourage:i,name:n,startDate:s}=this.tour||{},o=(l,d)=>{const{startDate:h,endDate:u,name:p,featuredImage:A}=l;return f`
        <itinerary-destination
          start-date=${h}
          end-date=${u}
          img-src=${A}
          href="/app/${this.tourId}/destination/${d}">
          ${p}
        </itinerary-destination>
      `},c=l=>{const d=l.length,h=l[0],u=l[d-1],p=d>2?f`<span slot="via"
              >${l.slice(1,-1).join(", ")}</span
            >`:null;return f`
        <span slot="origin"> ${h} </span>
        <span slot="terminus"> ${u} </span>
        ${p}
      `},a=l=>{const{startDate:d,type:h,routing:u=[]}=l||{};return f`
        <itinerary-transportation
          start-date=${d}
          type=${h}>
          ${c(u)}
        </itinerary-transportation>
      `};return f`
      <main class="page">
        <header>
          <h2>${n}</h2>
          <p>
            from ${B(s)} to
            ${B(r)}
            ${r&&r.getFullYear()}
          </p>
        </header>

        <calendar-widget
          start-date=${s}
          end-date=${r}>
        </calendar-widget>

        <section class="itinerary">
          ${e.map((l,d)=>{const h=d===0?a(t[d]):"",u=o(l,d),p=a(t[d+1]);return f`${h}${u}${p}`})}
        </section>

        <entourage-table .using=${i}> </entourage-table>
      </main>
    `}};q.styles=[E(J),E(xe),b`
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
    `];De([g({attribute:!1})],q.prototype,"location",2);De([g({attribute:"tour-id",reflect:!0})],q.prototype,"tourId",1);De([g()],q.prototype,"tour",1);q=De([_("tour-page")],q);var dn=Object.defineProperty,hn=Object.getOwnPropertyDescriptor,Re=(r,e,t,i)=>{for(var n=i>1?void 0:i?hn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&dn(e,t,n),n};let j=class extends ue{constructor(){super(...arguments),this.avatar=this.profile.avatar}get profile(){return this.using||{}}render(){const{userid:r,name:e,nickname:t,city:i,airports:n=[]}=this.profile,s=o=>f`<dd>${o}</dd>`;return f`
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
    `}_renderAvatar(){const{name:r,nickname:e,color:t}=this.profile||{},i=this.avatar?f`<img id="avatarImg" src="${this.avatar}" />`:(e||r||" ").slice(0,1),n=t?`--avatar-backgroundColor: ${t}`:"";return f` <div class="avatar" style=${n}>
      ${i}
    </div>`}};j.styles=[E(J),E(xe),b`
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
    `];Re([g({attribute:!1})],j.prototype,"using",2);Re([K()],j.prototype,"avatar",2);j=Re([_("user-profile")],j);let Ve=class extends j{render(){const r=this.profile||{},{userid:e,name:t,nickname:i,city:n,airports:s=[]}=r;return console.log("Rendering form",this.profile),f`
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
    `}_handleAvatarSelected(r){const t=r.target.files[0];new Promise((n,s)=>{const o=new FileReader;o.onload=()=>n(o.result),o.onerror=c=>s(c),o.readAsDataURL(t)}).then(n=>this.avatar=n)}_handleSubmit(r){var e;if(r.preventDefault(),this.profile){const t=r.target,i=new FormData(t);let n=Array.from(i.entries()).map(([o,c])=>c===""?[o]:[o,c]).map(([o,c])=>o==="airports"?[o,c.split(",").map(a=>a.trim())]:[o,c]);this.avatar&&n.push(["avatar",this.avatar]);const s=Object.fromEntries(n);console.log("Submitting Form",s),this.dispatchMessage({type:"ProfileSaved",userid:(e=this.profile)==null?void 0:e.userid,profile:s})}}};Ve.styles=[...j.styles,b`
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
    `];Ve=Re([_("user-profile-edit")],Ve);var un=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,pe=(r,e,t,i)=>{for(var n=i>1?void 0:i?pn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&un(e,t,n),n};let I=class extends ue{get userid(){var r;return(r=this.location)==null?void 0:r.params.userid}get edit(){var r;return(r=this.location)==null?void 0:r.params.edit}get profile(){return this.getFromModel("profile")}attributeChangedCallback(r,e,t){r==="userid"&&e!==t&&t&&(console.log("Profile Page:",t),this.dispatchMessage({type:"ProfileSelected",userid:t})),super.attributeChangedCallback(r,e,t)}render(){return f`
      <main class="page">
        ${this.edit?f`
              <user-profile-edit .using=${this.profile}>
              </user-profile-edit>
            `:f`
              <user-profile .using=${this.profile}>
              </user-profile>
            `}
      </main>
    `}};I.styles=[E(J),E(xe),b`
      :host {
        display: contents;
      }
    `];pe([g({attribute:!1})],I.prototype,"location",2);pe([g({reflect:!0})],I.prototype,"userid",1);pe([g({reflect:!0})],I.prototype,"edit",1);pe([g()],I.prototype,"profile",1);I=pe([_("profile-page")],I);var fn=Object.defineProperty,gn=Object.getOwnPropertyDescriptor,G=(r,e,t,i)=>{for(var n=i>1?void 0:i?gn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&fn(e,t,n),n};let U=class extends ue{get tourId(){var r;return(r=this.location)==null?void 0:r.params.tour}get destId(){var r;return parseInt(((r=this.location)==null?void 0:r.params.dest)||"0")}get tour(){return this.getFromModel("tour")}get destination(){const r=this.tour,e=(r==null?void 0:r.destinations)||[];return console.log(`Looking for destination ${this.destId} in`,e),e[this.destId]||{}}attributeChangedCallback(r,e,t){r==="tour-id"&&e!==t&&t&&(console.log("Tour Page:",t),this.dispatchMessage({type:"TourSelected",tourId:t})),super.attributeChangedCallback(r,e,t)}render(){var o;const{name:r,link:e,startDate:t,endDate:i,featuredImage:n}=this.destination,s=(o=this.tour)==null?void 0:o.name;return console.log("Destination:",this.destination),f`
      <main class="page">
        <header>
          <a class="breadcrumb" href="/app/${this.tourId}">
            ${s}
          </a>
          <h2>${r}</h2>
          <p>
            from ${B(t)} to
            ${B(i)}
            ${i&&i.getFullYear()}
          </p>
        </header>
        <a href=${e}>
          <img src=${n} />
        </a>
      </main>
    `}};U.styles=[E(J),E(xe),b``];G([g({attribute:!1})],U.prototype,"location",2);G([g({attribute:"tour-id",reflect:!0})],U.prototype,"tourId",1);G([g({attribute:"dest-id",reflect:!0})],U.prototype,"destId",1);G([g()],U.prototype,"tour",1);G([g()],U.prototype,"destination",1);U=G([_("destination-page")],U);const mn=[{path:"/app/profile/:userid/:edit(edit)",component:"profile-page"},{path:"/app/profile/:userid",component:"profile-page"},{path:"/app/:tour([0-9a-f]+)/destination/:dest([0-9]+)",component:"destination-page"},{path:"/app/:tour([0-9a-f]+)",component:"tour-page"},{path:"/app",component:"tour-page"},{path:"(.*)",redirect:"/app"}],Ue=Qr(),_n=Ue.update;Ue.addMessage("TourSelected",r=>{const{tourId:e}=r;return new Ze().get(`/tours/${e}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t){console.log("Tour:",t);let i=wt(t);return i.destinations=i.destinations.map(wt),i}}).then(t=>t?et({tour:t}):tt)});Ue.addMessage("ProfileSelected",r=>{const{userid:e}=r;return new Ze().get(`/profiles/${e}`).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t}).then(t=>t?et({profile:t}):tt)});Ue.addMessage("ProfileSaved",r=>{const{userid:e,profile:t}=r;return new Qe(t).put(`/profiles/${e}`).then(i=>{if(i.status===200)return i.json()}).then(i=>{i&&console.log("Profile:",i)}).then(i=>i?et({profile:i}):tt)});var vn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,Te=(r,e,t,i)=>{for(var n=i>1?void 0:i?bn(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&vn(e,t,n),n};let Qt="auth",V=class extends v{constructor(){super(...arguments),this.loginStatus=0,this.registerStatus=0,this.user=se.authenticateFromLocalStorage(()=>this._signOut())}isAuthenticated(){return this.user.authenticated}firstUpdated(){this._toggleDialog(!this.isAuthenticated())}render(){const r=f`
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
      <slot></slot>`}_handleLogin(r){r.preventDefault();const e=r.target,t=new FormData(e);new $t(t).base().post("/login").then(n=>{if(n.status===200)return n.json();this.loginStatus=n.status}).then(n=>{n&&(console.log("Authentication:",n.token),this.user=se.authenticate(n.token,()=>this._signOut()),this._toggleDialog(!1),this.requestUpdate())})}_handleRegister(r){r.preventDefault();const e=r.target,t=new FormData(e);new $t(t).base().post("/signup").then(n=>{if(n.status===200)return n.json();this.registerStatus=n.status}).then(n=>{console.log("Registration:",n)})}_toggleDialog(r){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("dialog");e&&(r?(console.log("Showing dialog"),e.showModal()):(console.log("Closing dialog"),e.close()))}_signOut(){this.user=P.deauthenticate(this.user),this._toggleDialog(!this.isAuthenticated()),document.location.reload()}};V.styles=b`
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
  `;Te([K()],V.prototype,"loginStatus",2);Te([K()],V.prototype,"registerStatus",2);Te([Kt({context:Qt}),K()],V.prototype,"user",2);V=Te([_("auth-required")],V);function we(r){return r=r||[],Array.isArray(r)?r:[r]}function w(r){return`[Vaadin.Router] ${r}`}function yn(r){if(typeof r!="object")return String(r);const e=Object.prototype.toString.call(r).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(r)}`:e}const Ee="module",Ae="nomodule",We=[Ee,Ae];function Et(r){if(!r.match(/.+\.[m]?js$/))throw new Error(w(`Unsupported type for bundle "${r}": .js or .mjs expected.`))}function Zt(r){if(!r||!$(r.path))throw new Error(w('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=r.bundle,t=["component","redirect","bundle"];if(!L(r.action)&&!Array.isArray(r.children)&&!L(r.children)&&!Pe(e)&&!t.some(i=>$(r[i])))throw new Error(w(`Expected route config "${r.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if($(e))Et(e);else if(We.some(i=>i in e))We.forEach(i=>i in e&&Et(e[i]));else throw new Error(w('Expected route bundle to include either "'+Ae+'" or "'+Ee+'" keys, or both'));r.redirect&&["bundle","component"].forEach(i=>{i in r&&console.warn(w(`Route config "${r.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`))})}function At(r){we(r).forEach(e=>Zt(e))}function Pt(r,e){let t=document.head.querySelector('script[src="'+r+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",r),e===Ee?t.setAttribute("type",Ee):e===Ae&&t.setAttribute(Ae,""),t.async=!0),new Promise((i,n)=>{t.onreadystatechange=t.onload=s=>{t.__dynamicImportLoaded=!0,i(s)},t.onerror=s=>{t.parentNode&&t.parentNode.removeChild(t),n(s)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&i()})}function $n(r){return $(r)?Pt(r):Promise.race(We.filter(e=>e in r).map(e=>Pt(r[e],e)))}function te(r,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${r}`,{cancelable:r==="go",detail:e}))}function Pe(r){return typeof r=="object"&&!!r}function L(r){return typeof r=="function"}function $(r){return typeof r=="string"}function er(r){const e=new Error(w(`Page not found (${r.pathname})`));return e.context=r,e.code=404,e}const H=new class{};function wn(r){const e=r.port,t=r.protocol,s=t==="http:"&&e==="80"||t==="https:"&&e==="443"?r.hostname:r.host;return`${t}//${s}`}function St(r){if(r.defaultPrevented||r.button!==0||r.shiftKey||r.ctrlKey||r.altKey||r.metaKey)return;let e=r.target;const t=r.composedPath?r.composedPath():r.path||[];for(let c=0;c<t.length;c++){const a=t[c];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||wn(e))!==window.location.origin)return;const{pathname:n,search:s,hash:o}=e;te("go",{pathname:n,search:s,hash:o})&&(r.preventDefault(),r&&r.type==="click"&&window.scrollTo(0,0))}const En={activate(){window.document.addEventListener("click",St)},inactivate(){window.document.removeEventListener("click",St)}},An=/Trident/.test(navigator.userAgent);An&&!L(window.PopStateEvent)&&(window.PopStateEvent=function(r,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(r,!!e.bubbles,!!e.cancelable),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function Ct(r){if(r.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:i}=window.location;te("go",{pathname:e,search:t,hash:i})}const Pn={activate(){window.addEventListener("popstate",Ct)},inactivate(){window.removeEventListener("popstate",Ct)}};var Y=or,Sn=it,Cn=Rn,On=nr,xn=sr,tr="/",rr="./",Dn=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function it(r,e){for(var t=[],i=0,n=0,s="",o=e&&e.delimiter||tr,c=e&&e.delimiters||rr,a=!1,l;(l=Dn.exec(r))!==null;){var d=l[0],h=l[1],u=l.index;if(s+=r.slice(n,u),n=u+d.length,h){s+=h[1],a=!0;continue}var p="",A=r[n],fr=l[2],gr=l[3],mr=l[4],fe=l[5];if(!a&&s.length){var Me=s.length-1;c.indexOf(s[Me])>-1&&(p=s[Me],s=s.slice(0,Me))}s&&(t.push(s),s="",a=!1);var _r=p!==""&&A!==void 0&&A!==p,vr=fe==="+"||fe==="*",br=fe==="?"||fe==="*",at=p||o,lt=gr||mr;t.push({name:fr||i++,prefix:p,delimiter:at,optional:br,repeat:vr,partial:_r,pattern:lt?Un(lt):"[^"+O(at)+"]+?"})}return(s||n<r.length)&&t.push(s+r.substr(n)),t}function Rn(r,e){return nr(it(r,e))}function nr(r){for(var e=new Array(r.length),t=0;t<r.length;t++)typeof r[t]=="object"&&(e[t]=new RegExp("^(?:"+r[t].pattern+")$"));return function(i,n){for(var s="",o=n&&n.encode||encodeURIComponent,c=0;c<r.length;c++){var a=r[c];if(typeof a=="string"){s+=a;continue}var l=i?i[a.name]:void 0,d;if(Array.isArray(l)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(l.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var h=0;h<l.length;h++){if(d=o(l[h],a),!e[c].test(d))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');s+=(h===0?a.prefix:a.delimiter)+d}continue}if(typeof l=="string"||typeof l=="number"||typeof l=="boolean"){if(d=o(String(l),a),!e[c].test(d))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+d+'"');s+=a.prefix+d;continue}if(a.optional){a.partial&&(s+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return s}}function O(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Un(r){return r.replace(/([=!:$/()])/g,"\\$1")}function ir(r){return r&&r.sensitive?"":"i"}function Tn(r,e){if(!e)return r;var t=r.source.match(/\((?!\?)/g);if(t)for(var i=0;i<t.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return r}function zn(r,e,t){for(var i=[],n=0;n<r.length;n++)i.push(or(r[n],e,t).source);return new RegExp("(?:"+i.join("|")+")",ir(t))}function Mn(r,e,t){return sr(it(r,t),e,t)}function sr(r,e,t){t=t||{};for(var i=t.strict,n=t.start!==!1,s=t.end!==!1,o=O(t.delimiter||tr),c=t.delimiters||rr,a=[].concat(t.endsWith||[]).map(O).concat("$").join("|"),l=n?"^":"",d=r.length===0,h=0;h<r.length;h++){var u=r[h];if(typeof u=="string")l+=O(u),d=h===r.length-1&&c.indexOf(u[u.length-1])>-1;else{var p=u.repeat?"(?:"+u.pattern+")(?:"+O(u.delimiter)+"(?:"+u.pattern+"))*":u.pattern;e&&e.push(u),u.optional?u.partial?l+=O(u.prefix)+"("+p+")?":l+="(?:"+O(u.prefix)+"("+p+"))?":l+=O(u.prefix)+"("+p+")"}}return s?(i||(l+="(?:"+o+")?"),l+=a==="$"?"$":"(?="+a+")"):(i||(l+="(?:"+o+"(?="+a+"))?"),d||(l+="(?="+o+"|"+a+")")),new RegExp(l,ir(t))}function or(r,e,t){return r instanceof RegExp?Tn(r,e):Array.isArray(r)?zn(r,e,t):Mn(r,e,t)}Y.parse=Sn;Y.compile=Cn;Y.tokensToFunction=On;Y.tokensToRegExp=xn;const{hasOwnProperty:jn}=Object.prototype,Ke=new Map;Ke.set("|false",{keys:[],pattern:/(?:)/});function Ot(r){try{return decodeURIComponent(r)}catch{return r}}function In(r,e,t,i,n){t=!!t;const s=`${r}|${t}`;let o=Ke.get(s);if(!o){const l=[];o={keys:l,pattern:Y(r,l,{end:t,strict:r===""})},Ke.set(s,o)}const c=o.pattern.exec(e);if(!c)return null;const a=Object.assign({},n);for(let l=1;l<c.length;l++){const d=o.keys[l-1],h=d.name,u=c[l];(u!==void 0||!jn.call(a,h))&&(d.repeat?a[h]=u?u.split(d.delimiter).map(Ot):[]:a[h]=u&&Ot(u))}return{path:c[0],keys:(i||[]).concat(o.keys),params:a}}function ar(r,e,t,i,n){let s,o,c=0,a=r.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(l){if(r===l)return{done:!0};const d=r.__children=r.__children||r.children;if(!s&&(s=In(a,e,!d,i,n),s))return{done:!1,value:{route:r,keys:s.keys,params:s.params,path:s.path}};if(s&&d)for(;c<d.length;){if(!o){const u=d[c];u.parent=r;let p=s.path.length;p>0&&e.charAt(p)==="/"&&(p+=1),o=ar(u,e.substr(p),t,s.keys,s.params)}const h=o.next(l);if(!h.done)return{done:!1,value:h.value};o=null,c++}return{done:!0}}}}function Ln(r){if(L(r.route.action))return r.route.action(r)}function Nn(r,e){let t=e;for(;t;)if(t=t.parent,t===r)return!0;return!1}function Hn(r){let e=`Path '${r.pathname}' is not properly resolved due to an error.`;const t=(r.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function kn(r,e){const{route:t,path:i}=e;if(t&&!t.__synthetic){const n={path:i,route:t};if(!r.chain)r.chain=[];else if(t.parent){let s=r.chain.length;for(;s--&&r.chain[s].route&&r.chain[s].route!==t.parent;)r.chain.pop()}r.chain.push(n)}}class le{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||Ln,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){At(e);const t=[...we(e)];this.root.__children=t}addRoutes(e){return At(e),this.root.__children.push(...we(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,$(e)?{pathname:e}:e),i=ar(this.root,this.__normalizePathname(t.pathname),this.baseUrl),n=this.resolveRoute;let s=null,o=null,c=t;function a(l,d=s.value.route,h){const u=h===null&&s.value.route;return s=o||i.next(u),o=null,!l&&(s.done||!Nn(d,s.value.route))?(o=s,Promise.resolve(H)):s.done?Promise.reject(er(t)):(c=Object.assign(c?{chain:c.chain?c.chain.slice(0):[]}:{},t,s.value),kn(c,s.value),Promise.resolve(n(c)).then(p=>p!=null&&p!==H?(c.result=p.result||p,c):a(l,d,p)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(l=>{const d=Hn(c);if(l?console.warn(d):l=new Error(d),l.context=l.context||c,l instanceof DOMException||(l.code=l.code||500),this.errorHandler)return c.result=this.errorHandler(l),c;throw l})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,i=this.constructor.__createUrl(e,t).href;if(i.slice(0,t.length)===t)return i.slice(t.length)}}le.pathToRegexp=Y;const{pathToRegexp:xt}=le,Dt=new Map;function lr(r,e,t){const i=e.name||e.component;if(i&&(r.has(i)?r.get(i).push(e):r.set(i,[e])),Array.isArray(t))for(let n=0;n<t.length;n++){const s=t[n];s.parent=e,lr(r,s,s.__children||s.children)}}function Rt(r,e){const t=r.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function Ut(r){let e=r.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function Fn(r,e={}){if(!(r instanceof le))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(i,n)=>{let s=Rt(t,i);if(!s&&(t.clear(),lr(t,r.root,r.root.__children),s=Rt(t,i),!s))throw new Error(`Route "${i}" not found`);let o=Dt.get(s.fullPath);if(!o){let a=Ut(s),l=s.parent;for(;l;){const p=Ut(l);p&&(a=p.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),l=l.parent}const d=xt.parse(a),h=xt.tokensToFunction(d),u=Object.create(null);for(let p=0;p<d.length;p++)$(d[p])||(u[d[p].name]=!0);o={toPath:h,keys:u},Dt.set(a,o),s.fullPath=a}let c=o.toPath(n,e)||"/";if(e.stringifyQueryParams&&n){const a={},l=Object.keys(n);for(let h=0;h<l.length;h++){const u=l[h];o.keys[u]||(a[u]=n[u])}const d=e.stringifyQueryParams(a);d&&(c+=d.charAt(0)==="?"?d:`?${d}`)}return c}}let Tt=[];function Bn(r){Tt.forEach(e=>e.inactivate()),r.forEach(e=>e.activate()),Tt=r}const qn=r=>{const e=getComputedStyle(r).getPropertyValue("animation-name");return e&&e!=="none"},Vn=(r,e)=>{const t=()=>{r.removeEventListener("animationend",t),e()};r.addEventListener("animationend",t)};function zt(r,e){return r.classList.add(e),new Promise(t=>{if(qn(r)){const i=r.getBoundingClientRect(),n=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;r.setAttribute("style",`position: absolute; ${n}`),Vn(r,()=>{r.classList.remove(e),r.removeAttribute("style"),t()})}else r.classList.remove(e),t()})}const Wn=256;function He(r){return r!=null}function Kn(r){const e=Object.assign({},r);return delete e.next,e}function y({pathname:r="",search:e="",hash:t="",chain:i=[],params:n={},redirectFrom:s,resolver:o},c){const a=i.map(l=>l.route);return{baseUrl:o&&o.baseUrl||"",pathname:r,search:e,hash:t,routes:a,route:c||a.length&&a[a.length-1]||null,params:n,redirectFrom:s,getUrl:(l={})=>ve(D.pathToRegexp.compile(cr(a))(Object.assign({},n,l)),o)}}function Mt(r,e){const t=Object.assign({},r.params);return{redirect:{pathname:e,from:r.pathname,params:t}}}function Jn(r,e){e.location=y(r);const t=r.chain.map(i=>i.route).indexOf(r.route);return r.chain[t].element=e,e}function _e(r,e,t){if(L(r))return r.apply(t,e)}function jt(r,e,t){return i=>{if(i&&(i.cancel||i.redirect))return i;if(t)return _e(t[r],e,t)}}function Gn(r,e){if(!Array.isArray(r)&&!Pe(r))throw new Error(w(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${r}`));e.__children=[];const t=we(r);for(let i=0;i<t.length;i++)Zt(t[i]),e.__children.push(t[i])}function ge(r){if(r&&r.length){const e=r[0].parentNode;for(let t=0;t<r.length;t++)e.removeChild(r[t])}}function ve(r,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(r.replace(/^\//,""),t).pathname:r}function cr(r){return r.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class D extends le{constructor(e,t){const i=document.head.querySelector("base"),n=i&&i.getAttribute("href");super([],Object.assign({baseUrl:n&&le.__createUrl(n,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=o=>this.__resolveRoute(o);const s=D.NavigationTrigger;D.setTriggers.apply(D,Object.keys(s).map(o=>s[o])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=y({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let i=Promise.resolve();L(t.children)&&(i=i.then(()=>t.children(Kn(e))).then(s=>{!He(s)&&!L(t.children)&&(s=t.children),Gn(s,t)}));const n={redirect:s=>Mt(e,s),component:s=>{const o=document.createElement(s);return this.__createdByRouter.set(o,!0),o}};return i.then(()=>{if(this.__isLatestRender(e))return _e(t.action,[e,n],t)}).then(s=>{if(He(s)&&(s instanceof HTMLElement||s.redirect||s===H))return s;if($(t.redirect))return n.redirect(t.redirect);if(t.bundle)return $n(t.bundle).then(()=>{},()=>{throw new Error(w(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(s=>{if(He(s))return s;if($(t.component))return n.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const i=++this.__lastStartedRenderId,n=Object.assign({search:"",hash:""},$(e)?{pathname:e}:e,{__renderId:i});return this.ready=this.resolve(n).then(s=>this.__fullyResolveChain(s)).then(s=>{if(this.__isLatestRender(s)){const o=this.__previousContext;if(s===o)return this.__updateBrowserHistory(o,!0),this.location;if(this.location=y(s),t&&this.__updateBrowserHistory(s,i===1),te("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.__copyUnchangedElements(s,o),this.__previousContext=s,this.location;this.__addAppearingContent(s,o);const c=this.__animateIfNeeded(s);return this.__runOnAfterEnterCallbacks(s),this.__runOnAfterLeaveCallbacks(s,o),c.then(()=>{if(this.__isLatestRender(s))return this.__removeDisappearingContent(),this.__previousContext=s,this.location})}}).catch(s=>{if(i===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(n),ge(this.__outlet&&this.__outlet.children),this.location=y(Object.assign(n,{resolver:this})),te("error",Object.assign({router:this,error:s},n)),s}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(i=>{const s=i!==t?i:e,c=ve(cr(i.chain),i.resolver)===i.pathname,a=(l,d=l.route,h)=>l.next(void 0,d,h).then(u=>u===null||u===H?c?l:d.parent!==null?a(l,d.parent,u):u:u);return a(i).then(l=>{if(l===null||l===H)throw er(s);return l&&l!==H&&l!==i?this.__fullyResolveChain(s,l):this.__amendWithOnBeforeCallbacks(i)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(Jn(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(i=>this.__findComponentContextAfterAllRedirects(i)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(w(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${yn(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},i=t.chain||[],n=e.chain;let s=Promise.resolve();const o=()=>({cancel:!0}),c=a=>Mt(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,n.length)&&!(i[a].route!==n[a].route||i[a].path!==n[a].path&&i[a].element!==n[a].element||!this.__isReusableElement(i[a].element,n[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=n.length===i.length&&e.__divergedChainIndex==n.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=n.length-1;a>=0;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:o},i[a]);for(let a=0;a<n.length;a++)s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:o,redirect:c},n[a]),i[a].element.location=y(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:o},i[a])}if(!e.__skipAttach)for(let a=0;a<n.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=y(e,i[a].route)):(s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:o,redirect:c},n[a]),n[a].element&&(n[a].element.location=y(e,n[a].route)));return s.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,i,n){const s=y(t);return e.then(o=>{if(this.__isLatestRender(t))return jt("onBeforeLeave",[s,i,this],n.element)(o)}).then(o=>{if(!(o||{}).redirect)return o})}__runOnBeforeEnterCallbacks(e,t,i,n){const s=y(t,n.route);return e.then(o=>{if(this.__isLatestRender(t))return jt("onBeforeEnter",[s,i,this],n.element)(o)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,i){if(t>Wn)throw new Error(w(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:i})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(w(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:i=""},n){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==i){const s=n?"replaceState":"pushState";window.history[s](null,document.title,e+t+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let i=this.__outlet;for(let n=0;n<e.__divergedChainIndex;n++){const s=t&&t.chain[n].element;if(s)if(s.parentNode===i)e.chain[n].element=s,i=s;else break}return i}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const i=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(i.children).filter(s=>this.__addedByRouter.get(s)&&s!==e.result);let n=i;for(let s=e.__divergedChainIndex;s<e.chain.length;s++){const o=e.chain[s].element;o&&(n.appendChild(o),this.__addedByRouter.set(o,!0),n===i&&this.__appearingContent.push(o),n=o)}}__removeDisappearingContent(){this.__disappearingContent&&ge(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(ge(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let i=t.chain.length-1;i>=e.__divergedChainIndex&&this.__isLatestRender(e);i--){const n=t.chain[i].element;if(n)try{const s=y(e);_e(n.onAfterLeave,[s,{},t.resolver],n)}finally{this.__disappearingContent.indexOf(n)>-1&&ge(n.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const i=e.chain[t].element||{},n=y(e,e.chain[t].route);_e(i.onAfterEnter,[n,{},e.resolver],i)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],i=(this.__appearingContent||[])[0],n=[],s=e.chain;let o;for(let c=s.length;c>0;c--)if(s[c-1].route.animate){o=s[c-1].route.animate;break}if(t&&i&&o){const c=Pe(o)&&o.leave||"leaving",a=Pe(o)&&o.enter||"entering";n.push(zt(t,c)),n.push(zt(i,a))}return Promise.all(n).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:i,hash:n}=e?e.detail:window.location;$(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:i,hash:n},!0))}static setTriggers(...e){Bn(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=Fn(this)),ve(this.__urlForName(e,t),this)}urlForPath(e,t){return ve(D.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:i,hash:n}=$(e)?this.__createUrl(e,"http://a"):e;return te("go",{pathname:t,search:i,hash:n})}}const Yn=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,be=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Xn(){function r(){return!0}return dr(r)}function Qn(){try{return Zn()?!0:ei()?be?!ti():!Xn():!1}catch{return!1}}function Zn(){return localStorage.getItem("vaadin.developmentmode.force")}function ei(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function ti(){return!!(be&&Object.keys(be).map(e=>be[e]).filter(e=>e.productionMode).length>0)}function dr(r,e){if(typeof r!="function")return;const t=Yn.exec(r.toString());if(t)try{r=new Function(t[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return r(e)}window.Vaadin=window.Vaadin||{};const It=function(r,e){if(window.Vaadin.developmentMode)return dr(r,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Qn());function ri(){}const ni=function(){if(typeof It=="function")return It(ri)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});ni();D.NavigationTrigger={POPSTATE:Pn,CLICK:En};var ii=Object.defineProperty,si=Object.getOwnPropertyDescriptor,hr=(r,e,t,i)=>{for(var n=i>1?void 0:i?si(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&ii(e,t,n),n};let Je=class extends v{constructor(){super(...arguments),this.router=new D(this),this.routes=[]}connectedCallback(){super.connectedCallback(),this.router.setRoutes(this.routes),console.log("Router:",this.routes)}render(){return f`<slot></slot>`}};hr([g({attribute:!1})],Je.prototype,"routes",2);Je=hr([_("vaadin-router")],Je);var oi=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,st=(r,e,t,i)=>{for(var n=i>1?void 0:i?ai(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&oi(e,t,n),n};let ce=class extends v{constructor(){super(...arguments),this.open=!1,this.align="left"}render(){const r=this.align==="left"?"":"--position-left: auto; --position-right: 0;";return f`
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
    `}_handleChange(r){const e=r.target;this._toggle(e.checked)}_toggle(r){this.open=r,this._toggleClickAway(r)}_toggleClickAway(r){const e=t=>{t.composedPath().includes(this)?t.stopPropagation():this._toggle(!1)};r?document.addEventListener("click",e):document.removeEventListener("click",e)}};ce.styles=b`
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
  `;st([g({reflect:!0,type:Boolean})],ce.prototype,"open",2);st([g()],ce.prototype,"align",2);ce=st([_("drop-down")],ce);var li=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,ur=(r,e,t,i)=>{for(var n=i>1?void 0:i?ci(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&li(e,t,n),n};let Se=class extends v{constructor(){super(...arguments),this.on=!1}render(){return f`<label>
      <slot>Label</slot>
      <span class="slider">
        <input type="checkbox" @change=${this._handleChange} />
      </span>
    </label>`}_handleChange(r){const e=r.target,t=new Event(r.type,{bubbles:!0,composed:!0});this.on=e==null?void 0:e.checked,this.dispatchEvent(t)}};Se.styles=b`
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
  `;ur([g({reflect:!0,type:Boolean})],Se.prototype,"on",2);Se=ur([_("toggle-switch")],Se);var di=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,ze=(r,e,t,i)=>{for(var n=i>1?void 0:i?hi(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&di(e,t,n),n};let W=class extends v{constructor(){super(...arguments),this.name="preset",this.options=[1,2,3,4,5]}_renderButton(r){const e=this.value===r;return f`
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
    `}_handleChange(r){const e=r.target,t=new Event(r.type,{bubbles:!0,composed:!0});console.log("Preset changed",r),e&&(this.value=e.value?parseInt(e.value):void 0),this.dispatchEvent(t)}};W.styles=b`
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
  `;ze([g({reflect:!0,type:Number})],W.prototype,"value",2);ze([g()],W.prototype,"name",2);ze([g({attribute:!1})],W.prototype,"options",2);W=ze([_("preset-buttons")],W);var ui=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,pr=(r,e,t,i)=>{for(var n=i>1?void 0:i?pi(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&ui(e,t,n),n};let Ce=class extends v{constructor(){super(...arguments),this.avatar=""}render(){return f`
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
    `}_toggleDarkMode(r){const e=r.target,t=document.body;console.log("Toggling Dark mode",r),e!=null&&e.on?t.classList.add("dark-mode"):t.classList.remove("dark-mode")}_selectFontSize(r){const e=r.target,t=document.documentElement;if(console.log("Selecting Font Size",r),e){const i=e.value?e.value.toString()+"px":"initial";t.style.fontSize=i}}};Ce.styles=[E(J),b`
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
    `];pr([g()],Ce.prototype,"avatar",2);Ce=pr([_("user-panel")],Ce);var fi=Object.defineProperty,gi=Object.getOwnPropertyDescriptor,ot=(r,e,t,i)=>{for(var n=i>1?void 0:i?gi(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&fi(e,t,n),n};let de=class extends v{constructor(){super(...arguments),this.user=new P}render(){const{avatar:r,name:e,nickname:t,userid:i,color:n}=this.profile||{},s=t||e&&e.split(" ")[0]||this.user.username;return f`
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
    `}updated(r){if(console.log("Profile Data has been updated",r),r.has("user")){console.log("New user",this.user);const{username:e}=this.user;this._getData(`/profiles/${e}`)}return!0}_getData(r){new Ze().get(r).then(t=>t.status===200?t.json():null).then(t=>{console.log("Profile:",t),this.profile=t})}_signOut(){console.log("Signout"),this.user.signOut()}};de.styles=[E(J),b`
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
    `];ot([K()],de.prototype,"profile",2);ot([Jt({context:Qt,subscribe:!0}),g({attribute:!1})],de.prototype,"user",2);de=ot([_("blazing-header")],de);var mi=Object.defineProperty,_i=Object.getOwnPropertyDescriptor,vi=(r,e,t,i)=>{for(var n=i>1?void 0:i?_i(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&mi(e,t,n),n};let Lt=class extends Xt{constructor(){super(_n)}render(){return f`
      <auth-required>
        <blazing-header></blazing-header>
        <vaadin-router .routes=${mn}> </vaadin-router>
      </auth-required>
    `}};Lt=vi([_("blazing-app")],Lt);
