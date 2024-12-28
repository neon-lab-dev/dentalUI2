/**
 * EasyAppointments API Service
 * This service handles all interactions with the EasyAppointments backend API,
 * including customer management and appointment scheduling.
 * 
 * @module services/easyAppointments
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';

// Base URL for the EasyAppointments API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/index.php/api/v1';

// Configuration loaded from environment variables with fallback values
const CONFIG = {
    providerId: process.env.NEXT_PUBLIC_PROVIDER_ID ? parseInt(process.env.NEXT_PUBLIC_PROVIDER_ID) : 5,
    serviceId: process.env.NEXT_PUBLIC_SERVICE_ID ? parseInt(process.env.NEXT_PUBLIC_SERVICE_ID) : 2,
    username: process.env.NEXT_PUBLIC_API_USERNAME || 'test123',
    password: process.env.NEXT_PUBLIC_API_PASSWORD || 'test123'
};

// Initialize axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${CONFIG.username}:${CONFIG.password}`)
    },
    withCredentials: false
});

// Debug interceptor for development environment
apiClient.interceptors.request.use((config) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Making request to:', config.url);
        console.log('Request payload:', config.data);
    }
    return config;
});

// Error handling interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        }
        return Promise.reject(error);
    }
);

// API Interface definitions
/**
 * Customer creation payload interface
 * Contains all required fields for creating a new customer
 */
interface CustomerPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city?: string;
    zip?: string;
    timezone?: string;
    language?: string;
    notes?: string;
}

/**
 * Customer response interface
 * Represents the structure of customer data returned by the API
 */
interface CustomerResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    zip: string;
    notes: string;
}

/**
 * Appointment creation payload interface
 * Contains all required fields for creating a new appointment
 */
interface AppointmentPayload {
    start: string;          // Appointment start time in format: "YYYY-MM-DD HH:mm:ss"
    end: string;            // Appointment end time in format: "YYYY-MM-DD HH:mm:ss"
    location: string;       // Location/clinic address
    notes: string;          // Additional appointment notes
    customerId: number;     // ID of the customer making the appointment
    providerId: number;     // ID of the healthcare provider
    serviceId: number;      // ID of the service being booked
    status?: string;        // Appointment status (e.g., "Booked", "Completed")
    color?: string;         // Optional color coding for the appointment
}

/**
 * API Error interface
 * Standardized error structure for API responses
 */
interface ApiError {
    message: string;        // Human-readable error message
    code: string;          // Error code for programmatic handling
    details?: {            // Additional error details
        response?: {
            data?: any;
            status?: number;
        };
        message?: string;
    };
}

/**
 * Appointment data interface
 * Contains all the information needed to create an appointment
 */
interface AppointmentData {
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    appointmentDate: string;    // Date in format: "YYYY-MM-DD"
    time: string;              // Time in format: "HH:mm"
    address?: string;
    serviceName?: string;
    induranceStatus?: string;
    dob?: string;              // Date of birth
    state?: string;
    city?: string;
    clinicId?: string;
}

/**
 * Service class for handling all EasyAppointments API interactions
 */
class EasyAppointmentsService {
    /**
     * Handles API errors in a consistent manner
     * @param error - The caught error
     * @param defaultMessage - Default message if error details are not available
     * @returns Standardized ApiError object
     */
    private handleApiError(error: unknown, defaultMessage: string): ApiError {
        return {
            message: error instanceof AxiosError
                ? error.response?.data?.message || defaultMessage
                : defaultMessage,
            code: (error instanceof AxiosError && error.code) 
                ? error.code
                : 'UNKNOWN_ERROR',
            details: error instanceof AxiosError ? {
                response: error.response,
                message: error.message
            } : undefined
        };
    }

    /**
     * Searches for a customer by their email address
     * @param email - Customer's email address
     * @returns Customer data if found, null otherwise
     */
    private async findCustomerByEmail(email: string): Promise<CustomerResponse | null> {
        try {
            const response = await apiClient.get<CustomerResponse[]>('/customers');
            return response.data.find(
                customer => customer.email.toLowerCase() === email.toLowerCase()
            ) || null;
        } catch (error) {
            console.error('Error fetching customers:', error);
            return null;
        }
    }

    /**
     * Creates a new customer in the system
     * @param customerData - Customer information
     * @returns Created customer data
     */
    private async createCustomer(customerData: CustomerPayload): Promise<CustomerResponse> {
        try {
            const response = await apiClient.post<CustomerResponse>('/customers', customerData);
            return response.data;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to create customer');
        }
    }

    /**
     * Finds an existing customer or creates a new one
     * @param appointmentData - Appointment data containing customer information
     * @returns Customer ID
     */
    private async findOrCreateCustomer(appointmentData: AppointmentData): Promise<number> {
        try {
            if (!appointmentData.email) {
                throw new Error('Email is required for customer lookup/creation');
            }

            const existingCustomer = await this.findCustomerByEmail(appointmentData.email);
            if (existingCustomer) {
                return existingCustomer.id;
            }

            const customerData: CustomerPayload = {
                firstName: appointmentData.first_name,
                lastName: appointmentData.last_name,
                email: appointmentData.email,
                phone: appointmentData.phone?.toString() || '',
                city: appointmentData.city,
                timezone: 'UTC',
                language: 'english',
                notes: `Insurance: ${appointmentData.induranceStatus || 'Not Provided'}, DOB: ${appointmentData.dob || 'Not Provided'}`
            };

            const newCustomer = await this.createCustomer(customerData);
            return newCustomer.id;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to process customer data');
        }
    }

    /**
     * Creates a new appointment in the system
     * @param appointmentData - Complete appointment information
     * @returns Created appointment data
     */
    async createAppointment(appointmentData: AppointmentData) {
        try {
            // Validate required fields
            this.validateAppointmentData(appointmentData);

            // Find or create customer
            const customerId = await this.findOrCreateCustomer(appointmentData);

            // Create appointment payload according to API spec
            const appointmentPayload: AppointmentPayload = {
                start: `${appointmentData.appointmentDate} ${appointmentData.time}:00`,
                end: this.calculateEndTime(appointmentData.appointmentDate, appointmentData.time),
                location: `${appointmentData.address || ''} ${appointmentData.city || ''} ${appointmentData.state || ''}`.trim(),
                notes: `Service: ${appointmentData.serviceName || 'Not specified'}, Insurance: ${appointmentData.induranceStatus || 'Not Provided'}`,
                customerId: customerId,
                providerId: CONFIG.providerId,
                serviceId: CONFIG.serviceId,
                status: 'Booked'
            };

            const response = await apiClient.post('/appointments', appointmentPayload);
            return response.data;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to create appointment');
        }
    }

    /**
     * Tests the connection to the EasyAppointments API
     * @returns true if connection is successful, false otherwise
     */
    async testConnection(): Promise<boolean> {
        try {
            await apiClient.get('/services');
            return true;
        } catch (error) {
            console.error('API Connection failed:', error);
            return false;
        }
    }

    /**
     * Validates required appointment data fields
     * @param data - Appointment data to validate
     * @throws Error if required fields are missing
     */
    private validateAppointmentData(data: AppointmentData): void {
        const requiredFields: (keyof AppointmentData)[] = [
            'first_name',
            'last_name',
            'email',
            'phone',
            'appointmentDate',
            'time'
        ];

        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
    }

    /**
     * Calculates the end time for an appointment
     * @param date - Appointment date
     * @param startTime - Start time
     * @returns End time in format "YYYY-MM-DD HH:mm:ss"
     */
    private calculateEndTime(date: string, startTime: string): string {
        const appointmentDuration = 30; // Default duration in minutes
        const [hours, minutes] = startTime.split(':');
        const startDateTime = new Date(`${date}T${hours}:${minutes}:00`);
        const endDateTime = new Date(startDateTime.getTime() + appointmentDuration * 60000);
        return `${date} ${endDateTime.getHours().toString().padStart(2, '0')}:${endDateTime.getMinutes().toString().padStart(2, '0')}:00`;
    }
}

// Export a singleton instance
export const easyAppointmentsService = new EasyAppointmentsService();
