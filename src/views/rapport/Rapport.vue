<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/stores'
import { article, city, rapport, technicien } from '@/services'
import deleteConfirmation from '../../components/Modals/deleteConfirmation.vue'
import { debounce } from 'lodash'

//import router from '@/router'
const listOfRapport = ref([])
const filteredData = ref(null)
const searchTerm = ref('')

onMounted(async () => {
  loading.value = true
  await rapport.all()
  listOfRapport.value = useStore.rapport().reports
  await city.all()
  await technicien.all()
  await article.all()

  loading.value = false

  filteredData.value = listOfRapport.value;
})

const listOfCities = ref(computed(() => useStore.city().city))
const technicienList = ref(computed(() => useStore.technicien().listOfTechnicien))
const ListOfItems = ref(computed(() => useStore.article().items))

const loading = ref(false)
const serie_number = ref('')
const operation = ref('')
const type_of_operation = ref('')
const address = ref('')
const city_id = ref('')
const secteur = ref('')
const technicien_id = ref('')
const date_of_operation = ref('')
const order_number = ref('')
const sr = ref('')
const items = ref('-')
const error = ref(false)
const isDeleting = ref(false)
const quantity = ref('')

const submit = async () => {
  const formData = new FormData()
  formData.append('serie_number', serie_number.value)
  formData.append('operation', operation.value)
  formData.append('type_of_operation', type_of_operation.value)
  formData.append('address', address.value)
  formData.append('city_id', city_id.value)
  formData.append('secteur', secteur.value)
  formData.append('technicien_id', technicien_id.value)
  formData.append('date_of_operation', date_of_operation.value)
  formData.append('order_number', order_number.value)
  formData.append('sr', sr.value)
  formData.append('item', items.value)
  formData.append('quantity', quantity.value)

  await rapport
    .add(formData)
    .then((res) => {
      console.log(res)
      useStore.rapport().setRapportList(res.reports)
      rapport.all()
      serie_number.value = ''
      operation.value = ''
      type_of_operation.value = ''
      address.value = ''
      city_id.value = ''
      secteur.value = ''
      technicien_id.value = ''
      date_of_operation.value = ''
      order_number.value = ''
      sr.value = ''
      items.value = ''
      quantity.value = ''
    })
    .catch((err) => {
      console.log(err)
    })
  // .finally(() => {
  //   isLoading.value = false
  // })
}

// const handleDelete = async (id) =>{
//   isDeleting.value = true
//    await technicien.deleteTechnicien(id)
//    .then((res) => {
//       console.log(res)
//       useStore.technicien().removeTechnicien(id);
//       isDeleting.value = false
//     }).catch((error)=>{
//       error
//     })

// }

let itemDel = ref(0)
let itemupdate = ref({})
const serie_numberup = ref('')
const operationup = ref('')
const type_of_operationup = ref('')
const addressup = ref('')
const city_idup = ref('')
const secteurup = ref('')
const technicien_idup = ref('')
const date_of_operationup = ref('')
const order_numberup = ref('')
const srup = ref('')
const itemsup = ref('')
const quantityup = ref('')


watch(
  () => itemupdate.value, // Watched value
  (updatedItem) => {
 serie_numberup.value = updatedItem.serie_number
 operationup.value = updatedItem.operation
 type_of_operationup.value = updatedItem.type_of_operation
 addressup.value = updatedItem.address
 city_idup.value = updatedItem.city_id
 secteurup.value = updatedItem.secteur
 technicien_idup.value = updatedItem.technicien_id
 date_of_operationup.value = updatedItem.date_of_operation
 order_numberup.value = updatedItem.order_number
 srup.value = updatedItem.sr
 itemsup.value = updatedItem.items
 quantityup.value = updatedItem.quantity
  }
)
const handleDelete = async () => {
  isDeleting.value = true
  await rapport
    .deleteRepot(itemDel.value)
    .then(() => {
      useStore.rapport().removeArticle(itemDel.value)
      isDeleting.value = false
    })
    .catch((error) => {
      console.error(error)
    })
}
const update = async () => {
  // Add other form fields as needed
  const payload = {
    serie_number : serie_numberup.value ,
    operation : operationup.value,
    type_of_operationup : type_of_operationup.value ,
     updatedItem : addressup.value ,
  city_id : city_idup.value ,
 secteur : secteurup.value ,
technicien_id  : technicien_idup.value ,
  date_of_operation : date_of_operationup.value ,
  order_number :order_numberup.value ,
sr :  srup.value ,
 items :  itemsup.value,
quantity :  quantityup.value 
  }
  console.log(payload)

  // Assuming you have an updateTechnician function in your service
  await rapport.updateReports(itemupdate.value.id, payload)
    .then((res) => {
      console.log('from update function', res.item)
      useStore.article().setArticle(res.item)
      article.all()
      // Clear the input fields after a successful update
      // nameup.value = '';
      // emailup.value = '';
      // city_idup.value = '';
    })
    .catch((err) => {
      console.error(err)

      error.value = true
    })
}

// const filteredTechniciens = computed(() =>
//   Object.values(ListOfTechnicien).filter((tech) => {
//     return tech && tech.name && tech.name.toLowerCase().includes(searchTerm.value.toLowerCase());
//   })
// );

const filtredReports = (conditions: string) => {
    const filteredData = listOfRapport.value.filter((item) => {
    const searchMatch =
    !conditions.search ||
     Object.values(item).some(
        (field) => field && field.toString().toLowerCase().includes(conditions.search.toLowerCase())
      )
    return searchMatch
  })
  return filteredData
}
const filter = debounce(() => {
  const conditions = {
    search: searchTerm.value
  }
  console.log(conditions)
  filteredData.value = filtredReports(conditions)
}, 300)


</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="">
        <div class="card custom-card">
          <div class="card-header justify-content-between">
            <div class="card-title">Listes des Rapports</div>
            <button
              class="btn btn-primary mx-5"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Ajouter Un Rapports
            </button>
          </div>

          <div class="d-flex align-items-center search-container mx-4">
            <input
              type="search"
              class="form-control custom-search-input"
              placeholder="Rechercher..."
              @input="filter"
              v-model="searchTerm"
            />
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table text-nowrap table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#Index</th>
                    <th scope="col">Numero de Serie</th>
                    <th scope="col">Operation</th>
                    <th scope="col">Type d'operation</th>
                    <th scope="col">Addresse</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Secteur</th>
                    <th scope="col">Technicien</th>
                    <th scope="col">Date D'operation</th>
                    <th scope="col">Sr</th>
                    <th scope="col">Numero d'order</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td :colspan="12" class="text-center">Loading...</td>
                  </tr>
                  <!-- Le reste de votre contenu du tableau va ici -->
                </tbody>
                <tbody v-if="!loading">
                  <tr v-for="(item, index) in filteredData" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <!-- <td>
                          {{ item.id }}
                        </td> -->

                    <td>
                      {{ item.serie_number }}
                    </td>
                    <td>
                      {{ item.operation }}
                    </td>
                    <td>
                      {{ item.type_of_operation }}
                    </td>
                    <td>
                      {{ item.address }}
                    </td>
                    <td>
                      {{ item.city.city_name }}
                    </td>
                    <td>
                      {{ item.secteur }}
                    </td>
                    <td>
                      {{ item.technicien.name }}
                    </td>
                    <td>
                      {{ item.date_of_operation }}
                    </td>
                    <td>
                      {{ item.sr }}
                    </td>
                    <td>
                      {{ item.order_number }}
                    </td>
                    <td>
                      <!-- Update Button -->
                      <button
                        class="btn btn-primary mx-2"
                        @click="itemupdate = item"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                      >
                        Update
                      </button>

                      <!-- <button
    @click="() => handleDelete(item.id)"
    :disabled="isDeleting"
    class="btn btn-danger px-4 py-2 rounded"
    :class="{ 'opacity-50 cursor-not-allowed': isDeleting }"
  >
    {{ isDeleting ? "Deleting..." : "Supprimer" }}
  </button> -->
                      <button
                        type="button"
                        class="btn btn-danger px-4 py-2 rounded"
                        @click="itemDel = item.id"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmationModal"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Insert Modal  -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title text-center" id="exampleModalLabel">Ajouter Un rapport</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- start -->
              <form>
                <div class="mb-3">
                  <select
                    class="form-select"
                    v-model="items"
                    aria-label="Default select example"
                    multiple
                  >
                    <option value="-" disabled>Choisir Une Article</option>
                    <option v-for="item in ListOfItems" :key="item.id" :value="item.id">
                      {{ item.item_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="quantity">Quantite</label>
                  <input
                    type="text"
                    v-model="quantity"
                    placeholder="Quantite"
                    class="form-control"
                    name="quantity"
                  />
                </div>

                <div class="mb-3">
                  <label for="serie_number">Numero de serie</label>
                  <input
                    type="text"
                    v-model="serie_number"
                    placeholder="Numero de serie"
                    class="form-control"
                    name="serie_number"
                  />
                </div>

                <div class="mb-3">
                  <label for="operation">Operation</label>
                  <input
                    placeholder="Operation"
                    v-model="operation"
                    type="text"
                    class="form-control"
                    name="operation"
                  />
                </div>
                <div class="mb-3">
                  <label for="type_of_operation">Type d'operation</label>
                  <input
                    type="text"
                    v-model="type_of_operation"
                    placeholder="Type d'operation"
                    class="form-control"
                    name="type_of_operation"
                  />
                </div>
                <div class="mb-3">
                  <label for="address">Addresse</label>
                  <input
                    type="text"
                    v-model="address"
                    placeholder="Addresse"
                    class="form-control"
                    name="address"
                  />
                </div>

                <div class="mb-3">
                  <label for="secteur">Secteur</label>
                  <input
                    type="text"
                    v-model="secteur"
                    placeholder="Secteur"
                    class="form-control"
                    name="secteur"
                  />
                </div>
                <div class="mb-3">
                  <label for="order_number">Numero d'order</label>
                  <input
                    type="text"
                    v-model="order_number"
                    placeholder="Numero d'order"
                    class="form-control"
                    name="order_number"
                  />
                </div>
                <div class="mb-3">
                  <label for="date_of_operation">Sr</label>
                  <input type="text" v-model="sr" placeholder="SR" class="form-control" name="sr" />
                </div>
                <div class="mb-3">
                  <label for="date_of_operation">Date d'operation</label>
                  <input
                    type="date"
                    v-model="date_of_operation"
                    placeholder="Date d'operation"
                    class="form-control"
                    name="date_of_operation"
                  />
                </div>
                <div class="mb-3">
                  <select class="form-select" v-model="city_id" aria-label="Default select example">
                    <option value="" selected disabled>Choisir Une Ville</option>
                    <option v-for="city in listOfCities" :key="city.id" :value="city.id">
                      {{ city.city_name }}
                    </option>
                  </select>
                </div>

                <div class="mb-3">
                  <select
                    class="form-select"
                    v-model="technicien_id"
                    aria-label="Default select example"
                  >
                    <option value="" selected disabled>Choisir Un techncien</option>
                    <option v-for="tech in technicienList" :key="tech.id" :value="tech.id">
                      {{ tech.name }}
                    </option>
                  </select>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Fermer
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    @click="submit"
                    class="btn btn-info"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
              <!-- End -->
            </div>
          </div>
        </div>
      </div>

      <!-- confirmationModal -->
      <deleteConfirmation
        id="confirmationModal"
        title="Supprimer une Article"
        :isLoading="isDeleting"
        message="Voulez-vous vraiment supprimer cet article ?"
        :method="handleDelete"
        :itemid="itemDel"
      />

      <!-- Update Modal  -->

      <div
        class="modal fade"
        id="updateModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title text-center" id="exampleModalLabel">Ajouter Un rapport</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- start -->
              <form>
                <div class="mb-3">
                  <select
                    class="form-select"
                    v-model="itemsup"
                    aria-label="Default select example"
                    multiple
                  >
                    <option value="-" disabled>Choisir Une Article</option>
                    <option v-for="item in ListOfItems" :key="item.id" :value="item.id">
                      {{ item.item_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="quantity">Quantite</label>
                  <input
                    type="text"
                    v-model="quantityup"
                    placeholder="Quantite"
                    class="form-control"
                    name="quantity"
                  />
                </div>

                <div class="mb-3">
                  <label for="serie_number">Numero de serie</label>
                  <input
                    type="text"
                    v-model="serie_numberup"
                    placeholder="Numero de serie"
                    class="form-control"
                    name="serie_number"
                  />
                </div>

                <div class="mb-3">
                  <label for="operation">Operation</label>
                  <input
                    placeholder="Operation"
                    v-model="operationup"
                    type="text"
                    class="form-control"
                    name="operation"
                  />
                </div>
                <div class="mb-3">
                  <label for="type_of_operation">Type d'operation</label>
                  <input
                    type="text"
                    v-model="type_of_operationup"
                    placeholder="Type d'operation"
                    class="form-control"
                    name="type_of_operation"
                  />
                </div>
                <div class="mb-3">
                  <label for="address">Addresse</label>
                  <input
                    type="text"
                    v-model="addressup"
                    placeholder="Addresse"
                    class="form-control"
                    name="address"
                  />
                </div>

                <div class="mb-3">
                  <label for="secteur">Secteur</label>
                  <input
                    type="text"
                    v-model="secteurup"
                    placeholder="Secteur"
                    class="form-control"
                    name="secteur"
                  />
                </div>
                <div class="mb-3">
                  <label for="order_number">Numero d'order</label>
                  <input
                    type="text"
                    v-model="order_numberup"
                    placeholder="Numero d'order"
                    class="form-control"
                    name="order_number"
                  />
                </div>
                <div class="mb-3">
                  <label for="date_of_operation">Sr</label>
                  <input type="text" v-model="srup" placeholder="SR" class="form-control" name="sr" />
                </div>
                <div class="mb-3">
                  <label for="date_of_operation">Date d'operation</label>
                  <input
                    type="date"
                    v-model="date_of_operationup"
                    placeholder="Date d'operation"
                    class="form-control"
                    name="date_of_operation"
                  />
                </div>
                <div class="mb-3">
                  <select class="form-select" v-model="city_idup" aria-label="Default select example">
                    <option value="" selected disabled>Choisir Une Ville</option>
                    <option v-for="city in listOfCities" :key="city.id" :value="city.id">
                      {{ city.city_name }}
                    </option>
                  </select>
                </div>

                <div class="mb-3">
                  <select
                    class="form-select"
                    v-model="technicien_idup"
                    aria-label="Default select example"
                  >
                    <option value="" selected disabled>Choisir Un techncien</option>
                    <option v-for="tech in technicienList" :key="tech.id" :value="tech.id">
                      {{ tech.name }}
                    </option>
                  </select>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Fermer
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    @click="update"
                    class="btn btn-info"
                  >
                    Modifrt
                  </button>
                </div>
              </form>
              <!-- End -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
