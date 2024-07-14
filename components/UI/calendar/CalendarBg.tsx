'use client';

import './Calendar.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { HeroSliceActions } from '@/store/heroSlice';
/*interface CalendarBgInterface {
  // children: ReactNode;
}*/

export default function CalendarBg(/*{  }: Interface*/) {
  const calendarIsOpen = useCartSelector((state) => state.hero.calendarIsOpen);
  const dispatch = useCartDispatch();

  return (
    <div onClick={() => dispatch(HeroSliceActions.toggleCalendar(false))} className={`calendar-bg`}
         id={calendarIsOpen ? `calendar-open` : ``}></div>
  );
}
