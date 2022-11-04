<template>
  <div
    class="totals-container d-flex justify-content-center align-items-center bg-info p-4 w-100"
  >
    <Skeleton v-if="loading" border-radius="5px" height="15px" width="70px" />
    <p
      v-else
      v-for="({ id, max, name, value }, index) of categories"
      :key="id"
      class="m-0 fw-bold text-white"
      :class="{ 'mb-2': index === 0 }"
    >
      <span class="px-1">{{ name }}</span>
      <span class="px-1">
        {{
          index === 0
            ? `${currency(value, false)}`
            : `${currency(value, false)} / ${currency(max, false)}`
        }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ICategoryItemView } from '@/models/category-item-view.interface';
import { currency } from '@/shared/functions';
import { useStore } from '@/store';
import { computed } from 'vue';
import Skeleton from './Skeleton.vue';

const store = useStore();
const categories = computed<ICategoryItemView[]>(() =>
  store.state.finances.items.reduce(
    (old, { value, category: { id, name, max } }) => {
      const index: number = old.findIndex(({ id: findId }) => findId === id);
      old[0].value += value;

      if (index > 0) {
        old[index].value += value;
      } else {
        old.push({
          id,
          name,
          value,
          max
        });
      }

      return old;
    },
    [{ id: '0', name: 'Total', value: 0, max: 0 }]
  )
);
const loading = computed<boolean>(() => store.state.finances.loading);
</script>

<style scoped lang="scss">
.totals-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
