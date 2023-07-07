import axios from 'axios';
import Notiflix from 'notiflix';
import { PixabayAPI } from './PixabayAPI';
import { createGalleryCard } from './createGalleryCard';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const inputEl = searchFormEl.firstElementChild;

const api = new PixabayAPI();

const options = {
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};

api.fetchPhotos().then(data => {
  const markup = createGalleryCard(data);
  console.log(data);

  galleryEl.innerHTML = markup;
});

searchFormEl.addEventListener('submit', handleSearchForm);

function handleSearchForm(evt) {
  evt.preventDefault();

  const searchValue = inputEl.value.trim();

  if (!searchValue) {
    return;
  }
  console.dir(searchValue);
  console.dir(evt.target.firstElementChild.value);
}
