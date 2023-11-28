<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '@/services'
import router from '@/router'

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const error = ref(false)

const submit = async () => {
  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('password', password.value)
  isLoading.value = true
  await auth
    .login(formData)
    .then(() => {
      router.replace({ name: 'dashboard' })
      error.value = false
      isLoading.value = false
    })
    .catch(() => {
      error.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <form class="autentication-bg" @submit.prevent="submit">
    <div class="container-lg">
      <div
        class="row justify-content-center authentication authentication-basic align-items-center h-100"
      >
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12">
          <div class="card custom-card">
            <div class="mt-4 d-flex justify-content-center">
              <a href="index.html">
                <img src="/src/assets/images/favicon.png" alt="logo" width="160" class="mb-4 mt-4" />
              </a>
            </div>
            <div class="card-body p-4">
              <p class="h5 fw-semibold mb-2 text-center">Se connecter</p>
              <p class="mb-4 text-muted op-7 fw-normal text-center">
                Connectez-vous pour accéder à votre tableau de bord
              </p>
              <div v-if="error" class="alert alert-danger rounded alert-dismissible fade show">
                Nous regrettons de vous informer qu'aucun compte n'a été trouvé avec cet
                identifiant.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <div class="row gy-3">
                <div class="col-xl-12">
                  <label for="signin-username" class="form-label text-default"
                    >Adresse e-mail</label
                  >
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    id="signin-username"
                    placeholder="Ex : a.contact@neweracom.ma"
                    v-model="email"
                  />
                </div>
                <div class="col-xl-12 mb-2">
                  <label for="signin-password" class="form-label text-default d-block"
                    >Mot de passe<a href="reset-password.html" class="float-end text-danger"
                      >Mot de passe oublié ?</a
                    ></label
                  >
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      id="signin-password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      v-model="password"
                    />
                    <button
                      class="btn btn-light"
                      type="button"
                      onclick="createpassword('signin-password',this)"
                      id="button-addon2"
                    >
                      <i class="ri-eye-off-line align-middle"></i>
                    </button>
                  </div>
                </div>
                <div class="col-xl-12 d-grid mt-2">
                  <button
                    class="btn btn-primary d-grid d-flex w-100"
                    type="submit"
                    :disabled="isLoading"
                  >
                    <span
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm ms-auto me-auto"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span v-else class="ms-auto me-auto">Se connecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
