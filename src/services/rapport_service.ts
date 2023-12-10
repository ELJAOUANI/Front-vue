import { api } from '@/core'
import { useStore } from '@/stores'

export function testFunction(){
      console.log('test');

}

const all = async () => {
  try {
    const res = await api().get('/reports/show')

    if (res.status === 200) {
      const { reports, count } = res.data

      // Assuming useStore.technicien() returns an object with setListOfTechnicien and setCounter methods
      useStore.rapport().setRapportList(reports)
      useStore.rapport().setCounter(count)

      console.log('Rapports:', reports)
      console.log('Repports count:', count)
    } else {
      console.error('Failed to fetch article data:', res.status, res.statusText)
    }
  } catch (error) {
    console.error('Error while fetching article data:', error.message)
  }
}

const add = async (formData: FormData) => {
  try {
    const res = await api().post('/reports/store', formData)
    console.log(res.data)
   
    return res.data
  } catch (error) {
    // Handle the error
    console.error('Error inserting Report:', error)
    return null
  }
}

const deleteRepot = async (id) => {
  try {
    await api().delete(`/reports/delete/${id}`)
    console.log('item deleted successfully')
  } catch (error) {
    console.error('Error deleting item', error)
  }
}

const updateReports= async (id: number, updatedArticle) => {
  try {
    const response = await api().put(`/reports/update/${id}`, updatedArticle)
    return response.data
  } catch (error) {
    console.error('Error updating reports:', error)
    throw error
  }
}

export const rapport = {
  all,
  add,
  deleteRepot,
  updateReports
}
