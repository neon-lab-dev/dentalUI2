// features/clinicsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the structure of a clinic
export interface Clinic {
  _id: string;
  state: string;
  city: string;
  address: string;
  schedule: Array<{
    date: string;
    slots: Array<{
      time: string;
      isBooked: boolean;
      _id: string;
    }>;
  }>;
}

// Define the structure of grouped clinics
export interface GroupedClinics {
    newYorkCity: { clinics: Clinic[]; count: number };
    losAngeles: { clinics: Clinic[]; count: number };
    houston: { clinics: Clinic[]; count: number };
    chicago: { clinics: Clinic[]; count: number };
  }

// Define the structure of the state
interface ClinicState {
  clinics: Clinic[]; // Raw data
  loading: boolean;
  error: string | null;
  groupedClinics: GroupedClinics;
}

// Initial state
const initialState: ClinicState = {
  clinics: [],
  loading: false,
  error: null,
  groupedClinics: {
    newYorkCity: { clinics: [], count: 0 },
    losAngeles: { clinics: [], count: 0 },
    houston: { clinics: [], count: 0 },
    chicago: { clinics: [], count: 0 },
  },
};

// Async thunk to fetch clinics
export const fetchClinics = createAsyncThunk("clinics/fetchClinics", async () => {
  const response = await axios.get("https://dental-backend-three.vercel.app/api/v1/allclinic");
  console.log(response.data.clinics);
  return response.data.clinics as Clinic[]; // Explicitly type the response
});

// Helper function to divide clinics into arrays by state
const groupClinicsByState = (clinics: Clinic[]): GroupedClinics => {
  const grouped: GroupedClinics = {
    newYorkCity: { clinics: [], count: 0 },
    losAngeles: { clinics: [], count: 0 },
    houston: { clinics: [], count: 0 },
    chicago: { clinics: [], count: 0 },
  };

  clinics.forEach((clinic) => {
    const state = clinic.state.toLowerCase();
    switch (state) {
      case "new york city":
        grouped.newYorkCity.clinics.push(clinic);
        grouped.newYorkCity.count += 1;
        break;
      case "los angeles":
        grouped.losAngeles.clinics.push(clinic);
        grouped.losAngeles.count += 1;
        break;
      case "houston":
        grouped.houston.clinics.push(clinic);
        grouped.houston.count += 1;
        break;
      case "chicago":
        grouped.chicago.clinics.push(clinic);
        grouped.chicago.count += 1;
        break;
      default:
        break; // Skip unmatched states
    }
  });

  return grouped;
};

// Create the slice
const clinicsSlice = createSlice({
  name: "clinics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinics.fulfilled, (state, action) => {
        state.loading = false;
        state.clinics = action.payload;
        state.groupedClinics = groupClinicsByState(action.payload); // Process clinics
      })
      .addCase(fetchClinics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch clinics";
      });
  },
});

export default clinicsSlice.reducer;