import { api } from '@/core';

const login = async (formData: FormData) => {
    const res = await api().post('/auth/login', formData);
    return res.data;
}

export const auth = {
    login
}