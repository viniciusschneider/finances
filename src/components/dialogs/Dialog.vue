<template>
  <div id="dialog" v-if="show" @click="closeDialog">
    <component :is="component"></component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const show = computed<boolean>(() => store.state.ui.showDialog);
const component = computed(() => store.state.ui.dialogComponent);

function closeDialog(e: any) {
  if (e.target.id === 'dialog') store.commit('ui/closeDialog');
}
</script>

<style scoped lang="scss">
@keyframes open {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
#dialog {
  align-items: center;
  animation-duration: 0.3s;
  animation-name: open;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw;

  & > div {
    background: white;
    border-radius: 15px;
    min-width: 80%;
    padding: 15px;
  }
}
</style>
