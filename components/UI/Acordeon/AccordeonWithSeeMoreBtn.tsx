'use client';

import { ReactNode, useState } from 'react';
import Acordeon from '@/components/UI/Acordeon/Acordeon';

interface AcordeonWithSeeMoreBtnInterface {
  visibleContent: ReactNode;
  hiddenContent: ReactNode;
  // children: ReactNode;
}

export default function AcordeonWithSeeMoreBtn({ visibleContent, hiddenContent }: AcordeonWithSeeMoreBtnInterface) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <Acordeon label={`Tour Type`}>
      {/*THIS WOULD BE INSERTED WHEN THE USER CLICKS ON THE "SEE MORE" BUTTON*/}
      {visibleContent}
      <div className={`${!isOpen ? `all-tours__content__filter-filter-item-hidden` : `see-more-clicked`}`}>
        {hiddenContent}
      </div>
      <button
        onClick={handleToggleOpen}
        type={'button'}
        className={`all-tours__content__filter-tour-type__see-more ${isOpen ? `see-more-clicked` : ``}`}>{isOpen ? `See Less` : `See More`}</button>
    </Acordeon>
  );
}
