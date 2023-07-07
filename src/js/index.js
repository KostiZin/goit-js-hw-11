import axios from 'axios';
import Notiflix from 'notiflix';
import { PixabayAPI } from './PixabayAPI';
import { createGalleryCard } from './createGalleryCard';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.js-load-more');
const inputEl = searchFormEl.firstElementChild;
console.dir(inputEl);

const api = new PixabayAPI();
// let query = null;

const options = {
  // totalItems: 0,
  itemsPerPage: 40,
  // visiblePages: 5,
  page: 1,
};

// let isLabelActive = false;

api
  .fetchPhotos()
  .then(response => {
    const markup = createGalleryCard(response.data);
    // console.log(response.data);

    galleryEl.innerHTML = markup;
  })
  .catch(console.warn);

searchFormEl.addEventListener('submit', handleSearchForm);
loadMoreBtn.addEventListener('click', handleLoadMoreBtn);

function handleSearchForm(evt) {
  evt.preventDefault();

  const searchValue = inputEl.value.trim();
  api.query = searchValue;
  console.log(api.query);
  console.log(searchValue);

  if (!searchValue) {
    return;
  }

  api.fetchQuery().then(response => {
    api.page = 1;
    const markup = createGalleryCard(response.data);

    // console.log(response.data.total);

    galleryEl.innerHTML = markup;

    if (galleryEl.innerHTML === '') {
      loadMoreBtn.classList.add('is-hidden');
      // searchFormEl.reset();
      return Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
    Notiflix.Notify.success(
      `We found ${
        response.data.total
      } pictures for you under category "${searchValue.toUpperCase()}"`
    );
  });
  // console.dir(searchValue);
  // console.dir(evt.target.firstElementChild.value);
  // console.log(query);
}

function handleLoadMoreBtn() {
  api.page += 1;
  console.log(api.page);

  api.fetchQuery().then(response => {
    console.log(response.data);
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(response.data));

    if (api.page === response.data.total_pages) {
      loadMoreBtn.classList.add('is-hidden');
    }
  });
}
