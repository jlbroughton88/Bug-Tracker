(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{43:function(e,t,n){e.exports=n(77)},71:function(e,t,n){},72:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(15),r=n.n(o),i=n(40),l=n(12),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INCREMENT":return e+1;case"DECREMENT":return e-1;default:return e}},u=Object(l.b)({reducer:s}),m=Object(l.c)(u),d=n(11),g=n.n(d),h=n(34),f=n(35),p=n(41),v=n(36),E=n(42),b=n(37),N=n.n(b),k=n(17),w=Object(a.createContext)(),y=function(){return Object(a.useContext)(w)},S=function(e){function t(){var e,n;Object(h.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(c)))).state={auth0Client:null,isLoading:!0,isAuthenticated:!1,user:null,dbUser:null},n.config={domain:"jlb1999.auth0.com",client_id:"piWchDvXGOycCbEuR95WgYqkX0BvC6cQ",redirect_uri:window.location.origin},n.addUser=function(e,t){e.given_name?k.get("http://localhost:5002/api/newuser/".concat(t,"/").concat(e.email,"/").concat(e.given_name,"/").concat(e.family_name,"/").concat(e.nickname),{timeout:200}).then((function(e){return console.log(e.data)})).catch((function(e){return console.log(e)})):e.email&&k.get("http://localhost:5002/api/newuser/".concat(t,"/").concat(e.email,"/","null","/","null","/").concat(e.nickname),{timeout:200}).then((function(e){return console.log(e.data)})).catch((function(e){return console.log(e)}))},n.findUser=function(e){n.setState({isLoading:!0}),console.log(e),k.get("http://localhost:5002/api/finduser/".concat(e.email)).then((function(t){if(""===t.data){var a=n.getRandomInt(1e8,1e9);n.addUser(e,a),console.log("added user"),n.findUserAgain(),n.setState({isLoading:!1})}else console.log("User already exists!"),console.log(t.data),n.setState({dbUser:t.data,isLoading:!1})})).catch((function(e){console.log(e.toJSON())}))},n.findUserAgain=function(){var e=n.state.user;e?k.get("http://localhost:5002/api/finduser/".concat(e.email)).then((function(e){return n.setState({dbUser:e.data,isLoading:!1})})).catch((function(e){return console.log(e)})):(console.log("no user, cant do it"),n.setState({isLoading:!1}))},n.initializeAuth0=function(){var e,t,a;return g.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,g.a.awrap(N()(n.config));case 2:if(e=c.sent,n.setState({auth0Client:e}),!window.location.search.includes("code=")){c.next=6;break}return c.abrupt("return",n.handleRedirectCallback());case 6:return c.next=9,g.a.awrap(e.isAuthenticated());case 9:if(!(t=c.sent)){c.next=16;break}return c.next=13,g.a.awrap(e.getUser());case 13:c.t0=c.sent,c.next=17;break;case 16:c.t0=null;case 17:a=c.t0,n.setState({isAuthenticated:t,user:a}),n.findUserAgain();case 20:case"end":return c.stop()}}))},n.handleRedirectCallback=function(){var e;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return n.setState({isLoading:!0}),t.next=3,g.a.awrap(n.state.auth0Client.handleRedirectCallback());case 3:return t.next=5,g.a.awrap(n.state.auth0Client.getUser());case 5:e=t.sent,n.setState({user:e,isAuthenticated:!0,isLoading:!1}),n.findUser(e),window.history.replaceState({},document.title,window.location.pathname);case 9:case"end":return t.stop()}}))},n}return Object(E.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.initializeAuth0()}},{key:"getRandomInt",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}},{key:"render",value:function(){var e=this.state,t=e.auth0Client,n=e.isLoading,a=e.isAuthenticated,o=e.user,r=e.dbUser,i=this.props.children,l={isLoading:n,isAuthenticated:a,user:o,dbUser:r,loginWithRedirect:function(){return t.loginWithRedirect.apply(t,arguments)},getTokenSilently:function(){return t.getTokenSilently.apply(t,arguments)},getIdTokenClaims:function(){return t.getIdTokenClaims.apply(t,arguments)},logout:function(){return t.logout.apply(t,arguments)}};return c.a.createElement(w.Provider,{value:l},i)}}]),t}(a.Component),C=(n(71),n(8)),L=(n(72),function(){var e=y(),t=e.isLoading,n=e.loginWithRedirect,a=e.logout,o=e.user;return c.a.createElement("nav",{className:"navMother"},c.a.createElement("div",{className:"navMain"},c.a.createElement("section",{className:"leftNav"},c.a.createElement("div",{className:"logoDiv"},c.a.createElement(C.b,{to:"/",className:"logo"},"Bug Tracker"))),c.a.createElement("section",{className:"rightNav"},c.a.createElement("div",{className:"loginLogoutSect"},!t&&!o&&c.a.createElement("div",{className:"loggedOutSect"},c.a.createElement("button",{className:"navLogIn",onClick:n},"Log In")),!t&&o&&c.a.createElement("div",{className:"loggedInSect"},c.a.createElement("button",{className:"navLogOut",onClick:a}," Log Out"),c.a.createElement(C.b,{to:"/profile"},c.a.createElement("img",{className:"navPicture",src:o.picture,alt:o.given_name?o.given_name:o.nickname+"'s picture"})))))))}),O=n(39),x=n(10),U=(n(74),n(17)),j=n.n(U),M=function(){var e=y(),t=e.isLoading,n=e.user,a=e.dbUser;return c.a.createElement("div",{className:"home1Mother"},c.a.createElement("div",{className:"home1Main"},!t&&!n&&c.a.createElement("h1",null,"Welcome to Bug Tracker!"),!t&&a&&c.a.createElement("div",null,c.a.createElement("div",null,a.email),c.a.createElement("h1",null,"Welcome to Bug Tracker, ","null"!=a.given_name?a.given_name:a.nickname,"!"),c.a.createElement(C.b,{to:"profile"},"Profile"))))},A=function(){return c.a.createElement("div",{className:"Home"},c.a.createElement("div",{className:"homeMain"},c.a.createElement(M,null)))},_=n(22),I=(n(75),function(){var e=y(),t=e.isLoading,n=e.user,o=e.dbUser,r=Object(a.useState)(""),i=Object(_.a)(r,2),l=i[0],s=i[1],u=Object(a.useState)(""),m=Object(_.a)(u,2),d=m[0],g=m[1];if(t)return c.a.createElement("div",null,"Loading...");var h=function(){j.a.get("http://localhost:5002/api/addname/".concat(l,"/").concat(d,"/").concat(n.email),{timeout:200}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})),console.log("Name changed to: ".concat(l," ").concat(d))};return c.a.createElement("div",{className:"profile1Mother"},c.a.createElement("div",{className:"profile1Main"},c.a.createElement("h1",null,"null"!==o.given_name?o.given_name:o.nickname,"'s Profile"),"null"===o.given_name&&"null"===o.family_name&&c.a.createElement("form",{onSubmit:function(e){console.log("Submitting name: ".concat(l," ").concat(d)),h()},value:"Submit"},c.a.createElement("input",{className:"nameInputs",placeholder:"first name",type:"text",value:l,name:"firstname",onChange:function(e){return s(e.target.value)}}),c.a.createElement("input",{className:"nameInputs",placeholder:"last name",type:"text",value:d,name:"lastname",onChange:function(e){return g(e.target.value)}}),c.a.createElement("input",{className:"nameSubmit",placeholder:"submit",type:"submit"}))))}),R=function(){return c.a.createElement("div",null,c.a.createElement(I,null))},T=function(e){var t=e.component,n=Object(O.a)(e,["component"]),a=y().user;return c.a.createElement(x.b,Object.assign({},n,{render:function(e){return a?c.a.createElement(t,e):c.a.createElement(x.a,{to:{pathname:"/"}})}}))},W=function(){return c.a.createElement(x.d,null,c.a.createElement(x.b,{exact:!0,path:"/",component:A}),c.a.createElement(T,{path:"/profile",component:R}))},B=(n(76),function(){var e=y(),t=e.isLoading;e.user;return t?c.a.createElement("div",null,"Loading..."):c.a.createElement(C.a,null,c.a.createElement("div",{className:"App"},c.a.createElement(L,null),c.a.createElement(W,null)))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(S,null,c.a.createElement(i.a,{store:m},c.a.createElement(B,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[43,1,2]]]);
//# sourceMappingURL=main.9f22e864.chunk.js.map