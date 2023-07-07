export class PixabayAPI {
  #API_KEY = '38090711-3a880efc8e3f464ec3ef8c11b';
  #BASE_URL = 'https://pixabay.com/api/';
  query = null;
  page = 1;

  fetchPhotos() {
    return fetch(
      `${this.#BASE_URL}?key=${
        this.#API_KEY
      }&q=nature&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
  }
}
//   `${this.#BASE_URL}/search/photos?query=${this.query}&page=${
//     this.page
//   }&per_page=12&client_id=${this.#API_KEY}`

//   getImages(page) {
//     const url = `${this.#BASE_URL}?key=${
//       this.#API_KEY
//     }&q=nature&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;

//     return fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .catch(error => console.log(error));
//   }

//   getImagesByQuery(page) {
//     const url = `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
//       this.#search
//     }&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;

//     return fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .catch(err => console.log(err));
//   }
// }

// set query(newSearch) {
//       this.#search = newSearch;
//     }
