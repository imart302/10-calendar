import axios, { AxiosError } from 'axios';
import { getEnvVariables } from '../helpers';
import { ApiError } from './ApiErrors';

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
  (error: AxiosError) => {
    throw new ApiError(
      {
        xToken: error.config?.headers['x-token'] ?? 'None',
        Accept: error.config?.headers.Accept?.toString() ?? 'None',
      },
      error.response?.status,
      error.message,
      error.config?.baseURL,
      error.config?.method,
      error.config?.url,
      error.stack,
    );
  }
);
