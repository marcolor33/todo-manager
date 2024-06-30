import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authApi';

export interface IAuthState {
  user: User | null;
}

const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { logout, setUser } = authSlice.actions;