import { defineStore } from 'pinia'

export const rapport = defineStore('rapport', {
    state: () => ({
        count : null ,
        reports: null,
    }),
    getters: {
    getRapportList: (state) => state.reports,
    getCount : (state)=> state.count
    },
    actions: {
      setCounter(count: any) {
            this.count = count;
        },
        setRapportList(reports: any) {
            this.reports = reports;
           
            
        },
        setArticle(item:any){
            console.log(item); 
              const existingArticle = this.reports.find((t) => t.id === item.id);

      if (existingArticle) {
        // Update existing technicien
        Object.assign(existingArticle, item);
      } else {
        // Add new technicien
        this.reports?.push(item);
      }
        },
        async removeArticle(id:number) {
            const itemIdToDelete = id;
            const indexToDelete = this.reports.findIndex(
                (item) => item.id == itemIdToDelete
            );
            if (indexToDelete !== -1) {
                this.reports.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },

    },
})