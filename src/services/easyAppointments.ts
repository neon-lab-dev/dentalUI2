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
    address?: string;
    zipCode?: string;
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
 * Interface for appointment payload
 * Contains all required fields for creating a new appointment
 */
interface AppointmentPayload {
    book?: string;                  // Booking datetime (optional)
    start: string;                  // Appointment start time in format: "YYYY-MM-DD HH:mm:ss"
    end: string;                    // Appointment end time in format: "YYYY-MM-DD HH:mm:ss"
    location: string;               // Location/clinic address
    notes: string;                  // Additional appointment notes
    customerId: number;             // ID of the customer making the appointment
    providerId: number;             // ID of the healthcare provider
    serviceId: number;              // ID of the service being booked
    status?: string;                // Appointment status (e.g., "Booked")
    color?: string;                 // Optional color coding
    hash?: string;                  // Unique appointment hash
    googleCalendarId?: string | null; // Google Calendar event ID if synced
    caldavCalendarId?: string | null; // CalDAV event ID if synced
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
    serviceId?: number;        // Required for API but optional in interface
    providerId?: number;       // Required for API but optional in interface
    induranceStatus?: string;
    dob?: string;              // Date of birth
    state?: string;
    city?: string;
    clinicId?: string;         // Internal field, not used in API
}

/**
 * Interface for the API response structure
 */
export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

/**
 * Interface for a provider's settings
 */
export interface ProviderSettings {
    // Add any specific settings properties here
    [key: string]: any;
}

/**
 * Interface for a service
 */
export interface Service {
    id: number;
    name: string;
    duration: number;
    price: number;
    currency: string;
    description: string;
    availabilitiesType: string;
    attendantsNumber: number;
    categoryId: number | null;
}

/**
 * Interface for a provider
 */
export interface Provider {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    notes: string | null;
    timezone: string;
    services: Service[];
    settings: ProviderSettings;
}

/**
 * Interface for an appointment
 */
export interface Appointment {
    id: number;
    book: string;
    start: string;
    end: string;
    hash: string;
    location: string;
    notes: string | null;
    customerId: number | null;
    providerId: number;
    serviceId: number;
    googleCalendarId: string | null;
    status: string;
    serviceName?: string;
    providerName?: string;
    providerAddress?: string;
    providerCity?: string;
    providerState?: string;
    providerZip?: string;
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
     * Searches for a customer by email
     * @param email - Customer email to search for
     * @returns Customer data if found, null if not found
     */
    public async findCustomerByEmail(email: string): Promise<CustomerResponse | null> {
        try {
            console.log('🔍 [CUSTOMER SEARCH] Starting search for customer with email:', email);

            const response = await apiClient.get('/customers', {
                params: {
                    email: email
                }
            });

            console.log('📥 [CUSTOMER SEARCH] Got response:', response.data);

            // Find exact email match
            const customer = response.data.find((c: CustomerResponse) => c.email.toLowerCase() === email.toLowerCase());

            if (customer) {
                console.log('✅ [CUSTOMER SEARCH] Found existing customer:', customer);
                return customer;
            }

            console.log('ℹ️ [CUSTOMER SEARCH] No customer found with email:', email);
            return null;
        } catch (error) {
            console.error('🚨 [CUSTOMER SEARCH] Error searching for customer:', error);
            throw this.handleApiError(error, 'Failed to search for customer');
        }
    }

    /**
     * Creates a new customer
     * @param customerData - Customer data according to API spec
     * @returns Created customer data
     */
    public async createCustomer(customerData: CustomerPayload): Promise<CustomerResponse> {
        try {
            console.log('📝 [CUSTOMER CREATE] Creating customer with data:', customerData);

            const response = await apiClient.post('/customers', customerData);

            console.log('✅ [CUSTOMER CREATE] Customer created:', response.data);
            return response.data;
        } catch (error) {
            console.error('🚨 [CUSTOMER CREATE] Error creating customer:', error);
            throw this.handleApiError(error, 'Failed to create customer');
        }
    }

    /**
     * Creates a new appointment in the system
     * @param appointmentPayload - Appointment data according to API spec
     * @returns Created appointment data
     */
    async createAppointment(appointmentPayload: AppointmentPayload): Promise<boolean> {
        try {
            console.log('📝 [APPOINTMENT CREATE] Creating appointment with payload:', appointmentPayload);

            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('TIMEOUT')), 5000); // 5 second timeout
            });

            // Race between the API call and timeout
            const response = await Promise.race([
                apiClient.post('/appointments', appointmentPayload),
                timeoutPromise
            ]);

            return response != null;
        } catch (error) {
            console.error('🚨 [APPOINTMENT CREATE] Error creating appointment:', error);

            // If it's a timeout, return true to close loading and redirect
            if (error instanceof Error && error.message === 'TIMEOUT') {
                console.log('⚠️ [APPOINTMENT CREATE] Request timed out, assuming success');
                return true;
            }

            throw this.handleApiError(error, 'Failed to create appointment');
        }
    }

    /**
     * Book an appointment with customer details
     * First creates/finds customer, then creates appointment
     * @param data - Complete booking data including customer and appointment details
     */
    async bookAppointment(data: AppointmentData): Promise<boolean> {
        try {
            console.log('🔄 [BOOKING] Starting booking process with data:', data);

            // 1. Validate required fields
            this.validateAppointmentData(data);

            // 2. Find or create customer
            let customerId: number;

            console.log('🔍 [BOOKING] Checking if customer exists...');
            const existingCustomer = await this.findCustomerByEmail(data.email);

            if (existingCustomer) {
                console.log('✅ [BOOKING] Using existing customer:', existingCustomer);
                customerId = existingCustomer.id;
            } else {
                // Create new customer
                console.log('📝 [BOOKING] Creating new customer...');
                const customerData: CustomerPayload = {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    phone: data.phone.toString(),
                    address: data.address || '',
                    city: data.city || '',
                    notes: data.induranceStatus ? `Insurance Status: ${data.induranceStatus}` : ''
                };

                const newCustomer = await this.createCustomer(customerData);

                if (!newCustomer || !newCustomer.id) {
                    throw new Error('Failed to create customer: Invalid response from server');
                }

                console.log('✅ [BOOKING] New customer created:', newCustomer);
                customerId = newCustomer.id;
            }

            if (!customerId) {
                throw new Error('Failed to obtain customer ID');
            }

            // 3. Calculate appointment end time
            const startDateTime = `${data.appointmentDate} ${data.time}:00`;
            const endDateTime = this.calculateEndTime(data.appointmentDate, data.time);

            // 4. Create appointment payload
            const location = [data.address, data.city, data.state]
                .filter(Boolean)
                .join(', ');

            console.log('📝 [BOOKING] Creating appointment payload...');
            const appointmentPayload: AppointmentPayload = {
                start: startDateTime,
                end: endDateTime,
                location: location || 'No location provided',
                notes: `Insurance Status: ${data.induranceStatus || 'Not Provided'}\nDOB: ${data.dob || 'Not Provided'}`,
                customerId: customerId,
                providerId: Number(data.providerId),
                serviceId: Number(data.serviceId),
                book: startDateTime,
                status: 'Booked' // Changed from 'confirmed' to 'Booked' to match API
            };

            // 5. Book the appointment
            console.log('📝 [BOOKING] Sending appointment creation request with payload:', appointmentPayload);
            const success = await this.createAppointment(appointmentPayload);
            console.log('✅ [BOOKING] Final appointment creation result:', success);
            return success;

        } catch (error) {
            console.error('🚨 [BOOKING] Error during booking process:', error);
            throw error;
        }
    }

    /**
     * Validates required appointment data fields
     * @param data - Appointment data to validate
     * @throws Error if required fields are missing
     */
    private validateAppointmentData(data: AppointmentData) {
        const requiredFields = {
            'first name': data.first_name,
            'last name': data.last_name,
            'email': data.email,
            'phone': data.phone,
            'appointment date': data.appointmentDate,
            'time': data.time,
            'service ID': data.serviceId,
            'provider ID': data.providerId
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([, value]) => !value)
            .map(([field]) => field);

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
        const appointmentDate = new Date(`${date} ${startTime}`);
        appointmentDate.setMinutes(appointmentDate.getMinutes() + 30); // 30-minute appointments

        const year = appointmentDate.getFullYear();
        const month = String(appointmentDate.getMonth() + 1).padStart(2, '0');
        const day = String(appointmentDate.getDate()).padStart(2, '0');
        const hours = String(appointmentDate.getHours()).padStart(2, '0');
        const minutes = String(appointmentDate.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
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
     * Fetches all providers from the Easy Appointments API
     * @returns Promise<Provider[]> Array of providers
     */
    async getProviders(): Promise<Provider[]> {
        try {
            const response = await apiClient.get('/providers');
            // Transform the response data to match our Provider interface
            const transformedData = response.data.map((provider: any) => ({
                id: provider.id,
                firstName: provider.firstName,
                lastName: provider.lastName,
                email: provider.email,
                phone: provider.phone,
                mobile: provider.mobile,
                address: provider.address,
                city: provider.city,
                state: provider.state,
                zip: provider.zip,
                notes: provider.notes,
                timezone: provider.timezone,
                services: provider.services || [],
                settings: provider.settings
            }));
            console.log('Providers fetched:', transformedData);
            return transformedData;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to fetch providers');
        }
    }

    /**
     * Fetches all services from the Easy Appointments API
     * @returns Promise<Service[]> Array of services
     */
    async getServices(): Promise<Service[]> {
        try {
            const response = await apiClient.get('/services');
            return response.data;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to fetch services');
        }
    }

    /**
     * Fetches available time slots for a provider and service on a specific date
     * @param providerId - ID of the provider
     * @param serviceId - ID of the service
     * @param date - Date in format "YYYY-MM-DD"
     * @returns Promise<string[]> Array of available time slots in format "HH:mm"
     */
    async getAvailabilities(providerId: number, serviceId: number, date: string): Promise<string[]> {
        try {
            const response = await apiClient.get('/availabilities', {
                params: {
                    providerId,
                    serviceId,
                    date
                }
            });
            console.log('Availabilities fetched:', response.data);
            return response.data;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to fetch availabilities');
        }
    }

    /**
     * Fetches a specific provider's details
     * @param providerId - ID of the provider to fetch
     * @returns Promise<Provider>
     */
    async getProviderById(providerId: number): Promise<Provider> {
        try {
            const response = await apiClient.get(`/providers/${providerId}`);
            return response.data;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to fetch provider details');
        }
    }

    /**
     * Fetches a specific service's details
     * @param serviceId - ID of the service to fetch
     * @returns Promise<Service>
     */
    async getServiceById(serviceId: number): Promise<Service> {
        try {
            const response = await apiClient.get(`/services/${serviceId}`);
            return response.data;
        } catch (error) {
            throw this.handleApiError(error, 'Failed to fetch service details');
        }
    }

    /**
     * Get appointments for a specific customer with pagination and filtering
     * Also fetches provider and service details for each appointment
     */
    public async getCustomerAppointments(
        customerId: number,
        options: {
            page?: number;
            length?: number;
            sort?: string;
            order?: 'asc' | 'desc';
            status?: string;
        } = {}
    ): Promise<{
        appointments: Appointment[];
        totalPages: number;
    }> {
        try {
            const { page = 1, length = 10, sort = 'start', order = 'desc' } = options;
            const response = await apiClient.get('/appointments', {
                params: {
                    customerId,
                    page,
                    length,
                    sort,
                    order
                }
            });

            if (!response?.data?.length) {
                return { appointments: [], totalPages: 0 };
            }

            const appointments = await Promise.all(
                response.data
                    .sort((a: any, b: any) => {
                        // Sort by start date in descending order (latest first)
                        return new Date(b.start).getTime() - new Date(a.start).getTime();
                    })
                    .map(async (appointment: any) => {
                        try {
                            // Fetch provider and service details
                            const [provider, service] = await Promise.all([
                                this.getProviderById(appointment.providerId),
                                this.getServiceById(appointment.serviceId)
                            ]);

                            // Determine appointment status based on dates and existing status
                            const now = new Date();
                            const startDate = new Date(appointment.start);
                            const endDate = new Date(appointment.end);

                            let appointmentStatus = appointment.status?.toLowerCase() || '';

                            // Map API status to our status types based on dates
                            if (appointmentStatus === 'confirmed' || appointmentStatus === 'booked') {
                                if (startDate > now) {
                                    appointmentStatus = 'upcoming';
                                } else if (endDate < now) {
                                    appointmentStatus = 'completed';
                                } else {
                                    appointmentStatus = 'in-progress';
                                }
                            } else if (appointmentStatus === 'cancelled') {
                                appointmentStatus = 'cancelled';
                            }

                            // Only filter by status if explicitly provided
                            if (options.status && appointmentStatus !== options.status) {
                                return null;
                            }

                            console.log('📦 [APPOINTMENT] Service details:', {
                                appointmentId: appointment.id,
                                serviceId: appointment.serviceId,
                                serviceName: service.name,
                                providerId: appointment.providerId,
                                providerName: `${provider.firstName} ${provider.lastName}`.trim()
                            });

                            const mappedAppointment: Appointment = {
                                id: appointment.id,
                                book: appointment.book || '',
                                hash: appointment.hash || '',
                                start: appointment.start,
                                end: appointment.end,
                                location: provider.address || 'Main Office',
                                notes: appointment.notes || null,
                                serviceId: service.id, // Fix the service ID mapping
                                customerId: appointment.customerId,
                                providerId: appointment.providerId,
                                googleCalendarId: appointment.googleCalendarId || null,
                                status: appointmentStatus,
                                serviceName: service.name,
                                providerName: `${provider.firstName} ${provider.lastName}`.trim(),
                                providerAddress: provider.address || '',
                                providerCity: provider.city || '',
                                providerState: provider.state || '',
                                providerZip: provider.zip || ''
                            };

                            return mappedAppointment;
                        } catch (error) {
                            console.error('Failed to fetch details for appointment:', appointment.id, error);
                            return null;
                        }
                    })
            );

            // Filter out null appointments (failed to fetch details)
            const validAppointments = appointments.filter((apt): apt is Appointment => apt !== null);

            return {
                appointments: validAppointments,
                totalPages: Math.ceil(validAppointments.length / length)
            };
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
            return { appointments: [], totalPages: 0 };
        }
    }
}

// Export a singleton instance
export const easyAppointmentsService = new EasyAppointmentsService();
