(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{65:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(15),s=n.n(r),o=n(13),i=n(3),u=n(1),l=function(){return Object(u.jsx)("div",{children:"Home"})},j=n(17),p=n(8),d=n(35),h=n(18),b=n(14),O=n.n(b),m=n(21),x=n(22),f=n.n(x),v="LOGIN_SUCCESS",g="LOGIN_FAIL",S="LOAD_USER_SUCCESS",y="LOAD_USER_FAIL",w=Object(h.b)(null,{login:function(e,t){return function(){var n=Object(m.a)(O.a.mark((function n(c){var a,r,s;return O.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a={headers:{"Content-Type":"application/json"}},r=JSON.stringify({email:e,password:t}),n.prev=2,n.next=5,f.a.post("http://localhost:8000/auth/jwt/create/",r,a);case 5:s=n.sent,c({type:v,payload:s.data}),c(function(){var e=Object(m.a)(O.a.mark((function e(t){var n,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=14;break}return n={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,f.a.get("http://localhost:8000/auth/users/me/",n);case 5:c=e.sent,t({type:S,payload:c.data}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),t({type:y});case 12:e.next=15;break;case 14:t({type:y});case 15:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(2),c({type:g});case 13:case"end":return n.stop()}}),n,null,[[2,10]])})));return function(e){return n.apply(this,arguments)}}()}})((function(e){var t=e.login,n=Object(c.useState)({email:"",password:""}),a=Object(d.a)(n,2),r=a[0],s=a[1],i=r.email,l=r.password,h=function(e){return s(Object(p.a)(Object(p.a)({},r),{},Object(j.a)({},e.target.name,e.target.value)))};return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{className:"container mt-5",children:[Object(u.jsx)("h1",{children:"Sign In"}),Object(u.jsx)("p",{children:"Sign into your account"}),Object(u.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),t(i,l)}(e)},children:[Object(u.jsx)("div",{className:"form-group",children:Object(u.jsx)("input",{className:"form-control",type:"email",placeholder:"email",name:"email",value:i,onChange:function(e){return h(e)},required:!0})}),Object(u.jsx)("div",{className:"form-group",children:Object(u.jsx)("input",{className:"form-control",type:"password",placeholder:"password",name:"password",value:l,onChange:function(e){return h(e)},minLength:"6",required:!0})}),Object(u.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Login"})]}),Object(u.jsxs)("p",{children:["Don't have an account? ",Object(u.jsx)(o.b,{to:"/signup",children:"Sign up"})]}),Object(u.jsxs)("p",{children:["Forgot your password ",Object(u.jsx)(o.b,{to:"/rest-password",children:"Reset Password"})]})]})})})),I=function(){return Object(u.jsx)("div",{children:"Signup"})},k=function(){return Object(u.jsx)("div",{children:"Activate"})},A=function(){return Object(u.jsx)("div",{children:"ResetPassword"})},N=function(){return Object(u.jsx)("div",{children:"ResetPasswordConfirm"})},C=function(){return Object(u.jsx)("div",{children:"Navbar"})},L=function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)(C,{}),e.children]})},_=n(11),R=n(33),D=n(34),E={access:localStorage.getItem("access"),refresh:localStorage.getItem("refresh"),isAuthenticated:null,user:null},F=Object(_.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0,n=t.type,c=t.payload;switch(n){case v:return localStorage.setItem("access",c.access),Object(p.a)(Object(p.a)({},e),{},{isAuthenticated:!0,access:c.access,refresh:c.refresh});case S:return Object(p.a)(Object(p.a)({},e),{},{user:c});case y:return Object(p.a)(Object(p.a)({},e),{},{user:null});case g:return localStorage.removeItem("access"),localStorage.removeItem("refresh"),Object(p.a)(Object(p.a)({},e),{},{access:null,refresh:null,isAuthenticated:!1,user:null});default:return e}}}),J=[D.a],T=Object(_.createStore)(F,{},Object(R.composeWithDevTools)(_.applyMiddleware.apply(void 0,J))),U=function(){return Object(u.jsx)(h.a,{store:T,children:Object(u.jsx)(o.a,{children:Object(u.jsx)(L,{children:Object(u.jsxs)(i.c,{children:[Object(u.jsx)(i.a,{exact:!0,path:"/",component:l}),Object(u.jsx)(i.a,{exact:!0,path:"/login",component:w}),Object(u.jsx)(i.a,{exact:!0,path:"/signup",component:I}),Object(u.jsx)(i.a,{exact:!0,path:"/rest_password",component:A}),Object(u.jsx)(i.a,{exact:!0,path:"/password/reset/confirm/:uid/:token",component:N}),Object(u.jsx)(i.a,{exact:!0,path:"/activate/:uid/:token",component:k})]})})})})};s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(U,{})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.0885d4e4.chunk.js.map