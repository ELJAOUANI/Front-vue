<script setup lang="ts">
import { ref, computed,onMounted } from 'vue'
import { Card } from '@/ui'
import { useStore } from '@/stores'
import { technicien } from '@/services'

onMounted(async() => {
  await technicien.all();
})

const listOfTechnicien = ref(computed(() => useStore.technicien().listOfTechnicien))
const countTechnicien = ref(computed(() => useStore.technicien().count))


</script>

<template>
  <div class="container-fluid">
    <div class="page-header">
      <h1 class="page-title my-auto">Dashboard</h1>
      <div>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">FocusFlow</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-3">
        <Card
          title="Techniciens"
          icon="ti ti-users"
          :value="countTechnicien!"
          icon-color="bg-warning-transparent text-warning"
        />
      </div>
      <div class="col-xl-3">
        <Card
          title="Rapports"
          icon="ti ti-report"
          value="10"
          icon-color="bg-info-transparent text-info"
        />
      </div>
      <div class="col-xl-3">
        <Card
          title="Articles"
          icon="ti ti-box"
          value="10"
          icon-color="bg-success-transparent text-success"
        />
      </div>
      <div class="col-xl-3">
        <Card
          title="Factures"
          icon="ti ti-file-invoice"
          value="10"
          icon-color="bg-danger-transparent text-danger"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-xxl-4 col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title fw-semibold">Activités Quotidiennes</h4>
          </div>
          <div class="card-body pb-0">
            <ul class="task-list">
              <li class="d-sm-flex">
                <div>
                  <i class="task-icon bg-primary"></i>
                  <h6 class="fw-semibold">
                    Task Finished<span class="text-muted fs-11 mx-2 fw-normal">09 July 2023</span>
                  </h6>
                  <p class="text-muted fs-12 mb-0">
                    Adam Berry finished task on<a
                      href="javascript:void(0)"
                      class="fw-semibold text-primary"
                    >
                      Project Management</a
                    >
                  </p>
                </div>               
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <div class="card custom-card">
          <div class="card-header justify-content-between">
            <div class="card-title">Statistiques de technicien</div>            
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table text-nowrap table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Technicien</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Nomber de rapport</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listOfTechnicien" :key="item">
                    <th scope="row">{{ item.id }}</th>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-sm me-2 avatar-rounded">
                          <img src="../assets/images/faces/15.jpg" alt="img" />
                        </div>
                        <div>
                          <div class="lh-1">
                            <span>{{ item.name }}</span>
                          </div>
                          <div class="lh-1">
                            <span class="fs-11 text-muted">{{ item.email }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {{  item.city.city_name }}
                    </td>
                    <td>{{ item.reports_count }} Rapports</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>        
        </div>
      </div>
    </div>   
  </div>
</template>

<style></style>
