'use client';

import '@/app/tours/page.scss';

/*interface AllToursInterface {
  // children: ReactNode;
}*/
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
  // @ts-ignore
  const searchInput = useRef<HTMLInputElement>(``);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { searchTerm: string };
    // resetting the form
    if (searchInput.current!.value.trim() !== '') {
      setLoading(true);
    }
    // currObject.reset();
    // output
    console.log(`Result: `, results.searchTerm);
    fetch('http://localhost:3000/api/filter-tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searchTerm: searchInput.current!.value })
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


  // fetch the tours
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
        <form className="flex gap-sm">

          <label>
            <input ref={searchInput} defaultValue={searchInput.current!.value} type={`text`} name={`searchTerm`}
                   className={`all-tours__search-tour-input`}
                   placeholder={`Country, City, or Tour Name`}
                   required />
          </label>
          <button className={`all-tours__search-tour-btn`} style={{ fontFamily: `Inter` }}>Search
          </button>
        </form>
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
          )
          }
          {!loading &&
            <Figures tours={tours} />
          }
        </div>
      </div>
    </form>
  );
}
