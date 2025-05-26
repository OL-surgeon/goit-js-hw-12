import{a as S,S as q,i as s}from"./assets/vendor-frHSA4Lh.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const B="https://pixabay.com/api/",M="50399235-368a9bb0a02fac6949df8b962";async function u(o){const r={key:M,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await S.get(B,{params:r})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more-button"),P=new q(".gallery a",{captionsData:"alt",captionDelay:250});function y(o){const r=o.map(({webformatURL:a,largeImageURL:c,tags:e,likes:t,views:i,comments:v,downloads:w})=>`
      <li class="gallery-item">
        <a href="${c}">
          <img src="${a}" alt="${e}" />
        </a>
        <div class="info">
          <p>👍 ${t}</p>
          <p>👁️ ${i}</p>
          <p>💬 ${v}</p>
          <p>⬇️ ${w}</p>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",r),P.refresh()}function $(){f.innerHTML=""}function p(){m.classList.remove("hidden")}function g(){m.classList.add("hidden")}function L(){h.classList.remove("is-hidden")}function b(){h.classList.add("is-hidden")}const O=document.querySelector("#search-form"),E=document.querySelector(".load-more");let l="",n=1,d=0;O.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements.searchQuery.value.trim();if(!r){s.error({message:"Please enter a search query."});return}l=r,n=1,$(),b(),p();try{const a=await u(l,n);if(a.hits.length===0){s.warning({message:"No images found. Try another keyword."});return}y(a.hits),d=Math.ceil(a.totalHits/15),n<d?L():s.info({message:"You've reached the end of results."})}catch{s.error({message:"Failed to fetch images."})}finally{g()}});E.addEventListener("click",async()=>{n+=1,p(),b();try{const o=await u(l,n);y(o.hits),n>=d?s.info({message:"You've reached the end of results."}):L();const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}catch{s.error({message:"Failed to load more images."})}finally{g()}});
//# sourceMappingURL=index.js.map
