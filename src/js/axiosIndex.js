import axios from 'axios';
import Notiflix from 'notiflix';
import { PixabayAPI } from './axiosPixabayAPI';
import { createGalleryCard } from './createGalleryCard';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.js-load-more');
const inputEl = searchFormEl.firstElementChild;

const api = new PixabayAPI();

hideLoadMoreBtn();
api.fetchPhotos();

// CREATE MARKUP FOR THE FIRST DEFAULT PAGE //

defaultPage();

async function defaultPage() {
  try {
    const response = await api.fetchPhotos();
    const markup = createGalleryCard(response.data);
    galleryEl.innerHTML = markup;
  } catch (error) {
    console.warn();
  }
}

// CREATE EVENT "SEARCH" AND ITS FUNCTION //

searchFormEl.addEventListener('submit', async evt => {
  await handleSearchForm(evt);
});

async function handleSearchForm(evt) {
  api.page = 1;
  evt.preventDefault();

  let searchValue = inputEl.value.trim();
  api.query = searchValue;

  if (!searchValue) {
    return;
  }

  try {
    const response = await api.fetchQuery();
    showLoadMoreBtn();
    const { data } = response;
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

    galleryEl.innerHTML.refresh();
  } catch (error) {
    console.warn(error);
  }

  inputEl.value = '';
}

// CREATE EVENT "LOAD MORE" AND ITS FUNCTION //

loadMoreBtn.addEventListener('click', async () => {
  await handleLoadMoreBtn();
});

async function handleLoadMoreBtn() {
  api.page += 1;
  try {
    const response = await api.fetchQuery();
    const { data } = response;
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(data));

    if (40 / data.hits.length > 1) {
      hideLoadMoreBtn();
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.warn(error);
  }
}

// ADDITIONAL FUNCTIONS //

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

// for my internal use - without async/await +++++++++++++++++++++++++++++++++++++++++

// CREATE MARKUP FOR THE FIRST DEFAULT PAGE //
// ====================================================
// api
//   .fetchPhotos()
//   .then(response => {
//     const markup = createGalleryCard(response.data);
//     galleryEl.innerHTML = markup;
//   })
//   .catch(console.warn());
// =====================================================

// CREATE EVENT "SEARCH" AND ITS FUNCTION //
// =======================================================
// searchFormEl.addEventListener('submit', handleSearchForm);

// function handleSearchForm(evt) {
//   api.page = 1;
//   evt.preventDefault();

//   let searchValue = inputEl.value.trim();
//   api.query = searchValue;

//   if (!searchValue) {
//     return;
//   }

//   api
//     .fetchQuery()
//     .then(response => {
//       showLoadMoreBtn();
//       const { data } = response;
//       const markup = createGalleryCard(data);
//       galleryEl.innerHTML = markup;

//       if (galleryEl.innerHTML === '') {
//         return Notiflix.Notify.failure(
//           `Sorry, there are no images matching your search query. Please try again.`
//         );
//       }
//       Notiflix.Notify.success(
//         `We found ${
//           data.totalHits
//         } pictures for you under category "${searchValue.toUpperCase()}"`
//       );

//       if (40 / data.hits.length > 1) {
//         hideLoadMoreBtn();
//         Notiflix.Notify.warning(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     })
//     .catch(console.warn());

//   inputEl.value = '';
// }
// =================================================================
// CREATE EVENT "LOAD MORE" AND ITS FUNCTION //
// =================================================================
// loadMoreBtn.addEventListener('click', handleLoadMoreBtn);

// function handleLoadMoreBtn() {
//   api.page += 1;

//   api
//     .fetchQuery()
//     .then(response => {
//       const { data } = response;
//       galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(data));

//       if (40 / data.hits.length > 1) {
//         hideLoadMoreBtn();
//         Notiflix.Notify.warning(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     })
//     .catch(console.warn);
// }

// =====================================================================
