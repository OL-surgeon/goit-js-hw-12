import{a as h,S as g,i as a}from"./assets/vendor-BxTtOiNT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const y="https://pixabay.com/api/",b="50399235-368a9bb0a02fac6949df8b962";async function L(e,t=1){const o={key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{const s=await h.get(y,{params:o});if(s.status!==200)throw new Error(`HTTP error! status: ${s.status}`);return s.data}catch(s){throw console.error("Помилка запиту до Pixabay API:",s),s}}document.querySelector(".gallery");document.querySelector(".loader");document.querySelector(".load-more-button");const w=new g(".gallery a",{captionsData:"alt",captionDelay:250});function E(e){return`
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
    `}function v(e){if(!galleryElement){console.error("Елемент галереї не знайдено!");return}const t=e.map(o=>E(o)).join("");galleryElement.insertAdjacentHTML("beforeend",t),w.refresh()}function I(){galleryElement&&(galleryElement.innerHTML="")}function B(){loaderElement&&loaderElement.classList.remove("is-hidden")}function u(){loaderElement&&loaderElement.classList.add("is-hidden")}function M(){loadMoreButtonElement&&loadMoreButtonElement.classList.remove("is-hidden")}function i(){loadMoreButtonElement&&loadMoreButtonElement.classList.add("is-hidden")}a.settings({timeout:3e3,resetOnHover:!0,icon:"material-icons",transitionIn:"fadeInUp",position:"topRight"});document.querySelector("#search-form");const S=document.querySelector(".load-more");let f="",c=1,l=0;const m=15;searchForm.addEventListener("submit",async e=>{e.preventDefault();const o=new FormData(searchForm).get("searchQuery").trim();if(!o){a.warning({title:"Увага!",message:"Будь ласка, введіть пошуковий запит."});return}f=o,c=1,l=0,I(),i(),await p()});S.addEventListener("click",async()=>{c+=1,await p(!0)});async function p(e=!1){B();try{const t=await L(f,c);if(u(),!t.hits||t.hits.length===0){e||a.info({title:"На жаль,",message:"зображень за вашим запитом не знайдено. Спробуйте інший запит."}),i();return}l=t.totalHits,v(t.hits),c*m>=l?(i(),l>0&&a.info({title:"Це все!",message:"We're sorry, but you've reached the end of search results."})):M(),e&&t.hits.length>0&&P()}catch(t){u(),a.error({title:"Помилка!",message:`Сталася помилка під час завантаження зображень: ${t.message}`}),console.error("Помилка в fetchAndRenderImages:",t),i()}}function P(){const e=document.querySelectorAll(".gallery-item");if(e.length>0){const t=e[e.length-Math.min(m,e.length)];if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}}
//# sourceMappingURL=index.js.map
