import { api } from '@/core';
import { useStore } from '@/stores';

const login = async (formData: FormData) => {
    const res = await api().post('/auth/login', formData);
      const { user, token } = res.data;

      // Assuming useStore.technicien() returns an object with setListOfTechnicien and setCounter methods
      useStore.auth().setToken(token);
      useStore.auth().setUser(user);
    return res.data;
}

export const auth = {
    login
}