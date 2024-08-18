'use client';
import './FiguresHeader.scss';

/*interface FiguresHeaderInterface {
  // children: ReactNode;
}*/
import IconIon from '@/components/UI/IonIcon/IconIon';
import { ChangeEvent, useState } from 'react';

type FiguresHeaderInterface = {
  summarizedResults: number;
  // children: ReactNode;
};

export default function FiguresHeader({ summarizedResults }: FiguresHeaderInterface) {

  const [disableSorting, setDisableSorting] = useState<boolean>(false);

  function handleOpenFilter() {
    const filter = document.querySelector('.all-tours__content__filter');
    filter?.classList.toggle('filter--open');
  }

  function applySorting(e: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value;
    const searchButton = document.querySelector(`.all-tours__search-tour-btn`)! as HTMLButtonElement;
    searchButton.click();
  }

  return (
    <>
      <div className="all-tours__content__figures__header flex flex-align-center flex-space-between">
        <p><span className="all-tours__content__figures__header-number-of-results">{summarizedResults}</span> results
        </p>
        <div className="all-tours__content__figures__header-sort">
          <div onClick={handleOpenFilter}>
            <IconIon type="filterOutline" className="icon icon--filter" />
          </div>
          <span>Sort by:</span>
          <select onChange={applySorting} disabled={disableSorting} name="sort" id="sort"
                  className="all-tours__content__figures__header-sort-select">
            <option value="default">Choose</option>
            <option value="default">Rating</option>
            <option value="a-z">A-Z order</option>
            <option value="z-a">Z-A order</option>
            <option value="low-price">Low Price</option>
            <option value="high-price">High Price</option>
          </select>
        </div>
      </div>
    </>
  );
}
