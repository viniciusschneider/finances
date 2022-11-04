<template>
  <div class="filters-container">
    <div class="select-container">
      <select
        v-model="filters.categoryId"
        class="form-select"
        id="filter-category"
        @change="filter"
      >
        <option value="">Selecione</option>
        <option
          v-for="category of categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="months-container">
      <template v-if="loading">
        <Skeleton
          v-for="(x, i) in 3"
          :key="i"
          border-radius="2rem"
          height="30px"
          width="100px"
        />
      </template>
      <span
        v-else
        class="d-flex justyfy-content-center align-items-center py-1 px-3 rounded-5"
        :class="{
          'bg-info': filters.monthId === month.id,
          'text-success': filters.monthId !== month.id
        }"
        @click="filters.monthId = month.id"
        v-for="month of months"
        :key="month.id"
      >
        {{ month.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { format } from 'date-fns';
import { ICategoryItem } from '@/models/category-item.interface';
import { IFinancesFilter } from '@/models/finances-filter.interface';
import { IMonthItem } from '@/models/month-item.interface';
import { reactive, watch } from 'vue';
import { translatedMonths } from '@/shared/constants';
import { useStore } from '@/store';
import Skeleton from './Skeleton.vue';

const store = useStore();
const filters = reactive<IFinancesFilter>({
  categoryId: '',
  monthId: ''
});
const categories = computed<ICategoryItem[]>(
  () => store.state.categories.items
);
const loading = computed<boolean>(() => store.state.months.loading);
const months = computed<(IMonthItem & { label: string })[]>(() => {
  const months = store.state.months.items.map((month) => ({
    ...month,
    label: `${translatedMonths[format(month.date, 'MMM')]}/${format(
      month.date,
      'yyyy'
    )}`
  }));

  if (!filters.monthId && months.length > 0)
    filters.monthId = months[months.length - 1].id;

  return months;
});

watch(filters, () => {
  filter();
});

function filter() {
  store.dispatch('finances/bindFinances', { ...filters } as IFinancesFilter);
}

store.dispatch('months/bindMonths');
store.dispatch('categories/bindCategories');
</script>

<style lang="scss" scoped>
.filters-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}
.select-container {
  min-width: max-content;
}
.months-container {
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  span {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
