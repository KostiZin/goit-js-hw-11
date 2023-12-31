import axios from 'axios';

export class PixabayAPI {
  #API_KEY = '38090711-3a880efc8e3f464ec3ef8c11b';
  #BASE_URL = 'https://pixabay.com/api/';
  query = '';
  page = 1;

  fetchPhotos = async () => {
    const response = await axios.get(
      `${this.#BASE_URL}?key=${
        this.#API_KEY
      }&q=&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`
    );
    return response;
  };
  fetchQuery = async () => {
    const response = await axios.get(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
        this.query
      }&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`
    );
    return response;
  };
}
