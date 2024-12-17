import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Appointment type definitions
interface Appointment {
  _id: string;
  serviceName: string;
  state: string;
  city: string;
  address: string;
  appointmentDate: string; // ISO string format
  user: string;
  createdAt: string;
}

interface AppointmentState {
  upcomingAppointments: Appointment[];
  previousAppointments: Appointment[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AppointmentState = {
  upcomingAppointments: [],
  previousAppointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      const currentDate = new Date();
      state.upcomingAppointments = action.payload.filter((appt) =>
        new Date(appt.appointmentDate) > currentDate
      );
      state.previousAppointments = action.payload.filter((appt) =>
        new Date(appt.appointmentDate) <= currentDate
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAppointments: () => initialState,
  },
});

export const { setAppointments, setLoading, setError, clearAppointments } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
