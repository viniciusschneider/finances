import {
  createStore,
  useStore as baseUseStore,
  Store,
  ActionContext
} from 'vuex';
import { InjectionKey } from 'vue';
import { getAuth } from '@firebase/auth';
import router, { EnumRouteNames } from '@/router';
import { IState } from '@/models/state.state';
import categories, {
  initialState as initialStateCategories
} from './categories';
import finances, { initialState as initialStateFinances } from './finances';
import months, { initialState as initialStateMonths } from './months';
import ui, { initialState as initialStateUi } from './ui';
import user, { initialState as initialStateUser } from './user';

export const key: InjectionKey<Store<IState>> = Symbol();

export default createStore<IState>({
  modules: {
    categories,
    finances,
    months,
    ui,
    user
  },
  mutations: {
    resetState(state: IState) {
      state.finances.unsubscribe && state.finances.unsubscribe();
      state.categories.unsubscribe && state.categories.unsubscribe();
      state.months.unsubscribe && state.months.unsubscribe();
      state.categories = initialStateCategories();
      state.finances = initialStateFinances();
      state.months = initialStateMonths();
      state.ui = initialStateUi();
      state.user = initialStateUser();
    }
  },
  actions: {
    async logout({ commit }: ActionContext<IState, IState>): Promise<void> {
      await getAuth().signOut();
      commit('resetState');
      router.push({ name: EnumRouteNames.LOGIN });
    }
  }
});

export const useStore = (): Store<IState> => {
  return baseUseStore(key);
};
