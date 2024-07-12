import axios from 'axios';
const isProd = process.env.NODE_ENV === "production";

const apiUrl = "http://127.0.0.1:3333";
// const apiUrl = "https://adote-minha-casa-api-ef5021418d25.herokuapp.com";

const api = axios.create({
    baseURL: apiUrl,
    timeout: 50000,
});

api.interceptors.request.use( 
  async (config) => {
    const token = localStorage.getItem('TOKEN_KEY');
    // config.url = `${config.url}`; 
    
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  },
  // (error) => {
  //   return Promise.reject(error);
  // }
);


export default api;