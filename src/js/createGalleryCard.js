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
      }) => `<li class='gallery__item'><div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${downloads}</b>
        </p>
      </div>
    </div></li>`
      // `<li class='gallery__item'><img src='${webformatURL}' alt='${tags}'><p>likes: ${likes}</p><p>views: ${views}</p><p>comments: ${comments}</p><p>donwloads: ${downloads}</p></li>`
    )
    .join('');
}
