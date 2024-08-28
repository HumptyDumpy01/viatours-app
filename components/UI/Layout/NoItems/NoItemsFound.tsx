// 'use client';

interface NoItemsFoundInterface {
  clearFilters: () => void;
  buttonLabel?: string;
  // children: ReactNode;
}

import React from 'react';

export default function NoItemsFound({ clearFilters, buttonLabel }: NoItemsFoundInterface) {
  return (
    <>
      <h1 className={`secondary-heading`}>No results Found!</h1>
      <p className={`paragraph margin-top-normal`}>Try adjusting your search by changing your dates or removing <br />
        filters</p>
      <button onClick={clearFilters}
              className={`btn-clear-filters`}>{buttonLabel ? buttonLabel : `Clear Filters`}</button>
    </>
  );
}
