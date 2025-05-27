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
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const newQuery = searchInput.value.trim();

  if (newQuery !== currentQuery) {
    currentQuery = newQuery;
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
  }

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  await searchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await searchImages();
});

async function searchImages() {
  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage);

    hideLoader();

    if (data && data.hits && data.hits.length > 0) {
      createGallery(data.hits);
      totalHits = data.totalHits;

      const loadedImages = currentPage * 15;
      console.log(`Page: ${currentPage}, Images on page: ${data.hits.length}`);
      console.log(`Total hits from API: ${totalHits}`);
      console.log(`Calculated loaded images: ${loadedImages}`);
      console.log(`Should hide button: ${loadedImages >= totalHits}`);

      if (currentPage > 1) {
        smoothScrollAfterLoad();
      }

      const actualLoadedImages =
        document.querySelectorAll('.photo-card').length;

      console.log(`Actual loaded images in DOM: ${actualLoadedImages}`);

      if (actualLoadedImages < totalHits) {
        showLoadMoreButton();
        console.log('Showing Load More button');
      } else {
        hideLoadMoreButton();
        console.log('Hiding Load More button - reached end');

        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      hideLoadMoreButton();

      if (currentPage === 1) {
        iziToast.info({
          title: 'No results',
          message: 'Sorry, no images found. Try different keywords.',
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
  }
}

function smoothScrollAfterLoad() {
  const gallery = document.querySelector('.gallery');
  const photoCard = gallery.querySelector('.photo-card');

  if (photoCard) {
    const cardHeight = photoCard.getBoundingClientRect().height;
    const scrollDistance = cardHeight * 2;

    window.scrollBy({
      top: scrollDistance,
      behavior: 'smooth',
    });
  }
}
