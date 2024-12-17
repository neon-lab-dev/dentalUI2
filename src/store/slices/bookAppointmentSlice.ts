import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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


