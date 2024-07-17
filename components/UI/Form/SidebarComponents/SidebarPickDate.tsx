// 'use client';
import '../SidebarForm.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import DatePicker from '@/components/UI/DatePicker/DatePicker';

type SidebarDateTimeType = {
  // children: ReactNode;
}

export default function SidebarPickDate(/*{  }: SidebarDateTimeType*/) {

  return (
    <>
      <div className="description__tour-overview-sidebar__date-time flex flex-align-center">
        <div className="description__tour-overview-sidebar__date-time__wrapper">
          <IconIon type={`calendarOutline`} className="icon icon--info icon--info-grey-bg"></IconIon>
        </div>
        <div className="fix-calendar flex flex-column">
          <p className="description__tour-overview-sidebar__date-time__p">From</p>
          {/*<label>*/}
          {/*  <input className="description__tour-overview-sidebar__date-time__input" type="text" required*/}
          {/*         placeholder="e.g. February 05" />*/}
          {/*</label>*/}
          <div>
            <DatePicker sx={{
              '.MuiInputBase-input': {
                fontSize: `1.5rem`,
                padding: `0`,
                border: `none`,
                color: `#717171`
              },
              '.MuiOutlinedInput-notchedOutline': {
                border: `none`
              }
            }} />
          </div>
        </div>
      </div>
    </>
  );
}
