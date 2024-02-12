import React, { useState, useEffect } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  addMonths,
  subMonths
} from 'date-fns';
import axios from 'axios';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import './Calendar.css';

function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState({});
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  useEffect(() => {
    const apiUrl = `http://localhost:5000/getCalendarDetails?startDate=${format(firstDayOfMonth, 'yyyy-MM-dd')}&endDate=${format(lastDayOfMonth, 'yyyy-MM-dd')}`;

    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setMonthlyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching monthly data:', error);
      });
  }, [currentDate]);

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  return (
    <div className='container mx-auto p-4 mt-5 bg-custom'>
      <div className='mb-4'>
        <div className='flex justify-center'>
          <button type='submit' className="p-3 font-bold text-black hover:text-violet-500" onClick={handlePrevMonth}>
          <ArrowBackIosOutlined />
          </button>
          <h2 className='text-center text-white pl-2 pr-2 mx-auto'>
          {format(currentDate, "MMMM yyyy")}
          </h2>
          <button type='button' className="p-3 font-bold text-black hover:text-violet-500" onClick={handleNextMonth}><ArrowForwardIosOutlined /></button>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-2'>
        {weekDays.map((day) => (
          <div key={day} className='font-bold text-center text-black text-lg'>
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={index}></div>
        ))}
        {daysInMonth.map((day, index) => {
            const dayOfMonth = format(day, 'd');
            const current_date = new Date();
            const dayData = monthlyData[dayOfMonth] || { debit: 0, credit: 0 }
            return (
            <div
                key={index}
                className={
                isToday(day)
                    ? "bg-white border border-black border-solid border-2 rounded-md p-2 text-center font-bold ml-0"
                    : "border rounded-md p-2 text-center text-white font-bold ml-0"
                }
            >
                {dayOfMonth}
                {
                    (day <= current_date) ? (
                        <div>
                        <div className='text-red-500'>Debit -{dayData.debit}</div>
                        <div className='text-green-500'>Credit {dayData.credit}</div>
                        </div>
                    ) : (
                        <div></div>
                )
                }
            </div>
            );
            })}
      </div>
    </div>
  );
}

export default EventCalendar;
