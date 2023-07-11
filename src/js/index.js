import axios from 'axios';
import Notiflix from 'notiflix';
import { PixabayAPI } from './PixabayAPI';
import { createGalleryCard } from './createGalleryCard';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.js-load-more');
const inputEl = searchFormEl.firstElementChild;

const api = new PixabayAPI();

hideLoadMoreBtn();

// create markup for the first default page //

api
  .fetchPhotos()
  .then(response => {
    const markup = createGalleryCard(response.data);
    galleryEl.innerHTML = markup;
  })
  .catch(console.warn());

// create event SEARCH and its function //

searchFormEl.addEventListener('submit', handleSearchForm);

function handleSearchForm(evt) {
  api.page = 1;
  evt.preventDefault();

  let searchValue = inputEl.value.trim();
  api.query = searchValue;

  if (!searchValue) {
    return;
  }

  api
    .fetchQuery()
    .then(response => {
      showLoadMoreBtn();
      const { data } = response;
      const markup = createGalleryCard(data);
      galleryEl.innerHTML = markup;

      if (galleryEl.innerHTML === '') {
        return Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      Notiflix.Notify.success(
        `We found ${
          data.totalHits
        } pictures for you under category "${searchValue.toUpperCase()}"`
      );

      if (40 / data.hits.length > 1) {
        hideLoadMoreBtn();
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(console.warn());

  inputEl.value = '';
}

// creat event Load More and its function //

loadMoreBtn.addEventListener('click', handleLoadMoreBtn);

function handleLoadMoreBtn() {
  api.page += 1;

  api
    .fetchQuery()
    .then(response => {
      const { data } = response;
      galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(data));

      if (40 / data.hits.length > 1) {
        hideLoadMoreBtn();
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(console.warn);
}

// additional functions //

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}
