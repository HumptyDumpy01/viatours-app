'use client';

/*interface HeroInterface {
  // children: ReactNode;
}*/
import HeroHeading from '@/components/homepage/hero/HeroHeading';
import WhereToPopup from '@/components/homepage/choose-location-popup/WhereToPopup';
import BasicDateCalendar from '@/components/homepage/calendar/Calendar';
import { useState } from 'react';

export default function Hero(/*{  }: HeroInterface*/) {
  const [toggleCalendar, setToggleCalendar] = useState<boolean>(false);
  const [toggleChooseLocation, setToggleChooseLocation] = useState<boolean>(false);

  function handleToggleCalendar() {
  }

  function handleToggleChooseLocation() {
  }

  return (
    <>
      <HeroHeading />
      <div className="hero__second-part flex">
        {toggleChooseLocation && <WhereToPopup />}
        {toggleCalendar && <BasicDateCalendar />}
        <figure className="hero__second-part-first-col flex">
          <div className="hero__second-part-empty-box">
            {/* @ts-ignore*/}
            <ion-icon name="pin-outline" className="icon icon--pin"></ion-icon>
          </div>
          <div className="hero__second-part-details flex flex-column">
            <span className="hero__second-part-details-span">Where</span>
            <label>
              <input type="text" name="hero-input-destinations" placeholder="Search destinations"
                     className="hero-input hero-input-destinations" />
            </label>
          </div>
        </figure>
        <figure className="hero__second-part-second-col flex">
          <div className="hero__second-part-empty-box">
            {/* @ts-ignore*/}
            <ion-icon name="time-outline" className="icon--clock"></ion-icon>
          </div>
          <div className="hero__second-part-details flex flex-column">
            <span className="hero__second-part-details-span">When</span>

            <label>
              <input type="text" name="hero-input-destinations" placeholder="Choose the date"
                     className="hero-input hero-input-destinations hero-input-destinations-datepicker" />
            </label>
          </div>
        </figure>
        <figure className="hero__second-part-third-col flex">
          <div className="hero__second-part-empty-box">
            {/* @ts-ignore*/}
            <ion-icon name="options-outline" className="icon--type"></ion-icon>
          </div>
          <div className="hero__second-part-details flex flex-column">
            <span className="hero__second-part-details-span">Tour Type</span>
            <select name="tour-type" id="" className="hero-select-type">
              <option value="all">All tours</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="family">Family</option>
              <option value="food">Food</option>
              <option value="nightlife">Nightlife</option>
              <option value="relaxing">Relaxing</option>
            </select>
          </div>
        </figure>
        <button className="btn btn--hero">
          {/* @ts-ignore*/}
          <ion-icon className="icon icon--search--btn" name="search-outline"></ion-icon>
          Search
        </button>
      </div>
    </>
  );
}
