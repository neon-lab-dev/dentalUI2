'use client';

import { useEffect, useState } from 'react';
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
}

const MyProfile = () => {
    const user = useSelector((state: RootState) => state.user);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                if (user.customerId) {
                    const data = await easyAppointmentsService.getCustomerAppointments(user.customerId);
                    console.log('Fetched appointments:', data);
                    setAppointments(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [user.customerId]);

    return (
        <div className="w-full mt-20">
            {/* Personal Information Section */}
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

            {/* Appointments Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>
                {loading ? (
                    <div className="text-center py-4">
                        <div className="inline-block w-8 h-8 border-4 border-primary-10 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-2 text-gray-600">Loading appointments...</p>
                    </div>
                ) : appointments && appointments.length > 0 ? (
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} 
                                className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-lg text-primary-10">
                                            Appointment on {formatDateTime(appointment.start)}
                                        </p>
                                        <p className="text-gray-600 mt-2">
                                            <span className="font-medium">Time:</span> {formatDateTime(appointment.start)} - {formatDateTime(appointment.end)}
                                        </p>
                                        <p className="text-gray-600 mt-1">
                                            <span className="font-medium">Location:</span> {appointment.location}
                                        </p>
                                        {appointment.notes && (
                                            <p className="text-gray-600 mt-1">
                                                <span className="font-medium">Notes:</span> {appointment.notes}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                        appointment.status === 'confirmed' || appointment.status === 'upcoming'
                                            ? 'bg-green-100 text-green-800'
                                            : appointment.status === 'cancelled'
                                            ? 'bg-red-100 text-red-800'
                                            : appointment.status === 'completed'
                                            ? 'bg-blue-100 text-blue-800'
                                            : appointment.status === 'in-progress'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-white rounded-lg border">
                        <Image
                            src={ICONS.Appointment}
                            alt="No appointments"
                            width={64}
                            height={64}
                            className="mx-auto mb-4"
                        />
                        <p className="text-lg text-gray-600">
                            No appointments found. Book your first appointment today!
                        </p>
                    </div>
                )}
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
      className="bg-[#FF0000] text-white px-6 py-2 rounded-[55px] text-sm font-semibold hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
};

const Page = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Hi, {user?.first_name}!</h1>
                <LogoutButton />
            </div>
            <MyProfile />
        </div>
    );
};

export default Page;
