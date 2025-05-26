import './css/styles.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalPages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.error({ message: 'Please enter a search query.' });
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.warning({ message: 'No images found. Try another keyword.' });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({ message: `You've reached the end of results.` });
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    if (currentPage >= totalPages) {
      iziToast.info({ message: `You've reached the end of results.` });
    } else {
      showLoadMoreButton();
    }

    // Scroll
    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images.' });
  } finally {
    hideLoader();
  }
});
