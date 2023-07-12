// without SimpleLightBox
export function createGalleryCard({ hits } = images) {
  return hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class='gallery__item'>
      <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b class="info-description">Likes<span class="info-number">${likes}</span></b>
        </p>
        <p class="info-item">
          <b class="info-description">Views<span class="info-number">${views}</span></b>
        </p>
        <p class="info-item">
          <b class="info-description">Comments<span class="info-number">${comments}</span></b>
        </p>
        <p class="info-item">
          <b class="info-description">Downloads<span class="info-number">${downloads}</span></b>
        </p>
      </div>
    </div></li>`
    )
    .join('');
}

// ==========================================================================
// with SimpleLightBox

// export function createGalleryCard({ hits }) {
//   return hits
//     .map(
//       ({
//         largeImageURL,
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<li class="gallery__item"><div class="photo-card">
//       <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" title=""/></a>
//       <div class="info">
//       <p class="info-item">
//       <b>Likes ${likes}</b>
//       </p>
//       <p class="info-item">
//       <b>Views ${views}</b>
//       </p>
//       <p class="info-item">
//       <b>Comments ${comments}</b>
//       </p>
//       <p class="info-item">
//       <b>Downloads ${downloads}</b>
//       </p>
//       </div>
//       </div></li>`
//     )
//     .join('');
// }
