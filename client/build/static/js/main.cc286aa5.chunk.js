(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{45:function(e,t,a){e.exports=a(86)},77:function(e,t,a){},78:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){},82:function(e,t,a){},83:function(e,t,a){},84:function(e,t,a){},85:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(18),o=a.n(l),s=a(42),i=a(14),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INCREMENT":return e+1;case"DECREMENT":return e-1;default:return e}},u=Object(i.b)({reducer:r}),m=Object(i.c)(u),d=a(13),f=a.n(d),p=a(36),g=a(37),v=a(43),E=a(38),h=a(44),b=a(39),N=a.n(b),y=a(6),O=a(20);a(74).config();var k=Object(n.createContext)(),S=function(){return Object(n.useContext)(k)},j=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,c=new Array(n),l=0;l<n;l++)c[l]=arguments[l];return(a=Object(v.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(c)))).state={auth0Client:null,isLoading:!0,isAuthenticated:!1,user:null,dbUser:null,statusUrl:""},a.config={domain:"jlb1999.auth0.com",client_id:"piWchDvXGOycCbEuR95WgYqkX0BvC6cQ",redirect_uri:window.location.origin},a.addUser=function(e,t,n,c){e.given_name?y.get("".concat(a.state.statusUrl,"/api/newuser/").concat(t,"/").concat(e.email,"/").concat(e.given_name,"/").concat(e.family_name,"/").concat(e.nickname,"/","null","/","null","/").concat(n,"/").concat(c),{timeout:200}).then((function(e){return console.log(e.data)})).catch((function(e){return console.log(e)})):e.email&&y.get("".concat(a.state.statusUrl,"/api/newuser/").concat(t,"/").concat(e.email,"/","null","/","null","/").concat(e.nickname,"/","null","/","null","/").concat(n,"/").concat(c),{timeout:200}).then((function(e){return console.log(e.data)})).catch((function(e){return console.log(e)}))},a.findUser=function(e){a.setState({isLoading:!0}),console.log(e),y.get("".concat(a.state.statusUrl,"/api/finduser/").concat(e.email)).then((function(t){if(""===t.data){var n=a.getRandomInt(1e8,1e9),c=O().format("LT"),l=O().format("L"),o=c.replace(/\s/,""),s=l.replace(/\//g,"-");a.addUser(e,n,s,o),a.findUserAgain(),a.setState({isLoading:!1})}else console.log("User already exists!"),console.log(t.data),a.setState({dbUser:t.data,isLoading:!1})})).catch((function(e){return console.log(e.toJSON())}))},a.findUserAgain=function(){var e=a.state.user;e?y.get("".concat(a.state.statusUrl,"/api/finduser/").concat(e.email)).then((function(e){return a.setState({dbUser:e.data,isLoading:!1})})).catch((function(e){return console.log(e)})):(console.log("no user, cant do it"),a.setState({isLoading:!1}))},a.initializeAuth0=function(){var e,t,n;return f.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,f.a.awrap(N()(a.config));case 2:if(e=c.sent,a.setState({auth0Client:e}),!window.location.search.includes("code=")){c.next=6;break}return c.abrupt("return",a.handleRedirectCallback());case 6:return c.next=9,f.a.awrap(e.isAuthenticated());case 9:if(!(t=c.sent)){c.next=16;break}return c.next=13,f.a.awrap(e.getUser());case 13:c.t0=c.sent,c.next=17;break;case 16:c.t0=null;case 17:n=c.t0,a.setState({isAuthenticated:t,user:n}),a.findUserAgain();case 20:case"end":return c.stop()}}))},a.handleRedirectCallback=function(){var e;return f.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return a.setState({isLoading:!0}),t.next=3,f.a.awrap(a.state.auth0Client.handleRedirectCallback());case 3:return t.next=5,f.a.awrap(a.state.auth0Client.getUser());case 5:e=t.sent,a.setState({user:e,isAuthenticated:!0,isLoading:!1}),a.findUser(e),window.history.replaceState({},document.title,window.location.pathname);case 9:case"end":return t.stop()}}))},a}return Object(h.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){console.log(this.config),this.setState({statusUrl:"https://bug-tracker-jb.herokuapp.com/"}),this.initializeAuth0()}},{key:"getRandomInt",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}},{key:"render",value:function(){var e=this.state,t=e.auth0Client,a=e.isLoading,n=e.isAuthenticated,l=e.user,o=e.dbUser,s=e.statusUrl,i=this.props.children,r={isLoading:a,isAuthenticated:n,user:l,dbUser:o,statusUrl:s,loginWithRedirect:function(){return t.loginWithRedirect.apply(t,arguments)},getTokenSilently:function(){return t.getTokenSilently.apply(t,arguments)},getIdTokenClaims:function(){return t.getIdTokenClaims.apply(t,arguments)},logout:function(){return t.logout.apply(t,arguments)}};return c.a.createElement(k.Provider,{value:r},i)}}]),t}(n.Component),C=(Object(n.createContext)(),a(77),a(2)),L=(a(78),function(){var e=S(),t=e.isLoading,a=e.loginWithRedirect,n=e.logout,l=e.user;return c.a.createElement("nav",{className:"navMother"},c.a.createElement("div",{className:"navMain"},c.a.createElement("section",{className:"leftNav"},c.a.createElement("div",{className:"logoDiv"},c.a.createElement(C.b,{to:"/",className:"logo"},"Bug Tracker"))),c.a.createElement("section",{className:"rightNav"},c.a.createElement("div",{className:"loginLogoutSect"},!t&&!l&&c.a.createElement("div",{className:"loggedOutSect"},c.a.createElement("button",{className:"navLogIn",onClick:a},"Log In")),!t&&l&&c.a.createElement("div",{className:"loggedInSect"},c.a.createElement("button",{className:"navLogOut",onClick:n}," Log Out"),c.a.createElement(C.b,{to:"/profile"},c.a.createElement("img",{className:"navPicture",src:l.picture,alt:l.given_name?l.given_name:l.nickname+"'s picture"})))))))}),w=a(41),_=a(12),U=(a(80),a(6)),x=a.n(U),M=function(){var e=S(),t=e.isLoading,a=e.user,n=e.dbUser;return c.a.createElement("div",{className:"home1Mother"},c.a.createElement("div",{className:"home1Main"},!t&&!a&&c.a.createElement("h1",null,"Welcome to Bug Tracker!"),!t&&n&&c.a.createElement("div",null,c.a.createElement("h1",null,"Welcome to Bug Tracker, ","null"!=n.given_name?n.given_name:n.nickname,"!"),c.a.createElement(C.b,{to:"/post"},c.a.createElement("button",{className:"issuePromptBtn"},c.a.createElement("h3",{className:"issuePromptHead"},"Post an issue?"))))))},T=function(){return c.a.createElement("div",{className:"Home"},c.a.createElement("div",{className:"homeMain"},c.a.createElement(M,null)))},I=a(21),P=a(4),A=(a(81),function(){var e=S(),t=e.isLoading,a=e.user,l=e.dbUser,o=e.statusUrl,s=Object(n.useState)(""),i=Object(P.a)(s,2),r=i[0],u=i[1],m=Object(n.useState)(""),d=Object(P.a)(m,2),f=d[0],p=d[1],g=Object(n.useState)(""),v=Object(P.a)(g,2),E=v[0],h=v[1],b=Object(n.useState)(""),N=Object(P.a)(b,2),y=N[0],O=N[1],k=Object(n.useState)([]),j=Object(P.a)(k,2),L=j[0],w=j[1],_=Object(n.useState)([]),U=Object(P.a)(_,2);U[0],U[1];if(Object(n.useEffect)((function(){x.a.get("".concat(o,"/api/issues/").concat(l.uid)).then((function(e){return w((function(){return Object(I.a)(e.data).reverse()}))})).catch((function(e){return console.log(e)}))}),[]),t)return c.a.createElement("div",null,"Loading...");var M=function(){x.a.get("".concat(o,"/api/addname/").concat(r,"/").concat(f,"/").concat(a.email),{timeout:200}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))},T=function(){x.a.get("".concat(o,"/api/addcomprole/").concat(E,"/").concat(y,"/").concat(a.email),{timeout:200}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))};return c.a.createElement("div",{className:"profile1Mother"},c.a.createElement("div",{className:"profile1Main"},c.a.createElement("section",{className:"bioSection"},c.a.createElement("img",{className:"profilePic",src:a.picture,alt:l.nickname}),c.a.createElement("div",{className:"bioInfo"},c.a.createElement("h1",{className:"profileName"},"null"!==l.given_name?l.given_name:l.nickname,"'s Profile"),"null"!==l.company&&"null"!==l.role&&c.a.createElement("h1",{className:"profileRoleComp"},l.role," at ",l.company)),"null"===l.given_name&&"null"===l.family_name&&c.a.createElement("form",{onSubmit:function(e){console.log("Submitting name: ".concat(r," ").concat(f)),M()},value:"Submit"},c.a.createElement("input",{className:"profileInput",placeholder:"first name",type:"text",value:r,name:"firstname",onChange:function(e){return u(e.target.value)}}),c.a.createElement("input",{className:"profileInput",placeholder:"last name",type:"text",value:f,name:"lastname",onChange:function(e){return p(e.target.value)}}),c.a.createElement("input",{className:"profileSubmit",placeholder:"submit",type:"submit"}))," ","null"===l.company&&"null"===l.role&&c.a.createElement("form",{onSubmit:function(e){console.log("Submitting company and role: ".concat(y," at ").concat(E)),T()},value:"submit"},c.a.createElement("input",{className:"profileInput",type:"text",placeholder:"Company",value:E,name:"company",onChange:function(e){return h(e.target.value)}}),c.a.createElement("input",{className:"profileInput",type:"text",placeholder:"Role",value:y,name:"role",onChange:function(e){return O(e.target.value)}}),c.a.createElement("input",{className:"profileSubmit",type:"submit",placeholder:"submit"}))),c.a.createElement("div",{className:"issuesWrapper"},c.a.createElement("div",{className:"issuesDiv"},L.length<=5?L.map((function(e){return c.a.createElement("div",{key:e.uid,className:"issuePost"},c.a.createElement(C.b,{to:"/issues/".concat(e.uid)},c.a.createElement("h2",{className:"issueTitle"},e.issue_title)),c.a.createElement("p",{className:"issuePara"},"".concat(e.date_created," | ").concat(e.time_created)))})):c.a.createElement("div",null,L.slice(0,5).map((function(e){return c.a.createElement("div",{key:e.uid,className:"issuePost"},c.a.createElement(C.b,{to:"/issues/".concat(e.uid)},c.a.createElement("h2",{className:"issueTitle"},e.issue_title)),c.a.createElement("p",{className:"issuePara"},"".concat(e.date_created," | ").concat(e.time_created)))})),c.a.createElement(C.b,{to:"/all/".concat(l.uid,"/")},c.a.createElement("button",{className:"issueViewBtn"},"View All")))))))}),R=function(){return c.a.createElement("div",null,c.a.createElement(A,null))},D=(a(82),function(){var e=Object(n.useState)({}),t=Object(P.a)(e,2),a=t[0],l=t[1],o=S().statusUrl;Object(n.useEffect)((function(){var e=window.location.pathname.replace("/issues/","");x.a.get("".concat(o,"/api/getissue/").concat(e)).then((function(e){return l(e.data)})).catch((function(e){return console.log(e)}))}),[]);var s=function(e){var t=document.getElementById("overlay");null!=e&&(e.classList.add("active"),t.classList.add("active"))},i=function(e,t){var a=document.getElementById("overlay");"modalClose"===e.target.id?(e.target.closest(".deleteModal").classList.remove("active"),a.classList.remove("active")):(t.classList.remove("active"),a.classList.remove("active"))};return c.a.createElement("div",{className:"singleMother"},c.a.createElement("div",{className:"singleMain"},c.a.createElement("section",{className:"titleTextDiv"},c.a.createElement("h1",{className:"singleTitle"},a.issue_title),c.a.createElement("p",{className:"singleText"},a.issue_text)),c.a.createElement("hr",null),c.a.createElement("section",{className:"descCont"},c.a.createElement("div",{className:"deleteDiv"},c.a.createElement("button",{"data-modal-target":"#deleteModal",className:"deleteBtn",onClick:function(e){var t=e.target,a=document.querySelector(t.dataset.modalTarget);s(a)}},"Delete")),c.a.createElement("div",{className:"descDiv"},c.a.createElement("p",{className:"singleNickname"},a.nickname),c.a.createElement("div",{className:"dateTime"},c.a.createElement("p",{className:"singleTime"},a.time_created),c.a.createElement("p",{className:"singleDate"},a.date_created))))),c.a.createElement("div",{id:"deleteModal",className:"deleteModal"},c.a.createElement("div",{className:"modalHead"},c.a.createElement("h4",{className:"modalTitle"},"Notice!"),c.a.createElement("button",{onClick:i,id:"modalClose",className:"modalClose"},"\xd7")),c.a.createElement("div",{className:"modalPara"},'If you would like to delete this post, please press the "Delete" button. If not, click the "X".'),c.a.createElement(C.b,{to:"/profile"},c.a.createElement("button",{onClick:function(e){x.a.get("".concat(o,"/api/deleteissue/").concat(a.uid),{timeout:300}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))},className:"deleteBtn"},"Delete"))),c.a.createElement("div",{onClick:function(e){var t=document.querySelector(".deleteModal.active");i(e,t)},className:"",id:"overlay"}))}),B=function(){return c.a.createElement(D,null)},W=(a(83),a(20)),H=a.n(W),q=function(){var e=Object(n.useState)(""),t=Object(P.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(""),s=Object(P.a)(o,2),i=s[0],r=s[1],u=S(),m=u.dbUser,d=u.statusUrl,f=Object(n.useState)(""),p=Object(P.a)(f,2),g=(p[0],p[1]),v=Object(n.useState)(!0),E=Object(P.a)(v,2);E[0],E[1];Object(n.useEffect)((function(){console.log(d)}));return c.a.createElement("div",{className:"issuePost1Mother"},c.a.createElement("div",{className:"issuePost1Main"},c.a.createElement("h1",{className:"issueHead"},"Post an issue?"),c.a.createElement("form",{id:"issueForm",className:"issueForm",onSubmit:function(e){var t,n,c=(t=1e7,n=1e8,t=Math.ceil(t),n=Math.floor(n),Math.floor(Math.random()*(n-t)+n));!function(e){var t=e.toString(),n=m.uid.toString(),c=H()().format("LT"),l=H()().format("L"),o=c.replace(/\s/,""),s=l.replace(/\//g,"-");x.a.post("".concat(d,"/api/issue/post"),{uid:t,user_uid:n,nickname:m.nickname,issue_title:a,issue:i,date_created:s,time_created:o},{timeout:300}).then((function(e){return console.log(e.data)})).catch((function(e){return console.log(e)}))}(c),g(c),e.preventDefault()}},c.a.createElement("input",{className:"issueTitleInput",placeholder:"Title your issue...",type:"text",value:a,onChange:function(e){return l(e.target.value)}}),c.a.createElement("textarea",{className:"issueTextInput",value:i,type:"text",placeholder:"Explain your issue...",onChange:function(e){return r(e.target.value)}}),c.a.createElement("input",{className:"issueSubmit",type:"submit"}))))},J=function(){return c.a.createElement("div",null,c.a.createElement(q,null))},X=(a(84),function(){var e=S(),t=e.isLoading,a=e.user,l=e.dbUser,o=e.statusUrl,s=Object(n.useState)([]),i=Object(P.a)(s,2),r=i[0],u=i[1];return Object(n.useEffect)((function(){x.a.get("".concat(o,"/api/issues/").concat(l.uid)).then((function(e){return u(Object(I.a)(e.data))})).catch((function(e){return console.log(e)}))}),[]),t?c.a.createElement("div",null,"Loading..."):c.a.createElement("div",null,c.a.createElement("section",{className:"bioSection"},c.a.createElement("img",{className:"profilePic",src:a.picture,alt:l.nickname}),c.a.createElement("div",{className:"bioInfo"},c.a.createElement("h1",{className:"profileName"},"null"!==l.given_name?l.given_name:l.nickname,"'s Profile"),"null"!==l.company&&"null"!==l.role&&c.a.createElement("h1",{className:"profileRoleComp"},l.role," at ",l.company))),c.a.createElement("section",{className:"issuesSection"},r.reverse().map((function(e){return c.a.createElement("div",{key:e.uid,className:"issuePost"},console.log("not slicing"),c.a.createElement(C.b,{to:"/issues/".concat(e.uid)},c.a.createElement("h2",{className:"issueTitle"},e.issue_title)),c.a.createElement("p",{className:"issuePara"},"".concat(e.date_created," | ").concat(e.time_created)))}))))}),z=function(){return c.a.createElement("div",null,c.a.createElement(X,null))},F=function(e){var t=e.component,a=Object(w.a)(e,["component"]),n=S().user;return c.a.createElement(_.b,Object.assign({},a,{render:function(e){return n?c.a.createElement(t,e):c.a.createElement(_.a,{to:{pathname:"/"}})}}))},V=function(){return c.a.createElement(_.d,null,c.a.createElement(_.b,{exact:!0,path:"/",component:T}),c.a.createElement(_.b,{path:"/post",component:J}),c.a.createElement(_.b,{path:"/issues/:issueuid",component:B}),c.a.createElement(_.b,{path:"/all/:useruid",component:z}),c.a.createElement(F,{path:"/profile",component:R}))},G=(a(85),function(){var e=S(),t=e.isLoading;e.user;return t?c.a.createElement("div",null,"Loading..."):c.a.createElement(C.a,null,c.a.createElement("div",{className:"App"},c.a.createElement(L,null),c.a.createElement(V,null)))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(j,null,c.a.createElement(s.a,{store:m},c.a.createElement(G,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[45,1,2]]]);
//# sourceMappingURL=main.cc286aa5.chunk.js.map