import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { easyAppointmentsService } from '@/services/easyAppointments';
import { AxiosError } from 'axios';

// Interface for the availability state
interface AvailabilityState {
    slots: string[];
    loading: boolean;
    error: string | null;
}

const initialState: AvailabilityState = {
    slots: [],
    loading: false,
    error: null,
};

interface FetchAvailabilitiesParams {
    providerId: number;
    serviceId: number;
    date: string;
}

// Async thunk for fetching availabilities
export const fetchAvailabilities = createAsyncThunk<
    string[], // Return type
    FetchAvailabilitiesParams, // Params type
    { rejectValue: string } // ThunkAPI configuration
>(
    'availabilities/fetchAvailabilities',
    async ({ providerId, serviceId, date }, { rejectWithValue }) => {
        try {
            const availabilities = await easyAppointmentsService.getAvailabilities(providerId, serviceId, date);
            return availabilities;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.message || 'Failed to fetch availabilities');
            }
            return rejectWithValue('Failed to fetch availabilities');
        }
    }
);

const availabilitySlice = createSlice({
    name: 'availabilities',
    initialState,
    reducers: {
        clearAvailabilities: (state) => {
            state.slots = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailabilities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAvailabilities.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.loading = false;
                state.slots = action.payload;
            })
            .addCase(fetchAvailabilities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export const { clearAvailabilities } = availabilitySlice.actions;
export default availabilitySlice.reducer;
