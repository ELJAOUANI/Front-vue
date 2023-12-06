import { api } from '@/core';
import { useStore } from '@/stores';


const all = async () => {
  try {
    const res = await api().get('/techniciens/show');
    
    if (res.status === 200) {
      const { listOfTechniciens, count } = res.data;

      // Assuming useStore.technicien() returns an object with setListOfTechnicien and setCounter methods
      useStore.technicien().setListOfTechnicien(listOfTechniciens);
      useStore.technicien().setCounter(count);
      
      console.log("Technicians:", listOfTechniciens);
      console.log("Counter:", count);
    } else {
      console.error("Failed to fetch technician data:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error while fetching technician data:", error.message);
  }
};



const add = async (formData: FormData)  => {
  try {
     const res = await api().post('/techniciens/store', formData);
     console.log(res.data);
      return res.data;
  } catch (error) {
    // Handle the error
    console.error('Error inserting technicien:', error);
    return null;
  }
};


 const deleteTechnicien = async (id) => {
      try {
        await api().delete(`/techniciens/delete/${id}`);
        console.log("Technicien deleted successfully");
      } catch (error) {
        console.error("Error deleting technicien", error);
      }
    }; 

     const updateTechnicien = async (id:number, updatedTechnicien)=> {
    try {
      const response = await api().post(`/techniciens/update/${id}`, updatedTechnicien);
      return response.data;
    } catch (error) {
      console.error('Error updating technicien:', error);
      throw error;
    }
  }








export const technicien = {
    all ,
    add , 
    deleteTechnicien , 
    updateTechnicien
} 