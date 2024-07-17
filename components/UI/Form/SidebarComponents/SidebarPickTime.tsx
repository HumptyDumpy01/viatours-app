import React, { useState } from 'react';
import '../SidebarForm.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';

type SidebarPickTimeType = {
  time: string[];
}

export default function SidebarPickTime({ time }: SidebarPickTimeType) {
  // Initialize state to manage the selected time
  const [selectedTime, setSelectedTime] = useState('');

  // Handle changing the selected time
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div className="description__tour-overview-sidebar__date-time flex flex-align-center">
      <div className="description__tour-overview-sidebar__date-time__wrapper">
        <IconIon type={`timeOutline`} className="icon icon--info icon--info-grey-bg"></IconIon>
      </div>
      <div className="flex flex-column">
        <p className="description__tour-overview-sidebar__date-time__p">Time</p>
        <div className="description__tour-overview-sidebar__date-time__dropdown">
          <label htmlFor="time"></label>
          <select name="time" id="time" required
                  className="description__tour-overview-sidebar__date-time__dropdown-select"
                  value={selectedTime} onChange={handleTimeChange}>
            <option value="">Choose time</option>
            {time.map((timeOption) => (
              <option key={timeOption} value={timeOption}>{timeOption}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}