import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { store } from './store';
import { topFilms } from './data';
const initialState = {
  users: [],
  user: null,
  films: topFilms
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
      toast.success('Üye olma Başarılı');
    },
    login: (state, action) => {
      const foundUser = state.users.find(
        (item) => item.email === action.payload.email && item.password === action.payload.password
      );
      if (!foundUser) {
        toast.error('Lütfen giriş bilgilerinizi kontrol ediniz');
      } else {
        toast.success('Giriş Başarılı');
        state.user = foundUser;
      }
    },
    purchase: (state, action) => {
      if (!state.user.purchasedFilms) {
        state.user.purchasedFilms = [];
      }
      state.user.purchasedFilms.push(action.payload);

      console.log(state.user.purchasedFilms);

      const foundUser = state.users.find((item) => item.email === state.user.email);
      const foundFilm = state.films.find((item) => item.name === action.payload.name);
      if (!foundUser.purchasedFilms) {
        foundUser.purchasedFilms = [];
      }
      foundUser.purchasedFilms.push(action.payload);
      foundFilm.selectedChairs = action.payload.selectedIndexes;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { register, login, logout, purchase } = authSlice.actions;

export const selectFilmById = (state, id) => {
  return state.auth.films.find((item) => parseInt(item.id) === parseInt(id));
};

export default authSlice.reducer;
