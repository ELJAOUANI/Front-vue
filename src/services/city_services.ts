import { api } from '@/core';
import { useStore } from '@/stores';

const all = async () => {
    const res = await api().get('/cities/show');
    if (res.status === 200) {
        console.log(res.data)
        useStore.city().setCity(res.data.cities);
  
        
    } else {
        return null;
    }
}

export const city = {
    all
} 