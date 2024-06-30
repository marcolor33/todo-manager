import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authApi';

export interface IAuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: IAuthState = {
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    clearAuthentication: () => initialState,
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { clearAuthentication, setUser, setAccessToken } =
  authSlice.actions;
