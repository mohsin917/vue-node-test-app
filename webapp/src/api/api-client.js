import axios from 'axios';

class ApiClient {
  constructor() {
    const whileListRoutes = ['/login'];

    this.api = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `bearer ${localStorage.getItem('token')}`
      },
    });


    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // handle error
        console.log(error);
        return Promise.reject(error);
      }
    );
  }

  get(path) {
    return this.api.get(path).then((response) => response.data);
  }

  post(path, data) {
    return this.api.post(path, data).then((response) => response.data);
  }

  put(path, data) {
    return this.api.put(path, data).then((response) => response.data);
  }

  delete(path) {
    return this.api.delete(path).then((response) => response.data);
  }
}

export { ApiClient as default };
// export default new ApiClient();