'use client';

import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './Calendar.scss';
import { useCartDispatch } from '@/store/hooks';
import { HeroSliceActions } from '@/store/heroSlice';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function DateCalendarValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const dispatch = useCartDispatch();

  function handleCloseCalendar() {
    dispatch(HeroSliceActions.toggleCalendar(false));
    console.log(value?.date(), value?.month(), value?.year());
  }

  return (
    <>
      <div className={`calendar-bg`} onClick={handleCloseCalendar}></div>
      <div className={`calendar`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar', 'DateCalendar']}>
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} sx={{
            }} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </>
  );
}