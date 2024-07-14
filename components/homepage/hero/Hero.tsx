'use client';

/*interface HeroInterface {
  // children: ReactNode;
}*/

import pinIcon from '../../../assets/images/homepage/hero/pin-outline.svg';
import timeIcon from '../../../assets/images/homepage/hero/time-outline.svg';
import typeIcon from '../../../assets/images/homepage/hero/keypad-outline.svg';
import searchIcon from '../../../assets/images/homepage/hero/search-icon.svg';

import HeroHeading from '@/components/homepage/hero/HeroHeading';
import WhereToPopup from '@/components/homepage/choose-location-popup/WhereToPopup';
import BasicDateCalendar from '@/components/UI/calendar/Calendar';
import React, { FormEvent } from 'react';
import HeroInput from '@/components/homepage/hero/HeroInput';
import Image from 'next/image';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { HeroSliceActions } from '@/store/heroSlice';

export default function Hero(/*{  }: HeroInterface*/) {

  const locationIsOpen = useCartSelector((state) => state.hero.locationIsOpen);
  const calendarIsOpen = useCartSelector((state) => state.hero.calendarIsOpen);

  const dispatch = useCartDispatch();

  // CHANGE IT TO A CUSTOM HOOK LATER
  // USE "useFormState" OR AND useFormStatus
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());
    // resetting the form
    currObject.reset();
    // output
    console.log(results);
  }


  function handleOpenCalendar() {
    dispatch(HeroSliceActions.toggleCalendar(true));
  }

  function handleOpenChooseLocation(event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) {
    dispatch(HeroSliceActions.toggleLocation(true));
  }

  function handleCloseChooseLocation() {
    dispatch(HeroSliceActions.toggleLocation(false));
  }


  return (
    <>
      {calendarIsOpen && (<BasicDateCalendar usage={`home-hero`} className={`MuiDateCalendar-root-hero`} />)}
      <form onSubmit={handleSubmit} className={`hero-form`}>
        <HeroHeading />
        <div className="hero__second-part flex">
          {locationIsOpen && (<WhereToPopup />)}

          <HeroInput icon={{
            src: pinIcon,
            alt: `Pin Icon`,
            width: 20,
            height: 46,
            className: `icon icon--pin`
          }}>
            <span className="hero__second-part-details-span">Where</span>
            <label>
              <input
                onFocus={handleOpenChooseLocation}
                onBlur={handleCloseChooseLocation}
                onChange={handleOpenChooseLocation} type="text"
                name="destination"
                placeholder="Search destinations"
                className="hero-input hero-input-destinations" required />
            </label>
          </HeroInput>

          <HeroInput icon={{
            src: timeIcon,
            alt: `Time Icon`,
            width: 20,
            height: 44,
            className: `icon--clock`
          }}>
            <span className="hero__second-part-details-span">When</span>
            <label>
              <input type="text" name="date" placeholder="Choose the date" onFocus={handleOpenCalendar}
                     className="hero-input hero-input-destinations hero-input-destinations-datepicker" required />
            </label>
          </HeroInput>

          <HeroInput icon={{
            src: typeIcon,
            alt: `Type Icon`,
            width: 20,
            height: 44,
            className: `icon--type`
          }}>
            <span className="hero__second-part-details-span">Tour Type</span>
            <select name="tour-type" id="" className="hero-select-type" required>
              <option value="all">All tours</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="family">Family</option>
              <option value="food">Food</option>
              <option value="nightlife">Nightlife</option>
              <option value="relaxing">Relaxing</option>
            </select>
          </HeroInput>

          <button className="btn btn--hero">
            <Image className={`search-req`} width={20} height={30} src={searchIcon} alt={`Search icon`} />
            Search
          </button>
        </div>
      </form>
    </>
  );
}
