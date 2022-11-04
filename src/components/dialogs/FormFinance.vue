<template>
  <div>
    <h2>Novo</h2>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="date" class="form-label">Data</label>
        <input
          v-model="form.date"
          required
          type="date"
          class="form-control"
          id="date"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Descrição</label>
        <input
          v-model="form.description"
          required
          type="text"
          class="form-control"
          id="description"
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Categoria</label>
        <select
          v-model="form.category"
          required
          class="form-select"
          id="category"
        >
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="value" class="form-label">Valor</label>
        <input
          step="0.01"
          v-model="form.value"
          required
          type="number"
          class="form-control"
          id="value"
        />
      </div>
      <div class="d-flex justify-content-end">
        <div v-if="loading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <button v-else class="btn btn-primary">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where
} from 'firebase/firestore';
import { computed, reactive, ref } from 'vue';
import { format } from 'date-fns';
import { ICategoryItem } from '@/models/category-item.interface';
import { useStore } from '@/store';
import db from '@/plugins/firebase';

const store = useStore();
const loading = ref(false);
const categories = computed<ICategoryItem[]>(
  () => store.state.categories.items
);

const form = reactive({
  date: '',
  description: '',
  value: '',
  category: ''
});

async function submit() {
  loading.value = true;
  const userUid = store.state.user.uid;
  const date = new Date(`${form.date} 00:00:00`);
  const firstDayOfMonth = Timestamp.fromDate(
    new Date(format(date, 'yyyy-MM-01 00:00:00'))
  );
  const dateRef = await getDocs(
    query(
      collection(db, 'months'),
      where('date', '==', firstDayOfMonth),
      where('userUid', '==', userUid)
    )
  );

  let monthId = '';
  if (dateRef.empty) {
    const { id } = await addDoc(collection(db, 'months'), {
      date: firstDayOfMonth,
      userUid
    });

    monthId = id;
  } else {
    dateRef.forEach(({ id }) => {
      monthId = id;
    });
  }

  await addDoc(collection(db, 'finances'), {
    month: {
      date: Timestamp.fromDate(date),
      id: monthId
    },
    description: form.description,
    value: +form.value,
    category: form.category,
    userUid: store.state.user.uid
  });

  form.category = '';
  form.date = '';
  form.description = '';
  form.value = '';

  loading.value = false;
  store.commit('ui/closeDialog');
}
</script>
