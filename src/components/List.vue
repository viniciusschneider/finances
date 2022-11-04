<template>
  <div v-if="loading" class="d-flex justify-content-center mt-3">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <table v-else class="w-100">
    <tbody>
      <tr v-for="item of items" :key="item.id">
        <td>{{ date(item.month.date) }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.category.name }}</td>
        <td>{{ currency(item.value) }}</td>
        <td>
          <button class="btn text-danger" @click="deleteItem(item.id)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
      <tr cols="4" v-if="items.length === 0">
        Nenhum resultado encontrado.
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { currency, date } from '@/shared/functions';
import { IFinanceItem } from '@/models/finance-item.interface';
import { useStore } from '@/store/index';
import { deleteDoc, doc } from '@firebase/firestore';
import db from '@/plugins/firebase';

const store = useStore();
const items = computed<IFinanceItem[]>(() => store.state.finances.items);
const loading = computed<boolean>(() => store.state.finances.loading);

async function deleteItem(id: string) {
  if (!confirm('Deseja realmente excluir este item?')) return;

  await deleteDoc(doc(db, 'finances', id));
}
</script>
