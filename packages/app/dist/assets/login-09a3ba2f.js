import{d as l,r as c,i as m,s as u,x as f,e as d,b as h}from"./lit-element-19d16ef1.js";import{n as g}from"./property-4e000f11.js";var p=Object.defineProperty,_=Object.getOwnPropertyDescriptor,v=(o,e,s,t)=>{for(var r=t>1?void 0:t?_(e,s):e,n=o.length-1,a;n>=0;n--)(a=o[n])&&(r=(t?a(e,s,r):a(r))||r);return t&&r&&p(e,s,r),r};l({"restful-form":c.FormElement});class i extends u{constructor(){super(...arguments),this.message=""}render(){return f`
      <restful-form
        new
        .init=${{username:"",password:""}}
        src="/auth/login"
        @mu-rest-form:created=${this._handleSuccess}
        @mu-rest-form:error=${this._handleError}>
        <slot></slot>
      </restful-form>
      <p class="error">
        ${this.message?"Invalid Username or Password":""}
      </p>
      <pre>${this.message}</pre>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}_handleSuccess(e){const s=e.detail,{token:t}=s.created,r=this.next||"/";console.log("Login successful",s,r),d.relay(e,"auth:message",["auth/signin",{token:t,redirect:r}])}_handleError(e){const{error:s}=e.detail;console.log("Login failed",e.detail),this.message=s.toString()}}i.styles=m`
    .error {
      color: firebrick;
    }
  `;v([g()],i.prototype,"message",2);l({"mu-auth":h.Provider,"login-form":i});
