import { api } from '@/core';
import { useStore } from '@/stores';


const all = async () => {
  try {
    const res = await api().get('/items/show');
    
    if (res.status === 200) {
      const { items ,count} = res.data;

      // Assuming useStore.technicien() returns an object with setListOfTechnicien and setCounter methods
      useStore.article().setlistOfArticles(items);
      useStore.article().setCounter(count);
    
      
      console.log("Articles:", items);
      console.log("Articles items:", count);
     
    } else {
      console.error("Failed to fetch article data:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error while fetching article data:", error.message);
  }
};



const add = async (formData: FormData)  => {
  try {
     const res = await api().post('/items/store', formData);
     console.log(res.data);
     all()
      return res.data;
  } catch (error) {
    // Handle the error
    console.error('Error inserting Article:', error);
    return null;
  }
};


 const deleteArticle = async (id) => {
      try {
        await api().delete(`/items/delete/${id}`);
        console.log("item deleted successfully");
      } catch (error) {
        console.error("Error deleting item", error);
      }
    }; 

     const updateArticle = async (id:number, updatedArticle)=> {
    try {
      const response = await api().post(`/items/update/${id}`, updatedArticle);
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }








export const article = {
    all ,
    add , 
    deleteArticle , 
    updateArticle
} 