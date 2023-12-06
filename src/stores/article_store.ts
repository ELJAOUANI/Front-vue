import { defineStore } from 'pinia'

export const article = defineStore('article', {
    state: () => ({
        count : null ,
        items: null,
    }),
    getters: {
    getlistOfArticles: (state) => state.items,
    getCount : (state)=> state.count
    },
    actions: {
      setCounter(count: any) {
            this.count = count;
        },
        setlistOfArticles(items: any) {
            this.items = items;
            console.log(items);
            
        },
        setArticle(item:any){
            console.log(item); 
              const existingArticle = this.items.find((t) => t.id === item.id);

      if (existingArticle) {
        // Update existing technicien
        Object.assign(existingArticle, item);
      } else {
        // Add new technicien
        this.items?.push(item);
      }
        },
        async removeArticle(id:number) {
            const itemIdToDelete = id;
            const indexToDelete = this.items.findIndex(
                (item) => item.id == itemIdToDelete
            );
            if (indexToDelete !== -1) {
                this.items.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },

    },
})