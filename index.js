import{a as p,S as y,i}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const b="https://pixabay.com/api/",L="50399235-368a9bb0a02fac6949df8b962";async function w(e,t=1){const o={key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{return(await p.get(b,{params:o})).data}catch(n){throw console.error("Error fetching images:",n),n}}const h=document.querySelector(".gallery"),d=document.querySelector(".loader"),u=document.querySelector(".load-more-button"),v=new y(".gallery a",{captionsData:"alt",captionDelay:250});function S(e){const t=e.map(o=>`
    <li class="photo-card">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <span>${o.likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${o.views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${o.comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${o.downloads}</span>
        </div>
      </div>
    </li>`).join("");h.insertAdjacentHTML("beforeend",t),v.refresh()}function $(){h.innerHTML=""}function q(){d&&d.classList.remove("is-hidden")}function g(){d&&d.classList.add("is-hidden")}function H(){u&&u.classList.remove("is-hidden")}function l(){u&&u.classList.add("is-hidden")}document.querySelector("#search-form");const I=document.querySelector(".load-more");let c="",a=1;searchForm.addEventListener("submit",async e=>{e.preventDefault();const t=searchInput.value.trim();if(t!==c&&(c=t,a=1,$(),l()),!c){i.warning({title:"Warning",message:"Please enter a search term",position:"topRight"});return}await m()});I.addEventListener("click",async()=>{a+=1,await m()});async function m(){try{q();const e=await w(c,a);if(g(),e&&e.hits&&e.hits.length>0){S(e.hits),totalHits=e.totalHits;const t=a*15;console.log(`Page: ${a}, Images on page: ${e.hits.length}`),console.log(`Total hits from API: ${totalHits}`),console.log(`Calculated loaded images: ${t}`),console.log(`Should hide button: ${t>=totalHits}`),a>1&&M();const o=document.querySelectorAll(".photo-card").length;console.log(`Actual loaded images in DOM: ${o}`),o<totalHits?(H(),console.log("Showing Load More button")):(l(),console.log("Hiding Load More button - reached end"),i.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}else l(),a===1&&i.info({title:"No results",message:"Sorry, no images found. Try different keywords.",position:"topRight"})}catch(e){g(),l(),console.error("Error:",e),i.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"})}}function M(){const t=document.querySelector(".gallery").querySelector(".photo-card");if(t){const n=t.getBoundingClientRect().height*2;window.scrollBy({top:n,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
