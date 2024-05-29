import{d as s,r as o,s as a,x as u,e as c,b as i}from"./lit-element-f3126ddb.js";s({"restful-form":o.FormElement});class l extends a{render(){return u`
      <restful-form new src="/auth/register">
        <slot></slot>
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",e=>{const t=e.detail,{token:n}=t.created,r=this.next||"/";console.log("Signup successful",t,r),c.relay(e,"auth:message",["auth/signin",{token:n,redirect:r}])})}}s({"mu-auth":i.Provider,"signup-form":l});
