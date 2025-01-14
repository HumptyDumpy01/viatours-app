'use client';
// In DateCalendar.tsx

import React from 'react';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './Calendar.scss'; // Ensure this is the general styles
import dayjs, { Dayjs } from 'dayjs';

interface DateCalendarValueProps {
  className?: string;
  usage: `home-hero` | `filter` | `tour-detail-pick-date`;
}

export default function DateCalendarValue({ className, usage }: DateCalendarValueProps) {
  const currDate = new Date();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(currDate));

  // when the user picks the date, the calendar will close and the date will be displayed in the input field
  if (value && usage === `home-hero`) {
    const dateInput = document.querySelector('.hero-input-destinations-datepicker');
    dateInput?.setAttribute('value', value.format('YYYY-MM-DD'));
  }
  if (value && usage === `filter`) {
    const dateInput = document.querySelector('.all-tours__content__filter-datepicker');
    dateInput?.setAttribute('value', value.format('YYYY-MM-DD'));
  }

  return (
    <>
      <dialog className={`${className}`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </LocalizationProvider>
      </dialog>
    </>
  );
}