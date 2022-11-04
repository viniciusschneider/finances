import { ActionContext } from 'vuex';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { IMonthItem } from '@/models/month-item.interface';
import { IMonthsState } from '@/models/months.state';
import { Unsubscribe } from '@firebase/util';
import db from '@/plugins/firebase';
import { IState } from '@/models/state.state';

export const initialState: () => IMonthsState = () => ({
  items: [],
  loading: true,
  unsubscribe: null
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setItems(state: IMonthsState, payload: IMonthItem[]): void {
      state.items = payload;
    },
    setUnsubscribe(state: IMonthsState, payload: Unsubscribe): void {
      state.unsubscribe = payload;
    },
    setLoading(state: IMonthsState, payload: boolean): void {
      state.loading = payload;
    }
  },
  actions: {
    bindMonths({
      commit,
      state,
      rootState
    }: ActionContext<IMonthsState, IState>): void {
      if (state.unsubscribe) state.unsubscribe();

      const q = query(
        collection(db, 'months'),
        where('userUid', '==', rootState.user.uid),
        orderBy('date', 'asc')
      );
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const items: IMonthItem[] = [];
        querySnapshot.forEach((doc) => {
          items.push({
            date: doc.data().date.toDate(),
            id: doc.id
          });
        });

        commit('setItems', items);
        commit('setLoading', false);

        if (items.length === 0)
          commit('finances/setLoading', false, { root: true });
      });

      commit('setUnsubscribe', unsubscribe);
    }
  }
};
