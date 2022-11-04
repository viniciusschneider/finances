import { IUiState } from '@/models/ui.state';
import { shallowRef } from 'vue';

export const initialState: () => IUiState = () => ({
  loadingApp: false,
  showDialog: false,
  dialogComponent: shallowRef(null)
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    openDialog(state: IUiState, payload: any): void {
      state.dialogComponent = payload;
      state.showDialog = true;
    },
    closeDialog(state: IUiState): void {
      state.showDialog = false;
    },
    setLoadingApp(state: IUiState, payload: boolean): void {
      state.loadingApp = payload;
    }
  }
};
