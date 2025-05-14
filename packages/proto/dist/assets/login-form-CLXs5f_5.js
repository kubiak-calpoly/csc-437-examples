import{i as p,x as d,r as m,h as b,a as f,b as l,n as u}from"./state-DerlYqys.js";var v=Object.defineProperty,i=(h,s,t,o)=>{for(var e=void 0,r=h.length-1,c;r>=0;r--)(c=h[r])&&(e=c(s,t,e)||e);return e&&v(s,t,e),e};const n=class n extends p{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return d`
      <form
        @change=${s=>this.handleChange(s)}
        @submit=${s=>this.handleSubmit(s)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            <slot name="button-label">Login</slot>
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(s){const t=s.target,o=t==null?void 0:t.name,e=t==null?void 0:t.value,r=this.formData;switch(o){case"username":this.formData={...r,username:e};break;case"password":this.formData={...r,password:e};break}}handleSubmit(s){s.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:o}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[m.styles,b.styles,f`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let a=n;i([l()],a.prototype,"formData");i([u()],a.prototype,"api");i([u()],a.prototype,"redirect");i([l()],a.prototype,"error");export{a as L};
