import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './DatePicker.scss';

type DatePickerProps = {
  className?: string;
  sx?: { [key: string]: any };
} & ComponentPropsWithoutRef<`div`>;

export default function DatePicker({ className, ...props }: DatePickerProps) {
  const currDate = new Date();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(currDate));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={className}>
        {/*// @ts-ignore*/}
        <MobileDatePicker {...props} name={`date`} defaultValue={dayjs('2022-04-17')} value={value}
                          onChange={(newValue) => setValue(newValue)} />
      </div>
    </LocalizationProvider>
  );
}
