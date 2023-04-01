import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  config.headers.set('x-token', localStorage.getItem('x-token'));
  return config;
});

calendarApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (response) => {
    
  }
);

