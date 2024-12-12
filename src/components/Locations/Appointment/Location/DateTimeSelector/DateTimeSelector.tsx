"use client";
import React from "react";
import Button from "@/components/Buttons/Button";

interface DatePickerPageProps {
  goToNextStep: () => void;
}

const DatePickerPage: React.FC<DatePickerPageProps> = ({ goToNextStep }) => {
  // const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null);
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // const handleDateChange = (date: Dayjs | null) => {
  //   if (!date) return;
  //   const formattedDate = date.format("DD MMMM, YYYY");
  //   setSelectedDate(formattedDate);
  //   setSelectedDateTime(null);
  //   setSelectedTime(null);
  // };

  // const handleTimeClick = (time: string) => {
  //   if (!selectedDate) return;
  //   setSelectedTime(time);
  //   setSelectedDateTime(`${selectedDate} ${time}`);
  // };

  // const generateTimes = () => {
  //   const times = [];
  //   for (let hour = 9; hour <= 21; hour += 2) {
  //     const time = dayjs().set("hour", hour).set("minute", 0).format("hh:mm A");
  //     times.push(time);
  //   }
  //   return times;
  // };

  return (
    <div className="flex  w-full justify-center items-center bg-transparent">
      <div className="w-full bg-transparent flex xl:flex-row flex-col gap-6 md:gap-8 justify-between">
        {/* Calendar Section */}
        <div className="flex-1">
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation="landscape"
              value={selectedDate ? dayjs(selectedDate, "DD MMMM, YYYY") : null}
              onChange={handleDateChange}
              className="full-calendar"
            />
          </LocalizationProvider> */}
        </div>
        <div>
          <div className="flex flex-col gap-12 ">
            {/* Time Section */}
            {/* <div className="bg-transparent p-4 grid xl:grid-cols-5 grid-cols-3 gap-6">
              {generateTimes().map((time) => (
                <Button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  variant={selectedTime === time ? "Filled" : "Outlined"}
                  classNames="font-Poppins md:text-[24px] text-[12px] font-normal px-6 py-3 rouded-[52px] "
                >
                  {time}
                </Button>
              ))}
            </div> */}
            {/* Display Selected Date-Time */}
            {/* <div>
              <p className="xl:py-5 xl:px-6 p-4 border border-[#333] rounded-2xl bg-[#F5F5DC] font-Poppins xl:text-[32px] md:text-[16px] text-[12px]">
                {selectedDateTime || "No date and time selected"}
              </p>
            </div> */}
          </div>

          <Button
            variant="Filled"
            onClick={goToNextStep} // Ensure this function is correctly passed and exists
            classNames="w-full flex justify-center xl:mt-[176px] md:mt-[54px] mt-12 px-[28px] py-[14px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

 

export default DatePickerPage;
