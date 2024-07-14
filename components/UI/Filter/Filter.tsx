'use client';

import './Filter.scss';
/*interface FilterInterface {
  // children: ReactNode;
}*/
import IconIon from '@/components/UI/IonIcon/IconIon';
import InputTiny from '@/components/UI/Input/InputTiny';
import CheckBox from '@/components/UI/Checkbox/CheckBox';
import Acordeon from '@/components/UI/Acordeon/Acordeon';
import AccordionWithSeeMoreBtn from '@/components/UI/Acordeon/AccordeonWithSeeMoreBtn';

export default function Filter(/*{  }: FilterInterface*/) {

  function handleOpenFilter() {
    const filter = document.querySelector('.all-tours__content__filter');
    filter?.classList.toggle('filter--open');
  }

  function handleUncheckAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }

  return (
    <>
      <form className="all-tours__content__filter">
        <div onClick={handleOpenFilter}>
          <IconIon type="closeOutline" className="icon icon--close-filter" />
        </div>
        <div className="all-tours__content__filter-header">
          <span>When you are travelling?</span>
          <InputTiny id={`date`} name={`date`} placeholder={`e.g. February 05`} />
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
            <CheckBox tag={`tour-type`} id={`family`} label={`Family`} />
            <CheckBox tag={`tour-type`} id={`wildlife`} label={`Wildlife`} />
            <CheckBox tag={`tour-type`} id={`relaxing`} label={`Relaxing`} />
          </>
        } />
        <Acordeon label={`Filter Price`}>
          <CheckBox tag={`filter-price`} id={`100-300`} label={`100$-300$`} />
          <CheckBox tag={`filter-price`} id={`300-700`} label={`300$-700$`} />
          <CheckBox tag={`filter-price`} id={`700-1299`} label={`700$-1299$`} />
        </Acordeon>

        <Acordeon label={`Duration`}>
          <CheckBox tag={`tour-duration`} id={`1-3`} label={`1-3 days`} />
          <CheckBox tag={`tour-duration`} id={`3-7`} label={`3-7 days`} />
          <CheckBox tag={`tour-duration`} id={`7-14`} label={`7 to 14 days`} />
        </Acordeon>

        <Acordeon label={`Language`}>
          <CheckBox tag={`tour-language`} id={`english`} label={`English`} />
          <CheckBox tag={`tour-language`} id={`french`} label={`French`} />
          <CheckBox tag={`tour-language`} id={`spanish`} label={`Spanish`} />
          <CheckBox tag={`tour-language`} id={`ukrainian`} label={`Ukrainian`} />
        </Acordeon>
        <Acordeon label={`Rating`}>
          <CheckBox tag={`tour-rating`} id={`1-star`} label={`1 star`} stars={1} rated={0} />
          <CheckBox tag={`tour-rating`} id={`2-stars`} label={`2 stars`} stars={2} rated={12} />
          <CheckBox tag={`tour-rating`} id={`3-stars`} label={`3 stars`} stars={3} rated={36} />
          <CheckBox tag={`tour-rating`} id={`4-stars`} label={`4 stars`} stars={4} rated={1599} />
          <CheckBox tag={`tour-rating`} id={`5-stars`} label={`5 stars`} stars={5} rated={4911} />
        </Acordeon>
        <Acordeon label={`Specials`}>
          <CheckBox tag={`specials`} id={`5-off`} label={`5% off`} />
          <CheckBox tag={`specials`} id={`20-off-sale`} label={`20% off`} />
          <CheckBox tag={`specials`} id={`60-off-sale`} label={`60% off`} />
          <CheckBox tag={`specials`} id={`90-off-sale`} label={`90% off`} />
        </Acordeon>
      </form>
    </>
  );
}
