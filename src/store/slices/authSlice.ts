import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the user data
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  induranceStatus: string;
  phoneNo: number;
  dob: string; // ISO string format
  role: string;
  createdAt: string; // ISO string format
  __v: number;
}

interface AuthState {
  user: User | null; // 'user' can be a User object or null
  error: string | null; // 'error' can be a string or null
  loading: boolean;
}

// Define the type for the payload of loginSuccess and loginFailure
interface LoginSuccessPayload {
  user: User;
}

interface LoginFailurePayload {
  error: string;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
      state.user = action.payload.user;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<LoginFailurePayload>) {
      state.error = action.payload.error;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
