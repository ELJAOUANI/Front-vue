import { defineStore } from 'pinia'

export const technicien = defineStore('technicien', {
    state: () => ({
        count: null,
        listOfTechnicien: null,
    }),
    getters: {
    getCount: (state) => state.count,
    getListOfTechnicien: (state) => state.listOfTechnicien,
    },
    actions: {
        setCounter(count: any) {
            this.count = count;
        },
        setListOfTechnicien(listOfTechnicien: any) {
            this.listOfTechnicien = listOfTechnicien;
            console.log(listOfTechnicien);
            
        },
        setTechnicien(item:any){
            console.log(item); 
              const existingTechnicien = this.listOfTechnicien.find((t) => t.id === item.id);

      if (existingTechnicien) {
        // Update existing technicien
        Object.assign(existingTechnicien, item);
      } else {
        // Add new technicien
        this.listOfTechnicien?.push(item);
      }
        },
        async removeTechnicien(id:number) {
            const itemIdToDelete = id;
            const indexToDelete = this.listOfTechnicien.findIndex(
                (item) => item.id == itemIdToDelete
            );
            if (indexToDelete !== -1) {
                this.listOfTechnicien.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },

    },
})