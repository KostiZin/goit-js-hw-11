export class PixabayAPI {
  #API_KEY = '38090711-3a880efc8e3f464ec3ef8c11b';
  #BASE_URL = 'https://pixabay.com/api/';

  #search = '';

  getImages(page) {
    const url = `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
      this.#search
    }&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;
  }
  // something is wrong here
  //   return fetch(url).then(response => {
  //         if (!response.ok) {
  //           throw new Error(response.status);
  //         }
  //         return response.json();
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
}
