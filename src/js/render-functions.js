import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-button');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p>👍 ${likes}</p>
          <p>👁️ ${views}</p>
          <p>💬 ${comments}</p>
          <p>⬇️ ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}

export function showEndOfCollectionMessage() {
  if (!document.querySelector('.end-of-collection-message')) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('end-of-collection-message');
    messageDiv.textContent =
      "We're sorry, but you've reached the end of search results.";
    document.body.appendChild(messageDiv);
  }
}

export function hideEndOfCollectionMessage() {
  const messageDiv = document.querySelector('.end-of-collection-message');
  if (messageDiv) {
    messageDiv.remove();
  }
}
