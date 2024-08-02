'use client';

import '@/app/tours/page.scss';
import ToursHeader from '@/components/tours/header/ToursHeader';
import Filter from '@/components/UI/Filter/Filter';
import Figures from '@/components/tours/figures/Figures';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import SkeletonCardHorizontal from '@/components/skeletons/Card/SkeletonCardHorizontal';
import '@/components/UI/Input/Input.scss';
import '@/components/UI/Input/SearchInput.scss';

export default function AllTours(/*{  }: AllToursInterface*/) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { [key: string]: string };

    // Collect additional input values
    const searchTerm = searchInput.current!.value;
    results.searchTerm = searchTerm;

    const tourType = [];

    // Collect filter values
    const filterInputs = document.querySelectorAll('.all-tours__content__filter input[type="checkbox"]:checked');
    filterInputs.forEach(input => {

      // @ts-ignore
      if (input.name === `tour-type`) {
        // push it to the array
        // @ts-ignore
        tourType.push(input.value);
      }
      // @ts-ignore
      results[input.name] = input.value;
    });

    // Collect sort value
    const sortSelect = document.querySelector('.all-tours__content__figures__header-sort-select') as HTMLSelectElement;
    if (sortSelect) {
      results.sort = sortSelect.value;
    }

    // Resetting the form
    if (searchTerm.trim() !== '') {
      setLoading(true);
    }

    // Output
    console.log('Collected Data:', results);

    fetch('http://localhost:3000/api/filter-tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(results)
    })
      .then(response => response.json())
      .then(data => {
        setTours(data.tours);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Failed to fetch tours: ${error}`);
        setLoading(false);
      });
  }

  // Fetch the tours
  useEffect(() => {
    fetch('http://localhost:3000/api/fetch-tours')
      .then(response => response.json())
      .then(data => {
        setTours(data.tours);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Failed to fetch tours: ${error}`);
        setLoading(false);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className={`all-tours__content-header`}>
        <ToursHeader />
        <div className="flex gap-sm">
          <label>
            <input ref={searchInput} type={`text`} name={`searchTerm`}
                   className={`all-tours__search-tour-input`}
                   placeholder={`Country, City, or Tour Name`}
                   required />
          </label>
          <button className={`all-tours__search-tour-btn`} style={{ fontFamily: `Inter` }}>Search</button>
        </div>
      </div>
      <div className="all-tours__content grid">
        <Filter />
        <div className="all-tours__content__figures">
          {loading && (
            <div className="all-tours__content__figures__figure-container">
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
            </div>
          )}
          {!loading && <Figures tours={tours} />}
        </div>
      </div>
    </form>
  );
}