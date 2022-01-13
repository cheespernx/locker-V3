import axios from 'axios';
import { getUserLocalStorage } from '../context/AuthProvider/util';

export const Api = axios.create({
  baseURL: 'https://locker.nexusnx.com/api/'
});

Api.interceptors.request.use( // This sends in every request the user token as a header parameter
  (config) => {
    const user = getUserLocalStorage();

    config.headers = {
      Authorization: user?.token, // (TODO) change this
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)