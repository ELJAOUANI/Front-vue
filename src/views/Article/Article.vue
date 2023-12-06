<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

import { useStore } from '@/stores'
import { article , categories  } from '@/services'

import deleteConfirmation from '../../components/Modals/deleteConfirmation.vue'
import { debounce } from "lodash"



//import router from '@/router'
const listOfArticles = ref([])
const filteredData = ref(null);
const searchTerm = ref("");

onMounted(async () => {
    loading.value = true
    await article.all()
    listOfArticles.value = useStore.article().items;
    await categories.showAll()
    loading.value = false
    filteredData.value = listOfArticles.value;
    
})









const categorylist = ref(computed(() => useStore.category().category))


const loading = ref(false);
const item_name = ref('')
const item_code = ref('')
const unite = ref('') 
const quantity = ref('') 
const price_unit = ref('') 
const type = ref('') 
const category = ref('') 

const error = ref(false)
const isDeleting = ref(false)

const submit = async () => {
    const calculatedPrice = parseInt(quantity.value * price_unit.value)  ;
    const formData = new FormData()
    formData.append('item_name', item_name.value)
    formData.append('item_code', item_code.value)
    formData.append('unite', unite.value)
    formData.append('quantity', quantity.value)
    formData.append('price_unit', price_unit.value)
    formData.append('type', type.value)
    formData.append('category', category.value)
    formData.append('price', calculatedPrice)
  
    //isLoading.value = true
    await article.add(formData)
        .then((res) => {
            console.log(res.item)
            useStore.article().setArticle(res.item);
            item_name.value = ""
            item_code.value = ""
            unite.value = ""
            quantity.value = ""
            price_unit.value = ""
            type.value = ""
            category.value = ""

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

const item_nameup = ref('')
const item_codeup = ref('')
const uniteup = ref('')
const price_unitup = ref('')
const typeup = ref('')
const categoryup = ref('')
const quantityup = ref('')


watch(
    () => itemupdate.value, // Watched value
    (updatedItem) => {
        console.log(updatedItem);
        item_nameup.value = updatedItem.item_name;
        item_codeup.value = updatedItem.item_code;
        quantityup.value = updatedItem.quantity;
        uniteup.value = updatedItem.unite;
        price_unitup.value = updatedItem.price_unit;
        typeup.value = updatedItem.type;
        categoryup.value = updatedItem.category;
       
    }
);

const handleDelete = async () => {
    isDeleting.value = true
    await article.deleteArticle(itemDel.value)
        .then(() => {
            useStore.article().removeArticle(itemDel.value);
            isDeleting.value = false;
        })
        .catch((error) => {
            console.error(error);
        });


};
const update = async () => {

    // Add other form fields as needed
    const payload = {
      item_name: item_nameup.value,
        item_code : item_codeup.value ,
        quantity : quantityup.value ,
        unite:uniteup.value ,
        price_unit :price_unitup.value ,
        type :typeup.value ,
        category :categoryup.value 
    }
    console.log(payload);

    // Assuming you have an updateTechnician function in your service
    await article.updateArticle(itemupdate.value.id, payload)
        .then((res) => {
            console.log("from update function", res.item);
            useStore.article().setArticle(res.item);
            article.all()
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








 


// const filteredTechniciens = computed(() =>
//   Object.values(ListOfTechnicien).filter((tech) => {
//     return tech && tech.name && tech.name.toLowerCase().includes(searchTerm.value.toLowerCase());
//   })
// );

const filteredArticle = (conditions) => {
    const filteredData = listOfArticles.value.filter((item) => {
        
        const searchMatch =
            !conditions.search ||
            Object.values(item).some((field) =>
                field &&
                field.toString().toLowerCase().includes(conditions.search.toLowerCase())
            ) 
           
        return searchMatch 

    })
     return filteredData;
};
const filter = debounce(() => {
    const conditions = {
        search: searchTerm.value,
        

    };
    console.log(conditions);
    filteredData.value = filteredArticle(conditions);
}, 300);




</script>
<template>
    <div class="container-fluid">


        <div class="row">

            <div class="">
                <div class="card custom-card">
                    <div class="card-header justify-content-between">
                        <div class="card-title">Listes des Articles</div>
                        <button class="btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Ajouter Une Article
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
                                        <th scope="col">Name</th>
                                        <th scope="col">code</th>
                                        <th scope="col">Unite</th>
                                        <th scope="col">Quantite</th>
                                        <th scope="col">Prix Unitaire</th>
                                        <th scope="col">Prix Total</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="loading">
                                        <td :colspan="10" class="text-center">
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
                                            {{ item.item_name }}
                                        </td>
                                        <td>
                                            {{ item.item_code }}
                                        </td>
                                        <td>
                                            {{ item.unite }}
                                        </td>
                                          <td>
                                                {{ item.quantity }}
                                            </td>
                                              <td>
                                                {{ item.price_unit }}
                                            </td>
                                             <td>
                                                    {{ item.quantity * item.price_unit }}
                                                </td>
                                              <td>
                                                {{ item.type }}
                                            </td>
                                               <td>
                                                    {{ item.category.name  }}
                                                </td>
                                        <td>
                                            <!-- Update Button -->
                                            <button class="btn btn-primary mx-2" @click="itemupdate = item"
                                                data-bs-toggle="modal" data-bs-target="#updateModal">
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
                                            <button type="button" class="btn btn-danger px-4 py-2 rounded"
                                                @click="itemDel = item.id" data-bs-toggle="modal"
                                                data-bs-target="#confirmationModal">Supprimer</button>

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
                                    <input type="text" v-model="item_name" placeholder="Nom D'article" class="form-control"
                                        name="item_name">
                                </div>

                                <div class="mb-3">
                                    <input placeholder="Code" v-model="item_code" type="text" class="form-control"
                                        name="item_code">
                                </div>
                                            <div class="mb-3">
                                        <input type="text" v-model="unite" placeholder="Unite" class="form-control"
                                            name="unite">
                                    </div>
                                                <div class="mb-3">

                                        <input type="text" v-model="quantity" placeholder="Quantite" class="form-control"
                                            name="quantite">

                                    </div>
                                                <div class="mb-3">

                                        <input type="text" v-model="type" placeholder="Type" class="form-control"
                                            name="type">

                                    </div>
                                                <div class="mb-3">

                                        <input type="text" v-model="price_unit" placeholder="Prix unitaire" class="form-control"
                                            name="price_unit">

                                    </div>
                                                  
                                              

                                 <div class="mb-3">
                                    <select class="form-select" v-model="category" aria-label="Default select example">
                                        <option value="" selected disabled>Choisir une categorie</option>
                                        <option v-for="category in categorylist" :key="category.id" :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                </div> 


                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                    <button type="button" data-bs-dismiss="modal" @click="submit"
                                        class="btn btn-info">Ajouter</button>
                                </div>
                            </form>
                            <!-- End -->
                        </div>


                    </div>
                </div>
            </div>
            <!-- confirmationModal -->
            <deleteConfirmation id="confirmationModal" title="Supprimer une Article" :isLoading="isDeleting"
                message="Voulez-vous vraiment supprimer cet article ?" :method="handleDelete" :itemid="itemDel" />

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
                                    <div class="mb-3">
                                        <input type="text" v-model="item_nameup" placeholder="Nom D'article" class="form-control"
                                            name="item_name">
                                    </div>

                                    <div class="mb-3">
                                        <input placeholder="Code" v-model="item_codeup" type="text" class="form-control"
                                            name="item_code">
                                    </div>
                                                <div class="mb-3">
                                            <input type="text" v-model="uniteup" placeholder="Unite" class="form-control"
                                                name="unite">
                                        </div>
                                                    <div class="mb-3">

                                            <input type="text" v-model="quantityup" placeholder="Quantite" class="form-control"
                                                name="quantite">

                                        </div>
                                                    <div class="mb-3">

                                            <input type="text" v-model="typeup" placeholder="Type" class="form-control"
                                                name="type">

                                        </div>
                                                    <div class="mb-3">

                                            <input type="text" v-model="price_unitup" placeholder="Prix unitaire" class="form-control"
                                                name="price_unit">

                                        </div>
                                                  
                                              

                                     <div class="mb-3">
                                        <select class="form-select" v-model="categoryup" aria-label="Default select example">
                                            <option value="" selected disabled>Choisir une categorie</option>
                                            <option v-for="category in categorylist" :key="category.id" :value="category.id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div> 


                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                        <button type="button" data-bs-dismiss="modal" @click="update"
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