'use client';
import '@/components/UI/DatePicker/DatePicker.scss';
import pinIcon from '../../../assets/images/homepage/hero/pin-outline.svg';
import typeIcon from '../../../assets/images/homepage/hero/keypad-outline.svg';
import searchIcon from '../../../assets/images/homepage/hero/search-icon.svg';
import HeroHeading from '@/components/homepage/hero/HeroHeading';
import WhereToPopup from '@/components/homepage/choose-location-popup/WhereToPopup';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import HeroInput from '@/components/homepage/hero/HeroInput';
import Image from 'next/image';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { HeroSliceActions } from '@/store/heroSlice';
import { TourInterface } from '@/data/DUMMY_TOURS';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const locationIsOpen = useCartSelector((state) => state.hero.locationIsOpen);
  const [tours, setTours] = useState<TourInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // @ts-ignore
  const input = useRef<HTMLInputElement>(``);
  const dispatch = useCartDispatch();
  const loadingTimeout = useRef<NodeJS.Timeout>();

  const router = useRouter();

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleOpenChooseLocation(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(HeroSliceActions.toggleLocation(false));
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());
    currObject.reset();
    console.log(results);

    router.push(`/tours?filter-search=${results.searchTerm}&filter-type=${results['tour-type']}`);

  }

  function handleOpenChooseLocation(searchTerm: string) {
    setIsLoading(true);
    dispatch(HeroSliceActions.toggleLocation(true));

    fetch('http://localhost:3000/api/filter-tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sort: 'default', searchTerm })
    })
      .then(response => response.json())
      .then(data => {
        setTours(data.tours);
        clearTimeout(loadingTimeout.current);

        loadingTimeout.current = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.error(`Failed to fetch tours: ${error}`);
        setIsLoading(false);
      });
  }

  const timeout = useRef<NodeJS.Timeout>();

  function handleCloseChooseLocation() {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch(HeroSliceActions.toggleLocation(false));
    }, 400);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="hero-form">
        <HeroHeading />
        <div className="hero__second-part flex">
          {locationIsOpen && (
            // @ts-ignore
            <WhereToPopup inputVal={input.current.value} isLoading={isLoading}
                          tours={tours} />)}

          <HeroInput icon={{
            src: pinIcon,
            alt: 'Pin Icon',
            width: 20,
            height: 46,
            className: 'icon icon--pin'
          }}>
            <span className="hero__second-part-details-span">Where</span>
            <label>
              <input
                onFocus={() => handleOpenChooseLocation(searchTerm)}
                onBlur={handleCloseChooseLocation}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                // @ts-ignore
                ref={input}
                // @ts-ignore
                defaultValue={input.current?.value ? input.current.value : ``}
                name="searchTerm"
                placeholder="Country, City, or Tour Name"
                className="hero-input hero-input-destinations"
                required
              />
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
            alt: 'Type Icon',
            width: 20,
            height: 44,
            className: 'icon--type'
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
            <Image className="search-req" width={20} height={30} src={searchIcon} alt="Search icon" />
            Search
          </button>
        </div>
      </form>
    </>
  );
}