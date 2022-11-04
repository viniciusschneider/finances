<template>
  <div
    class="login-container d-flex flex-column justify-content-between align-items-center p-5"
  >
    <h1>Minhas finanças</h1>

    <div class="d-flex flex-column align-items-center justify-content-center">
      <p>Entrar com o Google</p>
      <Skeleton
        v-if="loading"
        border-radius="50%"
        height="128px"
        width="128px"
      />
      <button v-else @click="login">
        <img src="@/assets/google-logo.png" alt="Google logo" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithRedirect
} from '@firebase/auth';
import { computed } from 'vue';
import { useStore } from '@/store';
import Skeleton from '@/components/Skeleton.vue';

const auth = getAuth();
const provider = new GoogleAuthProvider();
const store = useStore();
const loading = computed<boolean>(() => store.state.ui.loadingApp);

async function login() {
  try {
    await setPersistence(auth, browserLocalPersistence);
    signInWithRedirect(auth, provider);
  } catch (e) {
    console.error(e);
    alert('Oops, ocorreu um erro inesperado.');
  }
}
</script>

<style scoped lang="scss">
.login-container {
  gap: 100px;

  p {
    font-size: 18px;
  }

  button {
    background: white;
    border-radius: 50%;
    border: none;
    box-shadow: 0 5px 10px #ccc;
    outline: none;
    transition: all ease-in-out 0.1s;
    z-index: 999;

    &:active {
      background: #eee;
    }
  }
}
</style>
