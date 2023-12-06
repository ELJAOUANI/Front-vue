import { defineStore } from 'pinia'

export const city = defineStore('city', {
    state: () => ({
        city: null,
        
    }),
    getters: {
    },
    actions: {
        setCity(city: any) {
            this.city = city;
        }
    },
})