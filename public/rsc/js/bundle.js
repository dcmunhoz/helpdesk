!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./public/rsc/js",r(r.s=3)}([function(e,t){e.exports={pop(e,t,r){let n;document.querySelector("#notification-body")?n=document.querySelector("#notification-body"):((n=document.createElement("div")).id="notification-body",document.querySelector("#app").appendChild(n));let o=document.createElement("div");o.classList.add("notification");let s="success"===e?"success":"danger";o.classList.add(s);let i=`\n            <header>\n                <h1>${t}</h1>\n            </header>\n            <section>\n                <span> ${r} </span>\n            </section>\n        `;o.innerHTML=i,n.appendChild(o),setTimeout(()=>{o.classList.add("popup"),setTimeout(()=>{o.classList.remove("popup"),setTimeout(()=>{n.removeChild(o)},500)},1e4)},100)}}},function(e,t){e.exports={initElementsPrototypes(){Element.prototype.on=function(e,t){e.split(" ").forEach(e=>{this.addEventListener(e,t)})},HTMLFormElement.prototype.clear=function(e){[...this].forEach(e=>{e.value=""})}}}},function(e,t){e.exports={saveAccount:e=>new Promise((t,r)=>{fetch("/signup",{method:"POST",body:e}).then(e=>{200!==e.status&&(console.clear(),r({error:"Ocorreu um erro ao processar esta requisição."})),t(e)})})}},function(e,t,r){"use strict";r.r(t);const n=r(0),o=r(1),s=r(2);class i{constructor(){this.initSignup()}initSignup(){o.initElementsPrototypes(),this.initEvents()}initEvents(){document.querySelector("#btn-create-account").on("click",e=>{e.preventDefault();let t=document.querySelector("#form-create-new-account"),r=new FormData(t),o=[];if(r.forEach((e,t)=>{let n=document.querySelector(`#${t}`).parentNode;""===e.trim()?(n.classList.add("input-error"),o.push(!0)):n.classList.contains("input-error")&&n.classList.remove("input-error"),"create-email"===t&&(e.includes("@")&&e.includes(".")||(n.classList.add("input-email-error"),n.classList.add("input-error"),o.push(!0))),"create-confirm-pass"===t&&r.get("create-pass")!==e&&(n.classList.add("input-error"),n.classList.add("input-error"),o.push(!0))}),!o.length>0){let o=document.createElement("img");o.src="/public/rsc/img/dual-load.gif",o.classList.add("button-load"),e.target.innerHTML="",e.target.appendChild(o),setTimeout(()=>{s.saveAccount(r).then(e=>{n.pop("success","Usuário cadastrado!","Seu usuário foi cadastrado com sucesso."),t.clear()}).catch(e=>{n.pop("danger","Usuário não cadastrado!",e.error)}),e.target.removeChild(o),e.target.innerHTML="Criar nova conta"},1e3)}else n.pop("danger","Dados invalidos","Alguns campos precisam ser preenchidos corretamente.")})}}window.app=new class{constructor(){if(this._atualPage=document.querySelector("#page")?document.querySelector("#page").dataset.page:null,this._atualPage)switch(this._atualPage){case"Signup":new i}}}}]);