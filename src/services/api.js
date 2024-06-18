import axios from 'axios';
const isProd = process.env.NODE_ENV === "production";

const apiUrl = "https://adote-minha-casa-api-ef5021418d25.herokuapp.com";

const api = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
});

api.interceptors.request.use(

    (config) => {
      const token = localStorage.getItem('TOKEN_KEY');
      console.log(api)
      console.log(config)
      config.url = `${config.url}`;
      config.headers.Authorization = `Bearer ${token}`;
   
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
   
export default api;