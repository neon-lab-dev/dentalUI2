import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8080/index.php/api/v1';

interface CustomerPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city?: string;
    timezone?: string;
    language?: string;
    notes?: string;
    address?: string;
}

interface CustomerResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface AppointmentData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    appointmentDate: string;
    time: string;
    address?: string;
    serviceName?: string;
    induranceStatus?: string;
    dob?: string;
    state?: string;
}

interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

class EasyAppointmentsService {
    private cachedProviderServiceIds: { providerId: number, serviceId: number } | null = null;

    private async findOrCreateCustomer(appointmentData: AppointmentData): Promise<number> {
        try {
            if (!appointmentData.email) {
                throw new Error('Email is required for customer creation');
            }

            // Try to find existing customer
            const searchResponse = await axios.get<CustomerResponse[]>(
                `${API_BASE_URL}/customers`,
                {
                    params: { email: appointmentData.email }
                }
            );

            if (searchResponse.data.length > 0) {
                return searchResponse.data[0].id;
            }

            // Create new customer if none exists
            const customerData: CustomerPayload = {
                firstName: appointmentData.firstName,
                lastName: appointmentData.lastName,
                email: appointmentData.email,
                phone: appointmentData.phone?.toString() || '',
                city: appointmentData.state || '',
                timezone: 'UTC',
                language: 'english',
                notes: `Service: ${appointmentData.serviceName}, Insurance: ${appointmentData.induranceStatus || 'Not Provided'}`,
                address: appointmentData.address
            };

            const createResponse = await axios.post<CustomerResponse>(
                `${API_BASE_URL}/customers`,
                customerData
            );

            return createResponse.data.id;
        } catch (error) {
            const apiError: ApiError = {
                message: error instanceof AxiosError 
                    ? error.response?.data?.message || error.message
                    : 'Failed to create customer',
                details: error
            };
            throw apiError;
        }
    }

    private async getProviderServiceIds(): Promise<{ providerId: number, serviceId: number }> {
        if (this.cachedProviderServiceIds) {
            return this.cachedProviderServiceIds;
        }

        try {
            const [providersResponse, servicesResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/providers`),
                axios.get(`${API_BASE_URL}/services`)
            ]);

            const provider = providersResponse.data[0];
            const service = servicesResponse.data[0];

            if (!provider || !service) {
                throw new Error('Provider or service not found');
            }

            this.cachedProviderServiceIds = {
                providerId: provider.id,
                serviceId: service.id
            };

            return this.cachedProviderServiceIds;
        } catch (error) {
            const apiError: ApiError = {
                message: error instanceof AxiosError 
                    ? error.response?.data?.message || error.message
                    : 'Failed to get provider and service IDs',
                details: error
            };
            throw apiError;
        }
    }

    async createAppointment(appointmentData: AppointmentData) {
        try {
            // Find or create customer
            const customerId = await this.findOrCreateCustomer(appointmentData);
            
            // Get provider and service IDs
            const { providerId, serviceId } = await this.getProviderServiceIds();

            // Create appointment
            const response = await axios.post(`${API_BASE_URL}/appointments`, {
                start: `${appointmentData.appointmentDate} ${appointmentData.time}:00`,
                end: this.calculateEndTime(appointmentData.appointmentDate, appointmentData.time),
                customerId,
                providerId,
                serviceId,
                notes: `Service: ${appointmentData.serviceName}, Insurance: ${appointmentData.induranceStatus || 'Not Provided'}`,
                location: appointmentData.address || 'Not specified'
            });

            return response.data;
        } catch (error) {
            const apiError: ApiError = {
                message: error instanceof AxiosError 
                    ? error.response?.data?.message || error.message
                    : 'Failed to create appointment',
                details: error
            };
            throw apiError;
        }
    }

    private calculateEndTime(date: string, startTime: string): string {
        const appointmentDuration = 60; // Default duration in minutes
        const [hours, minutes] = startTime.split(':');
        const startDateTime = new Date(`${date}T${hours}:${minutes}:00`);
        const endDateTime = new Date(startDateTime.getTime() + appointmentDuration * 60000);
        return endDateTime.toISOString().slice(0, 19).replace('T', ' ');
    }
}

export const easyAppointmentsService = new EasyAppointmentsService();
