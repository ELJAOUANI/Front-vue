import { api } from '@/core';
import { useStore } from '@/stores';


const all = async () => {
    const res = await api().get('/technicien/show');
    if (res.status === 200) {
        console.log(res.data)
        useStore.technicien().setListOfTechnicien(res.data.listOfTechniciens);
        useStore.technicien().setCounter(res.data.count);
    } else {
        return null;
    }
}

export const technicien = {
    all
} 