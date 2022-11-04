import { IUserState } from '@/models/user.state';

export const initialState: () => IUserState = () => ({
  accessToken: '',
  email: '',
  name: '',
  photoURL: '',
  uid: ''
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setUser(state: IUserState, payload: IUserState): void {
      state.accessToken = payload.accessToken;
      state.email = payload.email;
      state.name = payload.name;
      state.photoURL = payload.photoURL;
      state.uid = payload.uid;
    }
  }
};
