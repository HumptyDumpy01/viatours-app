'use client';

import '../Filter/Filter.scss';
import { ReactNode, useState } from 'react';

interface AccordionInterface {
  children: ReactNode;
  label: string;
}

export default function Accordion({ children, label }: AccordionInterface) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="all-tours__content__filter-price">
        <h3 onClick={handleToggleOpen} className="all-tours__content__filter-filter-item-heading">{label}</h3>
        <div
          className={`all-tours__content__filter-filter-item-wrapper ${!isOpen ? `hidden` : ``}`}>
          {children}
        </div>
      </div>
    </>
  );
}
