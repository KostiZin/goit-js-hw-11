import Notiflix from 'notiflix';
import { PixabayAPI } from './PixabayNewFetch';
import { createGalleryCard } from './createGalleryCard';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.js-load-more');
const inputEl = searchFormEl.firstElementChild;

const api = new PixabayAPI();

api
  .fetchPhotos()
  .then(data => {
    console.log(data);

    const markup = createGalleryCard(data);
    // console.log(markup);

    galleryEl.innerHTML = markup;
  })
  .catch(error => console.warn(error));
