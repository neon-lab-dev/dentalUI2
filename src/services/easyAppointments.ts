import axios from 'axios';

const AUTH_USERNAME = process.env.NEXT_PUBLIC_EASY_APPOINTMENTS_USERNAME || 'test123';
const AUTH_PASSWORD = process.env.NEXT_PUBLIC_EASY_APPOINTMENTS_PASSWORD || 'test123';

interface AppointmentPayload {
    start: string;     // Start date/time
    end: string;       // End date/time
    location: string;  // Appointment location
    color: string;     // Color code
    status: string;    // Appointment status
    notes: string;     // Appointment notes
    customerId: number;
    providerId: number;
    serviceId: number;
}

interface CustomerPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    timezone?: string;
    language?: string;
    notes?: string;
    customField1?: string;  // DOB
    customField2?: string;  // State
    customField3?: string;  // Address
    ldapDn?: null;
}

class EasyAppointmentsService {
    private baseUrl = 'http://localhost:8080/index.php/api/v1';
    private cachedProviderServiceIds: { providerId: number, serviceId: number } | null = null;

    private async findOrCreateCustomer(appointmentData: any): Promise<number> {
        try {
            if (!appointmentData.email) {
                throw new Error('Email is required for customer creation');
            }

            // First, try to find existing customer by exact email match
            const searchResponse = await axios.get(`${this.baseUrl}/customers`);
            const existingCustomer = searchResponse.data.find(
                (customer: any) => customer.email.toLowerCase() === appointmentData.email.toLowerCase()
            );

            if (existingCustomer) {
                console.log('Using existing customer:', existingCustomer.id);
                return existingCustomer.id;
            }

            // Create new customer if none exists
            const customerData: CustomerPayload = {
                firstName: appointmentData.first_name,
                lastName: appointmentData.last_name,
                email: appointmentData.email,
                phone: appointmentData.phone?.toString() || '',
                city: appointmentData.city,
                timezone: 'UTC',
                language: 'english',
                notes: `Service: ${appointmentData.serviceName}, Insurance: ${appointmentData.induranceStatus || 'Not Provided'}`,
                customField1: appointmentData.dob || '',
                customField2: appointmentData.state || '',
                customField3: appointmentData.address || '',
                ldapDn: null
            };

            const createResponse = await axios.post(`${this.baseUrl}/customers`, customerData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${AUTH_USERNAME}:${AUTH_PASSWORD}`).toString('base64')}`
                }
            });
            console.log('Created new customer:', createResponse.data.id);
            return createResponse.data.id;
        } catch (error) {
            console.error('Failed to find or create customer:', error);
            throw error;
        }
    }

    private async getProviderAndServiceIds(): Promise<{ providerId: number, serviceId: number }> {
        try {
            // Return cached values if available
            if (this.cachedProviderServiceIds) {
                return this.cachedProviderServiceIds;
            }

            // Get first available provider
            const providersResponse = await axios.get(`${this.baseUrl}/providers`, {
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${AUTH_USERNAME}:${AUTH_PASSWORD}`).toString('base64')}`
                }
            });
            const providerId = providersResponse.data[0]?.id || 5;

            // Get first available service
            const servicesResponse = await axios.get(`${this.baseUrl}/services`, {
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${AUTH_USERNAME}:${AUTH_PASSWORD}`).toString('base64')}`
                }
            });
            const serviceId = servicesResponse.data[0]?.id || 2;

            // Cache the results
            this.cachedProviderServiceIds = { providerId, serviceId };
            return this.cachedProviderServiceIds;
        } catch (error) {
            console.error('Failed to get provider or service IDs:', error);
            return { providerId: 5, serviceId: 2 };
        }
    }

    private formatDateTime(dateStr: string, timeStr: string): string {
        try {
            if (!dateStr || !timeStr) {
                console.error('Missing date or time:', { dateStr, timeStr });
                throw new Error('Date and time are required');
            }

            // Parse the ISO date string
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateStr);
                throw new Error('Invalid date format');
            }

            // Handle time format
            const [hours, minutes] = timeStr.split(':').map(num => parseInt(num));
            if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
                console.error('Invalid time:', timeStr);
                throw new Error('Invalid time format');
            }

            // Format the final datetime string
            const formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            console.log('Formatted date time:', formattedDateTime);
            return formattedDateTime;
        } catch (error) {
            console.error('Date formatting error:', error);
            throw error;
        }
    }

    async createAppointment(appointmentData: any) {
        try {
            // Find or create customer
            const customerId = await this.findOrCreateCustomer(appointmentData);

            // Get provider and service IDs
            const { providerId, serviceId } = await this.getProviderAndServiceIds();

            // Format times
            const startTime = this.formatDateTime(appointmentData.appointmentDate, appointmentData.time);
            const [datePart, timePart] = startTime.split(' ');
            const [hours, minutes] = timePart.split(':');
            const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + 40;
            const endHours = Math.floor(totalMinutes / 60);
            const endMinutes = totalMinutes % 60;
            const endTime = `${datePart} ${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}:00`;

            const appointmentPayload: AppointmentPayload = {
                start: startTime,
                end: endTime,
                location: appointmentData.address || 'Default Location',
                color: '#7B1FA2',
                status: 'Booked',
                notes: `Service: ${appointmentData.serviceName}, Insurance: ${appointmentData.induranceStatus || 'Not Provided'}`,
                customerId,
                providerId,
                serviceId
            };

            const response = await axios.post(`${this.baseUrl}/appointments`, appointmentPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${AUTH_USERNAME}:${AUTH_PASSWORD}`).toString('base64')}`
                }
            });
            console.log('Appointment created successfully:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Failed to create appointment:', error.response?.data || error.message);
            throw error;
        }
    }
}

export const easyAppointmentsService = new EasyAppointmentsService();
