import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://dental-backend-three.vercel.app/api/v1/myappointment",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("API Response:", response.data); // Log the response for debugging
      return response.data.book; // Extract and return the 'book' array
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.message || "Failed to fetch appointments"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Appointment slice
interface Appointment {
  _id: string;
  serviceName: string;
  state: string;
  city: string;
  address: string;
  appointmentDate: string; // ISO string format
  time: string; // e.g., "09:00"
  user: string;
  createdAt: string;
}

interface AppointmentState {
  upcomingAppointments: Appointment[];
  previousAppointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  upcomingAppointments: [],
  previousAppointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        const currentDate = new Date();

        // Separate appointments into upcoming and previous
        const upcoming = action.payload.filter(
          (appointment) => new Date(appointment.appointmentDate) > currentDate
        );
        const previous = action.payload.filter(
          (appointment) => new Date(appointment.appointmentDate) <= currentDate
        );

        state.upcomingAppointments = upcoming;
        state.previousAppointments = previous;
        state.loading = false;
      })
      .addCase(fetchAppointments.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
