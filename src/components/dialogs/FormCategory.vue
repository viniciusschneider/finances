<template>
  <div>
    <h2>Nova categoria</h2>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input
          v-model="form.name"
          required
          type="text"
          class="form-control"
          id="name"
        />
      </div>
      <div class="mb-3">
        <label for="max" class="form-label">Máximo</label>
        <input
          v-model="form.max"
          required
          type="number"
          step="0.01"
          class="form-control"
          id="max"
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
import { addDoc, collection } from 'firebase/firestore';
import { reactive, ref } from 'vue';
import { useStore } from '@/store';
import db from '@/plugins/firebase';

const store = useStore();
const loading = ref(false);
const form = reactive({
  max: null,
  name: ''
});

async function submit() {
  loading.value = true;
  const userUid = store.state.user.uid;
  const { max, name } = form;

  await addDoc(collection(db, 'categories'), {
    max,
    name,
    userUid
  });

  form.max = null;
  form.name = '';
  loading.value = false;
  store.commit('ui/closeDialog');
}
</script>
