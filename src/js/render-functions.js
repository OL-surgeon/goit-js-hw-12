import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-button');
const galleryElement = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createImageCardMarkup(image) {
  return `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="gallery-link">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image"/>
            </a>
            <div class="info">
                <div class="info-details">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${image.likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${image.views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${image.comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${image.downloads}</span>
                    </p>
                </div>
            </div>
        </li>
    `;
}

export function createGallery(images) {
  if (!galleryElement) {
    console.error('Елемент галереї не знайдено!');
    return;
  }
  const markup = images.map(image => createImageCardMarkup(image)).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (galleryElement) {
    galleryElement.innerHTML = '';
  }
}

export function showLoader() {
  if (loaderElement) {
    loaderElement.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loaderElement) {
    loaderElement.classList.add('is-hidden');
  }
}

export function showLoadMoreButton() {
  if (loadMoreButtonElement) {
    loadMoreButtonElement.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreButtonElement) {
    loadMoreButtonElement.classList.add('is-hidden');
  }
}
