import './css/styles.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
iziToast.settings({
  timeout: 3000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'fadeInUp',
  position: 'topRight',
});

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const query = formData.get('searchQuery').trim();

  if (!query) {
    iziToast.warning({
      title: 'Увага!',
      message: 'Будь ласка, введіть пошуковий запит.',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
  clearGallery();
  hideLoadMoreButton();
  await fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRenderImages(true);
});

async function fetchAndRenderImages(isLoadMore = false) {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      if (!isLoadMore) {
        iziToast.info({
          title: 'На жаль,',
          message:
            'зображень за вашим запитом не знайдено. Спробуйте інший запит.',
        });
      }
      hideLoadMoreButton();
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    const loadedImagesCount = currentPage * perPage;

    if (loadedImagesCount >= totalHits) {
      hideLoadMoreButton();

      if (totalHits > 0) {
        iziToast.info({
          title: 'Це все!',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } else {
      showLoadMoreButton();
    }

    if (isLoadMore && data.hits.length > 0) {
      smoothScroll();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Помилка!',
      message: `Сталася помилка під час завантаження зображень: ${error.message}`,
    });
    console.error('Помилка в fetchAndRenderImages:', error);
    hideLoadMoreButton();
  }
}

function smoothScroll() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const firstCard =
      galleryItems[
        galleryItems.length - Math.min(perPage, galleryItems.length)
      ]; // одна з останніх доданих
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }
}
