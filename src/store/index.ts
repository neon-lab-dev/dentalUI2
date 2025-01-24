import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clinicReducer from "./slices/clinicSlice"
import appointmentReducer from "./slices/apppointmentSlice"
import bookAppontmentReducer from "./slices/bookAppointmentSlice"
import providerReducer from "./slices/providerSlice";
import serviceReducer from "./slices/serviceSlice";
import availabilityReducer from "./slices/availabilitySlice";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    clinic: clinicReducer,
    appointments: appointmentReducer,
    auth: authReducer,
    bookAppointment: bookAppontmentReducer,
    providers: providerReducer,
    services: serviceReducer,
    availabilities: availabilityReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
