<template>
  <div class="skeleton" :style="{ borderRadius, height, width }"></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  borderRadius: string;
  height: string;
  width: string;
}>();
</script>

<style scoped lang="scss">
@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}
</style>
