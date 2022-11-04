<template>
  <div class="m-4">
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="addFinance">Adicionar</button>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div
        class="finances-container d-flex flex-column justify-content-center align-items-center"
      >
        <Filters class="my-3" />
        <Totals />
        <List />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import Filters from '@/components/Filters.vue';
import FormFinance from '@/components/dialogs/FormFinance.vue';
import List from '@/components/List.vue';
import Totals from '@/components/Totals.vue';

const store = useStore();

function addFinance() {
  if (store.state.categories.items.length === 0) {
    alert('Por favor cadastre ao menos uma categoria para poder continuar!');
    return;
  }
  store.commit('ui/openDialog', FormFinance);
}
</script>

<style lang="scss" scoped>
.finances-container {
  max-width: 500px;
  width: 100%;
}
</style>
