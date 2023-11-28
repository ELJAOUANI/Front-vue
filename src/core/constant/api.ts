import axios from 'axios';
import { env } from '@/core';

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

const api = (baseURL = env.API, token = JSON.parse(localStorage.getItem('token')!)) => {
    const instance = axios.create({
        baseURL: baseURL
    });

    instance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')!)}`;
        }
        return config;
    });
    return instance;
}


export default api;


