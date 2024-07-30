// 'use client';

import './PopularThingsGallery.scss';
import cruisesImg from '@/assets/images/homepage/popularThingsToDo/cruises.svg';
import museumTour from '@/assets/images/homepage/popularThingsToDo/museumTour.svg';
import beachTourImg from '@/assets/images/homepage/popularThingsToDo/beachTours.svg';
import cityToursImg from '@/assets/images/homepage/popularThingsToDo/cityTours.svg';
import foodImg from '@/assets/images/homepage/popularThingsToDo/food.svg';
import hikingImg from '@/assets/images/homepage/popularThingsToDo/hiking.svg';
import Image from 'next/image';
import Link from 'next/link';

/*interface PopularThingsGalleryInterface {
  // children: ReactNode;
}*/


export default function PopularThingsGallery(/*{  }: PopularThingsGalleryInterface*/) {
  return (
    <>
      <div className="popular-things-to-do__tours grid grid-five-cols">
        <div className="popular-things-to-do__tour popular-things-to-do__tours-1">
          <Link href={`/tours?filter=cruises`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/cruises.svg" className=""
                   src={cruisesImg}
                   alt="cruises image" />
            <p className="popular-things-to-do__tour-title">Cruises</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-2">
          <Link href={`/tours?filter=cultural`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/museumTour.svg" className=""
                   src={museumTour}
                   alt="museum tour image" />
            <p className="popular-things-to-do__tour-title">Cultural</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-3">
          <Link href={`/tours/?filter=relaxing`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/beachTours.svg" className=""
                   src={beachTourImg}
                   alt="two people on the beach image" />
            <p className="popular-things-to-do__tour-title">Relaxing</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-4">
          <Link href={`/tours/?filter=city`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/cityTours.svg" className=""
                   src={cityToursImg}
                   alt="city tours image" />
            <p className="popular-things-to-do__tour-title">City Tours</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-5">
          <Link href={`/tours/?filter=food`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/food.svg" className=""
                   src={foodImg}
                   alt="restaurant image" />
            <p className="popular-things-to-do__tour-title">Food</p>
          </Link>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-6">
          <Link href={`/tours/?filter=nature`} className="popular-things-to-do__tour-link">
            <Image data-src="img/popularThingsToDo/hiking.svg" className=""
                   src={hikingImg}
                   alt="two people on a hike image" />
            <p className="popular-things-to-do__tour-title">Nature Tours</p>
          </Link>
        </div>
      </div>
    </>
  );
}
