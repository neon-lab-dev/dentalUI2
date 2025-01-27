'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { easyAppointmentsService } from '@/services/easyAppointments';
import { formatDateTime, formatDateForProfile } from "@/utils/formatters";
import { ICONS } from "@/assets";
import Image from "next/image";
import InputField from "@/components/Form/InputField";
import { AppDispatch, RootState } from '@/store';
import axios from 'axios';
import { clearUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';

interface Appointment {
    id: number;
    book: string;
    hash: string;
    start: string;
    end: string;
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

interface AppointmentFilters {
    status?: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
    startDate?: string;
    endDate?: string;
}

const MyProfile = () => {
    const user = useSelector((state: RootState) => state.user);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
    const [activeSection, setActiveSection] = useState<'profile' | 'appointments'>('profile');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                if (user.customerId) {
                    const result = await easyAppointmentsService.getCustomerAppointments(user.customerId, {
                        page: currentPage,
                        length: 50, // Increased to show more appointments
                        sort: 'start',
                        order: 'desc'
                    });

                    setAppointments(result.appointments);
                    setTotalPages(result.totalPages);
                }
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [user.customerId, currentPage]);

    useEffect(() => {
        if (activeTab === 'all') {
            setFilteredAppointments(appointments);
        } else {
            setFilteredAppointments(appointments.filter(apt => apt.status === activeTab));
        }
    }, [activeTab, appointments]);

    const handleTabChange = (status: typeof activeTab) => {
        setActiveTab(status);
        setCurrentPage(1); // Reset to first page when changing tabs
    };

    const getTabStyle = (tabName: typeof activeTab) => {
        return `px-6 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${activeTab === tabName
                ? 'bg-white text-black'
                : 'text-gray-600 hover:bg-gray-100'
            }`;
    };

    const getSectionStyle = (section: typeof activeSection) => {
        return `w-full px-4 py-3 text-left text-sm font-medium cursor-pointer transition-colors ${activeSection === section
                ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`;
    };

    return (
        <div className="container mx-auto py-4 md:py-8 px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Left Sidebar - becomes top bar on mobile */}
                <div className="md:w-64 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
                    <button
                        onClick={() => setActiveSection('profile')}
                        className={`${getSectionStyle('profile')} whitespace-nowrap`}
                    >
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Profile
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveSection('appointments')}
                        className={`${getSectionStyle('appointments')} whitespace-nowrap`}
                    >
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Appointments
                        </div>
                    </button>

                    {/* Logout button - fixed at bottom on desktop, inline on mobile */}
                    <div className="md:mt-auto">
                        <LogoutButton />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-[calc(100vh-8rem)]">
                    {activeSection === 'profile' ? (
                        // Profile Section
                        <div className="rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
                            <form className="w-full">
                                <div className="py-6 flex flex-col lg:gap-8 gap-4">
                                    <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
                                        <InputField
                                            id="firstname"
                                            name="fname"
                                            label="First Name"
                                            type="text"
                                            placeholder="Enter First Name"
                                            value={user.first_name}
                                            className="w-full"
                                            disabled
                                        />
                                        <InputField
                                            id="lastname"
                                            name="lname"
                                            label="Last Name"
                                            type="text"
                                            placeholder="Enter Last Name"
                                            value={user.last_name}
                                            className="w-full"
                                            disabled
                                        />
                                    </div>
                                    <div className="xl:flex-row flex flex-col lg:gap-8 gap-4">
                                        <InputField
                                            id="emailId"
                                            name="email"
                                            label="Email Id"
                                            type="email"
                                            placeholder="Enter Email ID"
                                            value={user.email}
                                            className="w-full"
                                            disabled
                                        />
                                        <InputField
                                            id="phonenumber"
                                            name="phone"
                                            label="Phone Number"
                                            type="text"
                                            placeholder="Enter Phone Number"
                                            value={user.phoneNo?.toString() || ''}
                                            className="w-full"
                                            disabled
                                        />
                                    </div>
                                    <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
                                        <InputField
                                            id="DOB"
                                            name="dob"
                                            label="Date Of Birth"
                                            type="text"
                                            placeholder="Enter Date Of Birth"
                                            value={formatDateForProfile(user.dob)}
                                            className="w-full"
                                            disabled
                                        />
                                        <InputField
                                            id="example-select"
                                            name="insurance"
                                            label="Select an Insurance"
                                            type="text"
                                            value={user.induranceStatus}
                                            className="w-full"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        // Appointments Section
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <h2 className="text-2xl font-bold">My Appointments</h2>
                                <div className="flex gap-2 md:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                    <button
                                        onClick={() => handleTabChange('all')}
                                        className={`${getTabStyle('all')} whitespace-nowrap`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => handleTabChange('upcoming')}
                                        className={`${getTabStyle('upcoming')} whitespace-nowrap`}
                                    >
                                        Upcoming
                                    </button>
                                    <button
                                        onClick={() => handleTabChange('completed')}
                                        className={`${getTabStyle('completed')} whitespace-nowrap`}
                                    >
                                        Past
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center py-8">
                                    <p>Loading appointments...</p>
                                </div>
                            ) : filteredAppointments.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <div className="flex justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600">No {activeTab !== 'all' ? activeTab : ''} appointments found.</p>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-auto" style={{ maxHeight: 'calc(100vh - 16rem)' }}>
                                    <div className="space-y-4 pr-2">
                                        {filteredAppointments.map((appointment) => (
                                            <div key={appointment.id} className="rounded-3xl p-4 md:p-6 mb-4 border border-gray-200 shadow-sm">
                                                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                                    <div className="flex-1">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                                                            <div>
                                                                <h3 className="text-lg font-semibold mb-2">Service</h3>
                                                                <p className="text-gray-700">{appointment.serviceName}</p>
                                                            </div>

                                                            <div>
                                                                <h3 className="text-lg font-semibold mb-2">Location</h3>
                                                                <div className="flex items-start gap-2">
                                                                    <div className="mt-1">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <p className="text-gray-700">
                                                                        {[
                                                                            appointment.providerAddress,
                                                                            appointment.providerCity,
                                                                            appointment.providerState,
                                                                            appointment.providerZip
                                                                        ].filter(Boolean).join(', ')}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
                                                                <div className="flex gap-4">
                                                                    <p className="text-gray-700">
                                                                        {new Date(appointment.start).toLocaleDateString('en-US', {
                                                                            day: '2-digit',
                                                                            month: 'short',
                                                                            year: 'numeric'
                                                                        })}
                                                                    </p>
                                                                    <p className="text-gray-700">
                                                                        {new Date(appointment.start).toLocaleTimeString('en-US', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: true
                                                                        }).toUpperCase()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const LogoutButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // First clear the Redux store and localStorage
            dispatch(clearUser());

            // Then make the API call to logout
            await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND_BASE_URL}/logout`, {
                withCredentials: true
            });

            // Use Next.js router to redirect
            router.push('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            // Still clear local data even if API call fails
            dispatch(clearUser());
            router.push('/login');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-3"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
        </button>
    );
};

const Page = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className="container mx-auto py-4 md:py-8 px-4 md:px-8">
            <MyProfile />
        </div>
    );
};

export default Page;
