'use client';

import '@/app/tours/page.scss';
import ToursHeader from '@/components/tours/header/ToursHeader';
import Filter from '@/components/UI/Filter/Filter';
import Figures from '@/components/tours/figures/Figures';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import SkeletonCardHorizontal from '@/components/skeletons/Card/SkeletonCardHorizontal';
import '@/components/UI/Input/Input.scss';
import '@/components/UI/Input/SearchInput.scss';
import { AllToursInterface } from '@/app/tours/page';
import { motion } from 'framer-motion';

export default function AllTours({ searchParams }: AllToursInterface) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef<HTMLInputElement>(null);

  const filter = searchParams.filter ? searchParams.filter : null;
  const filterType = searchParams[`filter-type`] ? searchParams[`filter-type`] : null;
  const filterSearch = searchParams[`filter-search`] ? searchParams[`filter-search`] : null;

  function handleFetchTours(filter: unknown) {

    fetch('/api/fetch-tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filter)
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


  useEffect(() => {
    try {

      if (filter) {
        setLoading(true);
        // Fetch tours based on the filter
        // create an array of tags
        const tags = filter.split(',');

        handleFetchTours({ filter: tags });
      }

      if (filterType && !filterSearch) {
        setLoading(true);
        // Fetch tours based on the filter
        // create an array of tags
        const type = filterType.split(',');

        handleFetchTours({ filterType: type });
      }

      if (filterSearch && !filterType) {
        setLoading(true);

        handleFetchTours({ filterSearch: filterSearch });
      }

      if (filterSearch && filterType) {
        setLoading(true);
        let type;

        if (filterType === `default`) {
          type = `default`;
        } else {
          type = filterType.split(',');
        }

        handleFetchTours({ filterSearch: filterSearch, filterType: type });
      }

    } catch (e) {
      console.error(`Failed to fetch tours: ${e}`);
    }
  }, [filter, filterType, filterSearch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
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
      let tourRatings: number[] = [];

      // Collect filter values
      const filterInputs = document.querySelectorAll('.all-tours__content__filter input[type="checkbox"]:checked');
      filterInputs.forEach(input => {

        if ((input as HTMLInputElement).name.includes('tour-type')) {

          // push it to the array
          const val = (input as HTMLInputElement)
            .name.split(':')[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

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

        } else if ((input as HTMLInputElement).name.includes('rating')) {

          const val = (input as HTMLInputElement).name.split('-')[1].replace(`:`, ``);

          // data passes in [1,2,3... to 5] format
          tourRatings.push(+val);
          // @ts-ignore
          results.tourRatings = tourRatings;
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
      setLoading(true);

      // Output
      fetch('/api/filter-tours', {
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
          // throw new Error(`Failed to fetch tours: ${error}`);
        });
    } catch (e) {
      // throw new Error(`Failed to fetch tours: ${e}`);
      console.error(`Failed to fetch tours: ${e}`);
    }
  }

  // Fetch the tours
  useEffect(() => {

    if (!filter && !filterType && !filterSearch) {
      handleFetchTours({ filter: false });
    }
  }, []);

  function handleClearFilter() {

    setLoading(true);
    handleFetchTours({ filter: false });

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const input = document.querySelector(`.all-tours__content__filter-datepicker`)! as HTMLInputElement;
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    searchInput.current!.value = '';

  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`z-index-10`}
      onSubmit={handleSubmit}>
      <div className={`all-tours__content-header`}>
        <ToursHeader />
        <div className="flex gap-sm">
          <div className={`flex gap-sm all-tours__content-input`}>
            <label>
              <input ref={searchInput} type={`text`} name={`searchTerm`}
                     className={`all-tours__search-tour-input`}
                     placeholder={`Country, City, or Tour Name`} />
            </label>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`all-tours__search-tour-btn`} style={{ fontFamily: `Inter` }}>Search
            </motion.button>
          </div>
        </div>
      </div>
      <div className="all-tours__content grid">
        <Filter tours={tours} />
        <div className="all-tours__content__figures">
          {loading && (
            <div className="all-tours__content__figures__figure-container">
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
            </div>
          )}
          {!loading && <Figures loading={loading} clearFilters={handleClearFilter} tours={tours} />}
        </div>
      </div>
    </motion.form>
  );
}