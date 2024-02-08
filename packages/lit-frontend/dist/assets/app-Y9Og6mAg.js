(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,et=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),lt=new WeakMap;let yt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(et&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=lt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&lt.set(e,t))}return t}toString(){return this.cssText}};const Pt=r=>new yt(typeof r=="string"?r:r+"",void 0,st),S=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new yt(e,r,st)},Dt=(r,t)=>{if(et)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=B.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},ct=et?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Pt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ot,defineProperty:zt,getOwnPropertyDescriptor:Tt,getOwnPropertyNames:kt,getOwnPropertySymbols:Ut,getPrototypeOf:Nt}=Object,_=globalThis,ht=_.trustedTypes,Mt=ht?ht.emptyScript:"",Y=_.reactiveElementPolyfillSupport,T=(r,t)=>r,W={toAttribute(r,t){switch(t){case Boolean:r=r?Mt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},it=(r,t)=>!Ot(r,t),dt={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:it};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&zt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=Tt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);n.call(this,o),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;const t=Nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){const e=this.properties,i=[...kt(e),...Ut(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(ct(s))}else t!==void 0&&e.push(ct(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$Eg=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$ES(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$E_??(this._$E_=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$E_)==null||e.delete(t)}_$ES(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Dt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$E_)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$E_)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){var n;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:W).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:W;this._$Em=s,this[s]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??it)(this[t],e))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$ET??(this._$ET=new Set)).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.C(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$E_)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$Ej()}catch(s){throw t=!1,this._$Ej(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$E_)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ej(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$ET&&(this._$ET=this._$ET.forEach(e=>this._$EO(e,this[e]))),this._$Ej()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[T("elementProperties")]=new Map,x[T("finalized")]=new Map,Y==null||Y({ReactiveElement:x}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.0.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis,q=k.trustedTypes,pt=q?q.createPolicy("lit-html",{createHTML:r=>r}):void 0,bt="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,wt="?"+$,Ht=`<${wt}>`,C=document,U=()=>C.createComment(""),N=r=>r===null||typeof r!="object"&&typeof r!="function",At=Array.isArray,Rt=r=>At(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",G=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,gt=/>/g,A=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,mt=/"/g,Et=/^(?:script|style|textarea|title)$/i,jt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=jt(1),P=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),vt=new WeakMap,E=C.createTreeWalker(C,129);function Ct(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}const Lt=(r,t)=>{const e=r.length-1,i=[];let s,n=t===2?"<svg>":"",o=z;for(let l=0;l<e;l++){const a=r[l];let h,g,c=-1,m=0;for(;m<a.length&&(o.lastIndex=m,g=o.exec(a),g!==null);)m=o.lastIndex,o===z?g[1]==="!--"?o=ut:g[1]!==void 0?o=gt:g[2]!==void 0?(Et.test(g[2])&&(s=RegExp("</"+g[2],"g")),o=A):g[3]!==void 0&&(o=A):o===A?g[0]===">"?(o=s??z,c=-1):g[1]===void 0?c=-2:(c=o.lastIndex-g[2].length,h=g[1],o=g[3]===void 0?A:g[3]==='"'?mt:ft):o===mt||o===ft?o=A:o===ut||o===gt?o=z:(o=A,s=void 0);const v=o===A&&r[l+1].startsWith("/>")?" ":"";n+=o===z?a+Ht:c>=0?(i.push(h),a.slice(0,c)+bt+a.slice(c)+$+v):a+$+(c===-2?l:v)}return[Ct(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};class M{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[h,g]=Lt(t,e);if(this.el=M.createElement(h,i),E.currentNode=this.el.content,e===2){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=E.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(bt)){const m=g[o++],v=s.getAttribute(c).split($),I=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:I[2],strings:v,ctor:I[1]==="."?Bt:I[1]==="?"?Wt:I[1]==="@"?qt:V}),s.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:n}),s.removeAttribute(c));if(Et.test(s.tagName)){const c=s.textContent.split($),m=c.length-1;if(m>0){s.textContent=q?q.emptyScript:"";for(let v=0;v<m;v++)s.append(c[v],U()),E.nextNode(),a.push({type:2,index:++n});s.append(c[m],U())}}}else if(s.nodeType===8)if(s.data===wt)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf($,c+1))!==-1;)a.push({type:7,index:n}),c+=$.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function D(r,t,e=r,i){var o,l;if(t===P)return t;let s=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl;const n=N(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=D(r,s._$AS(r,t.values),s,i)),t}class It{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??C).importNode(e,!0);E.currentNode=s;let n=E.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new L(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new Ft(n,this,t)),this._$AV.push(h),a=i[++l]}o!==(a==null?void 0:a.index)&&(n=E.nextNode(),o++)}return E.currentNode=C,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class L{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),N(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==P&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Rt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==d&&N(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var n;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=M.createElement(Ct(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{const o=new It(s,this),l=o.u(this.options);o.p(e),this.$(l),this._$AH=o}}_$AC(t){let e=vt.get(t.strings);return e===void 0&&vt.set(t.strings,e=new M(t)),e}T(t){At(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new L(this.k(U()),this.k(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(n===void 0)t=D(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==P,o&&(this._$AH=t);else{const l=t;let a,h;for(t=n[0],a=0;a<n.length-1;a++)h=D(this,l[i+a],e,a),h===P&&(h=this._$AH[a]),o||(o=!N(h)||h!==this._$AH[a]),h===d?t=d:t!==d&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!s&&this.O(t)}O(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bt extends V{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===d?void 0:t}}class Wt extends V{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class qt extends V{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=D(this,t,e,0)??d)===P)return;const i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ft{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const Z=k.litHtmlPolyfillSupport;Z==null||Z(M,L),(k.litHtmlVersions??(k.litHtmlVersions=[])).push("3.1.1");const Jt=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new L(t.insertBefore(U(),n),n,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class f extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return P}}var _t;f._$litElement$=!0,f.finalized=!0,(_t=globalThis.litElementHydrateSupport)==null||_t.call(globalThis,{LitElement:f});const Q=globalThis.litElementPolyfillSupport;Q==null||Q({LitElement:f});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:it},Kt=(r=Vt,t,e)=>{const{kind:i,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,r),i==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r),l}}}if(i==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function u(r){return(t,e)=>typeof e=="object"?Kt(r,t,e):((i,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(s,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Yt(r){return u({...r,state:!0,attribute:!1})}var Gt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,rt=(r,t,e,i)=>{for(var s=i>1?void 0:i?Zt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Gt(t,e,s),s};let H=class extends f{constructor(){super(...arguments),this.open=!1,this.align="left"}render(){const r=this.align==="left"?"":"--position-left: auto; --position-right: 0;";return p`
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
    `}_handleChange(r){const t=r.target;this._toggle(t.checked)}_toggle(r){this.open=r,this._toggleClickAway(r)}_toggleClickAway(r){const t=e=>{e.composedPath().includes(this)?e.stopPropagation():this._toggle(!1)};r?document.addEventListener("click",t):document.removeEventListener("click",t)}};H.styles=S`
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
  `;rt([u({reflect:!0,type:Boolean})],H.prototype,"open",2);rt([u()],H.prototype,"align",2);H=rt([b("drop-down")],H);var Qt=Object.defineProperty,Xt=Object.getOwnPropertyDescriptor,St=(r,t,e,i)=>{for(var s=i>1?void 0:i?Xt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Qt(t,e,s),s};let F=class extends f{constructor(){super(...arguments),this.avatar=""}render(){return p`
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
    `}_toggleDarkMode(r){const t=r.target,e=document.body;console.log("Toggling Dark mode",r),t!=null&&t.on?e.classList.add("dark-mode"):e.classList.remove("dark-mode")}_selectFontSize(r){const t=r.target,e=document.documentElement;if(console.log("Selecting Font Size",r),t){const i=t.value?t.value.toString()+"px":"initial";e.style.fontSize=i}}};F.styles=S`
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
  `;St([u()],F.prototype,"avatar",2);F=St([b("user-panel")],F);var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,xt=(r,t,e,i)=>{for(var s=i>1?void 0:i?ee(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&te(t,e,s),s};let J=class extends f{constructor(){super(...arguments),this.on=!1}render(){return p`<label>
      <slot>Label</slot>
      <span class="slider">
        <input type="checkbox" @change=${this._handleChange} />
      </span>
    </label>`}_handleChange(r){const t=r.target,e=new Event(r.type,{bubbles:!0,composed:!0});this.on=t==null?void 0:t.checked,this.dispatchEvent(e)}};J.styles=S`
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
  `;xt([u({reflect:!0,type:Boolean})],J.prototype,"on",2);J=xt([b("toggle-switch")],J);var se=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,K=(r,t,e,i)=>{for(var s=i>1?void 0:i?ie(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&se(t,e,s),s};let O=class extends f{constructor(){super(...arguments),this.name="preset",this.options=[1,2,3,4,5]}_renderButton(r){const t=this.value===r;return p`
      <label>
        <input
          type="radio"
          name=${this.name}
          .value=${r}
          .checked=${t} />
        ${r}
      </label>
    `}render(){return p`
      <div>
        <span><slot></slot></span>
        <span class="switches" @change=${this._handleChange}>
          ${this.options.map(r=>this._renderButton(r))}
        </span>
      </div>
    `}_handleChange(r){const t=r.target,e=new Event(r.type,{bubbles:!0,composed:!0});console.log("Preset changed",r),t&&(this.value=t.value?parseInt(t.value):void 0),this.dispatchEvent(e)}};O.styles=S`
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
  `;K([u({reflect:!0,type:Number})],O.prototype,"value",2);K([u()],O.prototype,"name",2);K([u({attribute:!1})],O.prototype,"options",2);O=K([b("preset-buttons")],O);var re=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,nt=(r,t,e,i)=>{for(var s=i>1?void 0:i?ne(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&re(t,e,s),s};let R=class extends f{constructor(){super(...arguments),this.startDate=Date.now().toString(),this.endDate=Date.now().toString()}_handleChange(r){const t=new CustomEvent("calendar-widget:select",{bubbles:!0,detail:{date:r&&new Date(r)}});this.dispatchEvent(t)}_handleClear(){var e;const r=(e=this.shadowRoot)==null?void 0:e.querySelector("input:checked");r&&(r.checked=!1);const t=new CustomEvent("calendar-widget:clear",{bubbles:!0});this.dispatchEvent(t)}render(){const r=new Date(this.startDate),t=new Date(this.endDate),e=oe(r,t),i=s=>{const n={d:s.getUTCDate(),m:s.getUTCMonth()+1,y:s.getUTCFullYear(),day:s.getUTCDay()},o=({y:l,m:a,d:h})=>[l,a,h].join("-");return p`
        <label style="grid-column: ${n.day+1}">
          ${n.d}
          <input
            type="radio"
            name="cal"
            value="${o(n)}" />
        </label>
      `};return p` <section>
      <fieldset
        @change="${s=>{const n=s.target;this._handleChange(n.value)}}">
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
        ${e.map(i)}
      </fieldset>
      <button id="clear" @click="${()=>this._handleClear()}">
        Clear Selection
      </button>
    </section>`}};R.styles=S`
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
  `;nt([u({attribute:"start-date",type:Date})],R.prototype,"startDate",2);nt([u({attribute:"end-date",type:Date})],R.prototype,"endDate",2);R=nt([b("calendar-widget")],R);function oe(r,t){const e=t?t.getTime():r.getTime();let i=[],s=new Date(r);for(;s.getTime()<=e;)i.push(new Date(s)),s.setUTCDate(s.getUTCDate()+1);return i}var ae=Object.defineProperty,le=Object.getOwnPropertyDescriptor,w=(r,t,e,i)=>{for(var s=i>1?void 0:i?le(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&ae(t,e,s),s};const at=class at extends f{constructor(){super(...arguments),this.startDate="1970-01-01",this.hidden=!1,this._calendar_widget_select=t=>{},this._calendar_widget_clear=t=>{}}render(){const t=this.renderItem(),e=this.href?p`<a class="itemLink" href="{href}">${t}</a>`:t;return p`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${$t(this.startDate)}
        </time>
        ${this.endDate?p` <time datetime=${this.endDate}>
              ${$t(this.endDate)}
            </time>`:null}
      </span>
      ${e}
    `}renderItem(){return p`<slot></slot>`}connectedCallback(){const t=i=>{const n=i.detail.date;n<new Date(this.startDate)||n>new Date(this.endDate||this.startDate)?(console.log("Hiding item",this),this.setAttribute("hidden","hidden")):(console.log("Revealing item",this),this.removeAttribute("hidden"))},e=i=>{this.removeAttribute("hidden")};document.addEventListener("calendar-widget:select",this._calendar_widget_select=t),document.addEventListener("calendar-widget:clear",this._calendar_widget_clear=e),super.connectedCallback()}disconnectedCallback(){document.removeEventListener("calendar-widget:select",this._calendar_widget_select),document.removeEventListener("calendar-widget:clear",this._calendar_widget_clear),super.disconnectedCallback()}};at.styles=S`
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
  `;let y=at;w([u({attribute:"start-date"})],y.prototype,"startDate",2);w([u({attribute:"end-date"})],y.prototype,"endDate",2);w([u()],y.prototype,"href",2);w([u({reflect:!0,type:Boolean})],y.prototype,"hidden",2);let X=class extends y{renderItem(){const r=p`<slot></slot>`,t=this.href?p`<a class=:itemLink" href="{href}">${r}</a>`:r,e=this.imgSrc?`background-image: url(${this.imgSrc})`:"";return p`<section class="destination" style=${e}>
      <h3>${t}</h3>
    </section>`}};w([u({attribute:"img-src"})],X.prototype,"imgSrc",2);X=w([b("itinerary-destination")],X);let tt=class extends y{renderItem(){const r={air:"icon-airplane",rail:"icon-train"},t=this.type?r[this.type]:"icon-default";return p`<section class="transportation">
      <h3 class="subgrid">
        <span>
          <slot name="origin">BGN</slot>
        </span>
        <svg class="icon">
          <use href="/icons/transportation.svg#${t}" />
        </svg>
        <span>
          <slot name="terminus">END</slot>
          <slot name="via"></slot>
        </span>
      </h3>
    </section>`}};w([u()],tt.prototype,"type",2);tt=w([b("itinerary-transportation")],tt);const ce=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function $t(r){const t=new Date(r),e=ce[t.getUTCMonth()];return`${t.getUTCDate()} ${e}`}var he=Object.defineProperty,de=Object.getOwnPropertyDescriptor,ot=(r,t,e,i)=>{for(var s=i>1?void 0:i?de(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&he(t,e,s),s};let j=class extends f{constructor(){super(...arguments),this.src=""}render(){var e;const r=((e=this.entourage)==null?void 0:e.people)||[],t=i=>{const{avatar:s,name:n="** NO NAME **",nickname:o,color:l}=i,a=s?p`<img src="${s}" />`:(o||n).slice(0,1),h=l?`style="--color-avatar-bg: ${l}"`:"";return p`
        <tr>
          <td>
            <span class="avatar" ${h}>
              ${a}
            </span>
          </td>
          <td class="name">${n}</td>
        </tr>
      `};return p`<table>
      <tbody>${r.map(t)}</tbody>
    </table>`}connectedCallback(){this.src&&this._fetchData(this.src),super.connectedCallback()}attributeChangedCallback(r,t,e){var s;const i=(s=this.shadowRoot)==null?void 0:s.getElementById("rows");r==="src"&&(i&&t&&i.replaceChildren(),e&&this._fetchData(e)),super.attributeChangedCallback(r,t,e)}_fetchData(r){fetch(r).then(t=>t.status===200?t.json():null).then(t=>{this.entourage=t})}};j.styles=S`
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
    img {
      width: 100%;
    }
  `;ot([u()],j.prototype,"src",2);ot([Yt()],j.prototype,"entourage",2);j=ot([b("entourage-table")],j);
