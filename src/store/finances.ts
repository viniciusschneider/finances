import { IFinanceItem } from '@/models/finance-item.interface';
import { IFinancesState } from '@/models/finances.state';
import db from '@/plugins/firebase';
import { Unsubscribe } from '@firebase/util';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { ActionContext } from 'vuex';
import { IFinancesFilter } from '@/models/finances-filter.interface';
import { IState } from '@/models/state.state';

export const initialState: () => IFinancesState = () => ({
  items: [],
  loading: true,
  unsubscribe: null
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setItems(state: IFinancesState, payload: IFinanceItem[]): void {
      state.items = payload;
    },
    setUnsubscribe(state: IFinancesState, payload: Unsubscribe): void {
      state.unsubscribe = payload;
    },
    setLoading(state: IFinancesState, payload: boolean): void {
      state.loading = payload;
    }
  },
  actions: {
    bindFinances(
      { commit, state, rootState }: ActionContext<IFinancesState, IState>,
      { categoryId, monthId }: IFinancesFilter
    ): void {
      commit('setLoading', true);
      if (state.unsubscribe) state.unsubscribe();

      const wheres = [where('userUid', '==', rootState.user.uid)];

      if (categoryId) wheres.push(where('category.id', '==', categoryId));

      if (monthId) wheres.push(where('month.id', '==', monthId));

      const q = query(
        collection(db, 'finances'),
        ...wheres,
        orderBy('month.date', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items: IFinanceItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            month: {
              id: data.month.id as string,
              date: data.month.date.toDate() as Date
            },
            description: data.description as string,
            id: doc.id,
            value: data.value as number,
            category: data.category
          });
        });

        commit('setItems', items);
        commit('setLoading', false);
      });

      commit('setUnsubscribe', unsubscribe);
    }
  }
};
