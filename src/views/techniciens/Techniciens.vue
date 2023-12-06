<script setup lang="ts">
import { ref, computed, onMounted, watch , watchEffect } from 'vue'

import { useStore } from '@/stores'
import { technicien, city } from '@/services'
import deleteConfirmation from '../../components/Modals/deleteConfirmation.vue'
import { debounce } from "lodash"


//import router from '@/router'

const loading = ref(false);
const filteredData = ref(null);

const ListOfTechnicien = ref([]);
onMounted(async () => {
  loading.value = true;
  await technicien.all();
  ListOfTechnicien.value = useStore.technicien().listOfTechnicien;
  await city.all()
  filteredData.value = ListOfTechnicien.value;
  loading.value = false;
});

// const filteredTech = ref()

// if (ListOfTechnicien && ListOfTechnicien.value && ListOfTechnicien.value.length > 0) {
//   filteredTech.value = ListOfTechnicien.value;
//   console.log('filteredTech:', filteredTech.value);
// } else {
//   console.log('ListOfTechnicien is either undefined or has an empty value.');
// }

const listOfCities = ref(computed(() => useStore.city().city))



const searchTerm = ref("");
const CityTerm = ref("")
const email = ref('')
const city_id = ref('')
const name = ref('')
const error = ref(false)
const isDeleting = ref(false)
const emailup = ref('')
const city_idup = ref('')
const nameup = ref('')

const submit = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('city_id', city_id.value)
  //isLoading.value = true
  await technicien.add(formData)
    .then((res) => {
      console.log( "from store logique" , res.techniciens)
      useStore.technicien().setTechnicien(res.techniciens);
      name.value = '';
      email.value = '';
      city_id.value = '';

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


watch(
  () => itemupdate.value, // Watched value
  (updatedItem) => {
    console.log(updatedItem);
    nameup.value = updatedItem.name;
    emailup.value = updatedItem.email;
    city_idup.value = updatedItem.city_id;
  }
);

const handleDelete = async () => {
  isDeleting.value = true
  await technicien.deleteTechnicien(itemDel.value)
    .then(() => {
      useStore.technicien().removeTechnicien(itemDel.value);
      isDeleting.value = false;
    })
    .catch((error) => {
      console.error(error);
    });


};
const update = async () => {

  // Add other form fields as needed
  const payload = {
    name: nameup.value,
    email: emailup.value,
    city_id: city_idup.value
  }
  console.log(payload);

  // Assuming you have an updateTechnician function in your service
  await technicien.updateTechnicien(itemupdate.value.id, payload)
    .then((res) => {
      console.log(res.techniciens);
      useStore.technicien().setTechnicien(res.techniciens);
      technicien.all()
      // Clear the input fields after a successful update
      // nameup.value = '';
      // emailup.value = '';
      // city_idup.value = '';
    })
    .catch((err) => {
      console.error(err);

      error.value = true;
    });
};








console.log(ListOfTechnicien);

// const filteredTechniciens = computed(() =>
//   Object.values(ListOfTechnicien).filter((tech) => {
//     return tech && tech.name && tech.name.toLowerCase().includes(searchTerm.value.toLowerCase());
//   })
// );



const filteredTechniciens = (conditions) => {


    const filteredData = ListOfTechnicien.value.filter((item) => {
 
    const searchMatch =
      !conditions.search ||
      Object.values(item).some((field) =>
        field &&
        field.toString().toLowerCase().includes(conditions.search.toLowerCase())
      )
   
    return searchMatch 


    
  })
  return filteredData;
}


const filter = debounce(() => {
  const conditions = {
    search: searchTerm.value,
   
  };
  console.log(conditions);
  filteredData.value = filteredTechniciens(conditions);

}, 300);



</script>
<template>
  <div class="container-fluid">


    <div class="row">

      <div class="">
        <div class="card custom-card">
          <div class="card-header justify-content-between">
            <div class="card-title">Listes des techniciens</div>
            <button class="btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Ajouter Un technicien
            </button>
          </div>

          <div class="d-flex align-items-center">
            <input type="search" class="form-control w-75 me-auto" placeholder="Rechercher..." @input="filter"
              v-model="searchTerm" />


            <!-- <div class="d-flex align-items-center ms-0">
              <select ref="citySelect" class="form-select ms-2 me-2 w-180" @change="filter" v-model="CityTerm">
                <option value="-">Tout</option>
                <option v-for="city in listOfCities" :key="city.id" :value="city.city_name">
                  {{ city.city_name }}
                </option>
              </select>
            </div> -->
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table text-nowrap table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#Index</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td :colspan="5" class="text-center">
                      Loading...
                    </td>
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
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.email }}
                    </td>
                    <td>
                      {{ item.city.city_name }}
                    </td>
                    <td>
                      <!-- Update Button -->
                      <button class="btn btn-primary mx-2" @click="itemupdate = item" data-bs-toggle="modal"
                        data-bs-target="#updateModal">
                        Update
                      </button>
                      <button type="button" class="btn btn-danger px-4 py-2 rounded" @click="itemDel = item.id"
                        data-bs-toggle="modal" data-bs-target="#confirmationModal">Supprimer</button>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>








      <!-- Insert Modal  -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- start -->
              <form>
                <div class="mb-3">

                  <input type="text" v-model="name" placeholder="Nom complet" class="form-control" name="name">

                </div>
                <div class="mb-3">

                  <input placeholder="Email" v-model="email" type="email" class="form-control" name="email">
                </div>
                <div class="mb-3">
                  <select class="form-select" v-model="city_id" aria-label="Default select example">
                    <option value="" selected disabled>Choisir une ville</option>
                    <option v-for="city in listOfCities" :key="city.id" :value="city.id">
                      {{ city.city_name }}
                    </option>
                  </select>
                </div>


                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                  <button type="button" data-bs-dismiss="modal" @click="submit" class="btn btn-info">Ajouter</button>
                </div>
              </form>
              <!-- End -->
            </div>


          </div>
        </div>
      </div>
      <!-- confirmationModal -->
      <deleteConfirmation id="confirmationModal" title="Supprimer un Technicien" :isLoading="isDeleting"
        message="Voulez-vous vraiment supprimer ce technicien ?" :method="handleDelete" :itemid="itemDel" />

      <!-- Update Modal  -->

      <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- start -->

              <form>
                <div>

                  <div class="mb-3">

                    <input type="text" v-model="nameup" placeholder="Nom complet" class="form-control" name="name">

                  </div>
                  <div class="mb-3">

                    <input placeholder="Email" v-model="emailup" type="email" class="form-control" name="email">
                  </div>
                  <div class="mb-3">
                    <select class="form-select" v-model="city_idup" aria-label="Default select example">
                      <option value="" selected disabled>Choisir une ville</option>
                      <option v-for="city in listOfCities" :key="city.id" :value="city.id">
                        {{ city.city_name }}
                      </option>
                    </select>
                  </div>
                </div>


                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                  <button type="button" data-bs-dismiss="modal" @click="update(itemupdate)"
                    class="btn btn-info">Modifier</button>
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