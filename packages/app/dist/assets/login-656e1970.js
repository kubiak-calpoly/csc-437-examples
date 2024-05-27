import{d as s,r as o,s as a,x as u,e as l,b as c}from"./lit-element-c6a7c398.js";s({"restful-form":o.FormElement});class i extends a{render(){return u`
      <restful-form new src="/auth/login">
        <slot></slot>
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",e=>{const t=e.detail,{token:n}=t.created,r=this.next||"/";console.log("Login successful",t,r),l.relay(e,"auth:message",["auth/signin",{token:n,redirect:r}])})}}s({"mu-auth":c.Provider,"login-form":i});
