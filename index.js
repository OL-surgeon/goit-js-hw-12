import{a as b,S as L,i as c}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const w="https://pixabay.com/api/",v="50399235-368a9bb0a02fac6949df8b962";async function S(e,t=1){const o={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{const s=await b.get(w,{params:o});if(s.status!==200)throw new Error(`HTTP error! status: ${s.status}`);return s.data}catch(s){throw console.error("Помилка запиту до Pixabay API:",s),s}}const m=document.querySelector(".gallery"),u=document.querySelector(".loader"),f=document.querySelector(".load-more");let $=new L(".gallery a");function P(e){const t=e.map(o=>`
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
    </li>`).join("");m.insertAdjacentHTML("beforeend",t),$.refresh()}function q(){m.innerHTML=""}function I(){u&&u.classList.remove("is-hidden")}function g(){u&&u.classList.add("is-hidden")}function M(){f&&f.classList.remove("is-hidden")}function l(){f&&f.classList.add("is-hidden")}const p=document.querySelector(".form"),A=p.querySelector('input[name="search-text"]'),E=document.querySelector(".load-more");let d="",a=1,i=0;p.addEventListener("submit",async e=>{e.preventDefault();const t=A.value.trim();if(t!==d&&(d=t,a=1,q(),l()),!d){c.warning({title:"Warning",message:"Please enter a search term",position:"topRight"});return}await y()});E.addEventListener("click",async()=>{a+=1,await y()});async function y(){try{I();const e=await S(d,a);if(g(),e&&e.hits&&e.hits.length>0){P(e.hits),i=e.totalHits;const t=a*15;console.log(`Page: ${a}, Images on page: ${e.hits.length}`),console.log(`Total hits from API: ${i}`),console.log(`Calculated loaded images: ${t}`),console.log(`Should hide button: ${t>=i}`),a>1&&B();const o=document.querySelectorAll(".photo-card").length;console.log(`Actual loaded images in DOM: ${o}`),o<i?(M(),console.log("Showing Load More button")):(l(),console.log("Hiding Load More button - reached end"),c.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}else l(),a===1&&c.info({title:"No results",message:"Sorry, no images found. Try different keywords.",position:"topRight"})}catch(e){g(),l(),console.error("Error:",e),c.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"})}}function B(){const t=document.querySelector(".gallery").querySelector(".photo-card");if(t){const s=t.getBoundingClientRect().height*2;window.scrollBy({top:s,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
