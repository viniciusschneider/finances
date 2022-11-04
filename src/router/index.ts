import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import store from '@/store';

export enum EnumRouteNames {
  HOME = 'Home',
  LOGIN = 'Login',
  SETTINGS = 'Settings'
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: EnumRouteNames.HOME,
    component: () => import('../views/Home.vue'),
    strict: false
  },
  {
    path: '/login',
    name: EnumRouteNames.LOGIN,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/settings',
    name: EnumRouteNames.SETTINGS,
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const token = store.state.user.accessToken;

    if (to.name !== EnumRouteNames.LOGIN && !token) {
      localStorage['toPage'] = to.path;
      next({ name: EnumRouteNames.LOGIN });
    } else if (to.name === EnumRouteNames.LOGIN && !!token) {
      next({ name: EnumRouteNames.HOME });
    } else {
      next();
    }
  }
);

export default router;
