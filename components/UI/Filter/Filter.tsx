'use client';

import './Filter.scss';
/*interface FilterInterface {
  // children: ReactNode;
}*/
import IconIon from '@/components/UI/IonIcon/IconIon';
import CheckBox from '@/components/UI/Checkbox/CheckBox';
import Accordion from '@/components/UI/Accordion/Accordion';
import AccordionWithSeeMoreBtn from '@/components/UI/Accordion/AccordionWithSeeMoreBtn';
import DateCalendarValue from '@/components/UI/calendar/Calendar';
import StoreProvider from '@/components/UI/Provider/StoreProvider';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { HeroSliceActions } from '@/store/heroSlice';
import DatePicker from '@/components/UI/DatePicker/DatePicker';

export default function Filter(/*{  }: FilterInterface*/) {

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
    <>
      <div className="all-tours__content__filter">
        <div onClick={handleOpenFilter}>
          <IconIon type="closeOutline" className="icon icon--close-filter" />
        </div>
        <div className="all-tours__content__filter-header">
          <span>When you are travelling?</span>
          {/*<InputTiny readonly onClick={handleOpenCalendar} id={`date`} name={`date`} placeholder={`e.g. February 05`} />*/}
          <DatePicker sx={{
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
            <button type={`button`} onClick={handleUncheckAllCheckboxes}
                    className="link all-tours__content__filter-datepicker-reset">Reset
            </button>
            <button className="link all-tours__content__filter-datepicker-apply">Apply</button>
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
          <CheckBox tag={`tour-language`} id={`english`} label={`English`} />
          <CheckBox tag={`tour-language`} id={`french`} label={`French`} />
          <CheckBox tag={`tour-language`} id={`spanish`} label={`Spanish`} />
          <CheckBox tag={`tour-language`} id={`ukrainian`} label={`Ukrainian`} />
        </Accordion>
        <Accordion label={`Rating`}>
          <CheckBox tag={`tour-rating`} id={`1-star`} label={`1 star`} stars={1} rated={0} />
          <CheckBox tag={`tour-rating`} id={`2-stars`} label={`2 stars`} stars={2} rated={12} />
          <CheckBox tag={`tour-rating`} id={`3-stars`} label={`3 stars`} stars={3} rated={36} />
          <CheckBox tag={`tour-rating`} id={`4-stars`} label={`4 stars`} stars={4} rated={1599} />
          <CheckBox tag={`tour-rating`} id={`5-stars`} label={`5 stars`} stars={5} rated={4911} />
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

    </>
  );
}
