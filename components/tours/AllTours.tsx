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

    let tourType: string[] = [];
    let tourTags: string[] = [];
    let tourLanguages: string[] = [];

    // Collect filter values
    const filterInputs = document.querySelectorAll('.all-tours__content__filter input[type="checkbox"]:checked');
    filterInputs.forEach(input => {

      if ((input as HTMLInputElement).name.includes('tour-type')) {

        // push it to the array
        const val = (input as HTMLInputElement)
          .name.split(':')[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        console.log(val);
        tourType.push(val);
        // @ts-ignore
        results.tourType = tourType;

      } else if ((input as HTMLInputElement).name.includes('price')
        || (input as HTMLInputElement).name.includes('duration') ||
        (input as HTMLInputElement).name.includes('onsale')) {
        // the names go like price:0-300, price:300-700, price:700-1299
        // I do want to store all of them in an array
        // so I can filter them later on
        // push it to the array
        const val = (input as HTMLInputElement).name.split('=')[1].replace(`:`, ``);
        // replace the ":" with nothing
        tourTags.push(val);
        // @ts-ignore
        results.tourTags = tourTags;


      } else if ((input as HTMLInputElement).name.includes('language')) {

        const val = (input as HTMLInputElement).name.split('=')[1].replace(`:`, ``);
        // replace the ":" with nothing
        tourLanguages.push(val);
        // @ts-ignore
        results.tourLanguages = tourLanguages;
      } else {
        results[(input as HTMLInputElement).name] = (input as HTMLInputElement).value;
      }
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

  function handleClearFilter() {
    setLoading(true);
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

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const input = document.querySelector(`.all-tours__content__filter-datepicker`)! as HTMLInputElement;
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    searchInput.current!.value = '';

  }

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
          {!loading && <Figures clearFilters={handleClearFilter} tours={tours} />}
        </div>
      </div>
    </form>
  );
}