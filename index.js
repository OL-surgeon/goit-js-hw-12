import{a as y,S as b,i as a}from"./assets/vendor-BxTtOiNT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const L="https://pixabay.com/api/",w="50399235-368a9bb0a02fac6949df8b962";async function v(e,t=1){const r={key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{const s=await y.get(L,{params:r});if(s.status!==200)throw new Error(`HTTP error! status: ${s.status}`);return s.data}catch(s){throw console.error("Помилка запиту до Pixabay API:",s),s}}document.querySelector(".gallery");document.querySelector(".loader");document.querySelector(".load-more-button");const c=document.querySelector(".gallery"),E=new b(".gallery a",{captionsData:"alt",captionDelay:250});function I(e){return`
        <li class="gallery-item">
            <a href="${e.largeImageURL}" class="gallery-link">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" class="gallery-image"/>
            </a>
            <div class="info">
                <div class="info-details">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${e.likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${e.views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${e.comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${e.downloads}</span>
                    </p>
                </div>
            </div>
        </li>
    `}function S(e){if(!c){console.error("Елемент галереї не знайдено!");return}const t=e.map(r=>I(r)).join("");c.insertAdjacentHTML("beforeend",t),E.refresh()}function B(){c&&(c.innerHTML="")}function M(){loaderElement&&loaderElement.classList.remove("is-hidden")}function f(){loaderElement&&loaderElement.classList.add("is-hidden")}function q(){loadMoreButtonElement&&loadMoreButtonElement.classList.remove("is-hidden")}function i(){loadMoreButtonElement&&loadMoreButtonElement.classList.add("is-hidden")}a.settings({timeout:3e3,resetOnHover:!0,icon:"material-icons",transitionIn:"fadeInUp",position:"topRight"});const m=document.querySelector("#search-form"),P=document.querySelector(".load-more-button");let p="",d=1,l=0;const h=15;m.addEventListener("submit",async e=>{e.preventDefault();const r=new FormData(m).get("searchQuery").trim();if(!r){a.warning({title:"Увага!",message:"Будь ласка, введіть пошуковий запит."});return}p=r,d=1,l=0,B(),i(),await g()});P.addEventListener("click",async()=>{d+=1,await g(!0)});async function g(e=!1){M();try{const t=await v(p,d);if(f(),!t.hits||t.hits.length===0){e||a.info({title:"На жаль,",message:"зображень за вашим запитом не знайдено. Спробуйте інший запит."}),i();return}l=t.totalHits,S(t.hits),d*h>=l?(i(),l>0&&a.info({title:"Це все!",message:"We're sorry, but you've reached the end of search results."})):q(),e&&t.hits.length>0&&$()}catch(t){f(),a.error({title:"Помилка!",message:`Сталася помилка під час завантаження зображень: ${t.message}`}),console.error("Помилка в fetchAndRenderImages:",t),i()}}function $(){const e=document.querySelectorAll(".gallery-item");if(e.length>0){const t=e[e.length-Math.min(h,e.length)];if(t){const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}}
//# sourceMappingURL=index.js.map
