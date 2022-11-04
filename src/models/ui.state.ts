import { ShallowRef } from 'vue';

export interface IUiState {
  loadingApp: boolean;
  showDialog: boolean;
  dialogComponent: ShallowRef;
}
