import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '@/store'; // Adjust import paths based on your project structure

// Define the state type
interface BookAppointmentState {
    clinicId: string;
    serviceName: string;
    state: string;
    city: string;
    address: string;
    BookAppointmentDate: string;
    time: string;
}

// Initial state with proper type
const initialState: BookAppointmentState = {
    clinicId: '',
    serviceName: '',
    state: '',
    city: '',
    address: '',
    BookAppointmentDate: '',
    time: '',
};

// Create the slice
const bookAppointmentSlice = createSlice({
    name: 'BookAppointment',
    initialState,
    reducers: {
        updateField: (
            state,
            action: PayloadAction<{ field: keyof BookAppointmentState; value: string }>
        ) => {
            const { field, value } = action.payload;
            state[field] = value; // Dynamically update the field
        },
        resetForm: (state) => {
            Object.assign(state, initialState); // Reset state
        },
    },
});

// Export actions
export const { updateField, resetForm } = bookAppointmentSlice.actions;

// Export reducer
export default bookAppointmentSlice.reducer;

// Async thunk to send data to the API
// Async thunk to send data to the API
export const submitBookAppointment = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { bookAppointment } = getState(); // Get form data from Redux

    try {
        const response = await axios.post(
            'http://localhost:7000/api/v1/book/new',
            bookAppointment,
            { withCredentials: true } // Include credentials
        );
        console.log('BookAppointment booked successfully:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific error
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            // Generic error fallback
            console.error('Error booking BookAppointment:', (error as Error).message);
        }
    }
};

