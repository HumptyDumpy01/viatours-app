import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker as DeskopDatePicker } from '@mui/x-date-pickers/DatePicker';
import './DatePicker.scss';

type DatePickerProps = {
  type: `mobile` | `desktop` | `responsive` | `static`;
  className?: string;
  sx?: { [key: string]: any };
} & ComponentPropsWithoutRef<`div`>;

export default function DatePicker({ type, className, ...props }: DatePickerProps) {
  const currDate = new Date();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(currDate));

  if (!type) {
    throw new Error(`Please provide a type prop to the DatePicker component!`);
  }

  if (type === `mobile`) {
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
  if (type === `desktop`) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={className}>
          <DeskopDatePicker label="e.g. Febuary 05" name={String(currDate)} />
        </div>
      </LocalizationProvider>
    );
  }
}