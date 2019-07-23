!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./public/rsc/js",n(n.s=8)}([function(e,t){e.exports={initElementsPrototypes(){Element.prototype.on=function(e,t){e.split(" ").forEach(e=>{this.addEventListener(e,t)})},HTMLFormElement.prototype.clear=function(e){[...this].forEach(e=>{e.value=""})},HTMLFormElement.prototype.validateFields=function(e){let t=!1;return[...this].forEach(e=>{if("button"!==e.type){let n=document.querySelector(`#${e.id}`).parentNode;""===e.value.trim()?(n.classList.add("input-error"),t=!0):n.classList.contains("input-error")&&n.classList.remove("input-error"),"email"===e.type&&(e.value.includes("@")&&e.value.includes(".")||(n.classList.add("input-email-error"),n.classList.add("input-error"),t=!0)),"create-confirm-pass"===e.id&&this.elements["create-pass"].value!==e.value&&(n.classList.add("input-error"),n.classList.add("input-error"),t=!0),"select-one"===e.type&&"0"===e.value&&(n.classList.add("input-error"),n.classList.add("input-error"),t=!0)}}),!t}}}},function(e,t){e.exports={saveAccount:e=>new Promise((t,n)=>{fetch("/signup",{method:"POST",body:e}).then(e=>{200!==e.status&&(console.clear(),n({error:"Ocorreu um erro ao processar esta requisição."})),t(e)})}),login:e=>new Promise((t,n)=>{fetch("/signin",{method:"POST",body:e}).then(e=>e.json()).then(e=>{e.error&&n(e),t()})}),getData:()=>new Promise((e,t)=>{fetch("/api/user-logged").then(e=>e.json()).then(t=>{e(t)})}),getUserName(e){let t=e.full_name.split(" ");return t.length>1?displayName=`${t[0]} ${t[t.length-1]}`:displayName=t[0]},getTicketList:(e=null)=>new Promise((t,n)=>{fetch(`/api/tickets/list?status=${e}`).then(e=>e.json()).then(e=>{e.error&&(console.clear(),n(e)),t(e)})}),loginAdmin:e=>new Promise((t,n)=>{fetch("/admin/signin",{method:"POST",body:e}).then(e=>e.json()).then(e=>{e.error&&n(e),t(e)})}),getUserList:(e=null)=>new Promise((t,n)=>{let o={search:e};fetch("/api/admin/users/list",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(o)}).then(e=>{if(e.ok)return e.json();n()}).then(e=>{t(e)})}),getUserQtd:()=>new Promise((e,t)=>{fetch("/api/admin/users/qtd").then(e=>{if(e.ok)return e.json();t()}).then(t=>{e(t)})})}},function(e,t){e.exports={pop(e,t,n){let o;document.querySelector("#notification-body")?o=document.querySelector("#notification-body"):((o=document.createElement("div")).id="notification-body",document.querySelector("#app").appendChild(o));let s=document.createElement("div");s.classList.add("notification");let i="success"===e?"success":"danger";s.classList.add(i);let a=`\n            <header>\n                <h1>${t}</h1>\n            </header>\n            <section>\n                <span> ${n} </span>\n            </section>\n        `;s.innerHTML=a,o.appendChild(s),setTimeout(()=>{s.classList.add("popup"),setTimeout(()=>{s.classList.remove("popup"),setTimeout(()=>{o.removeChild(s)},500)},1e4)},100)}}},function(e,t){e.exports={get:e=>new Promise((t,n)=>{fetch(`/api/ticket/${e}/details`).then(e=>e.json()).then(e=>{t(Object.values(e)[0])})}),getPriorities:()=>new Promise((e,t)=>{fetch("/api/priorities").then(e=>e.json()).then(n=>{n.error&&t(n),e(n)})}),open:e=>new Promise((t,n)=>{fetch("/ticket/open",{method:"POST",body:e}).then(e=>e.json()).then(e=>{e.error&&n(e),t(e)})}),getStatus:()=>new Promise((e,t)=>{fetch("/api/ticket/status").then(function(n){n.ok?e(n.json()):t(n.json())})}),addMessage:(e,t)=>new Promise((n,o)=>{fetch(`/api/ticket/${e}/add-message`,{method:"POST",body:t}).then(e=>{e.ok&&n(e.json()),o(e.json())})})}},function(e,t){e.exports={dateFormat:e=>` ${e.getDay()>"10"?e.getDay():"0"+e.getDay()}/${e.getMonth()>"10"?e.getMonth():"0"+e.getMonth()}/${e.getFullYear()}`,timeFormat:e=>`${e.getHours()}:${e.getMinutes()}`}},function(e,t){e.exports={getCompanies:(e=null)=>new Promise((t,n)=>{let o={search:e};fetch("/api/admin/companies/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>{if(e.ok)return e.json();n()}).then(e=>{t(e)})}),getQuantity:()=>new Promise((e,t)=>{fetch("/api/admin/companies/quantity").then(e=>{if(e.ok)return e.json();t()}).then(t=>{e(t)})})}},function(e,t){e.exports={getLocals:(e=null)=>new Promise((t,n)=>{let o={search:e};fetch("/api/admin/locals/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>{if(e.ok)return e.json();n()}).then(e=>{t(e)})}),getQuantity:()=>new Promise((e,t)=>{fetch("/api/admin/locals/quantity").then(e=>{if(e.ok)return e.json();t()}).then(t=>{e(t)})})}},function(e,t){e.exports={getSectors:(e=null)=>new Promise((t,n)=>{let o={search:e};fetch("/api/admin/sectors/list",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>{if(e.ok)return e.json();n()}).then(e=>{t(e)})}),getQuantity:()=>new Promise((e,t)=>{fetch("/api/admin/sectors/quantity").then(e=>{if(e.ok)return e.json();t()}).then(t=>{e(t)})})}},function(e,t,n){"use strict";n.r(t);const o=n(2),s=n(0),i=n(1);class a{constructor(){s.initElementsPrototypes(),this.initEvents()}initEvents(){document.querySelector("#btn-create-account").on("click",e=>{e.preventDefault();let t=document.querySelector("#form-create-new-account");if(t.validateFields()){let n=new FormData(t),s=document.createElement("img");s.src="/public/rsc/img/dual-load.gif",s.classList.add("button-load"),e.target.innerHTML="",e.target.appendChild(s),setTimeout(()=>{i.saveAccount(n).then(e=>{o.pop("success","Usuário cadastrado!","Seu usuário foi cadastrado com sucesso."),t.clear()}).catch(e=>{o.pop("danger","Usuário não cadastrado!",e.error)}),e.target.removeChild(s),e.target.innerHTML="Criar nova conta"},1e3)}else o.pop("danger","Dados invalidos","Alguns campos precisam ser preenchidos corretamente.")})}}const r=n(0),c=n(1),l=n(2);class d{constructor(){r.initElementsPrototypes(),this.initEvents()}initEvents(){document.querySelector("#btn-user-login").on("click",e=>{console.log("teste");let t=document.querySelector("#form-user-login");if(t.validateFields()){let n=new FormData(t),o=document.createElement("img");o.src="/public/rsc/img/dual-load.gif",o.classList.add("button-load"),e.target.innerHTML="",e.target.appendChild(o),setTimeout(()=>{c.login(n).then(e=>{window.location.replace("/")}).catch(e=>{console.clear(),l.pop("danger","Dados invalidos",e.error),document.querySelector("#login-pass").value="",document.querySelector("#login-pass").focus(),document.querySelector("#login-pass").parentNode.classList.add("input-error"),document.querySelector("#login-username").parentNode.classList.add("input-error")}),e.target.removeChild(o),e.target.innerHTML="Entrar"},1e3)}else l.pop("danger","Dados invalidos","Alguns campos precisam ser preenchidos corretamente.")})}}let u=n(1),m=n(0);class p{constructor(){m.initElementsPrototypes(),this.initHeader(),this.getUserData()}initHeader(){document.querySelector("#btn-show-user-panel").on("click",e=>{document.querySelector("#btn-show-user-panel").classList.toggle("active"),document.querySelector("#btn-show-user-panel").classList.contains("active")?(document.querySelector("#user-panel").style.display="flex",setTimeout(()=>{document.querySelector("#user-panel").classList.add("active")},100)):(document.querySelector("#user-panel").classList.remove("active"),setTimeout(()=>{document.querySelector("#user-panel").style.display="none"},100))}),document.querySelector("#btn-user-logout").on("click",e=>{window.location.replace("/logout")}),document.querySelector("#btn-open-user-profile").on("click",e=>{u.getData().then(e=>{let t=e.id_user;window.location.replace(` /profile/${t}/edit `)})})}getUserData(){u.getData().then(e=>{let t=u.getUserName(e);document.querySelector("#panel-user-name").innerHTML=t})}}const h=n(0),g=n(1),y=n(3),f=n(4);class v{constructor(){h.initElementsPrototypes(),this.verifyUserNeedUpdates(),this.getUserTickets(),this.getStatusToOrder(),this.initEvents()}initEvents(){document.querySelector(".search-select-box").on("change",e=>{e.target.id.split("-")[1];let t=e.target.value;this.getUserTickets(t)})}initModal(){document.querySelector("#btn-modal-update-register-next-page").on("click",e=>{let t=document.querySelector("#confirm-register-message");t.classList.remove("active"),setTimeout(()=>{document.querySelector("#modal-user-register").classList.add("expand"),t.style.display="none",document.querySelector("#modal-register-confirm").style.display="flex",setTimeout(()=>{document.querySelector("#modal-register-confirm").classList.add("active")},1e3)},500)}),document.querySelector("#btn-send-user-register-updates").on("click",e=>{let t=document.querySelector("#form-user-confirm-register");if(t.validateFields()){let e=new FormData(t);fetch("/user/update",{method:"POST",body:e}).then(e=>{if(e.ok){let e=document.querySelector("#user-complete-register");e.classList.remove("active"),setTimeout(()=>{e.style.display="none"},500)}})}}),document.querySelector("#update-user-company").on("change",e=>{document.querySelector("#update-user-place").disabled=!1,document.querySelector("#update-user-sector").disabled=!1,fetch(`/api/company/${e.target.value}/places`).then(e=>e.json()).then(e=>{[...e].forEach(e=>{let t=document.createElement("option");t.value=e.id_place,t.innerHTML=e.local_name,document.querySelector("#update-user-place").appendChild(t)})}),fetch(`/api/company/${e.target.value}/sectors`).then(e=>e.json()).then(e=>{[...e].forEach(e=>{let t=document.createElement("option");t.value=e.id_sector,t.innerHTML=e.sector_name,document.querySelector("#update-user-sector").appendChild(t)})})})}verifyUserNeedUpdates(){g.getData().then(e=>{if("1"===e.need_updates){let t=document.createElement("div");t.id="user-complete-register";let n='\n                <div id="modal-user-register">\n                    <div id="confirm-register-message" style="display:flex;" class="active">\n                        <header>\n                            <img src="/public/rsc/img/company-logo.png" alt="">\n                            <h1>\n                                Bem vindo, <span id="update-panel-user-name">Daniel munhoz</span>\n                            </h1>\n                        </header>\n                        <section class="register-message">\n                            Como este é seu primeiro login, precisamos que confirme alguns dados para poder dar continuidade na utilização do sistema.\n                        </section>\n                        <footer>    \n                            <button class="btn btn-enviar" id="btn-modal-update-register-next-page">\n                                Avançar <i class="fas fa-chevron-right"></i>\n                            </button>\n                        </footer>\n                    </div>\n            \n                    <div id="modal-register-confirm" style="display:none;" class="">\n                        <header>\n                            <h1>Atualização de cadastro.</h1>\n                        </header>\n                        <div class="form-box">\n                            <form id="form-user-confirm-register">\n                                <input type="hidden" id="update-user-id" name="update-user-id">\n                                <div class="form-group" >\n                                    <label for="update-full-name">Nome:</label>\n                                    <input type="text" id="update-full-name" name="update-full-name" placeholder="Seu nome completo">\n                                </div>\n                \n                                <div class="form-group" >\n                                    <label for="update-username">Usuário</label>\n                                    <input type="text" id="update-username" name="update-username" placeholder="Seu usuário">\n                                </div>\n            \n                                <div class="form-group" >\n                                    <label for="update-email">E-mail:</label>\n                                    <input type="text"  id="update-email" name="update-email" placeholder="Ex: smart@desk.com">\n                                </div>\n            \n                                <div class="row row-2">\n            \n                                    <div class="form-group">\n                                        <label for="update-user-company">Empresa:</label>\n                                        <select name="update-user-company" id="update-user-company">\n                                            <option value="0">--</option>\n                                        </select>\n                                    </div>\n            \n                                    <div class="form-group">\n                                        <label for="update-user-place">Local atuação:</label>\n                                        <select name="update-user-place" id="update-user-place" disabled>\n                                            <option value="0">--</option>\n                                        </select>\n                                    </div>\n            \n                                </div>\n            \n                                <div class="form-group">\n                                    <label for="update-user-sector">Setor:</label>\n                                    <select name="update-user-sector" id="update-user-sector" disabled>\n                                        <option value="0">--</option>                            \n                                    </select>\n                                </div>\n            \n                            </form>\n                        </div>\n                        <footer>\n                            <button class="btn btn-enviar" id="btn-send-user-register-updates">\n                                <i class="fas fa-check"></i> <b>Confirmar</b>\n                            </button>\n                        </footer>\n                    </div>\n                </div>\n                \n                ';setTimeout(()=>{t.style.display="flex",setTimeout(()=>{t.classList.add("active")},100)},1e3),t.innerHTML=n,document.querySelector("#app").appendChild(t),this.initModal(),document.querySelector("#update-full-name").value=e.full_name,document.querySelector("#update-username").value=e.username,document.querySelector("#update-email").value=e.email,document.querySelector("#update-user-id").value=e.id_user,document.querySelector("#update-panel-user-name").innerHTML=g.getUserName(e),fetch("/api/company").then(e=>e.json()).then(e=>{[...e].forEach(e=>{let t=document.createElement("option");t.value=e.id_company,t.innerHTML=e.company_name,document.querySelector("#update-user-company").appendChild(t)})})}})}getUserTickets(e=null){g.getTicketList(e).then(e=>{let t=document.querySelector("#tickets-list tbody");t.innerHTML="",Object.values(e).forEach(e=>{let n=document.createElement("tr");n.dataset.ticket=e.ticket.id_ticket;let o=f.dateFormat(new Date(e.ticket.dt_updates)),s="Atribuido para: ";e.assignments.length>=1?e.assignments.map(e=>{s+=`<i>${e.full_name}</i>`}):s="Ticket sem atribuição.",n.innerHTML=`\n                    <td>\n                        <div class="ticket-row-details">\n                            <div class="img-status">\n                                <img src="public/rsc/img/ticket-open.png" alt="#">\n                            </div>\n                            <div class="tr-body">\n                                <h2>Ticket #${e.ticket.id_ticket}</h2>\n                                <span class="t-title">${e.ticket.ticket_title}</span>\n                                <span class="t-attr">${s}</span>\n                            </div>\n                        </div>\n                    </td>\n                    <td>${e.ticket.priority_name}</td>\n                    <td>${o}</td>\n                `,t.appendChild(n)}),this.initTrEvents()}).catch(e=>{let t=document.querySelector("#tickets-list tbody");t.innerHTML="";let n=document.createElement("tr");n.classList.add("no-tickets");let o=`\n\n                <td colspan="3">... ${e.msg}.</td>\n   \n            `;n.innerHTML=o,t.appendChild(n)})}getStatusToOrder(){y.getStatus().then(e=>{e.map(e=>{let t=document.querySelector("#select-status"),n=document.createElement("option");n.value=e.id_status,n.innerHTML=e.status_name,t.appendChild(n)})})}initTrEvents(){document.querySelectorAll("#tickets-list tbody tr").forEach(e=>{e.on("click",t=>{let n=e.dataset.ticket;window.location.replace(`/ticket/${n}/details`)})})}}const S=n(0),b=n(3),q=n(2);class L{constructor(){S.initElementsPrototypes(),this.initEvents(),this.getPriorities()}initEvents(){document.querySelector("#btn-open-new-ticket").on("click",e=>{e.preventDefault();let t=document.querySelector("#form-open-new-ticket");if(t.validateFields()){let e=new FormData(t);b.open(e).then(e=>{t.clear(),q.pop("success",`Ticket #${e.id_ticket}`,"Ticket aberto, logo um técnico irá entrar em contato.")}).catch(e=>{q.pop("danger","Error",`${e.msg}`)})}})}getPriorities(){b.getPriorities().then(e=>{let t=document.querySelector("#ticket-priority");e.map(e=>{let n=document.createElement("option");n.value=e.id_priority,n.innerHTML=e.priority_name,t.appendChild(n)})}).catch(e=>{})}}const k=n(3),T=n(4),E=n(0),w=n(2);class _{constructor(){E.initElementsPrototypes(),this.loadTicketDetails(),this.initEvents()}initEvents(){document.querySelectorAll(".show-panel").forEach(e=>{e.on("click",t=>{this.switchPanel(e.dataset.target)})}),document.querySelector("#btn-new-message").on("click",e=>{let t=document.querySelector("#form-send-new-message");if(t.validateFields()){let e=new FormData(t),n=document.querySelector("#ticket-id").innerHTML;k.addMessage(n,e).then(e=>{this.loadTicketDetails(),t.clear(),w.pop("success","Sucesso","Sua mensagem foi enviada.")}).catch(e=>{console.log(e)})}})}switchPanel(e){document.querySelectorAll(".panel").forEach(e=>{e.classList.remove("active")}),document.querySelectorAll(".show-panel").forEach(e=>{e.classList.remove("active")}),document.querySelector(`#${e}-panel`).classList.add("active"),document.querySelector(`#show-panel-${e}`).classList.add("active")}loadTicketDetails(){let e=window.location.pathname.split("/")[2];k.get(e).then(e=>{document.querySelector("#ticket-title").value=e.ticket.ticket_title,document.querySelector("#ticket-priority").value=e.ticket.priority_name,document.querySelector("#ticket-update").value=e.ticket.dt_updates.split(" ")[0],document.querySelector("#ticket-desc").value=e.ticket.ticket_details,document.querySelector("#ticket-id").innerHTML=e.ticket.id_ticket,e.assignments.length>=1?[...e.assignments].forEach(e=>{document.querySelector("#ticket-atr").innerHTML=`${e.full_name}, `}):document.querySelector("#ticket-atr").innerHTML="Sem atribuição.";let t=e.ticket,n=document.querySelector("#messages-box");n.innerHTML="",[...e.messages].forEach(e=>{let o=T.dateFormat(new Date(e.dt_send)),s=T.timeFormat(new Date(e.dt_send)),i=document.createElement("div");i.classList.add("message-row"),e.id_user!==t.id_user&&i.classList.add("out"),i.innerHTML=`\n                    <div class="message-body">\n                        <section class="ticket-message">\n                            ${e.message}\n                        </section>\n                        <footer>\n                            ${e.full_name} ás ${s} de ${o}\n                        </footer>\n                    </div>\n                `,n.appendChild(i)})}).catch(e=>{})}}const P=n(0),M=n(1),C=n(2);class H{constructor(){P.initElementsPrototypes(),this.initEvents()}initEvents(){document.querySelector("#btn-signin-admin").on("click",e=>{let t=document.querySelector("#form-signin-admin");if(t.validateFields()){let n=new FormData(t),o=document.createElement("img");o.src="/public/rsc/img/dual-load.gif",o.classList.add("button-load"),e.target.innerHTML="",e.target.appendChild(o),setTimeout(()=>{M.loginAdmin(n).then(e=>{document.querySelector("#app").classList.add("login-fade"),setTimeout(()=>{window.location.replace("/admin")},500)}).catch(e=>{console.clear(),C.pop("danger","Erro no login",e.error),document.querySelector("#passw").value="",document.querySelector("#passw").focus(),document.querySelector("#passw").parentNode.classList.add("input-error"),document.querySelector("#username").parentNode.classList.add("input-error")}),e.target.removeChild(o),e.target.innerHTML="Entrar"},1e3)}})}}const $=n(0),j=n(1),D=n(5),x=n(6),O=n(7);class U{constructor(){$.initElementsPrototypes(),this.initEvents()}initEvents(){document.querySelectorAll(".button-panel").forEach(e=>{e.on("click",t=>{let n=e.dataset.target;switch(this.disablePanels(),document.querySelector(`#${n}-panel`).classList.add("panel-active"),e.classList.add("active"),n){case"users":this.loadUsersList();break;case"companies":this.loadCompaniesList();break;case"locals":this.loadLocalsList();break;case"sectors":this.loadSectorsList()}})})}initUserConfigEvents(){document.querySelector("#search-user").on("keyup",e=>{this.getUsers(e.target.value)})}initCompaniesConfigEvents(){document.querySelector("#search-company").on("keyup",e=>{this.getCompanies(e.target.value)})}initLocalsEvents(){document.querySelector("#search-local").on("keyup",e=>{this.getLocals(e.target.value)})}initSectorsEvents(){document.querySelector("#search-sector").on("keyup",e=>{this.getSectors(e.target.value)})}loadUsersList(){this.getUsers(),j.getUserQtd().then(e=>{document.querySelector("#users-count").innerHTML=e.qtde}),this.initUserConfigEvents()}loadCompaniesList(){this.getCompanies(),D.getQuantity().then(e=>{document.querySelector("#companies-quantity").innerHTML=e.qtde}),this.initCompaniesConfigEvents()}loadLocalsList(){this.getLocals(),x.getQuantity().then(e=>{document.querySelector("#locals-quantity").innerHTML=e.qtde}),this.initLocalsEvents()}loadSectorsList(){this.getSectors(),O.getQuantity().then(e=>{document.querySelector("#sectors-quantity").innerHTML=e.qtde}),this.initSectorsEvents()}disablePanels(){document.querySelectorAll(".config-panel").forEach(e=>{e.classList.remove("panel-active")}),document.querySelectorAll(".button-panel").forEach(e=>{e.classList.remove("active")})}getUsers(e){j.getUserList(e).then(e=>{let t=document.querySelector("#table-user-list tbody");t.innerHTML="",[...e].forEach(e=>{let n=document.createElement("tr");n.dataset.id=e.id_user;let o=`\n                    <td>${e.id_user}</td>\n                    <td>${e.full_name}</td>\n                    <td>${e.username}</td>\n                    <td>\n                        <div class="option-buttons">\n                            <a href="/admin/user/4"> <i class="fas fa-edit"></i> </a>\n                        </div>\n                    </td>\n                `;n.innerHTML=o,t.appendChild(n)})})}getCompanies(e){D.getCompanies(e).then(e=>{let t=document.querySelector("#table-companies-list tbody");t.innerHTML="",[...e].forEach(e=>{let n=document.createElement("tr");n.dataset.id=e.id_company;let o=`\n                <tr>\n                    <td>${e.id_company}</td>\n                    <td>${e.company_name}</td>\n                    <td>\n                        <div class="option-buttons">\n                            <a href="/admin/company/4"> <i class="fas fa-edit"></i> </a>\n                        </div>\n                    </td>\n                </tr>\n                `;n.innerHTML=o,t.appendChild(n)})})}getLocals(e){x.getLocals(e).then(e=>{let t=document.querySelector("#table-list-locals tbody");t.innerHTML="",[...e].forEach(e=>{let n=document.createElement("tr");n.dataset.id=e.id_place;let o=`\n                    <td>${e.id_place}</td>\n                    <td>${e.local_name}</td>\n                    <td>\n                        <div class="option-buttons">\n                            <a href="/admin/place/4"> <i class="fas fa-edit"></i> </a>\n                        </div>\n                    </td>\n                `;n.innerHTML=o,t.appendChild(n)})})}getSectors(e){O.getSectors(e).then(e=>{let t=document.querySelector("#table-list-sectors tbody");t.innerHTML="",[...e].forEach(e=>{let n=document.createElement("tr");n.dataset.id=e.id_place;let o=`\n                    <td>${e.id_sector}</td>\n                    <td>${e.sector_name}</td>\n                    <td>\n                        <div class="option-buttons">\n                            <a href="/admin/sector/4"> <i class="fas fa-edit"></i> </a>\n                        </div>\n                    </td>\n                `;n.innerHTML=o,t.appendChild(n)})})}}window.app=new class{constructor(){if(this._actualPage=document.querySelector("#page")?document.querySelector("#page").dataset.page:null,["Signup","Signin","AdminSignin"].includes(this._actualPage)||new p,this._actualPage)switch(this._actualPage){case"Signup":new a;break;case"Signin":new d;break;case"Home":new v;break;case"NewTicket":new L;break;case"TicketDetails":new _;break;case"AdminSignin":new H;break;case"AdminConfigs":new U}}}}]);