import axios from 'axios';

export class PixabayAPI {
  #API_KEY = '38090711-3a880efc8e3f464ec3ef8c11b';
  #BASE_URL = 'https://pixabay.com/api/';
  query = '';
  page = 1;

  // FETCH ======================================

  
    fetchPhotos = async () => {
      const url = `${this.#BASE_URL}?key=${
        this.#API_KEY
      }&q=&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    (fetchQuery = async () => {
      const url = `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
        this.query
      }&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });

  // AXIOS ======================================

  // fetchPhotos = async () => {
  //   const response = await axios(
  //     `${this.#BASE_URL}?key=${
  //       this.#API_KEY
  //     }&q=&image_type=photo&orientation=horizontal&safesearch=true&page=${
  //       this.page
  //     }&per_page=40`
  //   );
  //   return response;
  // };
  // fetchQuery = async () => {
  //   const response = await axios(
  //     `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
  //       this.query
  //     }&image_type=photo&orientation=horizontal&safesearch=true&page=${
  //       this.page
  //     }&per_page=40`
  //   );
  //   return response;
  // };

  // ==========================================================
  // fetchPhotos = () =>
  //   axios.get(
  //     `${this.#BASE_URL}?key=${
  //       this.#API_KEY
  //     }&q=&image_type=photo&orientation=horizontal&safesearch=true&page=${
  //       this.page
  //     }&per_page=40`
  //   );

  // fetchQuery = () =>
  //   axios.get(
  //     `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
  //       this.query
  //     }&image_type=photo&orientation=horizontal&safesearch=true&page=${
  //       this.page
  //     }&per_page=40`
  //   );
  // ===========================================================
}
