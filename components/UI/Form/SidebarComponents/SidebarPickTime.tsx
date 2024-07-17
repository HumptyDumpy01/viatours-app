// 'use client';
import '../SidebarForm.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';

type SidebarPickTimeType = {
  time: string[];
  // children: ReactNode;
}

export default function SidebarPickTime({ time }: SidebarPickTimeType) {
  return (
    <div className="description__tour-overview-sidebar__date-time flex flex-align-center">
      <div className="description__tour-overview-sidebar__date-time__wrapper">
        <IconIon type={`timeOutline`} className="icon icon--info icon--info-grey-bg"></IconIon>
      </div>
      <div className="flex flex-column">
        <p className="description__tour-overview-sidebar__date-time__p">Time</p>
        <div className="description__tour-overview-sidebar__date-time__dropdown">
          <label htmlFor="time"></label><select name="time" id="time" required
                                                className="description__tour-overview-sidebar__date-time__dropdown-select">
          <option value="" selected>Choose time</option>
          {time.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        </div>
      </div>
    </div>
  );
}
