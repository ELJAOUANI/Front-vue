import { defineStore } from 'pinia'

export const technicien = defineStore('technicien', {
    state: () => ({
        count: null,
        listOfTechnicien: null,
    }),
    getters: {
    },
    actions: {
        setCounter(count: any) {
            this.count = count;
        },
        setListOfTechnicien(listOfTechnicien: any) {
            this.listOfTechnicien = listOfTechnicien;
        }
    },
})