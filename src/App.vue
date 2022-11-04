<template>
  <header class="w-100" v-if="userUid">
    <nav
      class="navbar navbar-light bg-light d-flex justify-content-between align-items-center p-2"
    >
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <router-link
            class="nav-link p-2"
            active-class="disabled"
            :to="{ name: EnumRouteNames.HOME }"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link p-2"
            active-class="disabled"
            :to="{ name: EnumRouteNames.SETTINGS }"
            >Configurações</router-link
          >
        </li>
      </ul>
      <div
        class="profile dropdown p-1"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
      >
        <div>
          <span class="d-none d-sm-inline-block">{{ user.name }}</span>
          <img v-if="user.photoURL" :src="user.photoURL" alt="Profile" />
        </div>
        <ul
          class="dropdown-menu dropdown-menu-end m-0"
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <button type="button" class="btn btn-link p-2" @click="logout">
              Sair <i class="bi bi-box-arrow-left"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <main class="container m-auto">
    <router-view />
  </main>
  <Dialog v-if="userUid" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { EnumRouteNames } from './router';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { IUserState } from './models/user.state';
import { useRouter } from 'vue-router';
import { useStore } from './store';
import Dialog from './components/dialogs/Dialog.vue';

const auth = getAuth();
const router = useRouter();
const store = useStore();
const userUid = computed<boolean>(() => !!store.state.user.uid);
const user = computed<IUserState>(() => store.state.user);

onMounted(() => {
  store.commit('ui/setLoadingApp', true);
  onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      const { displayName: name, email, uid, photoURL }: User = user;
      const accessToken = await user.getIdToken();
      store.commit('user/setUser', {
        accessToken,
        email,
        name,
        photoURL,
        uid
      } as IUserState);
      const toPage = localStorage['toPage'];
      if (toPage) router.replace({ path: toPage });
      else router.replace({ name: EnumRouteNames.HOME });
    } else {
      store.dispatch('logout');
    }
  });
});

async function logout() {
  store.dispatch('logout');
}
</script>

<style scoped lang="scss">
.profile {
  &:hover {
    cursor: pointer;
  }

  & > div {
    align-items: center;
    display: flex;
    gap: 10px;

    img {
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }

    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 200px;
    }
  }

  li button {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
}
</style>
