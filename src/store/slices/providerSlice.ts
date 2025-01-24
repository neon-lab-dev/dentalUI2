import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { easyAppointmentsService, Provider } from '@/services/easyAppointments';
import { AxiosError } from 'axios';

// Interface for the provider state
interface ProviderState {
    providers: Provider[];
    providersByState: { [key: string]: Provider[] };
    loading: boolean;
    error: string | null;
}

// Helper function to group providers by state
const groupProvidersByState = (providers: Provider[]) => {
    return providers.reduce((acc: { [key: string]: Provider[] }, provider) => {
        const state = provider.state || 'Unknown';
        if (!acc[state]) {
            acc[state] = [];
        }
        acc[state].push(provider);
        return acc;
    }, {});
};

const initialState: ProviderState = {
    providers: [],
    providersByState: {},
    loading: false,
    error: null,
};

// Async thunk for fetching providers
export const fetchProviders = createAsyncThunk<
    Provider[],
    void,
    { rejectValue: string }
>(
    'providers/fetchProviders',
    async (_, { rejectWithValue }) => {
        try {
            const providers = await easyAppointmentsService.getProviders();
            return providers;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.message || 'Failed to fetch providers');
            }
            return rejectWithValue('Failed to fetch providers');
        }
    }
);

const providerSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        clearProviders: (state) => {
            state.providers = [];
            state.providersByState = {};
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProviders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProviders.fulfilled, (state, action: PayloadAction<Provider[]>) => {
                state.loading = false;
                state.providers = action.payload;
                state.providersByState = groupProvidersByState(action.payload);
            })
            .addCase(fetchProviders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export const { clearProviders } = providerSlice.actions;
export default providerSlice.reducer;