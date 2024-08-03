'use client';
import '@/components/UI/DatePicker/DatePicker.scss';
/*interface HeroInterface {
  // children: ReactNode;
}*/
import pinIcon from '../../../assets/images/homepage/hero/pin-outline.svg';
import typeIcon from '../../../assets/images/homepage/hero/keypad-outline.svg';
import searchIcon from '../../../assets/images/homepage/hero/search-icon.svg';

import HeroHeading from '@/components/homepage/hero/HeroHeading';
import WhereToPopup from '@/components/homepage/choose-location-popup/WhereToPopup';
import React, { FormEvent, useRef, useState } from 'react';
import HeroInput from '@/components/homepage/hero/HeroInput';
import Image from 'next/image';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { HeroSliceActions } from '@/store/heroSlice';
import { TourInterface } from '@/data/DUMMY_TOURS';

export default function Hero(/*{  }: HeroInterface*/) {

  const locationIsOpen = useCartSelector((state) => state.hero.locationIsOpen);
  // const calendarIsOpen = useCartSelector((state) => state.hero.calendarIsOpen);
  const [tours, setTours] = useState<TourInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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


  // function handleOpenCalendar() {
  //   dispatch(HeroSliceActions.toggleCalendar(true));
  // }

  function handleOpenChooseLocation(/*event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>*/) {
    dispatch(HeroSliceActions.toggleLocation(true));

    // TODO: FETCH TOURS
    fetch('http://localhost:3000/api/fetch-tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filter: false })
    })
      .then(response => response.json())
      .then(data => {
        setTours(data.tours);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Failed to fetch tours: ${error}`);
        setIsLoading(false);
      });
  }

  // console.log(tours);

  const timeout = useRef<NodeJS.Timeout>();

  function handleCloseChooseLocation() {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(function() {
      dispatch(HeroSliceActions.toggleLocation(false));
    }, 400);
  }


  return (
    <>
      {/*{calendarIsOpen && (<BasicDateCalendar usage={`home-hero`} className={`MuiDateCalendar-root-hero`} />)}*/}
      <form onSubmit={handleSubmit} className={`hero-form`}>
        <HeroHeading />
        <div className="hero__second-part flex">
          {locationIsOpen && (<WhereToPopup isLoading={isLoading} tours={tours} />)}

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
                name="searchTerm"
                placeholder="Country, City, or Tour Name"
                className="hero-input hero-input-destinations" required />
            </label>
          </HeroInput>

          {/*<HeroInput icon={{*/}
          {/*  src: timeIcon,*/}
          {/*  alt: `Time Icon`,*/}
          {/*  width: 20,*/}
          {/*  height: 44,*/}
          {/*  className: `icon--clock`*/}
          {/*}}>*/}
          {/*  <span className="hero__second-part-details-span">When</span>*/}
          {/*  /!*<label>*!/*/}
          {/*  /!*  <input readOnly type="text" name="date" placeholder="Choose the date" onFocus={handleOpenCalendar}*!/*/}
          {/*  /!*         className="hero-input hero-input-destinations hero-input-destinations-datepicker" required />*!/*/}
          {/*  /!*</label>*!/*/}
          {/*  <DatePicker sx={{*/}
          {/*    '.MuiInputBase-input': {*/}
          {/*      fontSize: `1.5rem`,*/}
          {/*      padding: `0`,*/}
          {/*      border: `none`,*/}
          {/*      color: `#f36f00`*/}
          {/*    },*/}
          {/*    '.MuiOutlinedInput-notchedOutline': {*/}
          {/*      border: `none`*/}
          {/*    }*/}
          {/*  }} />*/}
          {/*</HeroInput>*/}

          <HeroInput icon={{
            src: typeIcon,
            alt: `Type Icon`,
            width: 20,
            height: 44,
            className: `icon--type`
          }}>
            <span className="hero__second-part-details-span">Tour Type</span>
            <select name="tour-type" id="" className="hero-select-type" required>
              <option value="default">All tours</option>
              <option value="Nature Tours">Nature</option>
              <option value="Adventure Tours">Adventure</option>
              <option value="Cultural Tours">Cultural</option>
              <option value="Food Tours">Food</option>
              <option value="City Tours">City</option>
              <option value="Family Tours">Family</option>
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
