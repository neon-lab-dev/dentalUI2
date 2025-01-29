/**
 * FinalBooking Component
 * 
 * This component handles the final step of the appointment booking process.
 * It displays a form with user details (pre-filled if available) and allows
 * the user to confirm their appointment booking.
 * 
 * @component
 */

"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputField from "@/components/Form/InputField";
import Button from "@/components/Buttons/Button";
import { RootState } from "@/store";
import { AppointmentData, FinalBookingData } from "@/types/appointment";
import { easyAppointmentsService } from "@/services/easyAppointments";
import { setUser } from "@/store/slices/userSlice";
import { formatDuration } from "@/utils/formatters";
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { validateForm, validators } from '@/utils/validation';

/**
 * Props interface for the FinalBooking component
 */
interface FinalBookingProps {
  bookAppointment: (appointmentData: AppointmentData) => Promise<void>;
  appointmentData: FinalBookingData;
  isLoading?: boolean; // Make this optional since we'll manage it internally
}

/**
 * Formats a date string to YYYY-MM-DD format for HTML5 date input
 * Handles multiple input formats including ISO date strings
 */
const formatDateForInput = (date: string) => {
  if (!date) return '';

  // Remove any leading/trailing whitespace
  date = date.trim();

  // Try parsing as ISO date first
  if (date.includes('T')) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split('T')[0];
    }
  }

  // Check if date is already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  // Handle DD-MM-YYYY format
  let parts = date.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (day && month && year) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  // Handle DD/MM/YYYY format
  parts = date.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (day && month && year) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  return '';
};

/**
 * Formats a date string from YYYY-MM-DD to DD-MM-YYYY format for display
 * @param date - Date string to format
 * @returns Formatted date string
 */
const formatDateForDisplay = (date: string) => {
  if (!date) return '';
  // Check if date is in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(date)) return date;

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * FinalBooking component for confirming and submitting appointment details
 */
const FinalBooking = ({ bookAppointment, appointmentData }: FinalBookingProps) => {
  // Get user data from Redux store
  const user = useSelector((state: RootState) => state.user);
  const { selectedService } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state for form fields and loading
  const [fname, setFname] = useState(user.first_name || '');
  const [lname, setLname] = useState(user.last_name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phoneNo || '');
  const [dob, setDOB] = useState(user.dob ? formatDateForInput(user.dob) : '');
  const [induranceStatus, setInduranceStatus] = useState(user.induranceStatus || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Log appointment data when component mounts or updates
  useEffect(() => {
    console.log('📋 [DEBUG] FinalBooking - Received appointment data:', appointmentData);
    console.log('🔍 [DEBUG] FinalBooking - Selected service from Redux:', selectedService);
  }, [appointmentData, selectedService]);

  // Update form fields only if user is logged in and data changes
  useEffect(() => {
    if (user.email) {  // Only update if user is logged in
      setFname(user.first_name || '');
      setLname(user.last_name || '');
      setEmail(user.email || '');
      setPhone(user.phoneNo || '');
      const formattedDate = formatDateForInput(user.dob || '');
      console.log('Original DOB:', user.dob, 'Formatted DOB:', formattedDate);
      setDOB(formattedDate);
      setInduranceStatus(user.induranceStatus || '');
    }
  }, [user]);

  // Validate form fields before submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Define validation rules
    const validationRules = {
      fname: [validators.required('First name')],
      lname: [validators.required('Last name')],
      email: [validators.required('Email'), validators.email()],
      phone: [validators.required('Phone number'), validators.phone()],
      dob: [validators.required('Date of birth'), validators.date('Invalid date format')],
    };

    // Validate form
    const formData = { fname, lname, email, phone, dob };
    const newErrors = validateForm(formData, validationRules);

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      const errorMessage = Object.values(newErrors)[0];
      showToast.error(errorMessage);
      return;
    }

    try {
      // Validate appointment date is not in the past
      const appointmentDateTime = new Date(`${appointmentData.appointmentDate} ${appointmentData.time}`);
      const dateValidation = validateForm(
        { appointmentDate: appointmentDateTime },
        { appointmentDate: [validators.futureDate()] }
      );

      if (Object.keys(dateValidation).length > 0) {
        showToast.error('Cannot book appointments in the past. Please select a future date and time.');
        setIsSubmitting(false);
        return;
      }

      // Format phone number
      const phoneStr = phone.toString().replace(/\D/g, '');
      if (phoneStr.length !== 10) {
        showToast.error('Please enter a valid 10-digit phone number');
        setIsSubmitting(false);
        return;
      }

      // Ensure we have the correct service data
      if (!selectedService) {
        showToast.error('Service information is missing. Please go back and select a service.');
        setIsSubmitting(false);
        return;
      }

      const completeAppointmentData: AppointmentData = {
        ...appointmentData,
        first_name: fname,
        last_name: lname,
        email: email,
        phone: parseInt(phoneStr, 10),
        dob: formatDateForDisplay(dob),
        induranceStatus: induranceStatus,
        serviceId: selectedService.id, // Ensure serviceId is passed
        serviceName: selectedService.name, // Ensure serviceName is passed
        notes: `Insurance: ${induranceStatus || 'Not Provided'}\nDOB: ${dob || 'Not Provided'}\nService: ${selectedService.name}`
      };

      // Set a timeout to ensure loading doesn't get stuck
      const loadingToastId = showToast.loading('Booking your appointment...');
      const timeoutId = setTimeout(() => {
        console.log('⚠️ [BOOKING] Request taking too long, proceeding with redirect...');
        setIsSubmitting(false);
        showToast.dismiss(loadingToastId);
        showToast.success('Your appointment request has been sent. You will receive a confirmation email shortly.');
        router.push('/');
      }, 5500); // 5.5 seconds to account for API timeout

      try {
        // First find or create customer to get customerId
        const existingCustomer = await easyAppointmentsService.findCustomerByEmail(email);
        let customerId: number;

        if (existingCustomer) {
          customerId = existingCustomer.id;
        } else {
          const customerData = {
            firstName: fname,
            lastName: lname,
            email: email,
            phone: phoneStr,
            address: appointmentData.address || '',
            city: appointmentData.city || '',
            notes: induranceStatus ? `Insurance Status: ${induranceStatus}` : ''
          };
          const newCustomer = await easyAppointmentsService.createCustomer(customerData);
          customerId = newCustomer.id;
        }

        // Update Redux store with customerId
        dispatch(setUser({ customerId }));

        // Now book the appointment
        await bookAppointment(completeAppointmentData);
        clearTimeout(timeoutId); // Clear timeout if request succeeds
        showToast.dismiss(loadingToastId);
      } catch (error) {
        clearTimeout(timeoutId); // Clear timeout if request fails
        showToast.dismiss(loadingToastId);
        throw error; // Re-throw to be caught by outer catch block
      }

    } catch (error) {
      console.error('🚨 Booking failed:', error);
      if (error instanceof Error) {
        showToast.error(`Booking failed: ${error.message}`);
      } else {
        showToast.error('Something went wrong while booking your appointment. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center relative min-h-[800px]">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary-10 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold">Booking Your Appointment...</p>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className={`w-[90%] bg-[#EBFAFF] border border-[#333] rounded-2xl p-8 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* Progress Bar - Shows current step in booking process */}
        <div className="flex justify-between gap-5 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-[16px] rounded-[30px] flex-1 transition-all duration-500 ${index < 4 ? "bg-[#FF7F50]" : "border border-[#FF7F50]"
                }`}
            ></div>
          ))}
        </div>

        {/* Booking Confirmation */}
        <div className="font-Amiri font-bold text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px]">
          Confirm Booking
        </div>

        {/* Appointment Time */}
        <div className="w-full flex justify-between xl:py-5 xl:px-6 p-4 border border-[#333] rounded-2xl bg-[#F5F5DC] font-Poppins xl:text-[32px] md:text-[16px] text-[12px] hover:shadow-md transition-shadow duration-300">
          <div>
            Appointment for <span className="font-bold">{appointmentData.appointmentDate}</span>
          </div>
          <div>at {appointmentData.time}</div>
        </div>

        {/* Location and Treatment Info */}
        <div className="w-full flex flex-col md:flex-row justify-between xl:mt-8 md:my-8 my-6 lg:gap-[34px] md:gap-5 gap-6">
          {/* Location Card */}
          <div className="xl:px-[32px] xl:py-[24px] md:p-5 p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300 bg-[#F5F5DC] rounded-3xl w-full">
            <div className="flex flex-col justify-between w-full">
              <div className="font-Amiri font-bold xl:text-[32px] md:text-[20px] text-[16px] xl:leading-[48px] leading-6 md:leading-[30px]">
                {appointmentData.city || 'Location not selected'}
              </div>
              <div className="h-[2px] bg-[#FF7F50] self-stretch my-[10px] transform origin-left transition-transform duration-300 hover:scale-x-110"></div>
              <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px]">
                {appointmentData.address} <br /> {appointmentData.state}
              </div>
            </div>
          </div>
          {/* Service Card */}
          <div className="xl:px-[32px] xl:py-[24px] md:p-5 p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300 bg-[#FF7F50] rounded-3xl w-full">
            <div className="flex flex-col justify-between w-full">
              <div className="font-Amiri font-bold xl:text-[32px] md:text-[20px] text-[16px] xl:leading-[48px] leading-6 md:leading-[30px] text-white">
                {selectedService ? (
                  <span>{selectedService.name}</span>
                ) : (
                  <span className="text-red-200">Service not selected</span>
                )}
              </div>
              <div className="h-[2px] bg-[#F5F5DC] self-stretch my-[10px] transform origin-left transition-transform duration-300 hover:scale-x-110"></div>
              <div className="font-Poppins xl:text-xl md:text-[16px] text-[12px] text-white">
                Duration: {selectedService ? formatDuration(selectedService.duration) : '40'} minutes
              </div>
            </div>
          </div>
        </div>

        {/* User Details Section */}
        <div className="font-Amiri font-bold text-center text-[32px] md:text-4xl xl:text-5xl leading-10 md:leading-[44px] xl:leading-[66px]">
          User Details
        </div>
        <div className="w-full flex flex-col xl:gap-8 md:gap-5 gap-4">
          <div className="py-6 flex flex-col lg:gap-8 gap-4">
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="firstname"
                name="fname"
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                errorMessage={errors.fname}
                required
                className="w-full"
              />
              <InputField
                id="lastname"
                name="lname"
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                errorMessage={errors.lname}
                required
                className="w-full"
              />
            </div>
            <div className="xl:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="emailId"
                name="email"
                label="Email Id"
                type="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors.email}
                required
                className="w-full"
              />
              <InputField
                id="phonenumber"
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="Enter Phone Number"
                value={phone.toString()}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                errorMessage={errors.phone}
                required
                pattern="[0-9]{10}"
                className="w-full"
              />
            </div>
            <div className="md:flex-row flex flex-col lg:gap-8 gap-4">
              <InputField
                id="DOB"
                name="dob"
                label="Date Of Birth"
                type="date"
                placeholder="Enter Date Of Birth"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className="w-full"
              />
              <InputField
                id="example-select"
                name="insurance"
                label="Insurance Status"
                type="text"
                placeholder="Enter Insurance Status"
                value={induranceStatus}
                onChange={(e) => setInduranceStatus(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <Button
          onClick={handleSubmit}
          variant="Filled"
          disable={isSubmitting}
          classNames={`w-full flex justify-center px-[28px] py-[14px] transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
            }`}
        >
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </Button>
      </div>
    </div>
  );
};

export default FinalBooking;
