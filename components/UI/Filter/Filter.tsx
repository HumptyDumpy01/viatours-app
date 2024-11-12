'use client';

import './Filter.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';
import CheckBox from '@/components/UI/Checkbox/CheckBox';
import Accordion from '@/components/UI/Accordion/Accordion';
import AccordionWithSeeMoreBtn from '@/components/UI/Accordion/AccordionWithSeeMoreBtn';
import DateCalendarValue from '@/components/UI/calendar/Calendar';
import StoreProvider from '@/components/UI/Provider/StoreProvider';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { HeroSliceActions } from '@/store/heroSlice';
import DatePicker from '@/components/UI/DatePicker/DatePicker';
import { TourInterface } from '@/app/tours/[id]/page';
import { motion } from 'framer-motion';


interface FilterInterface {
  tours: TourInterface[];
  // children: ReactNode;
}

export default function Filter({ tours }: FilterInterface) {

  // let's count how many tours have the rating of 5
  const fiveStarTours = tours.filter(tour => tour.rating.overall === 5).length;

  // let's count how many tours have the rating of gte 4 but lt than 5
  const fourStarTours = tours.filter(tour => tour.rating.overall >= 4 && tour.rating.overall < 5).length;

  // let's count how many tours have the rating of gte 3 but lt than 4
  const threeStarTours = tours.filter(tour => tour.rating.overall >= 3 && tour.rating.overall < 4).length;

  // let's count how many tours have the rating of gte 2 but lt than 3
  const twoStarTours = tours.filter(tour => tour.rating.overall >= 2 && tour.rating.overall < 3).length;
  // let's count how many tours have the rating of gte 1 but lt than 2
  const oneStarTours = tours.filter(tour => tour.rating.overall >= 1 && tour.rating.overall < 2).length;


  const calendarIsOpen = useCartSelector((state) => state.hero.calendarIsOpen);

  const dispatch = useCartDispatch();

  function handleOpenFilter() {
    const filter = document.querySelector('.all-tours__content__filter');
    filter?.classList.toggle('filter--open');
  }

  function handleUncheckAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const input = document.querySelector(`.all-tours__content__filter-datepicker`)! as HTMLInputElement;
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }

  function handleOpenCalendar() {
    dispatch(HeroSliceActions.toggleCalendar(true));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className={`z-index-10`}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="all-tours__content__filter">
        <div onClick={handleOpenFilter}>
          <IconIon type="closeOutline" className="icon icon--close-filter" />
        </div>
        <div className="all-tours__content__filter-header">
          <span>When you are travelling?</span>
          {/*<InputTiny readonly onClick={handleOpenCalendar} id={`date`} name={`date`} placeholder={`e.g. February 05`} />*/}
          <DatePicker
            sx={{
              '.MuiInputBase-input': {
                backgroundColor: `#fff`,
                padding: '1rem 2rem',
                borderRadius: '5rem',
                border: `none`,
                fontWeight: 500,
                color: `#f36f00`
              },
              '.MuiOutlinedInput-notchedOutline': {
                border: `none`
              }
            }} />

          <div className="all-tours__content__filter-datepicker__btns flex flex-justify-center">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              type={`button`} onClick={handleUncheckAllCheckboxes}
              className="link all-tours__content__filter-datepicker-reset">Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="link all-tours__content__filter-datepicker-apply">Apply
            </motion.button>
          </div>
        </div>
        <AccordionWithSeeMoreBtn visibleContent={
          <>
            <CheckBox tag={`tour-type`} id={`nature-tours`} label={`Nature Tours`} />
            <CheckBox tag={`tour-type`} id={`adventure-tours`} label={`Adventure Tours`} />
            <CheckBox tag={`tour-type`} id={`cultural-tours`} label={`Cultural Tours`} />
            <CheckBox tag={`tour-type`} id={`food-tours`} label={`Food Tours`} />
            <CheckBox tag={`tour-type`} id={`city-tours`} label={`City Tours`} />
            <CheckBox tag={`tour-type`} id={`cruises-tours`} label={`Cruises Tours`} />
          </>
        } hiddenContent={
          <>
            <CheckBox tag={`tour-type`} id={`family-tours`} label={`Family`} />
            <CheckBox tag={`tour-type`} id={`wildlife-tours`} label={`Wildlife`} />
            <CheckBox tag={`tour-type`} id={`relaxing-tours`} label={`Relaxing`} />
          </>
        } />
        <Accordion label={`Filter Price`}>
          <CheckBox tag={`price=`} id={`price:0-300`} label={`0$-300$`} />
          <CheckBox tag={`price=`} id={`price:300-700`} label={`300$-700$`} />
          <CheckBox tag={`price=`} id={`price:700-1299`} label={`700$-1299$`} />
        </Accordion>

        <Accordion label={`Duration`}>
          <CheckBox tag={`duration=`} id={`duration:1-3`} label={`1-3 days`} />
          <CheckBox tag={`duration=`} id={`duration:3-7`} label={`3-7 days`} />
          <CheckBox tag={`duration=`} id={`duration:7-14`} label={`7 to 14 days`} />
        </Accordion>

        <Accordion label={`Language`}>
          <CheckBox tag={`language=`} id={`English`} label={`English`} />
          <CheckBox tag={`language=`} id={`French`} label={`French`} />
          <CheckBox tag={`language=`} id={`Spanish`} label={`Spanish`} />
          <CheckBox tag={`language=`} id={`Ukrainian`} label={`Ukrainian`} />
          <CheckBox tag={`language=`} id={`Japanese`} label={`Japanese`} />
          <CheckBox tag={`language=`} id={`Italian`} label={`Italian`} />
        </Accordion>
        <Accordion label={`Rating`}>
          <CheckBox tag={`rating=`} id={`1`} label={`1 star`} stars={1} rated={oneStarTours} />
          <CheckBox tag={`rating=`} id={`2`} label={`2 stars`} stars={2} rated={twoStarTours} />
          <CheckBox tag={`rating=`} id={`3`} label={`3 stars`} stars={3} rated={threeStarTours} />
          <CheckBox tag={`rating=`} id={`4`} label={`4 stars`} stars={4} rated={fourStarTours} />
          <CheckBox tag={`rating=`} id={`5`} label={`5 stars`} stars={5} rated={fiveStarTours} />
        </Accordion>
        <Accordion label={`Specials`}>
          <CheckBox tag={`onsale=`} id={`onsale:5-20`} label={`5-20% off`} />
          <CheckBox tag={`onsale=`} id={`onsale:20-40`} label={`20-40% off`} />
          <CheckBox tag={`onsale=`} id={`onsale:40-90`} label={`40-90% off`} />
        </Accordion>

        {calendarIsOpen && (
          <StoreProvider>
            <DateCalendarValue usage={`filter`} className={`MuiDateCalendar-root-filter`} />
          </StoreProvider>
        )}
      </div>

    </motion.div>
  );
}
