// FETCH
export class PixabayAPI {
  #API_KEY = '38090711-3a880efc8e3f464ec3ef8c11b';
  #BASE_URL = 'https://pixabay.com/api/';
  query = '';
  page = 1;

  fetchPhotos = async () => {
    try {
      const response = await fetch(
        `${this.#BASE_URL}?key=${
          this.#API_KEY
        }&q=&image_type=photo&orientation=horizontal&safesearch=true&page=${
          this.page
        }&per_page=40`
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  fetchQuery = () => {
    return fetch(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
        this.query
      }&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  };
}

//   fetchPhotos = async () => {
//     return fetch(
//       `${this.#BASE_URL}?key=${
//         this.#API_KEY
//       }&q=&image_type=photo&orientation=horizontal&safesearch=true&page=${
//         this.page
//       }&per_page=40`
//     )
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   fetchQuery = () => {
//     return fetch(
//       `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
//         this.query
//       }&image_type=photo&orientation=horizontal&safesearch=true&page=${
//         this.page
//       }&per_page=40`
//     )
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// }

// // AXIOS ==============================================================
// import axios from 'axios';
// export class PixabayAPI {
//   #API_KEY = '38090711-3a880efc8e3f464ec3ef8c11b';
//   #BASE_URL = 'https://pixabay.com/api/';
//   query = '';
//   page = 1;

//   fetchPhotos = () => {
//     return axios
//       .get(
//         `${this.#BASE_URL}?key=${
//           this.#API_KEY
//         }&q=&image_type=photo&orientation=horizontal&safesearch=true&page=${
//           this.page
//         }&per_page=40`
//       )
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   fetchQuery = () => {
//     return axios
//       .get(
//         `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
//           this.query
//         }&image_type=photo&orientation=horizontal&safesearch=true&page=${
//           this.page
//         }&per_page=40`
//       )
//       .then(response => {
//         return response.data;
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// }
