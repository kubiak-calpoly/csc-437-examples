import{i as l,x as m,r as p,h as f,a as b,b as u,n as d,d as v,c as g}from"./state-DerlYqys.js";var y=Object.defineProperty,i=(h,s,t,o)=>{for(var e=void 0,a=h.length-1,c;a>=0;a--)(c=h[a])&&(e=c(s,t,e)||e);return e&&y(s,t,e),e};const n=class n extends l{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return m`
      <form
        @change=${s=>this.handleChange(s)}
        @submit=${s=>this.handleSubmit(s)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(s){const t=s.target,o=t==null?void 0:t.name,e=t==null?void 0:t.value,a=this.formData;switch(o){case"username":this.formData={...a,username:e};break;case"password":this.formData={...a,password:e};break}}handleSubmit(s){s.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:o}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[p.styles,f.styles,b`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let r=n;i([u()],r.prototype,"formData");i([d()],r.prototype,"api");i([d()],r.prototype,"redirect");i([u()],r.prototype,"error");v({"mu-auth":g.Provider,"login-form":r});
