/**
 * Interface defining the structure of appointment data for EasyAppointments API
 */
export interface AppointmentData {
    // Required fields for API
    first_name: string;     // Patient's first name
    last_name: string;      // Patient's last name
    email: string;          // Patient's email address
    phone: number;          // Patient's contact number
    appointmentDate: string; // Selected date for the appointment (YYYY-MM-DD)
    time: string;           // Selected time slot (HH:mm)
    serviceId: number;      // ID of the selected service
    providerId: number;     // ID of the selected provider
    
    // Optional fields
    dob?: string;           // Patient's date of birth (optional)
    induranceStatus?: string; // Patient's insurance status (optional)
    notes?: string;         // Additional notes
    
    // Location info (for display purposes only)
    address?: string;        // Full address of the clinic
    city?: string;          // City where the clinic is located
    state?: string;         // State where the clinic is located
    serviceName?: string;   // Name of the dental service
}

/**
 * Type for partial appointment data during form filling
 */
export type PartialAppointmentData = Partial<AppointmentData>;

/**
 * Type for required fields in appointment data
 */
export type RequiredAppointmentFields = Pick<AppointmentData, 'serviceId' | 'providerId' | 'appointmentDate' | 'time'>;

/**
 * Type for final booking data that includes required fields
 */
export type FinalBookingData = RequiredAppointmentFields & Partial<Omit<AppointmentData, keyof RequiredAppointmentFields>>;
