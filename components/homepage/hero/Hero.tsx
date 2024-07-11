'use client';

/*interface HeroInterface {
  // children: ReactNode;
}*/

import pinIcon from '@/assets/images/hero/pin-outline.svg';
import timeIcon from '@/assets/images/hero/time-outline.svg';
import typeIcon from '@/assets/images/hero/keypad-outline.svg';
import searchIcon from '@/assets/images/hero/search-icon.svg';

import HeroHeading from '@/components/homepage/hero/HeroHeading';
import WhereToPopup from '@/components/homepage/choose-location-popup/WhereToPopup';
import BasicDateCalendar from '@/components/homepage/calendar/Calendar';
import { useState } from 'react';
import HeroInput from '@/components/homepage/hero/HeroInput';
import Image from 'next/image';

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

        <HeroInput icon={{
          src: pinIcon,
          alt: `Pin Icon`,
          width: 20,
          height: 46,
          className: `icon icon--pin`
        }}>
          <span className="hero__second-part-details-span">Where</span>
          <label>
            <input type="text" name="hero-input-destinations" placeholder="Search destinations"
                   className="hero-input hero-input-destinations" />
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
            <input type="text" name="hero-input-destinations" placeholder="Choose the date"
                   className="hero-input hero-input-destinations hero-input-destinations-datepicker" />
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
          <select name="tour-type" id="" className="hero-select-type">
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
    </>
  );
}
