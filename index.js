import{a as p,S as m,i}from"./assets/vendor-frHSA4Lh.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",g="50399235-368a9bb0a02fac6949df8b962";async function h(n){const r={key:g,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await p.get(y,{params:r})).data}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),L=new m(".gallery a",{captionsData:"alt",captionDelay:250});function b(n){const r=n.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:s,comments:f,downloads:d})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${o}" alt="${e}" />
        </a>
        <div class="info">
          <p>👍 ${t}</p>
          <p>👁️ ${s}</p>
          <p>💬 ${f}</p>
          <p>⬇️ ${d}</p>
        </div>
      </li>
    `).join("");c.insertAdjacentHTML("beforeend",r),L.refresh()}function S(){c.innerHTML=""}function q(){l.classList.remove("hidden")}function v(){l.classList.add("hidden")}const u=document.querySelector(".form"),w=u.querySelector('input[name="search-text"]');u.addEventListener("submit",async n=>{n.preventDefault();const r=w.value.trim();if(!r){i.warning({title:"Warning",message:"Please enter a search term!"});return}S(),q();try{const o=await h(r),{hits:a}=o;a.length===0?i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):b(a)}catch{i.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{v()}});
//# sourceMappingURL=index.js.map
