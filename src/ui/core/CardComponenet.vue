<script setup lang="ts">

defineProps({
    title : String,
    icon : String,
    value : String,
    iconColor : String
})
</script>

<template>
  <div class="card custom-card">
    <div class="card-body">
      <div class="d-flex flex-wrap align-items-top justify-content-between">
        <div class="flex-fill">
          <p class="mb-0 text-muted">{{ title }}</p>
          <div class="d-flex align-items-center">
            <span class="fs-5 fw-semibold">{{ value }}</span>            
          </div>
        </div>
        <div>
          <span class="avatar avatar-md avatar-rounded fs-18" :class="iconColor">
            <i class="fs-16" :class="icon"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
