<script setup>
defineProps({
    id: String,
    title: String,
    message: String,
    method: Function,
    isLoading: Boolean,
    itemid: String
});
</script>
<template>
    <div :id="id" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="modalCenterTitle" class="modal-title fw-bold">
                        {{ title }}
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <form @submit.prevent="method">
                    <div class="modal-body">
                        <input id="deleteInput" type="text" hidden  :value="itemid" />
                        <p>{{ message }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button  data-bs-dismiss="modal" type="submit" class="btn btn-danger" :disabled="isLoading">
                            <span v-if="isLoading" class="d-flex align-items-center">
                                <div class="spinner-border spinner-border-sm text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </span>
                            <span v-else >Oui, Supprimer-le</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style></style>