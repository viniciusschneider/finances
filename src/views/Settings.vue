<template>
  <div class="mt-3">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item border">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Categorias
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <table class="w-100">
              <tbody>
                <tr v-for="{ id, name } of categories" :key="id">
                  <td>{{ name }}</td>
                  <td>
                    <button class="btn text-danger" @click="deleteItem(id)">
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
                <tr cols="4" v-if="categories.length === 0">
                  Nenhuma categoria cadastrada!
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary" @click="openDialog">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  writeBatch
} from '@firebase/firestore';
import { computed } from 'vue';
import { ICategoryItem } from '@/models/category-item.interface';
import { useStore } from '@/store';
import db from '@/plugins/firebase';
import FormCategory from '@/components/dialogs/FormCategory.vue';

const store = useStore();
const categories = computed<ICategoryItem[]>(
  () => store.state.categories.items
);

function openDialog() {
  store.commit('ui/openDialog', FormCategory);
}

async function deleteItem(id: string) {
  if (
    !confirm(
      'A exclusão desta categoria irá excluir também todos os itens relacionados. Deseja confirmar?'
    )
  )
    return;

  await deleteDoc(doc(db, 'categories', id));
  const docs = await getDocs(
    query(collection(db, 'finances'), where('category.id', '==', id))
  );
  const batch = writeBatch(db);
  docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}
</script>
