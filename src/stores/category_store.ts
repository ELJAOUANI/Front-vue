import { defineStore } from 'pinia'

export const category = defineStore('category', {
    state: () => ({
        category: null,
        
    }),
    getters: {
    },
    actions: {
        setCategory(category: any) {
            this.category = category;
        }
    },
})