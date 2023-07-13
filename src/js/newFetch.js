import Notiflix from 'notiflix';
import { PixabayAPI } from './PixabayNewFetch';
import { createGalleryCard } from './createGalleryCard';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.js-load-more');
const inputEl = searchFormEl.firstElementChild;

const api = new PixabayAPI();

hideLoadMoreBtn();

// CREATE MARKUP FOR THE FIRST DEFAULT PAGE //
api
  .fetchPhotos()
  .then(data => {
    console.log(data);

    const markup = createGalleryCard(data);
    galleryEl.innerHTML = markup;
  })
  .catch(error => console.warn(error));

// CREATE EVENT "SEARCH" AND ITS FUNCTION //

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
    .then(data => {
      console.log(data);
      showLoadMoreBtn();
      // const { data } = response;
      const markup = createGalleryCard(data);
      galleryEl.innerHTML = markup;

      if (galleryEl.innerHTML === '') {
        inputEl.value = '';
        hideLoadMoreBtn();
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

      //   galleryEl.innerHTML.refresh();
    })
    .catch(error => {
      console.warn(error);
    });

  inputEl.value = '';
}

// CREATE EVENT "LOAD MORE" AND ITS FUNCTION //

loadMoreBtn.addEventListener('click', handleLoadMoreBtn);

function handleLoadMoreBtn() {
  api.page += 1;
  api
    .fetchQuery()
    .then(data => {
      // const { data } = response;
      galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(data));

      if (40 / data.hits.length > 1) {
        hideLoadMoreBtn();
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.warn(error);
    });
}

// new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
// });

// ADDITIONAL FUNCTIONS //

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}
