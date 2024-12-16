import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clinicReducer from "./slices/clinicSlice"
import appointmentReducer from "./slices/apppointmentSlice"
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    clinic: clinicReducer,
    appointments: appointmentReducer,
    auth: authReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
