import { ActionContext } from 'vuex';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { ICategoriesState } from '@/models/categories.state';
import { ICategoryItem } from '@/models/category-item.interface';
import { Unsubscribe } from '@firebase/util';
import db from '@/plugins/firebase';
import { IState } from '@/models/state.state';

export const initialState: () => ICategoriesState = () => ({
  items: [],
  loading: false,
  unsubscribe: null
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setItems(state: ICategoriesState, payload: ICategoryItem[]): void {
      state.items = payload;
    },
    setUnsubscribe(state: ICategoriesState, payload: Unsubscribe): void {
      state.unsubscribe = payload;
    }
  },
  actions: {
    bindCategories({
      commit,
      state,
      rootState
    }: ActionContext<ICategoriesState, IState>): void {
      if (state.unsubscribe) state.unsubscribe();

      const q = query(
        collection(db, 'categories'),
        where('userUid', '==', rootState.user.uid),
        orderBy('name', 'asc')
      );
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const items: ICategoryItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            name: data.name,
            id: doc.id,
            max: data.max
          });
        });
        commit('setItems', items);
      });

      commit('setUnsubscribe', unsubscribe);
    }
  }
};
