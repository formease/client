"use strict";(()=>{var e=document.getElementById("theme-toggler"),m=document.documentElement.dataset.theme,a=localStorage.getItem("theme"),n=window.matchMedia("(prefers-color-scheme: dark)"),t={dark:`<span class="material-icons-outlined material-icons">
    dark_mode
    </span>`,light:`<span class="material-icons-outlined material-icons">
    light_mode
    </span>`};a?(document.documentElement.dataset.theme=a,e.innerHTML=t[a]):n.matches?(document.documentElement.dataset.theme="dark",e.innerHTML=t.dark,localStorage.setItem("theme","dark")):localStorage.setItem("theme","light");e.addEventListener("click",()=>{m=document.documentElement.dataset.theme,m==="dark"?(document.documentElement.dataset.theme="light",e.innerHTML=t.light,localStorage.setItem("theme","light")):(document.documentElement.dataset.theme="dark",e.innerHTML=t.dark,localStorage.setItem("theme","dark"))});document.querySelector("[data-sidebar-toggler]").addEventListener("click",()=>{document.querySelector("aside").classList.toggle("active")});})();
//# sourceMappingURL=dashboard.js.map
