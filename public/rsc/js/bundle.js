!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./public/rsc/js",n(n.s=1)}([function(e,t){e.exports={pop(e,t,n){let r;document.querySelector("#notification-body")?r=document.querySelector("#notification-body"):((r=document.createElement("div")).id="notification-body",document.querySelector("#app").appendChild(r));let o=document.createElement("div");o.classList.add("notification");let i="success"===e?"success":"danger";o.classList.add(i);let s=`\n            <header>\n                <h1>${t}</h1>\n            </header>\n            <section>\n                <span> ${n} </span>\n            </section>\n        `;o.innerHTML=s,r.appendChild(o),setTimeout(()=>{o.classList.add("popup"),setTimeout(()=>{o.classList.remove("popup"),setTimeout(()=>{r.removeChild(o)},500)},1e4)},100)}}},function(e,t,n){"use strict";n.r(t);const r=n(0);class o{constructor(){this.initSignup()}initSignup(){this.elementsPrototype(),this.initEvents()}elementsPrototype(){Element.prototype.on=function(e,t){e.split(" ").forEach(e=>{this.addEventListener(e,t)})},HTMLFormElement.prototype.clear=function(e){[...this].forEach(e=>{e.value=""})}}initEvents(){document.querySelector("#btn-create-account").on("click",e=>{e.preventDefault();let t=document.querySelector("#form-create-new-account"),n=new FormData(t),o=[];if(n.forEach((e,t)=>{let r=document.querySelector(`#${t}`).parentNode;""===e.trim()?(r.classList.add("input-error"),o.push(!0)):r.classList.contains("input-error")&&r.classList.remove("input-error"),"create-email"===t&&(e.includes("@")&&e.includes(".")||(r.classList.add("input-email-error"),r.classList.add("input-error"),o.push(!0))),"create-confirm-pass"===t&&n.get("create-pass")!==e&&(r.classList.add("input-error"),r.classList.add("input-error"),o.push(!0))}),!o.length>0){let o=document.createElement("img");o.src="/public/rsc/img/dual-load.gif",o.classList.add("button-load"),e.target.innerHTML="",e.target.appendChild(o),fetch("/signup",{method:"POST",body:n}).then(n=>{console.clear(),setTimeout(()=>{n.ok?r.pop("success","Usuário cadastrado!","Seu usuário foi cadastrado com sucesso."):r.pop("danger","Usuário não cadastrado!","Não foi possivel criar seu usuário, entre em contato com um administrador."),e.target.removeChild(o),e.target.innerHTML="Criar nova conta",t.clear()},1e3)})}else r.pop("danger","Dados invalidos","Alguns campos precisam ser preenchidos corretamente.")})}}window.app=new class{constructor(){if(this._atualPage=document.querySelector("#page")?document.querySelector("#page").dataset.page:null,this._atualPage)switch(this._atualPage){case"Signup":new o}}}}]);