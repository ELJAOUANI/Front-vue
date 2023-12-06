import { api } from '@/core';
import { useStore } from '@/stores';

const showAll = async () => {
    const res = await api().get('/category/show');
    if (res.status === 200) {
        console.log(res.data)
        useStore.category().setCategory(res.data.categories);
  
        
    }else{
        return null;
    }
}
export const categories = {
    showAll
} 